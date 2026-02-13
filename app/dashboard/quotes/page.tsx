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
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Quotes</h1>
                    <p className="text-gray-600">Manage all your customer quotes</p>
                </div>
                <button className="px-6 py-3 gradient-primary text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Create New Quote
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Quotes', value: '24', icon: FileText, color: 'from-emerald-500 to-green-500' },
                    { label: 'Confirmed', value: '8', icon: Users, color: 'from-green-500 to-teal-500' },
                    { label: 'Total Value', value: '₹12.5L', icon: DollarSign, color: 'from-teal-500 to-emerald-500' },
                    { label: 'Pending', value: '6', icon: Clock, color: 'from-emerald-600 to-green-600' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white border-2 border-gray-200 p-6 rounded-2xl hover:shadow-xl hover:border-emerald-300 transition-all">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                            <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm text-gray-600 mb-1 font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Quotes List */}
            <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl">
                <h2 className="text-xl font-bold text-gray-900 mb-6">All Quotes</h2>
                <div className="space-y-4">
                    {quotes.map((quote, idx) => (
                        <div key={idx} className="border-2 border-gray-200 p-6 rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{quote.customer}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${quote.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                                                quote.status === 'sent' ? 'bg-blue-100 text-blue-700' :
                                                    quote.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-gray-100 text-gray-700'
                                            }`}>
                                            {quote.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 font-medium mb-1">{quote.id}</p>
                                    <p className="text-sm text-gray-600">{quote.destination}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-900 mb-1">{quote.amount}</p>
                                    <p className="text-sm text-emerald-600 font-semibold">Margin: {quote.margin}</p>
                                    <p className="text-xs text-gray-500 mt-1">{quote.date}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border-2 border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-all font-semibold">
                                    <Eye className="w-4 h-4" />
                                    <span>View</span>
                                </button>
                                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-all font-semibold">
                                    <Download className="w-4 h-4" />
                                    <span>Download PDF</span>
                                </button>
                                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 gradient-primary text-white rounded-lg hover:shadow-lg transition-all font-semibold">
                                    <Send className="w-4 h-4" />
                                    <span>Send to Client</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
