import React, { createContext, useContext, useState, useEffect } from 'react';

const TypographyModeContext = createContext();

export const TypographyModeProvider = ({ children }) => {
    // mode: 'sans-bold' (Modern High-Contrast Bold Sans like EFSU) | 'editorial-serif' (Classic Newspaper Serif)
    const [fontMode, setFontMode] = useState(() => {
        return localStorage.getItem('bfsu_font_mode') || 'sans-bold';
    });

    useEffect(() => {
        localStorage.setItem('bfsu_font_mode', fontMode);
        const root = document.documentElement;
        if (fontMode === 'sans-bold') {
            root.classList.remove('font-mode-serif');
            root.classList.add('font-mode-sans');
        } else {
            root.classList.remove('font-mode-sans');
            root.classList.add('font-mode-serif');
        }
    }, [fontMode]);

    return (
        <TypographyModeContext.Provider value={{ fontMode, setFontMode }}>
            {children}
        </TypographyModeContext.Provider>
    );
};

export const useTypographyMode = () => {
    const context = useContext(TypographyModeContext);
    if (!context) {
        throw new Error('useTypographyMode must be used within TypographyModeProvider');
    }
    return context;
};
