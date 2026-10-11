'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
    LayoutDashboard,
    Package,
    FileText,
    Calendar,
    User,
    Settings,
    Users,
    LogOut,
    Globe,
    Bell,
    ChevronDown,
    Shield,
    Menu,
    X
} from 'lucide-react';

export default function DashboardShell({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    const displayCompanyName = session?.user.companyName ?? '';
    const displayUserName = session?.user.name || session?.user.email || '';
    const isPlatformAdmin = session?.user.isPlatformAdmin === true;
    const handleLogout = () => signOut({ redirectTo: '/login' });

    // Close the mobile drawer after navigating
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    // Stop the page behind the open drawer from scrolling
    useEffect(() => {
        document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isSidebarOpen]);

    return (
        <div className="min-h-screen bg-white">
            {/* Mobile drawer backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar: always visible on desktop, slide-in drawer below lg */}
            <aside
                className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-[#EBEBEB] p-6 z-50 flex flex-col transition-transform duration-200 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}
                aria-label="Dashboard navigation"
            >
                <div className="flex items-center justify-between mb-10 pl-2">
                    <Link href="/" className="flex items-center space-x-2 text-[#006A4E]">
                        <Globe className="w-6 h-6" />
                        <span className="text-xl font-black tracking-tighter">FERNWAY</span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-2 -mr-2 rounded-full hover:bg-gray-50 text-[#717171] lg:hidden"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="space-y-1 flex-1 overflow-y-auto">
                    {[
                        { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
                        { icon: Package, label: 'Trip Catalog', href: '/dashboard/trips' },
                        { icon: FileText, label: 'My Quotes', href: '/dashboard/quotes' },
                        { icon: Calendar, label: 'Bookings', href: '/dashboard/bookings' },
                        { icon: Users, label: 'Team', href: '/dashboard/team' },
                        { icon: User, label: 'Profile', href: '/dashboard/settings' },
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
                    {isPlatformAdmin && (
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
                    )}
                </nav>

                <div className="pt-4">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-50 text-[#717171] hover:text-red-600 transition-all group"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-semibold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Top Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-[#EBEBEB] px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-30 h-16 lg:h-20 flex items-center">
                    <div className="flex items-center justify-between w-full gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <button
                                type="button"
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 -ml-2 rounded-full hover:bg-gray-50 text-[#222222] lg:hidden"
                                aria-label="Open menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <div className="min-w-0">
                                <h1 className="text-base lg:text-xl font-bold text-[#222222] truncate">{displayCompanyName}</h1>
                                <p className="text-xs text-[#717171] font-medium hidden sm:block">B2B Partner Dashboard</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-3 shrink-0">
                            <button className="relative p-3 hover:bg-gray-50 rounded-full transition-colors border border-transparent hover:border-[#EBEBEB] hidden sm:block">
                                <Bell className="w-5 h-5 text-[#222222]" />
                                <span className="absolute top-3 right-3 w-2 h-2 bg-[#006A4E] rounded-full border-2 border-white"></span>
                            </button>

                            <div className="relative">
                                <div
                                    className="flex items-center space-x-2 sm:space-x-3 border border-[#EBEBEB] p-1.5 sm:pl-3 rounded-full cursor-pointer hover:shadow-airbnb transition-all bg-white"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span className="text-sm font-bold text-[#222222] hidden sm:inline max-w-[160px] truncate">{displayUserName}</span>
                                    <div className="w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center text-white text-xs font-bold">
                                        {displayUserName.charAt(0).toUpperCase()}
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-[#717171] mr-1 hidden sm:block" />
                                </div>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white border border-[#EBEBEB] rounded-2xl shadow-xl py-2 z-50">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                handleLogout();
                                            }}
                                            className="w-full flex items-center px-4 py-3 text-sm font-semibold text-[#717171] hover:bg-gray-50 hover:text-red-600 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4 mr-3" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
