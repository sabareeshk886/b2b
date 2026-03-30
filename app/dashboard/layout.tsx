import Link from 'next/link';
import { ReactNode } from 'react';
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
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-[#717171] hover:text-[#222222] transition-all group"
                        >
                            <item.icon className="w-5 h-5 group-hover:scale-105 transition-transform" />
                            <span className="text-sm font-semibold">{item.label}</span>
                        </Link>
                    ))}

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
                        href="/login"
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
                            <h1 className="text-xl font-bold text-[#222222]">Wanderlust Travels</h1>
                            <p className="text-xs text-[#717171] font-medium">B2B Partner Dashboard</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="relative p-3 hover:bg-gray-50 rounded-full transition-colors border border-transparent hover:border-[#EBEBEB]">
                                <Bell className="w-5 h-5 text-[#222222]" />
                                <span className="absolute top-3 right-3 w-2 h-2 bg-[#006A4E] rounded-full border-2 border-white"></span>
                            </button>
                            
                            <div className="flex items-center space-x-3 border border-[#EBEBEB] p-1.5 pl-3 rounded-full cursor-pointer hover:shadow-airbnb transition-all ml-2 bg-white">
                                <span className="text-sm font-bold text-[#222222]">Demo User</span>
                                <div className="w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center text-white text-xs font-bold">
                                    D
                                </div>
                                <ChevronDown className="w-4 h-4 text-[#717171] mr-1" />
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

