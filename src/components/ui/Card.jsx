import React from 'react';

export const Card = ({ children, className = '', hover = true, ...props }) => {
    const hoverClass = hover 
        ? 'transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-bfsu-gold/60' 
        : '';

    return (
        <div
            className={`rounded-3xl overflow-hidden relative glass-card shadow-sm ${hoverClass} ${className}`}
            {...props}
        >
            <div className="absolute top-0 left-0 w-full h-[70%] bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />
            <div className="relative z-10 w-full h-full flex flex-col">
                {children}
            </div>
        </div>
    );
};

export const CardHeader = ({ children, className = '', ...props }) => (
    <div className={`p-8 pb-4 ${className}`} {...props}>
        {children}
    </div>
);

export const CardContent = ({ children, className = '', ...props }) => (
    <div className={`p-8 pt-0 flex-grow ${className}`} {...props}>
        {children}
    </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
    <div className={`p-8 pt-0 mt-auto ${className}`} {...props}>
        {children}
    </div>
);
