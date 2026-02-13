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
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6 z-50">
                <Link href="/" className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gradient">B2B</span>
                </Link>

                <nav className="space-y-2">
                    {[
                        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
                        { icon: Package, label: 'Trip Catalog', href: '/dashboard/trips' },
                        { icon: FileText, label: 'My Quotes', href: '/dashboard/quotes' },
                        { icon: Calendar, label: 'Bookings', href: '/dashboard/bookings' },
                        { icon: Users, label: 'Team', href: '/dashboard/team' },
                        { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all group"
                        >
                            <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-semibold">{item.label}</span>
                        </Link>
                    ))}

                    {/* Admin Section */}
                    <div className="pt-4 mt-4 border-t-2 border-gray-200">
                        <p className="text-xs font-bold text-gray-500 uppercase px-4 mb-2">Admin</p>
                        <Link
                            href="/dashboard/admin/trips"
                            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-purple-50 hover:text-purple-600 transition-all group"
                        >
                            <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-semibold">Manage Trips</span>
                        </Link>
                    </div>
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <Link
                        href="/login"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-semibold">Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="ml-64">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-40">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Welcome back!</h1>
                            <p className="text-sm text-gray-600 font-medium">Wanderlust Travels</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="relative p-2.5 hover:bg-emerald-50 rounded-full transition-colors">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
                            </button>
                            <div className="flex items-center space-x-3 bg-gray-100 px-4 py-2 rounded-full cursor-pointer hover:shadow-lg transition-all">
                                <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                                    D
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">Demo User</p>
                                    <p className="text-xs text-emerald-600 font-semibold">Premium</p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-600" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
