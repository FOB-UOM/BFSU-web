import React from 'react';
import { useTypographyMode } from '../context/TypographyModeContext';
import { Type } from 'lucide-react';

export const TypographySwitcher = () => {
    const { fontMode, setFontMode } = useTypographyMode();

    return (
        <div className="fixed bottom-5 right-5 z-50 bg-white text-[#12161F] p-2.5 border border-[#C59B27]/60 shadow-xl rounded-sm font-sans backdrop-blur-md flex items-center gap-3">
            <div className="flex items-center gap-2">
                <Type size={14} className="text-[#C59B27]" />
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#12161F]">
                    Font Engine:
                </span>
            </div>

            <div className="flex items-center gap-1 bg-[#F4F2EC] p-0.5 rounded-sm border border-[#E5E2DA]">
                <button
                    onClick={() => setFontMode('sans-bold')}
                    className={`px-2.5 py-1 text-[11px] font-bold font-sans transition-all rounded-sm ${
                        fontMode === 'sans-bold'
                            ? 'bg-[#C59B27] text-white shadow-sm'
                            : 'text-[#566072] hover:text-[#12161F]'
                    }`}
                >
                    Sans Bold (EFSU)
                </button>
                <button
                    onClick={() => setFontMode('editorial-serif')}
                    className={`px-2.5 py-1 text-[11px] font-serif transition-all rounded-sm ${
                        fontMode === 'editorial-serif'
                            ? 'bg-[#C59B27] text-white font-bold shadow-sm'
                            : 'text-[#566072] hover:text-[#12161F]'
                    }`}
                >
                    Editorial Serif
                </button>
            </div>
        </div>
    );
};
