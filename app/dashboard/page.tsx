import { TrendingUp, Package, FileText, Users, ArrowUpRight } from 'lucide-react';

export default function DashboardPage() {
    const stats = [
        {
            label: 'Total Quotes',
            value: '24',
            change: '+12%',
            icon: FileText,
            color: 'text-blue-500 bg-blue-50',
        },
        {
            label: 'Active Bookings',
            value: '18',
            change: '+8%',
            icon: Package,
            color: 'text-[#006A4E] bg-emerald-50',
        },
        {
            label: 'Revenue (Monthly)',
            value: '₹4.2L',
            change: '+23%',
            icon: TrendingUp,
            color: 'text-orange-500 bg-orange-50',
        },
        {
            label: 'Team Members',
            value: '5',
            change: '+2',
            icon: Users,
            color: 'text-purple-500 bg-purple-50',
        },
    ];

    const recentQuotes = [
        { id: 'Q-001', customer: 'Rajesh Kumar', destination: 'Bali Paradise', amount: '₹45,000', status: 'confirmed' },
        { id: 'Q-002', customer: 'Priya Sharma', destination: 'Dubai Extravaganza', amount: '₹55,000', status: 'pending' },
        { id: 'Q-003', customer: 'Amit Patel', destination: 'Maldives Luxury', amount: '₹85,000', status: 'sent' },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white border border-[#EBEBEB] p-6 rounded-2xl hover:shadow-airbnb transition-all group cursor-pointer">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-[#006A4E] flex items-center bg-emerald-50 px-2.5 py-1 rounded-full">
                                {stat.change}
                                <ArrowUpRight className="w-3 h-3 ml-0.5" />
                            </span>
                        </div>
                        <p className="text-sm font-medium text-[#717171] mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-[#222222]">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Quotes */}
                <div className="lg:col-span-2 bg-white border border-[#EBEBEB] p-8 rounded-3xl">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-[#222222]">Recent Quotes</h2>
                            <p className="text-sm text-[#717171] font-medium">Your latest B2B requests</p>
                        </div>
                        <a href="/dashboard/quotes" className="text-sm font-bold text-[#006A4E] hover:underline">
                            View all
                        </a>
                    </div>
                    
                    <div className="divide-y divide-[#EBEBEB]">
                        {recentQuotes.map((quote, idx) => (
                            <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between hover:bg-gray-50/50 transition-colors rounded-lg px-2 -mx-2 cursor-pointer group">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#222222] font-bold text-xs group-hover:bg-white transition-colors">
                                        {quote.customer.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#222222]">{quote.customer}</p>
                                        <p className="text-xs text-[#717171] font-medium">{quote.destination} • {quote.id}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-[#222222]">{quote.amount}</p>
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mt-1 ${
                                        quote.status === 'confirmed' ? 'bg-emerald-50 text-[#006A4E]' :
                                        quote.status === 'sent' ? 'bg-blue-50 text-blue-600' :
                                        'bg-orange-50 text-orange-600'
                                    }`}>
                                        {quote.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions & Info */}
                <div className="space-y-6">
                    <div className="bg-[#222222] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">Premium Partner</p>
                            <h3 className="text-3xl font-bold mb-4">25% OFF <br />Every Trip.</h3>
                            <p className="text-sm text-gray-300 font-medium mb-6">You're currently on the Premium B2B tier. Enjoy our lowest wholesale rates.</p>
                            <button className="w-full bg-white text-[#222222] py-3.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
                                Upgrade Account
                            </button>
                        </div>
                        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    </div>

                    <div className="bg-white border border-[#EBEBEB] p-8 rounded-3xl shadow-sm">
                        <h3 className="font-bold text-[#222222] mb-6">Next Steps</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Browse New Trips', href: '/dashboard/trips' },
                                { label: 'Generate PDF Brochure', href: '/dashboard/trips' },
                                { label: 'Manage Your Team', href: '/dashboard/team' },
                            ].map((action, idx) => (
                                <a
                                    key={idx}
                                    href={action.href}
                                    className="block w-full text-left py-3.5 px-5 border border-[#EBEBEB] rounded-xl text-sm font-bold text-[#222222] hover:bg-gray-50 hover:border-[#222222] transition-all"
                                >
                                    {action.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

