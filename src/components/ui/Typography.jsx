import React from 'react';

export const Typography = ({ variant = 'p', className = '', children, ...props }) => {
    const Component = variant.startsWith('h') ? variant : 'p';

    const baseStyles = 'font-sans transition-colors duration-200';

    const variants = {
        h1: 'text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white',
        h2: 'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white',
        h3: 'text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white',
        h4: 'text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white',
        h5: 'text-lg sm:text-xl md:text-2xl font-medium text-gray-900 dark:text-white',
        h6: 'text-base sm:text-lg md:text-xl font-medium text-gray-900 dark:text-white',
        p: 'text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed',
        lead: 'text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed font-normal',
        small: 'text-sm text-gray-600 dark:text-gray-400',
    };

    const variantStyle = variants[variant] || variants.p;

    return (
        <Component className={`${baseStyles} ${variantStyle} ${className}`} {...props}>
            {children}
        </Component>
    );
};
