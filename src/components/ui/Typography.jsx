import React from 'react';

export const Typography = ({ variant = 'p', className = '', children, ...props }) => {
    const Component = variant.startsWith('h') ? variant : 'p';

    const variants = {
        h1: 'font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-bfsu-ink dark:text-gray-100 leading-[1.15]',
        h2: 'font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-bfsu-ink dark:text-gray-100 leading-[1.2]',
        h3: 'font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-bfsu-ink dark:text-gray-100 leading-snug',
        h4: 'font-sans text-lg sm:text-xl font-bold text-bfsu-ink dark:text-gray-100 tracking-tight',
        h5: 'font-sans text-base sm:text-lg font-semibold text-bfsu-ink dark:text-gray-100',
        h6: 'font-sans text-sm sm:text-base font-semibold text-bfsu-ink dark:text-gray-200 uppercase tracking-wider',
        p: 'font-sans text-sm sm:text-base text-bfsu-ink-muted dark:text-gray-300 leading-relaxed',
        lead: 'font-serif text-lg sm:text-xl md:text-2xl text-bfsu-ink-muted dark:text-gray-200 leading-relaxed font-normal',
        small: 'font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400',
        eyebrow: 'font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-bfsu-gold-dark dark:text-bfsu-gold-light'
    };

    const variantStyle = variants[variant] || variants.p;

    return (
        <Component className={`transition-colors duration-200 ${variantStyle} ${className}`} {...props}>
            {children}
        </Component>
    );
};
