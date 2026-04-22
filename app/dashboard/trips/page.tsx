'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, ArrowRight, Filter } from 'lucide-react';
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

// Curated Image Pool for Variety & Relevance
const REGION_IMAGES: Record<string, string[]> = {
    'MUMBAI': [
        '/images/catalog/mum%201.jpg',
        '/images/catalog/mum%202.jpg',
        '/images/catalog/mum%203.jpg',
        '/images/catalog/mum%204.jpg',
        '/images/catalog/mum%205.jpg',
        '/images/catalog/mum%206.jpg',
        '/images/catalog/mum%207.jpg',
    ],
    'MATHERAN': [
        '/images/catalog/mat%201.jpg',
        '/images/catalog/mat%203.jpg',
        '/images/catalog/mat%204.jpg',
        '/images/catalog/mat%205.jpg',
        '/images/catalog/mat%206.jpg',
        '/images/catalog/mat%207.jpg',
        '/images/catalog/mat%209.jpg',
        '/images/catalog/mat%2010.jpg',
        '/images/catalog/mat.jpg',
    ],
    'AGRA': [
        '/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/del%203.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg',
    ],
    'RAJASTHAN': [
        '/images/catalog/raj%201.jpg',
        '/images/catalog/raj%202.jpg',
        '/images/catalog/raj%203.jpg',
        '/images/catalog/raj%204.jpg',
        '/images/catalog/raj%201.jpg', // Replaced 5 (suspect)
        '/images/catalog/raj%206.jpg',
        '/images/catalog/raj%207.jpg',
        '/images/catalog/raj%208.jpg',
        '/images/catalog/raj%202.jpg', // Replaced 9 (too large - 10MB)
        '/images/catalog/raj%2010.jpg',
    ],
    'PUNJAB': [ // Amritsar etc
        '/images/catalog/amr%201.jpg',
        '/images/catalog/amr%202.jpg',
        '/images/catalog/amr%203.jpg',
        '/images/catalog/amr%204.jpg',
        '/images/catalog/amr%205.jpg',
        '/images/catalog/amr%206.jpg',
    ],
    'CHENNAI': [
        '/images/catalog/chn%201.jpg',
        '/images/catalog/chn%202.jpg',
        '/images/catalog/chn%203.jpg',
        '/images/catalog/chn%204.jpg',
    ],
    'DELHI': [
        '/images/catalog/del%201.jpg',
        '/images/catalog/del%202.jpg',
        '/images/catalog/del%203.jpg',
        '/images/catalog/del%204.jpg',
        '/images/catalog/del%205.jpg',
    ],
    'KASOL': [ // Kasol / Himachal
        '/images/catalog/ksl%201.jpg',
        '/images/catalog/ksl%202.jpg',
        '/images/catalog/ksl%203.jpg',
        '/images/catalog/ksl%204.jpg',
    ],
    'MANALI': [
        '/images/catalog/man%201.jpg',
        '/images/catalog/man%202.jpg',
        '/images/catalog/man%203.jpg',
        '/images/catalog/man%204.jpg',
        '/images/catalog/man%205.jpg',
        '/images/catalog/man%206.jpg',
        '/images/catalog/man%207.jpg',
        '/images/catalog/man%208.jpg',
        '/images/catalog/man%209.jpg',
        '/images/catalog/man%2010.jpg',
        '/images/catalog/man%2011.jpg',
    ],
    'KERALA': [
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80', // Backwaters
        'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80', // Houseboat
        'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80', // Munnar
        'https://images.unsplash.com/photo-1590623696884-2454a32fa123?w=800&q=80', // Kathakali
        'https://images.unsplash.com/photo-1583259974246-880946b2cb9e?w=800&q=80', // Coconut trees
    ],
    'HIMACHAL': [
        // Fallback for general Himachal if not specifically Manali/Kasol
        '/images/catalog/man 1.jpg',
        '/images/catalog/ksl 1.jpg',
        'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80', // Snow
        'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=800&q=80', // Valley
    ],
    'KASHMIR': [
        'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80', // Dal Lake
        'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80', // Shikara
        'https://images.unsplash.com/photo-1627916560081-37d45df15ce2?w=800&q=80', // Gulmarg
    ],
    'ANDAMAN': [
        'https://images.unsplash.com/photo-1589136815367-15ae2794ca7d?w=800&q=80', // Beach
        'https://images.unsplash.com/photo-1550951666-ac15eb89c7ba?w=800&q=80', // Havelock
    ],
    'SOUTH': [ // Tamil Nadu, Karnataka
        'https://images.unsplash.com/photo-1582510003544-5292b399252c?w=800&q=80', // Temple
        'https://images.unsplash.com/photo-1621245089209-663806a6c4b2?w=800&q=80', // Hampi
        'https://images.unsplash.com/photo-1600100598655-63529d469733?w=800&q=80', // Mysore Palace
    ],
    'GOA': [
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80', // Beach
        'https://images.unsplash.com/photo-1540206395-688085723adb?w=800&q=80', // Palm trees
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', // Ocean
    ],
    'NORTH': [
        '/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/del%203.jpg', '/images/catalog/del%204.jpg', '/images/catalog/del%205.jpg',
    ],
    // International & New Categories
    'DUBAI': [
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', // Burj Khalifa
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80', // Dubai Marina
        'https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&q=80', // Desert Safari
    ],
    'BALI': [
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', // Rice Terraces
        'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80', // Temple
        'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80', // Bali Beach
    ],
    'MALDIVES': [
        'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', // Overwater Villa
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80', // Blue Ocean
    ],
    'THAI': [
        'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80', // Thailand Temple
        'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80', // Longtail boats
    ],
    'EUROPE': [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', // Swiss Alps
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80', // Europe Street
        'https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?w=800&q=80', // Paris
    ],
    'VIETNAM': [
        'https://images.unsplash.com/photo-1505051508008-923feaf90180?w=800&q=80', // Ha Long Bay
        'https://images.unsplash.com/photo-1557750255-c76072a7bb56?w=800&q=80', // Hanoi
    ],
    'SINGAPORE': [
        'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80', // Marina Bay
    ],
    'DEFAULT': [
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80', // Nature
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', // Scenic
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80', // Travel
        'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80', // Trekking
        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', // Airplane wing
        'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&q=80', // Plane
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80', // Travel accessories
        'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80', // Rain
    ]
};




// Get the starting (lowest tier) price per person from tripPricing
const getStartingPrice = (trip: Trip): number => {
    if (!trip.tripPricing || trip.tripPricing.length === 0) {
        return parseFloat(trip.basePrice) || 0;
    }
    const sorted = [...trip.tripPricing].sort((a, b) => a.minPax - b.minPax);
    return parseFloat(sorted[0].pricePerPerson) || 0;
};

export default function TripsPage() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState<string>('All');

    const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const response = await fetch('/api/trips', { cache: 'no-store' });
            const data = await response.json();
            setTrips(data.trips || []);
        } catch (error) {
            console.error('Error fetching trips:', error);
        } finally {
            setLoading(false);
        }
    };

    // Get unique regions for filter
    const regions = ['All', ...Array.from(new Set(trips.map(t => t.region || 'Uncategorized')))];

    // Filter trips
    const filteredTrips = trips.filter(trip => {
        const matchesSearch =
            trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trip.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trip.region.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRegion = selectedRegion === 'All' || trip.region === selectedRegion;

        return matchesSearch && matchesRegion;
    });

    const getTripImage = (trip: Trip) => {
        if (imgErrors[trip.id]) return getFallbackImage(trip);
        const dbImage = trip.imageUrl;
        const validDbImage = dbImage && dbImage.startsWith('http') && !dbImage.includes('example.com') && !dbImage.includes('placeholder') && !dbImage.includes('unsplash.com');
        if (validDbImage) return dbImage;
        return getFallbackImage(trip);
    };

    const getFallbackImage = (trip: Trip) => {
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

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-[#222222] mb-1">Trip Catalog</h1>
                <p className="text-[#717171] font-medium">Browse and customize exclusive B2B itineraries</p>
            </div>

            {/* Sticky Search & Filter */}
            <div className="sticky top-24 z-10 bg-white/90 backdrop-blur-md pb-6 pt-2">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="w-full md:flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#717171] group-focus-within:text-[#222222] transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by code, title, or region..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 border border-[#EBEBEB] rounded-full focus:outline-none focus:border-[#222222] focus:shadow-airbnb transition-all text-sm font-medium"
                        />
                    </div>

                    <div className="flex overflow-x-auto gap-2 no-scrollbar w-full md:w-auto">
                        {regions.map(region => (
                            <button
                                key={region}
                                onClick={() => setSelectedRegion(region)}
                                className={`whitespace-nowrap px-4 py-2 rounded-full font-bold text-xs transition-all border ${
                                    selectedRegion === region
                                        ? 'bg-[#222222] text-white border-[#222222] shadow-md'
                                        : 'bg-white text-[#717171] border-[#EBEBEB] hover:border-[#222222] hover:text-[#222222]'
                                }`}
                            >
                                {region}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trip Grid */}
            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006A4E] mx-auto mb-4"></div>
                    <p className="text-[#717171] font-medium">Loading itineraries...</p>
                </div>
            ) : filteredTrips.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-[#EBEBEB]">
                    <p className="text-lg text-[#717171] font-semibold">No trips found matching your criteria.</p>
                    <button
                        onClick={() => { setSearchQuery(''); setSelectedRegion('All'); }}
                        className="mt-4 text-[#006A4E] font-bold hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                    {filteredTrips.map((trip) => (
                        <Link
                            key={trip.id}
                            href={`/dashboard/trips/${trip.id}`}
                            className="flex flex-col group cursor-pointer"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 mb-3 transition-all">
                                <Image
                                    src={getTripImage(trip)}
                                    alt={trip.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    onError={() => setImgErrors(prev => ({ ...prev, [trip.id]: true }))}
                                />
                                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-black text-[#222222] shadow-sm z-10 border border-[#EBEBEB] tracking-wider">
                                    {trip.code}
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="flex flex-col space-y-1">
                                <div className="flex justify-between items-start gap-2">
                                    <h3 className="font-bold text-[#222222] truncate text-base leading-tight group-hover:text-[#006A4E] transition-colors">{trip.title}</h3>
                                </div>
                                
                                <div className="flex items-center text-[#717171] text-sm font-medium">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {trip.region}
                                </div>
                                
                                <div className="flex items-center text-[#717171] text-sm font-medium">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {trip.durationDays}D / {trip.durationNights}N
                                </div>
                                
                                <div className="pt-2 flex items-center justify-between">
                                    {(() => {
                                        const sp = getStartingPrice(trip);
                                        return sp > 0 ? (
                                            <div>
                                                <span className="text-[10px] font-bold text-[#717171] uppercase tracking-widest">From</span>
                                                <p className="text-sm font-black text-[#222222]">₹{sp.toLocaleString()}<span className="text-[10px] font-bold text-[#717171]">/person</span></p>
                                            </div>
                                        ) : (
                                            <span className="text-xs font-black text-orange-500">On Request</span>
                                        );
                                    })()}
                                    <ArrowRight className="w-4 h-4 text-[#222222] group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

