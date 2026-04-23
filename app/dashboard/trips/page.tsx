'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, ArrowRight, Filter, Send } from 'lucide-react';
import Image from 'next/image';

type PricingTier = {
    id: string;
    minPax: number;
    maxPax: number | null;
    pricePerPerson: string;
};

type Trip = {
    id: string;
    code: string;
    title: string;
    region: string;
    destination?: string;
    destinations: string[];
    durationDays: number;
    durationNights: number;
    basePrice: string;
    pdfUrl?: string | null;
    imageUrl?: string | null;
    tripPricing?: PricingTier[];
};

const REGION_IMAGES: Record<string, string[]> = {
    'MUMBAI': ['/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/mum%203.jpg'],
    'MATHERAN': ['/images/catalog/mat%201.jpg', '/images/catalog/mat%203.jpg'],
    'AGRA': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/राज%201.jpg'],
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

const getStartingPrice = (trip: Trip): number => {
    if (!trip.tripPricing || trip.tripPricing.length === 0) return parseFloat(trip.basePrice) || 0;
    const sorted = [...trip.tripPricing].sort((a, b) => a.minPax - b.minPax);
    return parseFloat(sorted[0].pricePerPerson) || 0;
};

export default function TripsPage() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState<string>('All');
    const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

    useEffect(() => { fetchTrips(); }, []);
    const fetchTrips = async () => {
        try {
            const response = await fetch('/api/trips', { cache: 'no-store' });
            const data = await response.json();
            setTrips(data.trips || []);
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    const regions = ['All', ...Array.from(new Set(trips.map(t => t.region || 'Uncategorized')))];
    const filteredTrips = trips.filter(trip => {
        const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) || trip.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = selectedRegion === 'All' || trip.region === selectedRegion;
        return matchesSearch && matchesRegion;
    });

    const getTripImage = (trip: Trip) => {
        if (imgErrors[trip.id]) return REGION_IMAGES['DEFAULT'][0];
        return trip.imageUrl || REGION_IMAGES['DEFAULT'][0];
    };

    return (
        <div className="min-h-screen pb-20">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-[#222222] mb-1">Trip Catalog</h1>
                <p className="text-[#717171] font-medium">Browse and customize exclusive B2B itineraries</p>
            </div>

            <div className="sticky top-24 z-10 bg-white/90 backdrop-blur-md pb-6 pt-2">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="w-full md:flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#717171]" />
                        <input type="text" placeholder="Search trips..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-3 border border-[#EBEBEB] rounded-full focus:outline-none" />
                    </div>
                    <div className="flex overflow-x-auto gap-2 no-scrollbar w-full md:w-auto">
                        {regions.map(region => (
                            <button key={region} onClick={() => setSelectedRegion(region)} className={`px-4 py-2 rounded-full font-bold text-xs border ${selectedRegion === region ? 'bg-[#222222] text-white' : 'bg-white text-[#717171]'}`}>{region}</button>
                        ))}
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006A4E] mx-auto"></div></div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTrips.map((trip) => (
                        <div key={trip.id} className="flex flex-col group border border-[#EBEBEB] rounded-2xl overflow-hidden hover:shadow-lg transition-all bg-white">
                            <Link href={`/dashboard/trips/${trip.id}`} className="flex flex-col">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image src={getTripImage(trip)} alt={trip.title} fill className="object-cover group-hover:scale-105 transition-transform" onError={() => setImgErrors(prev => ({ ...prev, [trip.id]: true }))} />
                                    <div className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 rounded text-[10px] font-black border border-[#EBEBEB]">{trip.code}</div>
                                </div>
                                <div className="p-4 space-y-1">
                                    <h3 className="font-bold text-[#222222] truncate text-base">{trip.title}</h3>
                                    <div className="flex items-center text-[#717171] text-xs font-medium"><MapPin className="w-3 h-3 mr-1" />{trip.region}</div>
                                    <div className="flex items-center text-[#717171] text-xs font-medium"><Calendar className="w-3 h-3 mr-1" />{trip.durationDays}D / {trip.durationNights}N</div>
                                    <div className="pt-2">
                                        <span className="text-[10px] font-bold text-[#717171] uppercase tracking-widest">From</span>
                                        <p className="text-sm font-black text-[#222222]">₹{getStartingPrice(trip).toLocaleString()}/person</p>
                                    </div>
                                </div>
                            </Link>
                            <div className="px-4 pb-4 grid grid-cols-2 gap-2 mt-auto">
                                <Link href={`/dashboard/trips/${trip.id}`} className="flex-1">
                                    <button className="w-full py-2 bg-gray-50 border border-[#EBEBEB] text-[#222222] rounded-lg font-bold text-[10px] uppercase tracking-wider hover:bg-gray-100 transition-all">Details</button>
                                </Link>
                                <Link href={`/dashboard/quotes/new?tripId=${trip.id}`} className="flex-1">
                                    <button className="w-full py-2 bg-[#006A4E] text-white rounded-lg font-bold text-[10px] uppercase tracking-wider hover:bg-[#005a42] transition-all flex items-center justify-center space-x-1">
                                        <Send className="w-3 h-3" />
                                        <span>Quote</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
