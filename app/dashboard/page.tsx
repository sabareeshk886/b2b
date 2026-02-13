import { TrendingUp, Package, FileText, Users, ArrowUpRight } from 'lucide-react';

export default function DashboardPage() {
    const stats = [
        {
            label: 'Total Quotes',
            value: '24',
            change: '+12%',
            icon: FileText,
            color: 'from-emerald-500 to-green-500',
        },
        {
            label: 'Active Bookings',
            value: '18',
            change: '+8%',
            icon: Package,
            color: 'from-green-500 to-teal-500',
        },
        {
            label: 'Revenue (Monthly)',
            value: '₹4.2L',
            change: '+23%',
            icon: TrendingUp,
            color: 'from-teal-500 to-emerald-500',
        },
        {
            label: 'Team Members',
            value: '5',
            change: '+2',
            icon: Users,
            color: 'from-emerald-600 to-green-600',
        },
    ];

    const recentQuotes = [
        { id: 'Q-001', customer: 'Rajesh Kumar', destination: 'Bali Paradise', amount: '₹45,000', status: 'confirmed' },
        { id: 'Q-002', customer: 'Priya Sharma', destination: 'Dubai Extravaganza', amount: '₹55,000', status: 'pending' },
        { id: 'Q-003', customer: 'Amit Patel', destination: 'Maldives Luxury', amount: '₹85,000', status: 'sent' },
    ];

    return (
        <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white border-2 border-gray-200 p-6 rounded-2xl hover:shadow-xl hover:border-emerald-300 transition-all premium-card">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-7 h-7 text-white" />
                            </div>
                            <span className="text-sm text-emerald-600 font-bold flex items-center bg-emerald-50 px-2 py-1 rounded-full">
                                {stat.change}
                                <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1 font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Quotes */}
                <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Quotes</h2>
                        <a href="/dashboard/quotes" className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
                            View All →
                        </a>
                    </div>
                    <div className="space-y-4">
                        {recentQuotes.map((quote, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50/50 to-transparent rounded-xl hover:from-emerald-50 transition-colors cursor-pointer border border-emerald-100/50">
                                <div>
                                    <p className="font-semibold text-gray-900">{quote.customer}</p>
                                    <p className="text-sm text-gray-600">{quote.destination}</p>
                                    <p className="text-xs text-gray-500 mt-1 font-medium">{quote.id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 text-lg">{quote.amount}</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${quote.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                                            quote.status === 'sent' ? 'bg-blue-100 text-blue-700' :
                                                'bg-amber-100 text-amber-700'
                                        }`}>
                                        {quote.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Browse Trips', href: '/dashboard/trips', color: 'from-emerald-500 to-green-500' },
                            { label: 'Create Quote', href: '/dashboard/quotes/new', color: 'from-green-500 to-teal-500' },
                            { label: 'View Bookings', href: '/dashboard/bookings', color: 'from-teal-500 to-emerald-500' },
                            { label: 'Manage Team', href: '/dashboard/team', color: 'from-emerald-600 to-green-600' },
                        ].map((action, idx) => (
                            <a
                                key={idx}
                                href={action.href}
                                className={`p-6 rounded-xl bg-gradient-to-r ${action.color} text-white font-bold text-center hover:shadow-xl transition-all hover:scale-105`}
                            >
                                {action.label}
                            </a>
                        ))}
                    </div>

                    {/* Pricing Tier Info */}
                    <div className="mt-6 p-5 bg-white border-2 border-emerald-200 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Your B2B Discount</p>
                                <p className="text-3xl font-bold text-gradient mt-1">25% OFF</p>
                            </div>
                            <div className="px-4 py-2 gradient-primary rounded-full text-white text-xs font-bold shadow-lg">
                                PREMIUM
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
