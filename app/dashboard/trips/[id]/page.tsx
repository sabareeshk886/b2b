'use client';

import { useState, useEffect } from 'react';
import { 
    Check, 
    Info, 
    Utensils, 
    Hotel, 
    FileText, 
    Download, 
    Send, 
    Users, 
    Calculator,
    ChevronRight,
    MapPin,
    Calendar,
    Clock,
} from 'lucide-react';
import { db } from '@/db';
import { trips, itineraryDays, tripItems, tripPricing } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import Link from 'next/link';
import { createQuote } from '@/app/actions/quotes';
import { toast } from 'sonner';

export default function TripDetailPage({ params }: { params: any }) {
    const [trip, setTrip] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('itinerary');
    const [numPax, setNumPax] = useState(2);
    const [yourMargin, setYourMargin] = useState(5000);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [travelDate, setTravelDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (trip?.tripPricing?.length > 0) {
            const minAllowed = Math.min(...trip.tripPricing.map((t: any) => t.minPax));
            setNumPax(prev => (prev < minAllowed && prev === 2) ? minAllowed : prev);
        }
    }, [trip]);

    const generatedPaxOptions = Array.from(new Set([
        1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20,
        ...(trip?.tripPricing?.map((p: any) => p.minPax) || [])
    ])).sort((a, b) => a - b);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const unwrappedParams = await params;
                const id = unwrappedParams.id;
                const response = await fetch(`/api/trips/${id}`);
                const data = await response.json();
                if (data.trip) setTrip(data.trip);
            } catch (error) {
                console.error('Error fetching trip:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrip();
    }, [params]);

    if (loading) return <div className="p-8 text-center">Loading trip details...</div>;
    if (!trip) return <div className="p-8 text-center text-red-500">Trip not found</div>;

    const basePrice = trip.tripPricing?.find((t: any) => numPax >= t.minPax && (t.maxPax === null || numPax <= t.maxPax))?.pricePerPerson || 0;
    const ppp = parseFloat(basePrice);
    const isPriceAvailable = ppp > 0;
    const totalB2BPrice = ppp * numPax;
    const clientPrice = (ppp + yourMargin) * numPax;
    const marginPercentage = ppp > 0 ? Math.round((yourMargin / ppp) * 100) : 0;

    const inclusions = trip.tripItems?.filter((i: any) => i.type === 'inclusion').map((i: any) => i.content) || [];
    const exclusions = trip.tripItems?.filter((i: any) => i.type === 'exclusion').map((i: any) => i.content) || [];

    const hasPricingTiers = trip.tripPricing && trip.tripPricing.length > 0;
    const hasRealItinerary = trip.itineraryDays && trip.itineraryDays.length > 0;

    // Use seeded itinerary or fallback
    const displayItinerary = hasRealItinerary ? trip.itineraryDays : [];

    const handleShareQuote = async () => {
        if (!customerPhone || !travelDate) {
            toast.error('Please enter customer phone and travel date');
            return;
        }

        setIsSaving(true);
        const companyName = typeof window !== 'undefined' ? localStorage.getItem('companyName') || 'g holidays' : 'g holidays';
        
        try {
            // 1. Save Quote to DB
            const result = await createQuote({
                customerName: customerName || 'Customer',
                customerPhone,
                tripId: trip.id,
                pax: numPax,
                travelDate,
                basePrice: ppp,
                finalPrice: clientPrice / numPax,
                companyName: companyName
            });

            if (result.error) {
                toast.error(result.error);
                return;
            }

            // 2. Clear status and notify
            toast.success('Quote saved and ready to share!');

            // 3. Prepare WhatsApp Message
            const tripTheme = trip.category || trip.region || 'Premium';
            const tripDuration = trip.durationDays ? `${trip.durationDays} Days / ${trip.durationNights || trip.durationDays - 1} Nights` : 'Custom';
            const cleanBrochureUrl = `${window.location.origin}/brochure/${trip.code}`;
            
            const text = `Hello ${customerName ? customerName : ''},\n\nHere is the itinerary quote for your upcoming trip.\n\nItinerary: ${trip.title}\nTheme: ${tripTheme}\nDuration: ${tripDuration}\nTravel Date: ${travelDate}\nPassengers: ${numPax}\n\nPrice Per Person: ₹${Math.round(clientPrice/numPax).toLocaleString()}${trip.pdfUrl ? `\n\n📄 View Full Brochure: ${cleanBrochureUrl}` : ''}\n\nRegards,\n${companyName}`;
            
            try {
                await navigator.clipboard.writeText(text);
            } catch (err) {
                console.error('Failed to copy text', err);
            }
            
            window.open(`https://wa.me/${customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
        } catch (error) {
            console.error('Error in sharing quote:', error);
            toast.error('Failed to save or share quote');
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = ['itinerary', 'overview', 'inclusions', 'brochure'];

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header / Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm font-bold text-[#717171] uppercase tracking-widest">
                <Link href="/dashboard/trips" className="hover:text-[#222222] transition-colors">Catalog</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-[#222222]">{trip.code}</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Left Column: Content */}
                <div className="lg:col-span-2 space-y-10">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-4xl font-black text-[#222222] tracking-tighter">{trip.title}</h1>
                            <span className="px-4 py-1.5 bg-[#222222] text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                                {trip.category || trip.region || 'Premium'}
                            </span>
                        </div>
                        <div className="flex items-center space-x-6 text-[#717171] font-bold text-sm">
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4" />
                                <span>{trip.region}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>{trip.durationDays || trip.duration} Days</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Banner Image */}
                    <div className="relative aspect-[16/7] rounded-3xl overflow-hidden border border-[#EBEBEB] group shadow-xl">
                        <img 
                            src={trip.imageUrl || '/images/catalog/del%201.jpg'} 
                            alt={trip.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Tabs Navigation */}
                    <div className="space-y-8">
                        <div className="border-b border-[#EBEBEB]">
                            <div className="flex space-x-12">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 text-xs font-black uppercase tracking-[0.2em] relative transition-colors ${
                                            activeTab === tab ? 'text-[#222222]' : 'text-[#717171] hover:text-[#222222]'
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
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 border border-[#EBEBEB] rounded-2xl">
                                        <div className="flex items-center space-x-3">
                                            <FileText className="w-5 h-5 text-[#222222]" />
                                            <span className="text-sm font-bold text-[#222222]">Digital Itinerary Brochure</span>
                                        </div>
                                        {trip.pdfUrl && (
                                            <a 
                                                href={trip.pdfUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                download
                                                className="flex items-center space-x-2 px-4 py-2 bg-[#222222] text-white text-xs font-black rounded-lg uppercase tracking-widest hover:bg-black transition-all"
                                            >
                                                <Download className="w-4 h-4" />
                                                <span>Download Now</span>
                                            </a>
                                        )}
                                    </div>
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
                                            <span className="text-4xl font-black text-[#222222]">₹{ppp.toLocaleString()}</span>
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
                                                const isActive = numPax >= tier.minPax && (tier.maxPax === null || numPax <= tier.maxPax);
                                                const pricePerPerson = parseFloat(tier.pricePerPerson);
                                                return (
                                                    <tr key={idx} className={`border-b border-[#EBEBEB] last:border-0 transition-colors ${isActive ? 'bg-emerald-50' : 'hover:bg-gray-50'}`}>
                                                        <td className="px-4 py-2.5 font-bold text-[#222222]">
                                                            {tier.maxPax ? `${tier.minPax}–${tier.maxPax}` : `${tier.minPax}+`}
                                                            {isActive && <span className="ml-1.5 text-[9px] text-[#006A4E] font-black uppercase">✓ Active</span>}
                                                        </td>
                                                        <td className="px-4 py-2.5 text-right font-black text-[#222222]">₹{pricePerPerson.toLocaleString()}</td>
                                                        <td className="px-4 py-2.5 text-right font-bold text-[#717171]">₹{(pricePerPerson * tier.minPax).toLocaleString()}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Margin & Customer Tool */}
                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-black text-[#222222] uppercase tracking-tighter">Quote Setup</span>
                                    <Calculator className="w-4 h-4 text-[#717171]" />
                                </div>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-[#717171] uppercase tracking-widest">Passenger Count</label>
                                            <select 
                                                value={numPax}
                                                onChange={(e) => setNumPax(Number(e.target.value))}
                                                className="w-full bg-white border border-[#EBEBEB] px-3 py-2.5 rounded-xl font-bold text-[#222222] text-sm focus:outline-none focus:border-[#222222]"
                                            >
                                                {generatedPaxOptions.map((n: number) => <option key={n} value={n}>{n} Pax</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[10px] font-black text-[#717171] uppercase tracking-widest">Markup (₹)</label>
                                            </div>
                                            <input 
                                                type="number"
                                                value={yourMargin}
                                                onChange={(e) => setYourMargin(Number(e.target.value))}
                                                className="w-full bg-white border border-[#EBEBEB] px-3 py-2.5 rounded-xl font-bold text-[#222222] text-sm focus:outline-none focus:border-[#222222]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-[#717171] uppercase tracking-widest">Customer Name</label>
                                        <input 
                                            type="text"
                                            placeholder="Enter customer name"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            className="w-full bg-white border border-[#EBEBEB] px-4 py-2.5 rounded-xl font-bold text-[#222222] text-sm focus:outline-none focus:border-[#222222]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-[#717171] uppercase tracking-widest">Phone Number</label>
                                            <input 
                                                type="tel"
                                                placeholder="9876543210"
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                className="w-full bg-white border border-[#EBEBEB] px-4 py-2.5 rounded-xl font-bold text-[#222222] text-sm focus:outline-none focus:border-[#222222]"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-[#717171] uppercase tracking-widest">Travel Date</label>
                                            <input 
                                                type="date"
                                                value={travelDate}
                                                onChange={(e) => setTravelDate(e.target.value)}
                                                className="w-full bg-white border border-[#EBEBEB] px-4 py-2.5 rounded-xl font-bold text-[#222222] text-sm focus:outline-none focus:border-[#222222]"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-200 space-y-1">
                                    {isPriceAvailable && (
                                        <div className="flex justify-between text-[10px] font-bold text-[#717171] mb-1">
                                            <span>Net B2B (per pax)</span>
                                            <span>₹{ppp.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-baseline">
                                        <p className="text-[10px] font-black text-[#717171] uppercase tracking-widest">Final Client Price</p>
                                        <p className="text-xl font-black text-[#222222]">
                                            {isPriceAvailable 
                                                ? `₹${Math.round(clientPrice / numPax).toLocaleString()}` 
                                                : `Base + ₹${Math.round(yourMargin).toLocaleString()}`}
                                            <span className="text-xs font-bold text-[#717171] ml-1">/ person</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Link 
                                    href={`/dashboard/quotes/new?tripId=${trip.id}&pax=${numPax}&margin=${yourMargin}`}
                                    className="block"
                                >
                                    <button 
                                        className="w-full h-14 bg-[#006A4E] text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#005a42] transition-all flex items-center justify-center space-x-3 shadow-md active:scale-95"
                                    >
                                        <Send className="w-5 h-5" />
                                        <span>Create Quote</span>
                                    </button>
                                </Link>
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
