'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
    Calculator, 
    Send, 
    Calendar, 
    Users, 
    User, 
    Phone, 
    Search,
    MapPin,
    ArrowLeft,
    Check,
    ChevronDown
} from 'lucide-react';
import { createQuote } from '@/app/actions/quotes';
import { toast } from 'sonner';

function NewQuoteForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tripIdFromQuery = searchParams.get('tripId');

    const [trips, setTrips] = useState<any[]>([]);
    const [selectedTrip, setSelectedTrip] = useState<any>(null);
    const [loadingTrips, setLoadingTrips] = useState(true);
    const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
    
    const [numPax, setNumPax] = useState(2);
    const [yourMargin, setYourMargin] = useState(5000);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [travelDate, setTravelDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [showTripSelector, setShowTripSelector] = useState(!tripIdFromQuery);

    useEffect(() => {
        async function fetchTrips() {
            try {
                const response = await fetch('/api/trips');
                const data = await response.json();
                setTrips(data.trips || []);
                
                if (tripIdFromQuery) {
                    const trip = data.trips.find((t: any) => t.id === tripIdFromQuery);
                    if (trip) {
                        setSelectedTrip(trip);
                        setShowTripSelector(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching trips:', error);
            } finally {
                setLoadingTrips(false);
            }
        }
        fetchTrips();
    }, [tripIdFromQuery]);
    const REGION_IMAGES: Record<string, string[]> = {
        'MUMBAI': ['/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/mum%203.jpg'],
        'MATHERAN': ['/images/catalog/mat%201.jpg', '/images/catalog/mat%203.jpg'],
        'AGRA': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg'],
        'RAJASTHAN': ['/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/raj%203.jpg'],
        'PUNJAB': ['/images/catalog/amr%201.jpg', '/images/catalog/amr%202.jpg'],
        'CHENNAI': ['/images/catalog/chn%201.jpg', '/images/catalog/chn%202.jpg'],
        'DELHI': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/del%203.jpg'],
        'KASOL': ['/images/catalog/ksl%201.jpg', '/images/catalog/ksl%202.jpg'],
        'MANALI': ['/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg', '/images/catalog/man%203.jpg'],
        'KERALA': ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80'],
        'HIMACHAL': ['/images/catalog/man%201.jpg'],
        'KASHMIR': ['https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80'],
        'GOA': ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80'],
        'DUBAI': ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80'],
        'BALI': ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80'],
        'DEFAULT': ['https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80']
    };

    const getFallbackImage = (trip: any) => {
        const seedStr = trip.id || trip.code;
        const hashVal = seedStr.split('').reduce((acc: number, char: string) => (((acc << 5) - acc) + char.charCodeAt(0)) | 0, 0);
        const hash = Math.abs(hashVal);
        const text = (trip.title + ' ' + trip.region + ' ' + (trip.destinations?.join(' ') || '')).toUpperCase();
        
        let category = 'DEFAULT';
        if (text.includes('DUBAI')) category = 'DUBAI';
        else if (text.includes('BALI')) category = 'BALI';
        else if (text.includes('THAI')) category = 'THAI';
        else if (text.includes('MALDIVES')) category = 'MALDIVES';
        else if (text.includes('VIETNAM')) category = 'VIETNAM';
        else if (text.includes('SINGAPORE')) category = 'SINGAPORE';
        else if (text.includes('EUROPE')) category = 'EUROPE';
        else if (text.includes('KASHMIR')) category = 'KASHMIR';
        else if (text.includes('MANALI')) category = 'MANALI';
        else if (text.includes('KASOL')) category = 'KASOL';
        else if (text.includes('ANDAMAN')) category = 'ANDAMAN';
        else if (text.includes('GOA')) category = 'GOA';
        else if (text.includes('KERALA')) category = 'KERALA';
        else if (text.includes('RAJASTHAN')) category = 'RAJASTHAN';
        else if (text.includes('PUNJAB')) category = 'PUNJAB';
        else if (text.includes('CHENNAI')) category = 'CHENNAI';
        else if (text.includes('AGRA')) category = 'AGRA';
        else if (text.includes('DELHI')) category = 'DELHI';
        else if (text.includes('NORTH')) category = 'NORTH';
        else if (text.includes('AGR')) category = 'NORTH';

        const pool = REGION_IMAGES[category] || REGION_IMAGES['DEFAULT'];
        return pool[hash % pool.length];
    }

    const getTripImage = (trip: any) => {
        if (imgErrors[trip.id]) return getFallbackImage(trip);
        return trip.imageUrl || getFallbackImage(trip);
    };

    const filteredTrips = trips.filter(trip => 
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getCurrentTierPrice = () => {
        if (!selectedTrip || !selectedTrip.tripPricing) return 0;
        const tier = selectedTrip.tripPricing.find((t: any) => numPax >= t.minPax && (t.maxPax === null || numPax <= t.maxPax));
        return parseFloat(tier?.pricePerPerson || selectedTrip.basePrice || 0);
    };

    const ppp = getCurrentTierPrice();
    const clientPricePerPerson = ppp + yourMargin;
    const totalAmount = clientPricePerPerson * numPax;

    const handleCreateQuote = async () => {
        if (!selectedTrip) {
            toast.error('Please select a trip first');
            return;
        }
        if (!customerPhone || !travelDate) {
            toast.error('Please enter customer phone and travel date');
            return;
        }

        setIsSaving(true);
        const companyName = typeof window !== 'undefined' ? localStorage.getItem('companyName') || 'g holidays' : 'g holidays';
        
        try {
            const result = await createQuote({
                customerName: customerName || 'Customer',
                customerPhone,
                tripId: selectedTrip.id,
                pax: numPax,
                travelDate,
                basePrice: ppp,
                finalPrice: clientPricePerPerson,
                companyName: companyName
            });

            if (result.error) {
                toast.error(result.error);
                return;
            }

            toast.success('Quote created successfully!');

            // WhatsApp Share
            const tripTheme = selectedTrip.category || selectedTrip.region || 'Premium';
            const cleanBrochureUrl = `${window.location.origin}/brochure/${selectedTrip.code}`;
            const text = `Hello ${customerName ? customerName : ''},\n\nHere is the itinerary quote for your upcoming trip.\n\nItinerary: ${selectedTrip.title}\nTheme: ${tripTheme}\nTravel Date: ${travelDate}\nPassengers: ${numPax}\n\nPrice Per Person: ₹${Math.round(clientPricePerPerson).toLocaleString()}${selectedTrip.pdfUrl ? `\n\n📄 View Full Brochure: ${cleanBrochureUrl}` : ''}\n\nRegards,\n${companyName}`;
            
            try { await navigator.clipboard.writeText(text); } catch (err) {}
            window.open(`https://wa.me/${customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');

            // Redirect to Quotes List
            router.push('/dashboard/quotes');
        } catch (error) {
            console.error('Error creating quote:', error);
            toast.error('Failed to create quote');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center text-sm font-bold text-[#717171] hover:text-[#222222] transition-colors mb-4 group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </button>
                    <h1 className="text-3xl font-black text-[#222222] tracking-tight">Create New Quote</h1>
                    <p className="text-[#717171] font-medium">Configure and share a personalized trip itinerary</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-10">
                {/* Left Column: Trip Selection & Form */}
                <div className="lg:col-span-3 space-y-8">
                    
                    {/* Trip Selection Card */}
                    <div className="bg-white border border-[#EBEBEB] rounded-3xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-[#EBEBEB] bg-gray-50 flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl bg-white border border-[#EBEBEB] flex items-center justify-center shadow-sm">
                                    <MapPin className="w-5 h-5 text-[#222222]" />
                                </div>
                                <h2 className="font-black text-[#222222] uppercase tracking-tight">1. Select Itinerary</h2>
                            </div>
                            {selectedTrip && (
                                <button 
                                    onClick={() => setShowTripSelector(!showTripSelector)}
                                    className="text-xs font-black text-[#006A4E] uppercase hover:underline"
                                >
                                    {showTripSelector ? 'Close' : 'Change Trip'}
                                </button>
                            )}
                        </div>

                        {showTripSelector ? (
                            <div className="p-6 space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#717171]" />
                                    <input 
                                        type="text" 
                                        placeholder="Search trips by name or region..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 border border-[#EBEBEB] rounded-2xl focus:outline-none focus:border-[#222222] text-sm"
                                    />
                                </div>
                                <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                                    {loadingTrips ? (
                                        <div className="py-10 text-center text-[#717171] font-medium">Loading catalog...</div>
                                    ) : filteredTrips.map(trip => (
                                        <div 
                                            key={trip.id}
                                            onClick={() => { setSelectedTrip(trip); setShowTripSelector(false); }}
                                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center space-x-4 ${
                                                selectedTrip?.id === trip.id ? 'border-[#222222] bg-gray-50 shadow-md' : 'border-[#EBEBEB] hover:border-[#222222] hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="w-16 h-16 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
                                                <img 
                                                    src={getTripImage(trip)} 
                                                    className="w-full h-full object-cover" 
                                                    onError={() => setImgErrors(prev => ({ ...prev, [trip.id]: true }))}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-[#222222] truncate">{trip.title}</h3>
                                                <p className="text-xs text-[#717171] font-medium">{trip.region} • {trip.durationDays} Days</p>
                                            </div>
                                            {selectedTrip?.id === trip.id && <Check className="w-5 h-5 text-[#006A4E]" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : selectedTrip && (
                            <div className="p-6 bg-[#222222] text-white flex items-center space-x-6">
                                <div className="w-20 h-20 rounded-2xl bg-white/10 overflow-hidden border border-white/20">
                                    <img 
                                        src={getTripImage(selectedTrip)} 
                                        className="w-full h-full object-cover" 
                                        onError={() => setImgErrors(prev => ({ ...prev, [selectedTrip.id]: true }))}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold tracking-tight">{selectedTrip.title}</h3>
                                    <p className="text-sm text-gray-400 font-medium">{selectedTrip.region} • {selectedTrip.durationDays}D / {selectedTrip.durationNights}N</p>
                                    <div className="mt-2 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-white/20 rounded inline-block">
                                        {selectedTrip.code}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Customer Configuration */}
                    <div className="bg-white border border-[#EBEBEB] rounded-3xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-[#EBEBEB] bg-gray-50">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl bg-white border border-[#EBEBEB] flex items-center justify-center shadow-sm">
                                    <Users className="w-5 h-5 text-[#222222]" />
                                </div>
                                <h2 className="font-black text-[#222222] uppercase tracking-tight">2. Quote Configuration</h2>
                            </div>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="space-y-4">
                                <label className="flex items-center text-xs font-black text-[#717171] uppercase tracking-[0.2em]">
                                    <User className="w-4 h-4 mr-2" />
                                    Customer Details
                                </label>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-[#222222] uppercase tracking-widest pl-1">Full Name</p>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Jane Doe"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            className="w-full px-5 py-3.5 border border-[#EBEBEB] rounded-2xl focus:outline-none focus:border-[#222222] font-semibold text-[#222222]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-[#222222] uppercase tracking-widest pl-1">Contact Number</p>
                                        <div className="relative">
                                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input 
                                                type="tel" 
                                                placeholder="9123456789"
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                className="w-full pl-12 pr-5 py-3.5 border border-[#EBEBEB] rounded-2xl focus:outline-none focus:border-[#222222] font-semibold text-[#222222]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 border-t border-gray-100 pt-8">
                                <label className="flex items-center text-xs font-black text-[#717171] uppercase tracking-[0.2em]">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Travel Logistics
                                </label>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-[#222222] uppercase tracking-widest pl-1">Preferred Start Date</p>
                                        <input 
                                            type="date"
                                            value={travelDate}
                                            onChange={(e) => setTravelDate(e.target.value)}
                                            className="w-full px-5 py-3.5 border border-[#EBEBEB] rounded-2xl focus:outline-none focus:border-[#222222] font-semibold text-[#222222] cursor-pointer"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-[#222222] uppercase tracking-widest pl-1">Total Passengers</p>
                                        <div className="relative">
                                            <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <select 
                                                value={numPax}
                                                onChange={(e) => setNumPax(Number(e.target.value))}
                                                className="w-full pl-12 pr-5 py-3.5 border border-[#EBEBEB] rounded-2xl focus:outline-none focus:border-[#222222] font-bold text-[#222222] appearance-none cursor-pointer"
                                            >
                                                {[1,2,3,4,5,6,8,10,12,15,20,25,30,40,50].map(n => <option key={n} value={n}>{n} Pax</option>)}
                                            </select>
                                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Pricing Summary & Actions */}
                <div className="lg:col-span-2">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-white border-2 border-[#222222] rounded-[32px] p-8 shadow-airbnb relative overflow-hidden">
                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-black text-[#222222] uppercase tracking-widest">Pricing Summary</h3>
                                    <Calculator className="w-5 h-5 text-[#222222]" />
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-[#717171] uppercase">Base B2B Price</span>
                                            <span className="text-lg font-black text-[#222222]">₹{ppp.toLocaleString()}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[10px] font-black text-[#717171] uppercase tracking-widest pl-1">Your Markup (per pax)</label>
                                            </div>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#222222]">₹</span>
                                                <input 
                                                    type="number"
                                                    value={yourMargin}
                                                    onChange={(e) => setYourMargin(Number(e.target.value))}
                                                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#EBEBEB] rounded-xl font-bold text-[#222222] focus:outline-none focus:border-[#222222]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <div className="flex justify-between items-end mb-2">
                                            <div>
                                                <p className="text-[10px] font-black text-[#717171] uppercase tracking-[0.2em] mb-1">Total Client Price</p>
                                                <p className="text-4xl font-black text-[#222222]">₹{totalAmount.toLocaleString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-[#006A4E] uppercase tracking-widest">Estimated Margin</p>
                                                <p className="text-xl font-black text-[#006A4E]">₹{(yourMargin * numPax).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="w-full h-1 bg-emerald-500 rounded-full" />
                                        <p className="text-center mt-4 text-[10px] font-black text-[#717171] uppercase tracking-widest">
                                            ₹{Math.round(clientPricePerPerson).toLocaleString()} per person for {numPax} passengers
                                        </p>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleCreateQuote}
                                    disabled={isSaving || !selectedTrip}
                                    className="w-full h-16 bg-[#006A4E] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#005a42] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-3 shadow-xl active:scale-95 mt-4"
                                >
                                    {isSaving ? (
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Send className="w-5 h-5" />
                                    )}
                                    <span>{isSaving ? 'Saving Quote...' : 'Confirm & Share Quote'}</span>
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        </div>

                        <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 flex items-start space-x-4">
                            <ArrowLeft className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                            <p className="text-xs text-orange-800 font-medium leading-relaxed">
                                Creating a quote will save it to your dashboard and immediately open WhatsApp. You can find all prepared quotes in the <strong>My Quotes</strong> section.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function NewQuotePage() {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading form...</div>}>
            <NewQuoteForm />
        </Suspense>
    );
}
