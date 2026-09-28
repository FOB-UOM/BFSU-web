/**
 * Link Security & Anti-Poisoning Verification Suite
 * Business Faculty Students' Union (BFSU) • University of Moratuwa
 */

import { deepFreeze, isSafeUrl, sanitizeUrl, isSafeSocialUrl, sanitizeSocialUrl, buildSafeShareUrl } from '../src/lib/security/safeLinks.js';
import { 
    OFFICIAL_SOCIAL_LINKS, 
    OFFICIAL_FACULTY_SOCIAL_LINKS, 
    OFFICIAL_DIRECT_PORTALS, 
    OFFICIAL_UNION_CHANNELS 
} from '../src/lib/constants/links.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`  PASS: ${message}`);
        passed++;
    } else {
        console.error(`  FAIL: ${message}`);
        failed++;
    }
}

console.log('=== 1. VERIFYING UNBREAKABLE CONSTANTS (IMMUTABILITY & ANTI-POISONING) ===');

assert(Object.isFrozen(OFFICIAL_SOCIAL_LINKS), 'OFFICIAL_SOCIAL_LINKS is frozen');
assert(Object.isFrozen(OFFICIAL_SOCIAL_LINKS.LINKEDIN), 'OFFICIAL_SOCIAL_LINKS.LINKEDIN is deep-frozen');
assert(Object.isFrozen(OFFICIAL_FACULTY_SOCIAL_LINKS), 'OFFICIAL_FACULTY_SOCIAL_LINKS array is frozen');
assert(Object.isFrozen(OFFICIAL_DIRECT_PORTALS), 'OFFICIAL_DIRECT_PORTALS array is frozen');
assert(Object.isFrozen(OFFICIAL_UNION_CHANNELS), 'OFFICIAL_UNION_CHANNELS is frozen');

// Attempt runtime mutation on deep-frozen constant
try {
    OFFICIAL_SOCIAL_LINKS.LINKEDIN.url = 'https://poisoned-attacker.com';
} catch (e) {
    // Throws in strict mode
}
assert(
    OFFICIAL_SOCIAL_LINKS.LINKEDIN.url === 'https://www.linkedin.com/company/business-faculty-students-union-university-of-moratuwa/',
    'Runtime mutation on OFFICIAL_SOCIAL_LINKS.LINKEDIN was blocked'
);

try {
    OFFICIAL_UNION_CHANNELS.email = 'attacker@evil.com';
} catch (e) {
    // Throws in strict mode
}
assert(
    OFFICIAL_UNION_CHANNELS.email === 'bfsu@uom.lk',
    'Runtime mutation on OFFICIAL_UNION_CHANNELS.email was blocked'
);

console.log('\n=== 2. VERIFYING PROTOCOL POISONING & XSS DEFENSES ===');

const poisonVectors = [
    'javascript:alert("XSS")',
    '  javascript:alert(1)',
    '\tjavascript:confirm(1)',
    'JaVaScRiPt:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)',
    'file:///etc/passwd',
    'blob:https://evil.com/1234',
    '//attacker.com/phishing',
    'https://attacker@legitimate.com/test'
];

for (const vector of poisonVectors) {
    assert(!isSafeUrl(vector), `Rejected dangerous vector: "${vector.substring(0, 30)}"`);
    assert(sanitizeUrl(vector, '#') === '#', `Sanitized dangerous vector to safe fallback: "${vector.substring(0, 30)}"`);
}

console.log('\n=== 3. VERIFYING VALID & SAFE URLS ===');

const validVectors = [
    'https://www.linkedin.com/company/bfsu-uom',
    'https://online.uom.lk',
    'https://uom.lk/business',
    'mailto:bfsu@uom.lk',
    'tel:+94112650301',
    '/explore#room',
    '#overview'
];

for (const vector of validVectors) {
    assert(isSafeUrl(vector), `Accepted legitimate URL: "${vector}"`);
}

console.log('\n=== 4. VERIFYING SOCIAL MEDIA DOMAIN VALIDATION (SPOOFING DEFENSE) ===');

assert(
    isSafeSocialUrl('linkedin', 'https://www.linkedin.com/company/business-faculty-students-union-university-of-moratuwa/'),
    'Verified official BFSU LinkedIn URL'
);
assert(
    isSafeSocialUrl('facebook', 'https://www.facebook.com/BfacMora'),
    'Verified official BFSU Facebook URL'
);
assert(
    isSafeSocialUrl('facebook', 'https://www.facebook.com/BfacMora?mibextid=rS40aB7S9Ucbxw6v'),
    'Verified BFSU Facebook URL with mobile share query params'
);
assert(
    isSafeSocialUrl('youtube', 'https://youtube.com/@facultyofbusinessuom'),
    'Verified official Faculty of Business YouTube URL'
);
assert(
    isSafeSocialUrl('youtube', 'https://youtube.com/@facultyofbusinessuom?si=APuOsAtkiPKFBdHq'),
    'Verified YouTube URL with share tracking parameters'
);
assert(isSafeSocialUrl('github', 'https://github.com/uom-bfsu'), 'Verified GitHub URL');
assert(isSafeSocialUrl('googlescholar', 'https://scholar.google.com/citations?user=123'), 'Verified Google Scholar URL');
assert(isSafeSocialUrl('researchgate', 'https://www.researchgate.net/profile/academic'), 'Verified ResearchGate URL');

// Attack vectors pretending to be social media
const spoofedSocialVectors = [
    { platform: 'linkedin', url: 'https://evil-phishing-linkedin.com/profile' },
    { platform: 'linkedin', url: 'https://attacker.com?url=https://linkedin.com' },
    { platform: 'facebook', url: 'https://facebook.com.fake.site/login' },
    { platform: 'github', url: 'https://github.com.attacker.com/repos' },
    { platform: 'youtube', url: 'javascript:alert("youtube")' },
    { platform: 'linkedin', url: 'https://xn--linkedin-9ib.com/company/bfsu' }, // Punycode homograph
    { platform: 'facebook', url: 'https://facebook.com:8443/profile' }, // Non-standard port spoof
    { platform: 'github', url: 'https://github.com:9999/repo' } // Attacker port
];

for (const { platform, url } of spoofedSocialVectors) {
    assert(!isSafeSocialUrl(platform, url), `Detected & blocked spoofed ${platform} URL: "${url}"`);
    assert(sanitizeSocialUrl(platform, url, '') === '', `Sanitized spoofed ${platform} to empty string`);
}

console.log('\n=== 5. VERIFYING SAFE SOCIAL SHARE URL BUILDER ===');

const linkedinShare = buildSafeShareUrl('linkedin', { url: 'https://bfsu.uom.lk/explore' });
assert(
    linkedinShare.startsWith('https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fbfsu.uom.lk%2Fexplore'),
    'Safely encoded LinkedIn share URL'
);

const facebookShare = buildSafeShareUrl('facebook', { url: 'https://bfsu.uom.lk/explore' });
assert(
    facebookShare.startsWith('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbfsu.uom.lk%2Fexplore'),
    'Safely encoded Facebook share URL'
);

const twitterShare = buildSafeShareUrl('twitter', { title: 'New Semester 2026', url: 'https://bfsu.uom.lk' });
assert(
    twitterShare.includes('New+Semester+2026') && twitterShare.includes('bfsu.uom.lk'),
    'Safely encoded Twitter/X share URL with URLSearchParams'
);

console.log(`\n======================================================`);
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log(`======================================================`);

if (failed > 0) {
    process.exit(1);
}
