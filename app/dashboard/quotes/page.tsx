'use client';

import { useState, useEffect } from 'react';
import { FileText, Users, DollarSign, Clock, Eye, Download, Send, Loader2, Plus } from 'lucide-react';
import Link from 'next/link';
import { getQuotes } from '@/app/actions/quotes';

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadQuotes() {
            const companyName = localStorage.getItem('companyName') || 'g holidays';
            const data = await getQuotes(companyName);
            setQuotes(data);
            setLoading(false);
        }
        loadQuotes();
    }, []);

    // Calculate Stats
    const totalQuotes = quotes.length;
    const confirmedQuotes = quotes.filter(q => q.status === 'confirmed').length;
    const pendingQuotes = quotes.filter(q => q.status === 'sent' || q.status === 'draft').length;
    
    const totalValue = quotes.reduce((acc, q) => {
        const ppp = parseFloat(q.finalPrice) || 0;
        const pax = q.selectedTrips?.[0]?.travelers || 0;
        return acc + (ppp * pax);
    }, 0);

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#222222] mb-1">My Quotes</h1>
                    <p className="text-[#717171] font-medium">Manage and track all your customized trip proposals</p>
                </div>
                <Link href="/dashboard/quotes/new">
                    <button className="flex items-center space-x-2 px-6 py-3 bg-[#006A4E] text-white rounded-xl font-bold hover:bg-[#005a42] transition-all shadow-md active:scale-95">
                        <Plus className="w-5 h-5" />
                        <span>Create New Quote</span>
                    </button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Quotes', value: totalQuotes.toString(), icon: FileText, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Confirmed', value: confirmedQuotes.toString(), icon: Users, color: 'text-[#006A4E] bg-emerald-50' },
                    { label: 'Total Value', value: `₹${totalValue.toLocaleString()}`, icon: DollarSign, color: 'text-orange-600 bg-orange-50' },
                    { label: 'Pending', value: pendingQuotes.toString(), icon: Clock, color: 'text-purple-600 bg-purple-50' },
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
                    {loading ? (
                        <div className="py-20 text-center border border-[#EBEBEB] rounded-2xl bg-gray-50/50 flex flex-col items-center">
                            <Loader2 className="w-8 h-8 text-[#006A4E] animate-spin mb-4" />
                            <p className="text-[#717171] font-medium">Fetching your quotes...</p>
                        </div>
                    ) : quotes.length > 0 ? (
                        quotes.map((quote, idx) => {
                            const pax = quote.selectedTrips?.[0]?.travelers || 0;
                            const ppp = parseFloat(quote.finalPrice) || 0;
                            const totalAmount = ppp * pax;
                            const date = new Date(quote.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            });

                            return (
                                <div key={idx} className="group border border-[#EBEBEB] p-6 rounded-2xl hover:border-[#222222] hover:shadow-airbnb transition-all mb-6 last:mb-0">
                                    <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-3">
                                                <h3 className="text-lg font-bold text-[#222222]">{quote.customerName}</h3>
                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                    quote.status === 'confirmed' ? 'bg-emerald-50 text-[#006A4E]' :
                                                    quote.status === 'sent' ? 'bg-blue-50 text-blue-600' :
                                                    quote.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                    {quote.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-[#717171] font-bold tracking-tight uppercase">
                                                {quote.id.substring(0, 8)} • {date} • {pax} Pax
                                            </p>
                                            <p className="text-sm font-semibold text-[#222222] flex items-center">
                                                {quote.customerPhone}
                                            </p>
                                        </div>
                                        <div className="text-left md:text-right space-y-1">
                                            <p className="text-2xl font-bold text-[#222222]">₹{totalAmount.toLocaleString()}</p>
                                            <p className="text-xs font-bold text-[#006A4E] uppercase tracking-wide">₹{ppp.toLocaleString()} / person</p>
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
                            );
                        })
                    ) : (
                        <div className="py-12 text-center border border-[#EBEBEB] rounded-2xl bg-gray-50/50">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-[#222222] mb-1">No Quotes Found</h3>
                            <p className="text-sm font-medium text-gray-500 mb-6 max-w-sm mx-auto">You haven't generated any quotes yet. Click "Create New Quote" to get started.</p>
                            <Link href="/dashboard/trips">
                                <button className="px-6 py-2.5 bg-[#006A4E] text-white rounded-xl font-bold hover:bg-[#005a42] transition-all text-sm">
                                    Create New Quote
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

