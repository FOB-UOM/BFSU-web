import React from 'react';

export const Grid = ({ children, cols = 1, sm, md, lg, xl, gap = 6, className = '', ...props }) => {

    const colClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
    };

    const smClasses = sm ? `sm:${colClasses[sm]}` : '';
    const mdClasses = md ? `md:${colClasses[md]}` : '';
    const lgClasses = lg ? `lg:${colClasses[lg]}` : '';
    const xlClasses = xl ? `xl:${colClasses[xl]}` : '';

    const classes = [
        'grid',
        `gap-${gap}`,
        colClasses[cols],
        smClasses,
        mdClasses,
        lgClasses,
        xlClasses,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};
