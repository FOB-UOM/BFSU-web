import React from 'react';

export const BackgroundCanvas = () => {
    return (
        <div
            className="fixed inset-0 pointer-events-none select-none overflow-hidden"
            style={{ zIndex: 1 }}
            aria-hidden="true"
        >
            {/* Warm ambient sunlight pools — light mode */}
            <div className="dark:opacity-0 transition-opacity duration-700">
                <div className="absolute -top-48 -left-48 w-[900px] h-[900px] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)' }} />
                <div className="absolute top-[40%] -right-48 w-[800px] h-[800px] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(197,155,39,0.07) 0%, transparent 70%)' }} />
                <div className="absolute -bottom-48 left-1/4 w-[700px] h-[700px] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(252,211,77,0.06) 0%, transparent 70%)' }} />
            </div>

            {/* Cool-to-gold ambient pools — dark mode */}
            <div className="opacity-0 dark:opacity-100 transition-opacity duration-700">
                <div className="absolute -top-48 -left-48 w-[950px] h-[950px] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(24,54,95,0.28) 0%, transparent 70%)' }} />
                <div className="absolute top-[35%] -right-32 w-[750px] h-[750px] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)' }} />
                <div className="absolute -bottom-32 left-1/3 w-[650px] h-[650px] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(18,40,75,0.22) 0%, transparent 70%)' }} />
            </div>

            {/* Academic coordinate watermarks */}
            <div
                className="absolute top-[88px] left-8 sm:left-14 font-mono text-[10px] font-bold uppercase"
                style={{ color: 'var(--gold)', opacity: 0.35, letterSpacing: '0.28em' }}
            >
                06°47′45″N • 79°54′04″E — MORATUWA
            </div>
            <div
                className="absolute top-[88px] right-8 sm:right-14 font-mono text-[10px] font-bold uppercase hidden sm:block"
                style={{ color: 'var(--gold)', opacity: 0.35, letterSpacing: '0.28em' }}
            >
                EST. 2017 • FACULTY OF BUSINESS
            </div>

            {/* Precision crosshair anchors */}
            {[
                ['28%', '2.5rem'], ['28%', 'calc(100% - 2.5rem)'],
                ['62%', '2.5rem'], ['62%', 'calc(100% - 2.5rem)'],
            ].map(([top, left], i) => (
                <span
                    key={i}
                    className="absolute font-mono text-xs select-none"
                    style={{ top, left, color: 'var(--gold)', opacity: 0.25 }}
                >
                    +
                </span>
            ))}
        </div>
    );
};
