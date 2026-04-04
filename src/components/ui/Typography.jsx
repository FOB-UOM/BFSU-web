import React from 'react';

export const Typography = ({ variant = 'p', className = '', children, ...props }) => {
    const Component = variant.startsWith('h') ? variant : 'p';

    const baseStyles = 'font-sans text-bfsu-navy';

    const variants = {
        h1: 'text-5xl md:text-6xl font-bold tracking-tight',
        h2: 'text-4xl md:text-5xl font-bold tracking-tight',
        h3: 'text-3xl md:text-4xl font-semibold',
        h4: 'text-2xl md:text-3xl font-semibold',
        h5: 'text-xl md:text-2xl font-medium',
        h6: 'text-lg md:text-xl font-medium',
        p: 'text-base md:text-lg text-bfsu-navy/80 leading-relaxed',
        lead: 'text-lg md:text-xl text-bfsu-navy/80 leading-relaxed font-medium',
        small: 'text-sm text-bfsu-navy/70',
    };

    const variantStyle = variants[variant] || variants.p;

    return (
        <Component className={`${baseStyles} ${variantStyle} ${className}`} {...props}>
            {children}
        </Component>
    );
};
