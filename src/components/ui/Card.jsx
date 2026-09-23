import React from 'react';

export const Card = ({ children, className = '', hover = true, variant = 'default', ...props }) => {
    const hoverStyles = hover
        ? 'hover:border-bfsu-gold/40 hover:shadow-paper-hover dark:hover:border-bfsu-gold/40 transition-all duration-300'
        : 'transition-colors duration-200';

    return (
        <div
            className={`bg-white dark:bg-[#121721] border border-[#E8E6E1] dark:border-white/10 rounded-xl shadow-paper ${hoverStyles} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '', ...props }) => (
    <div className={`p-6 pb-3 border-b border-[#E8E6E1]/60 dark:border-white/5 ${className}`} {...props}>
        {children}
    </div>
);

export const CardContent = ({ children, className = '', ...props }) => (
    <div className={`p-6 ${className}`} {...props}>
        {children}
    </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
    <div className={`p-6 pt-3 mt-auto border-t border-[#E8E6E1]/60 dark:border-white/5 ${className}`} {...props}>
        {children}
    </div>
);
