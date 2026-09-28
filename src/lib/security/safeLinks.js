/**
 * Enterprise Safe Link & Anti-Poisoning Security Engine
 * Business Faculty Students' Union (BFSU) • University of Moratuwa
 * 
 * Protects against:
 * 1. Protocol Poisoning / XSS (javascript:, data:, vbscript:, blob:, file:)
 * 2. Reverse Tabnabbing (Missing noopener/noreferrer on target="_blank")
 * 3. Open Redirects & Social Media URL Spoofing / Phishing Injection
 * 4. Control Character & Whitespace Obfuscation Attacks
 * 5. Runtime Object Mutation (Unbreakable constants via deepFreeze)
 */

/**
 * Deep freezes an object recursively to create unbreakable, immutable constants.
 * Prevents runtime tampering, prototype pollution, or memory poisoning.
 *
 * @template T
 * @param {T} obj
 * @returns {Readonly<T>}
 */
export function deepFreeze(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Object.isFrozen(obj)) {
        return obj;
    }
    Object.freeze(obj);
    for (const key of Object.getOwnPropertyNames(obj)) {
        const val = obj[key];
        if (val !== null && (typeof val === 'object' || typeof val === 'function')) {
            deepFreeze(val);
        }
    }
    return obj;
}

/**
 * Whitelist of permitted protocols.
 * All dangerous schemes (javascript:, data:, vbscript:, etc.) are rejected.
 */
export const ALLOWED_PROTOCOLS = deepFreeze(new Set(['https:', 'http:', 'mailto:', 'tel:']));

/**
 * Strict social media platform domain whitelist.
 * Prevents social media link poisoning and phishing redirects.
 */
export const TRUSTED_SOCIAL_PLATFORMS = deepFreeze({
    linkedin: {
        name: 'LinkedIn',
        allowedHosts: ['linkedin.com', 'www.linkedin.com', 'lk.linkedin.com'],
        shareBaseUrl: 'https://www.linkedin.com/sharing/share-offsite/'
    },
    facebook: {
        name: 'Facebook',
        allowedHosts: ['facebook.com', 'www.facebook.com', 'm.facebook.com', 'web.facebook.com'],
        shareBaseUrl: 'https://www.facebook.com/sharer/sharer.php'
    },
    youtube: {
        name: 'YouTube',
        allowedHosts: ['youtube.com', 'www.youtube.com', 'youtu.be', 'm.youtube.com']
    },
    github: {
        name: 'GitHub',
        allowedHosts: ['github.com', 'www.github.com']
    },
    twitter: {
        name: 'X (Twitter)',
        allowedHosts: ['twitter.com', 'www.twitter.com', 'x.com', 'www.x.com'],
        shareBaseUrl: 'https://twitter.com/intent/tweet'
    },
    instagram: {
        name: 'Instagram',
        allowedHosts: ['instagram.com', 'www.instagram.com']
    },
    googlescholar: {
        name: 'Google Scholar',
        allowedHosts: ['scholar.google.com', 'scholar.google.lk']
    },
    researchgate: {
        name: 'ResearchGate',
        allowedHosts: ['researchgate.net', 'www.researchgate.net']
    }
});

/**
 * Cleans raw string of control characters, null bytes, and non-printable characters.
 * @param {string} input
 * @returns {string}
 */
function stripDangerousChars(input) {
    if (typeof input !== 'string') return '';
    // Strip null bytes, ASCII control chars 0x00-0x1F, 0x7F, and unicode zero-width spaces
    return input
        .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, '')
        .trim();
}

/**
 * Validates whether a given URL is safe to use in an href attribute.
 *
 * @param {string} rawUrl
 * @param {Object} [options]
 * @param {boolean} [options.requireHttps=false]
 * @param {boolean} [options.allowRelative=true]
 * @returns {boolean}
 */
export function isSafeUrl(rawUrl, options = {}) {
    const { requireHttps = false, allowRelative = true } = options;

    if (!rawUrl || typeof rawUrl !== 'string') {
        return false;
    }

    const cleaned = stripDangerousChars(rawUrl);
    if (!cleaned) return false;

    // Immediately reject dangerous pseudo-protocols even if obfuscated
    const lowerCleaned = cleaned.toLowerCase();
    if (
        lowerCleaned.startsWith('javascript:') ||
        lowerCleaned.startsWith('data:') ||
        lowerCleaned.startsWith('vbscript:') ||
        lowerCleaned.startsWith('file:') ||
        lowerCleaned.startsWith('blob:')
    ) {
        return false;
    }

    // Protocol-relative URLs ('//evil.com') can bypass scheme checks and lead to open redirects
    if (lowerCleaned.startsWith('//')) {
        return false;
    }

    // Allow relative internal anchors and paths if permitted
    if (allowRelative && (cleaned.startsWith('/') || cleaned.startsWith('#') || cleaned.startsWith('?'))) {
        return true;
    }

    // Safe absolute URL parsing
    try {
        const parsed = new URL(cleaned);
        if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
            return false;
        }

        if (requireHttps && parsed.protocol !== 'https:') {
            return false;
        }

        // Prevent username/password injection (e.g. https://attacker@legitimate.com)
        if (parsed.username || parsed.password) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
}

/**
 * Sanitizes a URL for use in href, returning a safe fallback if poisoned or invalid.
 *
 * @param {string} rawUrl
 * @param {string} [fallback='#']
 * @param {Object} [options]
 * @returns {string}
 */
export function sanitizeUrl(rawUrl, fallback = '#', options = {}) {
    if (isSafeUrl(rawUrl, options)) {
        const cleaned = stripDangerousChars(rawUrl);
        if (
            cleaned.startsWith('/') || 
            cleaned.startsWith('#') || 
            cleaned.startsWith('?') || 
            cleaned.startsWith('mailto:') || 
            cleaned.startsWith('tel:')
        ) {
            return cleaned;
        }
        try {
            return new URL(cleaned).href;
        } catch {
            return fallback;
        }
    }
    return fallback;
}

/**
 * Validates that a social media URL belongs strictly to the trusted domain of the given platform.
 * Protects against poisoned profile links where an attacker inputs a phishing site under a social icon.
 *
 * @param {string} platformKey - 'linkedin' | 'facebook' | 'youtube' | 'github' | 'twitter' | 'instagram' | 'googlescholar' | 'researchgate'
 * @param {string} rawUrl
 * @returns {boolean}
 */
export function isSafeSocialUrl(platformKey, rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string') return false;

    const key = String(platformKey).toLowerCase();
    const platform = TRUSTED_SOCIAL_PLATFORMS[key];
    if (!platform) {
        // Unknown platform: ensure it's at least a valid HTTPS url without credentials
        return isSafeUrl(rawUrl, { requireHttps: true, allowRelative: false });
    }

    const cleaned = stripDangerousChars(rawUrl);
    if (!cleaned) return false;

    try {
        const parsed = new URL(cleaned);
        if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
            return false;
        }
        if (parsed.username || parsed.password) {
            return false;
        }
        // Reject non-standard ports on social platforms (e.g. port manipulation)
        if (parsed.port && parsed.port !== '443' && parsed.port !== '80') {
            return false;
        }

        const hostname = parsed.hostname.toLowerCase();

        // Reject punycode homograph attacks (e.g. xn--...) and non-ASCII character spoofs
        if (hostname.includes('xn--') || !/^[a-z0-9.-]+$/.test(hostname)) {
            return false;
        }

        return platform.allowedHosts.some(allowed => hostname === allowed || hostname.endsWith('.' + allowed));
    } catch {
        return false;
    }
}

/**
 * Sanitizes a social URL, returning an empty string or safe fallback if poisoned or spoofed.
 * Normalizes to canonical RFC 3986 format via standard URL parsing.
 *
 * @param {string} platformKey
 * @param {string} rawUrl
 * @param {string} [fallback='']
 * @returns {string}
 */
export function sanitizeSocialUrl(platformKey, rawUrl, fallback = '') {
    if (isSafeSocialUrl(platformKey, rawUrl)) {
        try {
            return new URL(stripDangerousChars(rawUrl)).href;
        } catch {
            return fallback;
        }
    }
    return fallback;
}


/**
 * Generates safe external link anchor props with bulletproof rel security attributes.
 * Always sets `rel="noopener noreferrer"` to prevent reverse tabnabbing and referrer leakage.
 *
 * @param {string} url
 * @param {Object} [options]
 * @param {string} [options.platform] - Optional platform key to validate against
 * @param {string} [options.fallback='#']
 * @returns {{ href: string, target: string, rel: string }}
 */
export function getSafeExternalLinkProps(url, options = {}) {
    const { platform, fallback = '#' } = options;

    let safeHref = fallback;
    if (platform) {
        safeHref = sanitizeSocialUrl(platform, url, fallback);
    } else {
        safeHref = sanitizeUrl(url, fallback);
    }

    return {
        href: safeHref,
        target: '_blank',
        rel: 'noopener noreferrer'
    };
}

/**
 * Safely constructs a social media share URL using URL and URLSearchParams.
 * Replaces insecure string concatenation that could lead to parameter injection.
 *
 * @param {'linkedin' | 'facebook' | 'twitter'} platformKey
 * @param {Object} params
 * @param {string} params.title
 * @param {string} [params.url]
 * @param {string} [params.summary]
 * @returns {string}
 */
export function buildSafeShareUrl(platformKey, { title = '', url = '', summary = '' } = {}) {
    const key = String(platformKey).toLowerCase();
    
    // Ensure shared target url is a safe absolute url
    const safeTargetUrl = isSafeUrl(url, { allowRelative: false })
        ? url
        : (typeof window !== 'undefined' ? window.location.href : 'https://bfsu.uom.lk');

    try {
        if (key === 'linkedin') {
            const shareUrl = new URL('https://www.linkedin.com/sharing/share-offsite/');
            shareUrl.searchParams.set('url', safeTargetUrl);
            return shareUrl.toString();
        }

        if (key === 'facebook') {
            const shareUrl = new URL('https://www.facebook.com/sharer/sharer.php');
            shareUrl.searchParams.set('u', safeTargetUrl);
            return shareUrl.toString();
        }

        if (key === 'twitter' || key === 'x') {
            const shareUrl = new URL('https://twitter.com/intent/tweet');
            const tweetText = title ? `BFSU University of Moratuwa: ${title}` : 'Faculty of Business • University of Moratuwa';
            shareUrl.searchParams.set('text', tweetText);
            shareUrl.searchParams.set('url', safeTargetUrl);
            return shareUrl.toString();
        }
    } catch (e) {
        console.warn('Failed to build safe share url:', e);
    }

    return '';
}
