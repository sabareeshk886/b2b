'use client';

import Link from 'next/link';
import { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    FileText,
    Calendar,
    Settings,
    Users,
    LogOut,
    Globe,
    Bell,
    ChevronDown,
    Shield
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [companyName, setCompanyName] = useState('Wanderlust Travels');
    const [userName, setUserName] = useState('Demo User');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const storedCompany = localStorage.getItem('companyName');
        const storedUser = localStorage.getItem('userName');
        if (storedCompany) setCompanyName(storedCompany);
        if (storedUser) setUserName(storedUser);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-[#EBEBEB] p-6 z-50">
                <Link href="/" className="flex items-center space-x-2 text-[#006A4E] mb-10 pl-2">
                    <Globe className="w-6 h-6" />
                    <span className="text-xl font-black tracking-tighter">FERNWAY</span>
                </Link>

                <nav className="space-y-1">
                    {[
                        { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
                        { icon: Package, label: 'Trip Catalog', href: '/dashboard/trips' },
                        { icon: FileText, label: 'My Quotes', href: '/dashboard/quotes' },
                        { icon: Calendar, label: 'Bookings', href: '/dashboard/bookings' },
                        { icon: Users, label: 'Team', href: '/dashboard/team' },
                        { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
                    ].map((item, idx) => {
                        const isActive = item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={idx}
                                href={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-[#F0FDF4] text-[#006A4E] shadow-sm' : 'hover:bg-gray-50 text-[#717171] hover:text-[#222222]'}`}
                            >
                                <item.icon className="w-5 h-5 group-hover:scale-105 transition-transform" />
                                <span className={`text-sm ${isActive ? 'font-bold' : 'font-semibold'}`}>{item.label}</span>
                            </Link>
                        );
                    })}

                    {/* Admin Section */}
                    <div className="pt-6 mt-6 border-t border-[#EBEBEB]">
                        <p className="text-[10px] font-bold text-[#717171] uppercase px-4 mb-2 tracking-widest">Admin</p>
                        <Link
                            href="/dashboard/admin/trips"
                            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-[#717171] hover:text-[#222222] transition-all group"
                        >
                            <Shield className="w-5 h-5 group-hover:scale-105 transition-transform" />
                            <span className="text-sm font-semibold">Manage Trips</span>
                        </Link>
                    </div>
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <Link
                        href="/"
                        onClick={() => {
                            localStorage.removeItem('userName');
                            localStorage.removeItem('companyName');
                        }}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-50 text-[#717171] hover:text-red-600 transition-all group"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-semibold">Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="ml-64">
                {/* Top Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-[#EBEBEB] px-8 py-4 sticky top-0 z-40 h-20 flex items-center">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <h1 className="text-xl font-bold text-[#222222]">{companyName}</h1>
                            <p className="text-xs text-[#717171] font-medium">B2B Partner Dashboard</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="relative p-3 hover:bg-gray-50 rounded-full transition-colors border border-transparent hover:border-[#EBEBEB]">
                                <Bell className="w-5 h-5 text-[#222222]" />
                                <span className="absolute top-3 right-3 w-2 h-2 bg-[#006A4E] rounded-full border-2 border-white"></span>
                            </button>
                            
                            <div className="relative">
                                <div 
                                    className="flex items-center space-x-3 border border-[#EBEBEB] p-1.5 pl-3 rounded-full cursor-pointer hover:shadow-airbnb transition-all ml-2 bg-white"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span className="text-sm font-bold text-[#222222]">{userName}</span>
                                    <div className="w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center text-white text-xs font-bold">
                                        {userName.charAt(0).toUpperCase()}
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-[#717171] mr-1" />
                                </div>
                                
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white border border-[#EBEBEB] rounded-2xl shadow-xl py-2 z-50">
                                        <Link 
                                            href="/"
                                            onClick={() => {
                                                localStorage.removeItem('userName');
                                                localStorage.removeItem('companyName');
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full flex items-center px-4 py-3 text-sm font-semibold text-[#717171] hover:bg-gray-50 hover:text-red-600 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4 mr-3" />
                                            Logout
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8 max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

