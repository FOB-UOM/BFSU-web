import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Container } from './ui/Container';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
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
        <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[1100px] z-50">
            <nav className={`bg-bfsu-glass backdrop-blur-xl border border-bfsu-glass-border rounded-full transition-all duration-300 ${scrolled ? 'py-2 px-6' : 'py-3 px-8'}`}>
                <div className="flex justify-between items-center relative">
                    <a href="/" className="flex items-center gap-3">
                        <img src="/images/logo.png" alt="University of Moratuwa" className="w-10 h-10 object-contain drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" />
                        <div className="hidden sm:flex flex-col">
                            <span className="font-bold text-lg text-white leading-tight uppercase tracking-wider">BFSU UoM</span>
                        </div>
                    </a>

                    <div className="hidden md:flex gap-8 items-center">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm uppercase tracking-wider text-gray-400 font-semibold hover:text-bfsu-gold transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:block">
                        <a
                            href="#contact"
                            className="bg-bfsu-gold text-bfsu-primary px-6 py-2.5 rounded-full font-bold shadow-[0_5px_15px_rgba(212,175,55,0.2)] hover:-translate-y-[2px] transition-all hover:shadow-[0_10px_20px_rgba(212,175,55,0.4)] block text-sm uppercase tracking-wider"
                        >
                            Contact Us
                        </a>
                    </div>

                    <button
                        className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div className="md:hidden mt-4 bg-bfsu-glass backdrop-blur-xl border border-bfsu-glass-border rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="py-4 px-6 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-lg uppercase tracking-wider font-semibold text-white hover:text-bfsu-gold block py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="bg-bfsu-gold text-bfsu-primary px-6 py-3 rounded-full font-bold shadow-[0_5px_15px_rgba(212,175,55,0.2)] block text-center uppercase tracking-wider mt-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};
