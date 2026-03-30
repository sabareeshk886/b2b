'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Users, Star, Check, Download, Send, Info, Clock, Utensils, Hotel, Calculator, FileText, ChevronRight } from 'lucide-react';
import Image from 'next/image';


type PricingTier = {
    id: string;
    minPax: number;
    maxPax: number | null;
    pricePerPerson: string;
    currency: string;
};

type Trip = {
    id: string;
    code: string;
    title: string;
    region: string;
    destination?: string;
    durationDays: number;
    durationNights: number;
    basePrice: string;
    pdfUrl?: string | null;
    imageUrl?: string | null;
    overview?: string;
    highlights?: string[];
    itineraryDays?: any[];
    tripItems?: any[];
    tripPricing?: PricingTier[];
};

export default function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [trip, setTrip] = useState<Trip | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('itinerary');
    const [numPax, setNumPax] = useState(2);
    const [yourMargin, setYourMargin] = useState(5000);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await fetch(`/api/trips/${resolvedParams.id}`);
                const data = await response.json();
                if (data.trip) {
                    setTrip(data.trip);
                } else {
                    const listStats = await fetch('/api/trips');
                    const listData = await listStats.json();
                    const found = listData.trips.find((t: any) => t.id === resolvedParams.id);
                    setTrip(found || null);
                }
            } catch (error) {
                console.error('Error fetching trip:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [resolvedParams.id]);

    // Find the price per person for a given pax count from tripPricing tiers
    const getPriceForPax = (pricingTiers: PricingTier[] | undefined, pax: number): number => {
        if (!pricingTiers || pricingTiers.length === 0) return 0;
        // Sort by minPax
        const sorted = [...pricingTiers].sort((a, b) => a.minPax - b.minPax);
        // Find matching tier: minPax <= pax <= maxPax (or maxPax is null = unlimited)
        const match = sorted.find(tier =>
            pax >= tier.minPax && (tier.maxPax === null || pax <= tier.maxPax)
        );
        if (match) return parseFloat(match.pricePerPerson);
        // Fallback: use last tier (highest pax group)
        return parseFloat(sorted[sorted.length - 1].pricePerPerson);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#222222]"></div>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="text-center py-20 bg-white min-h-screen">
                <h1 className="text-2xl font-bold text-[#222222]">Trip not found</h1>
                <Link href="/dashboard/trips" className="text-[#006A4E] font-bold hover:underline mt-4 inline-block">
                    ← Back to Catalog
                </Link>
            </div>
        );
    }

    // Use tripPricing tiers if available, fall back to basePrice
    const hasPricingTiers = trip.tripPricing && trip.tripPricing.length > 0;
    const pricePerPersonFromTier = hasPricingTiers ? getPriceForPax(trip.tripPricing, numPax) : 0;
    const basePrice = hasPricingTiers ? pricePerPersonFromTier : (parseFloat(trip.basePrice) || 0);
    const isPriceAvailable = basePrice > 0;
    const totalB2BPrice = basePrice * numPax;
    const clientPrice = totalB2BPrice + yourMargin;
    const marginPercentage = totalB2BPrice > 0 ? ((yourMargin / totalB2BPrice) * 100).toFixed(1) : '0.0';

    const hasRealItinerary = (trip.itineraryDays || []).length > 0;
    const displayItinerary = hasRealItinerary ? trip.itineraryDays! : [];

    const inclusions = trip.tripItems?.filter((i: any) => i.type === 'inclusion').map((i: any) => i.item) || ['Premium Accommodation', 'Daily Buffet Breakfast', 'All Transfers in Private AC Vehicle', 'Site Entries & Local Guides'];
    const exclusions = trip.tripItems?.filter((i: any) => i.type === 'exclusion').map((i: any) => i.item) || ['Airfare/Trains', 'Personal Expenses', 'GST 5%', 'TCS as applicable'];

    const getHeroImage = () => {
        if (trip.imageUrl && !trip.imageUrl.includes('unsplash.com/photo-1469854523086')) return trip.imageUrl;
        return 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80';
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                {/* Clean Navigation */}
                <Link
                    href="/dashboard/trips"
                    className="inline-flex items-center space-x-2 text-[#717171] hover:text-[#222222] mb-8 font-bold text-sm transition-colors uppercase tracking-wider"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Catalog</span>
                </Link>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column: Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Header & Hero */}
                        <div className="space-y-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="bg-gray-100 text-[#222222] px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-gray-200">
                                    {trip.code}
                                </span>
                                <span className="bg-[#006A4E]/10 text-[#006A4E] px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-[#006A4E]/20">
                                    Agent Exclusive
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-[#222222] leading-tight">{trip.title}</h1>
                            
                            <div className="flex flex-wrap items-center gap-8 text-[#717171] font-bold text-sm uppercase tracking-wide">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4 text-[#006A4E]" />
                                    <span>{trip.region}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-[#006A4E]" />
                                    <span>{trip.durationDays} Days / {trip.durationNights} Nights</span>
                                </div>
                            </div>

                            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-airbnb group">
                                <Image
                                    src={getHeroImage()}
                                    alt={trip.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Airbnb Style Tabs */}
                        <div className="border-b border-[#EBEBEB] sticky top-0 bg-white z-20 pt-4">
                            <div className="flex space-x-8">
                                {['itinerary', 'overview', 'inclusions', 'brochure'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
                                            activeTab === tab
                                                ? 'text-[#222222]'
                                                : 'text-[#717171] hover:text-[#222222]'
                                        }`}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#222222]" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[400px]">
                            {activeTab === 'brochure' && (
                                <div className="rounded-3xl border border-[#EBEBEB] overflow-hidden bg-gray-50 h-[800px]">
                                    {trip.pdfUrl ? (
                                        <iframe src={trip.pdfUrl} className="w-full h-full" title="Brochure" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                                            <FileText className="w-16 h-16 text-gray-200 mb-4" />
                                            <h3 className="text-xl font-bold text-[#222222]">Digital Brochure Not Available</h3>
                                            <p className="text-[#717171] font-medium max-w-xs mx-auto">Please contact our team for the latest offline itinerary PDF.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'overview' && (
                                <div className="space-y-10 py-4">
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-bold text-[#222222]">The Experience</h2>
                                        <p className="text-lg text-[#717171] leading-relaxed font-medium">
                                            {trip.overview || `Experience an unforgettable journey through ${trip.region}. This carefully curated itinerary ensures you see the best sights while enjoying comfortable accommodations and seamless transfers.`}
                                        </p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {trip.highlights?.map((h: string, i: number) => (
                                            <div key={i} className="flex items-start space-x-4 p-5 rounded-2xl border border-[#EBEBEB] hover:shadow-airbnb transition-all">
                                                <div className="mt-1 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-4 h-4 text-[#006A4E]" />
                                                </div>
                                                <span className="text-[#222222] font-bold text-sm leading-tight">{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'inclusions' && (
                                <div className="grid md:grid-cols-2 gap-10 py-4">
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold text-[#222222] flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                                <Check className="w-5 h-5 text-[#006A4E]" />
                                            </div>
                                            <span>Inclusions</span>
                                        </h3>
                                        <div className="space-y-3">
                                            {inclusions.map((item: string, idx: number) => (
                                                <div key={idx} className="flex items-center space-x-3 text-[#222222] font-medium text-sm">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#006A4E]" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold text-[#222222] flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                                                <Info className="w-5 h-5 text-[#717171]" />
                                            </div>
                                            <span>Exclusions</span>
                                        </h3>
                                        <div className="space-y-3">
                                            {exclusions.map((item: string, idx: number) => (
                                                <div key={idx} className="flex items-center space-x-3 text-[#717171] font-medium text-sm">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'itinerary' && (
                                <div className="py-4">
                                    {hasRealItinerary ? (
                                        <div className="space-y-12">
                                            {displayItinerary.map((day: any, idx: number) => (
                                                <div key={idx} className="group relative pl-12">
                                                    <div className="absolute left-4 top-10 bottom-[-48px] w-0.5 bg-[#EBEBEB] group-last:hidden" />
                                                    <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-[#222222] text-white flex items-center justify-center text-xs font-black shadow-lg z-10">
                                                        {day.day}
                                                    </div>
                                                    <div className="space-y-4">
                                                        <h3 className="text-2xl font-bold text-[#222222]">{day.title}</h3>
                                                        <div className="p-8 rounded-3xl border border-[#EBEBEB] bg-white hover:shadow-airbnb transition-all space-y-6">
                                                            <p className="text-[#717171] leading-relaxed font-medium text-lg">{day.description}</p>
                                                            {day.activities?.length > 0 && (
                                                                <div className="flex flex-wrap gap-3">
                                                                    {day.activities.map((act: string, k: number) => (
                                                                        <span key={k} className="px-3 py-1.5 bg-gray-50 text-[#222222] rounded-lg text-xs font-bold border border-gray-100 uppercase tracking-tighter">
                                                                            {act}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            <div className="flex flex-wrap gap-8 pt-6 border-t border-[#EBEBEB]">
                                                                {day.meals && (
                                                                    <div className="flex items-center space-x-2 text-xs font-black text-[#222222] uppercase tracking-widest">
                                                                        <Utensils className="w-4 h-4 text-orange-500" />
                                                                        <span>{day.meals}</span>
                                                                    </div>
                                                                )}
                                                                {day.accommodation && (
                                                                    <div className="flex items-center space-x-2 text-xs font-black text-[#222222] uppercase tracking-widest">
                                                                        <Hotel className="w-4 h-4 text-blue-500" />
                                                                        <span>{day.accommodation}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 rounded-3xl border-2 border-dashed border-[#EBEBEB] bg-gray-50">
                                            <FileText className="w-10 h-10 text-gray-200" />
                                            <h3 className="text-lg font-bold text-[#222222]">Itinerary Coming Soon</h3>
                                            <p className="text-[#717171] font-medium text-sm max-w-xs">Day-by-day details are being added. View the full brochure PDF for now.</p>
                                            {trip.pdfUrl && (
                                                <button
                                                    onClick={() => setActiveTab('brochure')}
                                                    className="mt-2 px-5 py-2.5 bg-[#222222] text-white text-xs font-black rounded-xl uppercase tracking-widest hover:bg-black transition-all"
                                                >
                                                    View Brochure
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Right Column: Pricing Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white border border-[#EBEBEB] rounded-3xl p-8 shadow-airbnb space-y-6">
                            {/* Header price block */}
                            <div>
                                <h3 className="text-xs font-black text-[#717171] uppercase tracking-[0.2em] mb-3">Net B2B Rate</h3>
                                {isPriceAvailable ? (
                                    <div className="space-y-2">
                                        <div className="flex items-baseline space-x-2">
                                            <span className="text-4xl font-black text-[#222222]">₹{basePrice.toLocaleString()}</span>
                                            <span className="text-sm font-bold text-[#717171]">/ person</span>
                                        </div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <div className="inline-flex items-center px-2 py-1 bg-emerald-50 text-[#006A4E] text-[10px] font-black rounded uppercase tracking-widest">
                                                For {numPax} Pax
                                            </div>
                                            <span className="text-sm font-black text-[#717171]">Total Net: <span className="text-[#222222]">₹{totalB2BPrice.toLocaleString()}</span></span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-2xl font-black text-orange-500">Price on Request</p>
                                )}
                            </div>

                            {/* Pricing Tiers Table */}
                            {hasPricingTiers && trip.tripPricing && trip.tripPricing.length > 0 && (
                                <div className="rounded-2xl border border-[#EBEBEB] overflow-hidden">
                                    <div className="bg-gray-50 px-4 py-2 border-b border-[#EBEBEB]">
                                        <span className="text-[10px] font-black text-[#717171] uppercase tracking-widest">Pax-Based Pricing</span>
                                    </div>
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-[#EBEBEB]">
                                                <th className="text-left px-4 py-2 text-[10px] font-black text-[#717171] uppercase tracking-widest">Pax</th>
                                                <th className="text-right px-4 py-2 text-[10px] font-black text-[#717171] uppercase tracking-widest">Per Person</th>
                                                <th className="text-right px-4 py-2 text-[10px] font-black text-[#717171] uppercase tracking-widest">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...trip.tripPricing].sort((a, b) => a.minPax - b.minPax).map((tier, idx) => {
                                                const midPax = tier.maxPax ? Math.ceil((tier.minPax + tier.maxPax) / 2) : tier.minPax;
                                                const isActive = numPax >= tier.minPax && (tier.maxPax === null || numPax <= tier.maxPax);
                                                const ppp = parseFloat(tier.pricePerPerson);
                                                return (
                                                    <tr key={idx} className={`border-b border-[#EBEBEB] last:border-0 transition-colors ${isActive ? 'bg-emerald-50' : 'hover:bg-gray-50'}`}>
                                                        <td className="px-4 py-2.5 font-bold text-[#222222]">
                                                            {tier.maxPax ? `${tier.minPax}–${tier.maxPax}` : `${tier.minPax}+`}
                                                            {isActive && <span className="ml-1.5 text-[9px] text-[#006A4E] font-black uppercase">✓ Active</span>}
                                                        </td>
                                                        <td className="px-4 py-2.5 text-right font-black text-[#222222]">₹{ppp.toLocaleString()}</td>
                                                        <td className="px-4 py-2.5 text-right font-bold text-[#717171]">₹{(ppp * numPax).toLocaleString()}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Margin Calculator Tool */}
                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-black text-[#222222] uppercase tracking-tighter">Margin Tool</span>
                                    <Calculator className="w-4 h-4 text-[#717171]" />
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-[#717171] uppercase tracking-widest">Passenger Count</label>
                                        <select 
                                            value={numPax}
                                            onChange={(e) => setNumPax(Number(e.target.value))}
                                            className="w-full bg-white border border-[#EBEBEB] px-4 py-3 rounded-xl font-bold text-[#222222] focus:outline-none focus:border-[#222222]"
                                        >
                                            {[1,2,3,4,5,6,8,10,12,15,20].map(n => <option key={n} value={n}>{n} Pax</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[10px] font-black text-[#717171] uppercase tracking-widest">Your Markup (₹)</label>
                                            <span className="text-[10px] font-black text-[#006A4E]">{marginPercentage}%</span>
                                        </div>
                                        <input 
                                            type="number"
                                            value={yourMargin}
                                            onChange={(e) => setYourMargin(Number(e.target.value))}
                                            className="w-full bg-white border border-[#EBEBEB] px-4 py-3 rounded-xl font-bold text-[#222222] focus:outline-none focus:border-[#222222]"
                                        />
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-200 space-y-1">
                                    {isPriceAvailable && (
                                        <div className="flex justify-between text-xs font-bold text-[#717171]">
                                            <span>Net B2B ({numPax} pax)</span>
                                            <span>₹{totalB2BPrice.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-baseline">
                                        <p className="text-[10px] font-black text-[#717171] uppercase tracking-widest">Final Client Price</p>
                                        <p className="text-2xl font-black text-[#222222]">₹{isPriceAvailable ? clientPrice.toLocaleString() : yourMargin.toLocaleString()}</p>
                                    </div>
                                    {isPriceAvailable && numPax > 1 && (
                                        <p className="text-[10px] text-[#717171] font-bold text-right">
                                            ₹{Math.round(clientPrice / numPax).toLocaleString()} / person
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full h-14 bg-[#222222] text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center space-x-3 shadow-md active:scale-95">
                                    <Send className="w-5 h-5" />
                                    <span>Share Quote</span>
                                </button>
                                {trip.pdfUrl && (
                                    <button 
                                        onClick={() => window.open(trip.pdfUrl!, '_blank')}
                                        className="w-full h-14 border border-[#222222] text-[#222222] rounded-xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center space-x-3"
                                    >
                                        <Download className="w-5 h-5" />
                                        <span>Download PDF</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

