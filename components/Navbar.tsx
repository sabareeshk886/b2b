'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Globe, Menu, User, Search } from 'lucide-react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 h-20 flex items-center">
            <nav className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 text-[#006A4E]">
                    <div className="w-8 h-8 rounded-lg bg-[#006A4E] flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-black tracking-tighter">FERNWAY</span>
                </Link>

                {/* Search Pill - Airbnb Style */}
                <div className="hidden md:flex items-center border border-gray-200 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer space-x-4">
                    <button className="text-sm font-semibold px-4 border-r border-gray-200">Anywhere</button>
                    <button className="text-sm font-semibold px-4 border-r border-gray-200">Any week</button>
                    <button className="text-sm text-gray-500 px-4">Add guests</button>
                    <div className="bg-[#006A4E] p-2 rounded-full text-white">
                        <Search className="w-4 h-4" />
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-3">
                    <Link href="/login" className="hidden sm:block text-sm font-semibold text-[#222222] border border-gray-300 hover:border-[#006A4E] hover:text-[#006A4E] px-5 py-2.5 rounded-full transition-colors">
                        Log in
                    </Link>
                    <Link href="/register" className="hidden sm:block text-sm font-semibold text-white bg-[#006A4E] hover:bg-[#00563F] px-5 py-2.5 rounded-full transition-colors">
                        Join as Partner
                    </Link>

                    {/* Mobile menu */}
                    <div className="relative sm:hidden" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex items-center border border-gray-200 rounded-full p-2 space-x-2 hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <Menu className="w-5 h-5 ml-1 text-gray-600" />
                            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white">
                                <User className="w-5 h-5" />
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {menuOpen && (
                            <div className="absolute right-0 top-14 w-60 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                <Link
                                    href="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="block px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setMenuOpen(false)}
                                    className="block px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Join as Partner
                                </Link>

                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
