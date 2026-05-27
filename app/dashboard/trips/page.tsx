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

const SOUTH_PLACE_ABBREVIATIONS: Array<[string, string]> = [
    ['KOD', 'Kodaikanal'],
    ['RMKL', 'Ramakkalmedu'],
    ['MNR', 'Munnar'],
    ['EKM', 'Ernakulam'],
    ['VGM', 'Vagamon'],
    ['OTY', 'Ooty'],
    ['BLR', 'Bangalore'],
    ['MYS', 'Mysore'],
    ['MYSR', 'Mysore'],
    ['CRG', 'Coorg'],
    ['CHIK', 'Chickmagaluru'],
    ['CHK', 'Chickmagaluru'],
    ['CK', 'Chickmagaluru'],
    ['BELR', 'Belur'],
    ['UDP', 'Udupi'],
    ['DND', 'Dandeli'],
    ['GKR', 'Gokarna'],
    ['GKRN', 'Gokarna'],
    ['GA', 'Goa'],
    ['WND', 'Wonderla'],
    ['WNDR', 'Wonderla'],
    ['WGM', 'Wagamon'],
    ['MAL', 'Malwan']
];

const getDisplayTripTitle = (title: string) => {
    let out = title;

    // If title already contains long names, leave it.
    const upper = out.toUpperCase();
    if (upper.includes('KODAIKANAL') || upper.includes('RAMAKKALMEDU') || upper.includes('MUNNAR')) return out;

    for (const [abbr, full] of SOUTH_PLACE_ABBREVIATIONS) {
        out = out.replace(new RegExp(`\\b${abbr}\\b`, 'gi'), full);
    }
    return out;
};

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
    'NORTH': [
        '/images/catalog/man%201.jpg', 
        '/images/catalog/del%201.jpg', 
        'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80',
        'https://images.unsplash.com/photo-1544735230-c12844a89cd4?w=800&q=80'
    ],
    'KERALA': [
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1742106852724-0faf505b7797?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1582882019472-410ac70db2ca?auto=format&fit=crop&w=1400&q=80'
    ],
    'HIMACHAL': ['/images/catalog/man%201.jpg'],
    'KASHMIR': ['https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80'],
    'GOA': [
        'https://images.unsplash.com/photo-1757702244726-00198554c4a0?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1727806775961-2b4346506646?auto=format&fit=crop&w=1400&q=80'
    ],
    // SOUTH INDIA - high quality destination pools (Unsplash)
    'KODAIKANAL': [
        'https://images.unsplash.com/photo-1695392146230-a91460de972a?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1665481485534-859f078704fc?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1742106850868-b7d797b8e560?auto=format&fit=crop&w=1400&q=80'
    ],
    'MUNNAR': [
        'https://images.unsplash.com/photo-1742106856764-148b748b4d3c?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1742106852724-0faf505b7797?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1696027356970-b1527cc0d33c?auto=format&fit=crop&w=1400&q=80'
    ],
    'OOTY': [
        'https://images.unsplash.com/flagged/photo-1582360694694-1eb3d0947263?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1622296089860-3ce38c6f9bde?auto=format&fit=crop&w=1400&q=80'
    ],
    'BANGALORE': [
        'https://images.unsplash.com/photo-1741769417908-671a21a28780?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80'
    ],
    'MYSORE': [
        'https://images.unsplash.com/photo-1568908398603-344f83c357e8?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1665376620694-fc0c4bab7294?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1759131762053-4ada61ccdbc8?auto=format&fit=crop&w=1400&q=80'
    ],
    'COORG': [
        'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80'
    ],
    'CHICKMAGALURU': [
        'https://images.unsplash.com/photo-1573674401446-87cae8d4d28e?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1687369479856-c8323effde67?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1400&q=80'
    ],
    'BELUR': [
        'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=80'
    ],
    'DANDELI': [
        'https://images.unsplash.com/photo-1750353127516-87bd2c25c21d?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1715236041029-b1ae4aff390d?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80'
    ],
    'GOKARNA': [
        'https://images.unsplash.com/photo-1733158714880-95917a61b973?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1580713127239-6954a0a33279?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1734120113639-0d034e85c377?auto=format&fit=crop&w=1400&q=80'
    ],
    'UDUPI': [
        'https://images.unsplash.com/photo-1590610984984-06f49070a6ed?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1663478758436-c97802db95f1?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1527333133812-f9af0482c834?auto=format&fit=crop&w=1400&q=80'
    ],
    'HYDERABAD': [
        'https://images.unsplash.com/photo-1750834115164-8c2658f18dd0?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1613312328068-c9b6b76a6ed9?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1583224475403-0b2b3b6b6f16?auto=format&fit=crop&w=1400&q=80'
    ],
    'WONDERLA': [
        'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1520975958225-326b4f35f26a?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1520440229-6469f1e2b05f?auto=format&fit=crop&w=1400&q=80'
    ],
    'RAMAKKALMEDU': [
        'https://images.unsplash.com/photo-1668523272101-bff0196536c9?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1742106850868-b7d797b8e560?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=80'
    ],
    'VAGAMON': [
        'https://images.unsplash.com/photo-1668523272101-bff0196536c9?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1742106856764-148b748b4d3c?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1560840510-a53340ca1948?auto=format&fit=crop&w=1400&q=80'
    ],
    'ERNAKULAM': [
        'https://images.unsplash.com/photo-1582882019472-410ac70db2ca?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1672579738105-227fa89d0527?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1742106850868-b7d797b8e560?auto=format&fit=crop&w=1400&q=80'
    ],
    'WAYANAD': [
        'https://images.unsplash.com/photo-1668523272101-bff0196536c9?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1777635432074-81f4a466038c?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1668523272101-bff0196536c9?auto=format&fit=crop&w=1400&q=80'
    ],
    'HAMPI': [
        'https://images.unsplash.com/photo-1651073231492-169afcf84f36?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1721195807515-70bcc589bb08?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1722934804353-0d9f6a55ab5e?auto=format&fit=crop&w=1400&q=80'
    ],
    'MALWAN': [
        'https://images.unsplash.com/photo-1527333133812-f9af0482c834?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1663478758436-c97802db95f1?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1590610984984-06f49070a6ed?auto=format&fit=crop&w=1400&q=80'
    ],
    'DUBAI': ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80'],
    'BALI': ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80'],
    'DEFAULT': [
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80'
    ]
};

const getStartingPrice = (trip: Trip): number => {
    if (!trip.tripPricing || trip.tripPricing.length === 0) return parseFloat(trip.basePrice) || 0;
    const sorted = [...trip.tripPricing].sort((a, b) => a.minPax - b.minPax);
    return parseFloat(sorted[0].pricePerPerson) || 0;
};

const getImageCategory = (text: string) => {
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
    else if (text.includes('KODAIKANAL')) category = 'KODAIKANAL';
    else if (text.includes('MUNNAR')) category = 'MUNNAR';
    else if (text.includes('OOTY')) category = 'OOTY';
    else if (text.includes('BANGALORE') || text.includes('BENGALURU')) category = 'BANGALORE';
    else if (text.includes('MYSORE') || text.includes('MYSURU')) category = 'MYSORE';
    else if (text.includes('COORG') || text.includes('KODAGU')) category = 'COORG';
    else if (text.includes('BELUR')) category = 'BELUR';
    else if (text.includes('CHICKMAGALURU') || text.includes('CHICKMANGALORE') || text.includes('CHIKMAGALUR') || text.includes('CHIKMAGALURU')) category = 'CHICKMAGALURU';
    else if (text.includes('DANDELI')) category = 'DANDELI';
    else if (text.includes('GOKARNA')) category = 'GOKARNA';
    else if (text.includes('UDUPI')) category = 'UDUPI';
    else if (text.includes('HYDERABAD') || text.includes(' HYD ')) category = 'HYDERABAD';
    else if (text.includes('WONDERLA')) category = 'WONDERLA';
    else if (text.includes('RAMAKKALMEDU')) category = 'RAMAKKALMEDU';
    else if (text.includes('VAGAMON') || text.includes('WAGAMON')) category = 'VAGAMON';
    else if (text.includes('ERNAKULAM') || text.includes('KOCHI')) category = 'ERNAKULAM';
    else if (text.includes('WAYANAD') || text.includes('WAYANADU') || text.includes(' WYN ') || text.includes(' WYA ')) category = 'WAYANAD';
    else if (text.includes('HAMPI') || text.includes(' HMP ') || text.includes('HMP -') || text.includes('HMP-')) category = 'HAMPI';
    else if (text.includes('MALWAN') || text.includes('MALVAN')) category = 'MALWAN';
    else if (text.includes('KERALA')) category = 'KERALA';
    else if (text.includes('RAJASTHAN')) category = 'RAJASTHAN';
    else if (text.includes('PUNJAB')) category = 'PUNJAB';
    else if (text.includes('CHENNAI')) category = 'CHENNAI';
    else if (text.includes('AGRA')) category = 'AGRA';
    else if (text.includes('DELHI')) category = 'DELHI';
    else if (text.includes('NORTH')) category = 'NORTH';
    else if (text.includes('AGR')) category = 'NORTH';

    return category;
}

const getFallbackImage = (trip: Trip, tileIndex: number = 0) => {
    const expandedTitle = getDisplayTripTitle(trip.title);
    const text = (expandedTitle + ' ' + (trip.region || '') + ' ' + (trip.destinations?.join(' ') || '')).toUpperCase();
    const category = getImageCategory(text);
    const pool = REGION_IMAGES[category] || REGION_IMAGES['DEFAULT'];

    const places = expandedTitle
        .toUpperCase()
        .split('-')
        .map((p) => p.trim())
        .filter(Boolean);

    const seedStr = trip.code || trip.id || 'default';
    const baseHashVal = seedStr.split('').reduce((acc: number, char: string) => (((acc << 5) - acc) + char.charCodeAt(0)) | 0, 0);
    const baseHash = Math.abs(baseHashVal);

    const placeCategories = places
        .map((p) => getImageCategory(p))
        .filter((c) => c !== 'DEFAULT' && REGION_IMAGES[c]?.length);

    // Prefer first recognized route place for relevance (e.g. KOD-RMKL-MNR -> KODAIKANAL image pool).
    const preferredCategory = placeCategories.length > 0 ? placeCategories[0] : category;
    const finalPool = REGION_IMAGES[preferredCategory] || pool;

    // Offset by tile index to reduce adjacent-card duplicates.
    return finalPool[(baseHash + tileIndex) % finalPool.length];
}

export default function TripsPage() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState<string>('All');
    const [selectedSouthDuration, setSelectedSouthDuration] = useState<'All' | '2D/3N' | '3D/4N' | '4D/5N' | '5D/6N'>('All');
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
        const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = selectedRegion === 'All' || trip.region === selectedRegion;
        const matchesSouthDuration =
            selectedRegion !== 'SOUTH' ||
            selectedSouthDuration === 'All' ||
            `${trip.durationDays}D/${trip.durationNights}N` === selectedSouthDuration;

        return matchesSearch && matchesRegion && matchesSouthDuration;
    });

    const getTripImage = (trip: Trip, tileIndex: number) => {
        if (imgErrors[trip.id]) return getFallbackImage(trip, tileIndex);
        return trip.imageUrl || getFallbackImage(trip, tileIndex);
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
                            <button
                                key={region}
                                onClick={() => {
                                    setSelectedRegion(region);
                                    if (region !== 'SOUTH') setSelectedSouthDuration('All');
                                }}
                                className={`px-4 py-2 rounded-full font-bold text-xs border ${selectedRegion === region ? 'bg-[#222222] text-white' : 'bg-white text-[#717171]'}`}
                            >
                                {region}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedRegion === 'SOUTH' && (
                    <div className="mt-3 flex overflow-x-auto gap-2 no-scrollbar">
                        {(['All', '2D/3N', '3D/4N', '4D/5N', '5D/6N'] as const).map((opt) => (
                            <button
                                key={opt}
                                onClick={() => setSelectedSouthDuration(opt)}
                                className={`px-4 py-2 rounded-full font-bold text-xs border ${
                                    selectedSouthDuration === opt ? 'bg-[#006A4E] text-white border-[#006A4E]' : 'bg-white text-[#717171]'
                                }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {loading ? (
                <div className="text-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006A4E] mx-auto"></div></div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTrips.map((trip, idx) => (
                        <div key={trip.id} className="flex flex-col group border border-[#EBEBEB] rounded-2xl overflow-hidden hover:shadow-lg transition-all bg-white">
                            <Link href={`/dashboard/trips/${trip.id}`} className="flex flex-col">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image src={getTripImage(trip, idx)} alt={trip.title} fill className="object-cover group-hover:scale-105 transition-transform" onError={() => setImgErrors(prev => ({ ...prev, [trip.id]: true }))} />
                                </div>
                                <div className="p-4 space-y-1">
                                    <h3 className="font-bold text-[#222222] truncate text-base">{getDisplayTripTitle(trip.title).toUpperCase()}</h3>
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
