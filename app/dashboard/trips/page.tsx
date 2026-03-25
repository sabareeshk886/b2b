'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, ArrowRight, Filter } from 'lucide-react';
import Image from 'next/image';

type Trip = {
    id: string;
    code: string;
    title: string;
    region: string;
    destination?: string;
    destinations: string[]; // e.g. ["Munnar", "Thekkady"]
    durationDays: number;
    durationNights: number;
    basePrice: string;
    pdfUrl?: string | null;
    imageUrl?: string | null;
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
        'https://unsplash.com/photos/_Qtgj2nXqyY/download?force=true&w=800', // Woman at Taj
        'https://unsplash.com/photos/qCKSpvJfNtU/download?force=true&w=800', // Inlay art
        'https://unsplash.com/photos/pqY0n4KNO0s/download?force=true&w=800', // Taj entrance
        'https://unsplash.com/photos/B3-lUYDbyDo/download?force=true&w=800', // Agra Fort
        'https://unsplash.com/photos/8goGYCLzrLs/download?force=true&w=800', // Fort walls
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
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80', // Taj Mahal
        'https://images.unsplash.com/photo-1587474265402-9e6b7d584844?w=800&q=80', // India Gate
        'https://images.unsplash.com/photo-1596396825227-817882209772?w=800&q=80', // Red Fort
        'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80', // Taj River
        'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80', // India Gate Sunset
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
            const response = await fetch('/api/trips');
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
        // If image failed to load previously, force fallback
        if (imgErrors[trip.id]) {
            return getFallbackImage(trip);
        }

        // 1. Strict Validation: Ignore DB images unless they are from known reliable sources or purely safe URLs
        const dbImage = trip.imageUrl;
        const validDbImage = dbImage && dbImage.startsWith('http') && !dbImage.includes('example.com') && !dbImage.includes('placeholder');

        if (validDbImage) return dbImage;

        return getFallbackImage(trip);
    };

    const getFallbackImage = (trip: Trip) => {
        // 2. Identify Metadata for matching
        const region = trip.region?.toUpperCase() || '';
        const title = trip.title?.toUpperCase() || '';
        const text = (title + ' ' + region + ' ' + (trip.destinations?.join(' ') || '')).toUpperCase();

        let category = 'DEFAULT';

        // Specific sub-regions first
        if (text.includes('DUBAI') || text.includes('UAE') || text.includes('ABU DHABI')) category = 'DUBAI';
        else if (text.includes('BALI') || text.includes('INDONESIA') || text.includes('UBUD')) category = 'BALI';
        else if (text.includes('THAI') || text.includes('BANGKOK') || text.includes('PHUKET') || text.includes('PATTAYA')) category = 'THAI'; // Thailand
        else if (text.includes('MALDIVES') || text.includes('MALE')) category = 'MALDIVES';
        else if (text.includes('VIETNAM') || text.includes('HANOI') || text.includes('HO CHI MINH')) category = 'VIETNAM';
        else if (text.includes('SINGAPORE')) category = 'SINGAPORE';
        else if (text.includes('EUROPE') || text.includes('SWITZERLAND') || text.includes('PARIS') || text.includes('ITALY') || text.includes('LONDON') || text.includes('SWISS')) category = 'EUROPE';

        else if (text.includes('KASHMIR') || text.includes('SRINAGAR') || text.includes('GULMARG') || text.includes('SXR')) category = 'KASHMIR';
        else if (text.includes('LADAKH') || text.includes('LEH')) category = 'HIMACHAL'; // Close enough style
        else if (text.includes('MANALI') || text.includes('MNL')) category = 'MANALI';
        else if (text.includes('KASOL') || text.includes('KULLU') || text.includes('KSL')) category = 'KASOL';
        else if (text.includes('ANDAMAN') || text.includes('PORT BLAIR') || text.includes('HAVELOCK') || text.includes('IXZ')) category = 'ANDAMAN';
        else if (text.includes('GOA') || text.includes('GOI')) category = 'GOA';
        else if (text.includes('MUNNAR') || text.includes('KERALA') || text.includes('COCHIN') || text.includes('THEKKADY') || text.includes('ALLEPPEY') || text.includes('COK')) category = 'KERALA';
        else if (text.includes('MATHERAN') || text.includes('MAT')) category = 'MATHERAN';
        else if (text.includes('RAJASTHAN') || text.includes('JAIPUR') || text.includes('UDAIPUR') || text.includes('JODHPUR') || text.includes('JAISALMER') || text.includes('JPR') || text.includes('UDR') || text.includes('JSL') || text.includes('JDP') || text.includes('UDP')) category = 'RAJASTHAN';
        else if (text.includes('AMRITSAR') || text.includes('PUNJAB') || text.includes('AMR')) category = 'PUNJAB';
        else if (text.includes('CHENNAI') || text.includes('TAMIL') || text.includes('MAA')) category = 'CHENNAI';
        else if (text.includes('MUMBAI') || text.includes('BOMBAY') || text.includes('BOM')) category = 'MUMBAI';
        else if (text.includes('AGRA') || text.includes('TAJ') || text.includes('FATEHPUR') || text.includes('AGR') || text.includes('FTP')) category = 'AGRA';
        else if (text.includes('DELHI') || text.includes('NEW DELHI') || text.includes('DEL')) category = 'DELHI';
        else if (text.includes('SHIMLA') || text.includes('DHARAMSHALA') || text.includes('DALHOUSIE')) category = 'HIMACHAL';
        else if (text.includes('MADURAI') || text.includes('HAMPI') || text.includes('KARNATAKA') || text.includes('IXM')) category = 'SOUTH';
        else if (text.includes('NORTH') || text.includes('VARANASI') || text.includes('VNS')) category = 'NORTH';

        // 3. UUID-based Randomization (More diverse than sequential codes)
        const seedStr = trip.id || trip.code;
        const hash = seedStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

        const pool = REGION_IMAGES[category] || REGION_IMAGES['DEFAULT'];
        // Protection against undefined pool
        return pool ? pool[hash % pool.length] : REGION_IMAGES['DEFAULT'][0];
    }

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Trip Catalog</h1>
                <p className="text-gray-600 text-base md:text-lg">Browse all exclusive B2B itineraries.</p>
            </div>

            {/* Controls: Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 md:mb-8 sticky top-4 z-10 glass p-4 rounded-xl border border-white/50 backdrop-blur-md shadow-sm">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by trip code, title, or region..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white shadow-sm"
                    />
                </div>

                {/* Region Filter - Scrollable on mobile */}
                <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar items-center pr-4 md:pr-0">
                    {regions.map(region => (
                        <button
                            key={region}
                            onClick={() => setSelectedRegion(region)}
                            className={`whitespace-nowrap px-5 py-3 rounded-xl font-bold text-sm transition-all border ${selectedRegion === region
                                ? 'bg-gray-900 text-white border-gray-900 shadow-md transform scale-105'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {region}
                        </button>
                    ))}
                </div>
            </div>

            {/* Trip Grid */}
            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading itineraries...</p>
                </div>
            ) : filteredTrips.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-xl text-gray-500 font-semibold">No trips found matching your criteria.</p>
                    <button
                        onClick={() => { setSearchQuery(''); setSelectedRegion('All'); }}
                        className="mt-4 text-emerald-600 font-bold hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {filteredTrips.map((trip) => {
                        const displayImage = getTripImage(trip);

                        return (
                            <Link
                                key={trip.id}
                                href={`/dashboard/trips/${trip.id}`}
                                className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden active:scale-[0.98] md:active:scale-100 touch-manipulation"
                            >
                                <div className="h-48 md:h-56 bg-gray-200 relative overflow-hidden">
                                    <Image
                                        src={displayImage}
                                        alt={trip.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        onError={() => setImgErrors(prev => ({ ...prev, [trip.id]: true }))}
                                    />
                                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-gray-900 shadow-sm z-10 border border-gray-100 uppercase tracking-wide">
                                        {trip.code}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                    <div className="absolute bottom-4 left-4 text-white font-medium text-sm flex items-center shadow-sm">
                                        <MapPin className="w-4 h-4 mr-1 text-emerald-400 drop-shadow-md" />
                                        <span className="drop-shadow-md font-bold uppercase tracking-wider text-xs">{trip.region}</span>
                                    </div>
                                </div>

                                <div className="p-4 md:p-5 flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                        {trip.title}
                                    </h3>

                                    <div className="flex items-center text-sm text-gray-500 mb-6 mt-auto">
                                        {trip.durationDays > 0 && (
                                            <div className="flex items-center bg-orange-50 text-orange-700 px-2 py-1 rounded-md text-xs font-bold">
                                                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                                <span>{trip.durationDays} Days / {trip.durationNights} Nights</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-full bg-gray-50 text-gray-700 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all border border-gray-100 group-hover:border-emerald-600 group-hover:shadow-emerald-200 group-hover:shadow-lg active:bg-emerald-700 active:text-white md:active:bg-gray-50 md:active:text-gray-700">
                                        View Itinerary
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
