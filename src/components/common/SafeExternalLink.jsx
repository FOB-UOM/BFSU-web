import React from 'react';
import { sanitizeUrl, sanitizeSocialUrl, isSafeUrl, isSafeSocialUrl } from '../../lib/security/safeLinks';

/**
 * Enterprise Safe External Link Component
 * 
 * Guarantees:
 * 1. Strict anti-poisoning: filters out `javascript:`, `data:`, control chars, and malformed schemes.
 * 2. Reverse tabnabbing defense: strictly applies `rel="noopener noreferrer"` and `target="_blank"`.
 * 3. Optional platform domain enforcement (e.g., verifying that a LinkedIn link actually points to linkedin.com).
 * 4. Safe fallback or graceful disabling if a poisoned link is detected.
 */
export const SafeExternalLink = ({
    href,
    platform,
    children,
    className = '',
    title,
    fallback = '#',
    disabledIfUnsafe = false,
    onClick,
    stopPropagation = false,
    ...rest
}) => {
    // Determine link validity
    const isValid = platform 
        ? isSafeSocialUrl(platform, href)
        : isSafeUrl(href, { allowRelative: true });

    // Sanitize href
    const safeHref = platform
        ? sanitizeSocialUrl(platform, href, fallback)
        : sanitizeUrl(href, fallback);

    const handleClick = (e) => {
        if (stopPropagation) {
            e.stopPropagation();
        }

        if (!isValid) {
            e.preventDefault();
            console.warn(`[Security] Blocked navigation to potentially poisoned or invalid link: "${href}"`);
            return;
        }

        if (onClick) {
            onClick(e);
        }
    };

    if (!isValid && disabledIfUnsafe) {
        return (
            <span
                className={`${className} opacity-50 cursor-not-allowed`}
                title={title || 'Link unavailable (verification failed)'}
                aria-disabled="true"
                {...rest}
            >
                {children}
            </span>
        );
    }

    return (
        <a
            href={safeHref}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
            onClick={handleClick}
            className={className}
            {...rest}
        >
            {children}
        </a>
    );
};

export default SafeExternalLink;
