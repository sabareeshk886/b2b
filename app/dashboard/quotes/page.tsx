import { FileText, Users, DollarSign, Clock, Eye, Download, Send } from 'lucide-react';

export default function QuotesPage() {
    const quotes = [
        {
            id: 'Q-001',
            customer: 'Rajesh Kumar',
            destination: 'Bali Paradise - 7 Days',
            amount: '₹45,000',
            margin: '₹8,500',
            status: 'confirmed',
            date: '10 Feb 2026',
        },
        {
            id: 'Q-002',
            customer: 'Priya Sharma',
            destination: 'Dubai Extravaganza - 5 Days',
            amount: '₹55,000',
            margin: '₹10,500',
            status: 'pending',
            date: '11 Feb 2026',
        },
        {
            id: 'Q-003',
            customer: 'Amit Patel',
            destination: 'Maldives Luxury - 6 Days',
            amount: '₹85,000',
            margin: '₹16,000',
            status: 'sent',
            date: '09 Feb 2026',
        },
        {
            id: 'Q-004',
            customer: 'Neha Gupta',
            destination: 'Switzerland Explorer - 10 Days',
            amount: '₹1,25,000',
            margin: '₹24,000',
            status: 'draft',
            date: '12 Feb 2026',
        },
    ];

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#222222] mb-1">My Quotes</h1>
                    <p className="text-[#717171] font-medium">Create and manage customized B2B quotes</p>
                </div>
                <button className="px-8 py-3.5 bg-[#222222] text-white rounded-xl font-bold hover:bg-black transition-all shadow-md active:scale-95">
                    + Create New Quote
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Quotes', value: '24', icon: FileText, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Confirmed', value: '8', icon: Users, color: 'text-[#006A4E] bg-emerald-50' },
                    { label: 'Total Value', value: '₹12.5L', icon: DollarSign, color: 'text-orange-600 bg-orange-50' },
                    { label: 'Pending', value: '6', icon: Clock, color: 'text-purple-600 bg-purple-50' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white border border-[#EBEBEB] p-6 rounded-2xl hover:shadow-airbnb transition-all cursor-pointer group">
                        <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-[#717171] mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-[#222222]">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Quotes List */}
            <div className="bg-white border border-[#EBEBEB] p-8 rounded-3xl">
                <h2 className="text-xl font-bold text-[#222222] mb-8">Recent Requests</h2>
                <div className="space-y-6">
                    {quotes.map((quote, idx) => (
                        <div key={idx} className="group border border-[#EBEBEB] p-6 rounded-2xl hover:border-[#222222] hover:shadow-airbnb transition-all">
                            <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                                <div className="space-y-1">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="text-lg font-bold text-[#222222]">{quote.customer}</h3>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            quote.status === 'confirmed' ? 'bg-emerald-50 text-[#006A4E]' :
                                            quote.status === 'sent' ? 'bg-blue-50 text-blue-600' :
                                            quote.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {quote.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#717171] font-bold tracking-tight uppercase">{quote.id} • {quote.date}</p>
                                    <p className="text-sm font-semibold text-[#222222]">{quote.destination}</p>
                                </div>
                                <div className="text-left md:text-right space-y-1">
                                    <p className="text-2xl font-bold text-[#222222]">{quote.amount}</p>
                                    <p className="text-xs font-bold text-[#006A4E] uppercase tracking-wide">Profit Margin: {quote.margin}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#EBEBEB]">
                                <button className="flex-1 min-w-[120px] flex items-center justify-center space-x-2 px-4 py-2.5 border border-[#EBEBEB] text-[#222222] rounded-xl hover:bg-gray-50 transition-all font-bold text-xs uppercase tracking-wider">
                                    <Eye className="w-4 h-4" />
                                    <span>Preview Itinerary</span>
                                </button>
                                <button className="flex-1 min-w-[120px] flex items-center justify-center space-x-2 px-4 py-2.5 border border-[#EBEBEB] text-[#222222] rounded-xl hover:bg-gray-50 transition-all font-bold text-xs uppercase tracking-wider">
                                    <Download className="w-4 h-4" />
                                    <span>Download PDF</span>
                                </button>
                                <button className="flex-1 min-w-[120px] flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#006A4E] text-white rounded-xl hover:bg-[#005a42] transition-all font-bold text-xs uppercase tracking-wider shadow-sm shadow-emerald-200">
                                    <Send className="w-4 h-4" />
                                    <span>Send to Agent</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

