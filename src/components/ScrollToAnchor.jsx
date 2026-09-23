'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const ScrollToAnchor = () => {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const hash = window.location.hash;
        if (hash && hash.startsWith('#')) {
            const scrollToElement = () => {
                try {
                    // Only query valid element ID selectors to avoid crashing on OAuth fragment errors
                    if (/^#[a-zA-Z0-9_\-]+$/.test(hash)) {
                        const element = document.querySelector(hash);
                        if (element) {
                            const navOffset = 90;
                            const elementPosition = element.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - navOffset;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                } catch {
                    // Ignore non-DOM hashes (like OAuth error fragments #error=...)
                }
            };

            const timer = setTimeout(scrollToElement, 150);
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    return null;
};
