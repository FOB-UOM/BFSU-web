import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Container } from './ui/Container';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'News', href: '/news' },
        { name: 'Events', href: '/events' },
    ];

    return (
        <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-[1150px] z-50 transition-all duration-300">
            <nav className={`backdrop-blur-xl border transition-all duration-300 rounded-full shadow-lg ${
                scrolled ? 'py-2 px-6' : 'py-3 px-8'
            } bg-white/80 dark:bg-black/40 border-black/10 dark:border-white/10 shadow-black/5 dark:shadow-black/40`}>
                <div className="flex justify-between items-center relative">
                    <a href="/" className="flex items-center gap-3 group">
                        <img 
                            src="/images/logo.png" 
                            alt="University of Moratuwa" 
                            className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform" 
                        />
                        <div className="flex flex-col">
                            <span className="font-bold text-base sm:text-lg tracking-wider uppercase text-bfsu-primary dark:text-white transition-colors">
                                BFSU <span className="text-bfsu-gold">UoM</span>
                            </span>
                            <span className="hidden sm:block text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-widest uppercase">
                                University of Moratuwa
                            </span>
                        </div>
                    </a>

                    <div className="hidden md:flex gap-8 items-center">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm uppercase tracking-wider font-semibold text-gray-600 dark:text-gray-300 hover:text-bfsu-gold dark:hover:text-bfsu-gold transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <a
                            href="#contact"
                            className="bg-bfsu-gold hover:bg-bfsu-accent text-bfsu-primary px-5 py-2 rounded-full font-bold shadow-[0_4px_14px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider"
                        >
                            Contact Us
                        </a>
                    </div>

                    <div className="flex items-center gap-2 md:hidden">
                        <ThemeToggle />
                        <button
                            className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle navigation menu"
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {isOpen && (
                <div className="md:hidden mt-3 backdrop-blur-2xl border rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2 duration-200 bg-white/95 dark:bg-[#0E0E0E]/95 border-black/10 dark:border-white/10">
                    <div className="py-5 px-6 flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-base uppercase tracking-wider font-semibold text-gray-800 dark:text-gray-100 hover:text-bfsu-gold block py-2 border-b border-black/5 dark:border-white/5"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="bg-bfsu-gold text-bfsu-primary px-6 py-3 rounded-full font-bold shadow-md block text-center uppercase tracking-wider mt-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};
