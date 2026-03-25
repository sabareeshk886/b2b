'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Users, Star, Check, Download, Send, Info, Clock, Utensils, Hotel, Calculator, FileText } from 'lucide-react';
import Image from 'next/image';

// Fallback data for trips without DB itinerary (imported PDFs)
const FALLBACK_ITINERARIES: Record<string, any> = {
    'default': [
        { day: 1, title: 'Arrival & Welcome', description: 'Arrive at the destination, transfer to your hotel, and enjoy a welcome dinner.', activities: ['Airport Transfer', 'Hotel Check-in', 'Welcome Dinner'], meals: 'Dinner', accommodation: 'Standard Hotel' },
        { day: 2, title: 'City Tour & Sightseeing', description: 'Explore the main city attractions, local markets, and historical sites.', activities: ['City Tour', 'Museum Visit', 'Local Market'], meals: 'Breakfast', accommodation: 'Standard Hotel' },
        { day: 3, title: 'Cultural Experience', description: 'Immerse yourself in the local culture with village visits and traditional activities.', activities: ['Village Visit', 'Cultural Show'], meals: 'Breakfast', accommodation: 'Standard Hotel' },
        { day: 4, title: 'Leisure & Departure', description: 'Enjoy some free time for shopping before your departure transfer.', activities: ['Free Time', 'Airport Transfer'], meals: 'Breakfast', accommodation: '-' }
    ],
    'kerala': [
        { day: 1, title: 'Arrival in Cochin', description: 'Arrive at Cochin airport. Transfer to hotel. Evening visit to Chinese Fishing nets.', activities: ['Airport Pickup', 'Marine Drive'], meals: 'Dinner', accommodation: 'Cochin Hotel' },
        { day: 2, title: 'Munnar Hill Station', description: 'Drive to Munnar. Enroute visit Cheeyappara Waterfalls. Check in to resort.', activities: ['Scenic Drive', 'Tea Museum'], meals: 'Breakfast, Dinner', accommodation: 'Munnar Resort' },
        { day: 3, title: 'Munnar Sightseeing', description: 'Full day sightseeing in Munnar. Visit Mattupetty Dam and Eravikulam National Park.', activities: ['National Park', 'Dam Visit'], meals: 'Breakfast, Dinner', accommodation: 'Munnar Resort' },
        { day: 4, title: 'Alleppey Houseboat', description: 'Drive to Alleppey. Board your private houseboat for a backwater cruise.', activities: ['Houseboat Cruise', 'Village Walk'], meals: 'All Meals', accommodation: 'Private Houseboat' },
        { day: 5, title: 'Departure', description: 'Disembark houseboat and transfer to Cochin airport for departure.', activities: ['Airport Drop'], meals: 'Breakfast', accommodation: '-' }
    ],
    'rajasthan': [
        { day: 1, title: 'Arrival in Jaipur', description: 'Welcome to the Pink City. Transfer to hotel. Evening fee for local market.', activities: ['Arrival', 'Market Visit'], meals: 'Dinner', accommodation: 'Jaipur Heritage Hotel' },
        { day: 2, title: 'Jaipur Forts & Palaces', description: 'Visit Amber Fort (Elephant ride), City Palace, and Jantar Mantar.', activities: ['Amber Fort', 'City Palace', 'Hawa Mahal Photo'], meals: 'Breakfast', accommodation: 'Jaipur Heritage Hotel' },
        { day: 3, title: 'Transfer to Jodhpur', description: 'Drive to the Blue City. Visit Mehrangarh Fort in the evening.', activities: ['Travel', 'Fort Visit'], meals: 'Breakfast', accommodation: 'Jodhpur Hotel' },
        { day: 4, title: 'Departure', description: 'Transfer to airport after breakfast.', activities: ['Airport Transfer'], meals: 'Breakfast', accommodation: '-' }
    ]
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
};

export default function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [trip, setTrip] = useState<Trip | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('itinerary'); // Default back to Itinerary for "Webpage" feel
    const [numPax, setNumPax] = useState(2);
    const [yourMargin, setYourMargin] = useState(5000);
    const [showPriceCalculator, setShowPriceCalculator] = useState(true);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await fetch(`/api/trips/${resolvedParams.id}`);
                const data = await response.json();
                if (data.trip) {
                    setTrip(data.trip);
                } else {
                    // Fallback to list fetch if single fails (redundancy)
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold text-gray-900">Trip not found</h1>
                <Link href="/dashboard/trips" className="text-emerald-600 hover:text-emerald-700 mt-4 inline-block">
                    ← Back to Trips
                </Link>
            </div>
        );
    }

    // Prepare Display Data
    const basePrice = parseFloat(trip.basePrice) || 0;
    const isPriceAvailable = basePrice > 0;
    const totalB2BPrice = basePrice * numPax;
    const clientPrice = totalB2BPrice + yourMargin;
    const marginPercentage = totalB2BPrice > 0 ? ((yourMargin / totalB2BPrice) * 100).toFixed(1) : '0.0';

    // Determine Itinerary Data (DB or Fallback)
    let displayItinerary = trip.itineraryDays || [];

    // SMART ITINERARY GENERATOR
    if (displayItinerary.length === 0) {
        const title = trip.title;
        const region = trip.region;
        const days = trip.durationDays;

        // 1. Try to find city codes in title (e.g., "JSL JDP")
        const CITY_CODES: Record<string, string> = {
            'JSL': 'Jaisalmer', 'JDP': 'Jodhpur', 'UDR': 'Udaipur', 'JPR': 'Jaipur',
            'BKN': 'Bikaner', 'MOU': 'Mount Abu', 'UMB': 'Kumbhalgarh',
            'SXR': 'Srinagar', 'PAT': 'Patnitop', 'PAH': 'Pahalgam', 'GUL': 'Gulmarg', 'SON': 'Sonmarg',
            'LEH': 'Leh', 'NUB': 'Nubra Valley', 'PAN': 'Pangong',
            'AMR': 'Amritsar', 'DAL': 'Dalhousie', 'DHM': 'Dharamshala', 'MCL': 'Mcleodganj',
            'KSL': 'Kasol', 'MNL': 'Manali', 'SHM': 'Shimla', 'JIB': 'Jibhi', 'CHD': 'Chandigarh',
            'IXZ': 'Port Blair', 'HVL': 'Havelock', 'NEL': 'Neil Island',
            'COK': 'Cochin', 'MUN': 'Munnar', 'THE': 'Thekkady', 'ALL': 'Alleppey', 'KOV': 'Kovalam',
            'GOI': 'Goa', 'BOM': 'Mumbai', 'MAA': 'Chennai', 'IXM': 'Madurai', 'RMM': 'Rameswaram',
            'AGR': 'Agra', 'DEL': 'Delhi', 'NDL': 'New Delhi', 'DLI': 'Delhi',
            'JMU': 'Jammu', 'KAT': 'Katra', 'VSD': 'Vaishno Devi'
        };

        const foundCities: string[] = [];
        const words = title.split(/[\s-]+/); // Split by space or hyphen

        words.forEach(word => {
            const cleanWord = word.toUpperCase().replace(/[^A-Z]/g, '');
            if (CITY_CODES[cleanWord] && !foundCities.includes(CITY_CODES[cleanWord])) {
                foundCities.push(CITY_CODES[cleanWord]);
            }
        });

        // 2. Circuit Matching (Exact Content for Popular Routes)
        const cityKey = foundCities.join('-'); // e.g., "Agra-Delhi-Manali-Amritsar"

        if (cityKey.includes('Agra-Delhi-Manali-Amritsar')) {
            // Specific 8-Day Itinerary from PDF
            displayItinerary = [
                {
                    day: 1,
                    title: 'Arrival in Agra',
                    description: 'Arrive at Agra railway station, meet our representative. After breakfast, visit the Taj Mahal (entry ticket included). Post lunch, explore the Agra Fort with its Pearl Mosque and audience halls. Dinner and overnight stay in Agra.',
                    activities: ['Arrival Transfer', 'Taj Mahal Visit', 'Agra Fort Tour'],
                    meals: 'Dinner',
                    accommodation: 'Agra Hotel'
                },
                {
                    day: 2,
                    title: 'Delhi Sightseeing / Industrial Visit',
                    description: 'After breakfast, proceed to Delhi. Visit Akshardham Temple and Lotus Temple. After lunch, explore Red Fort and Jama Masjid. If time permits, experience Chandni Chowk Market. Dinner and overnight stay in Delhi.',
                    activities: ['Transfer to Delhi', 'Akshardham Temple', 'Lotus Temple', 'Red Fort', 'Jama Masjid', 'Chandni Chowk'],
                    meals: 'Breakfast, Dinner',
                    accommodation: 'Delhi Hotel'
                },
                {
                    day: 3,
                    title: 'Transfer to Manali',
                    description: 'After breakfast, depart for Manali. Use this day for a scenic drive through the mountains. Arrive in Manali by evening, check in to your hotel and relax.',
                    activities: ['Scenic Drive to Manali', 'Hotel Check-in'],
                    meals: 'Breakfast, Dinner',
                    accommodation: 'Manali Hotel'
                },
                {
                    day: 4,
                    title: 'Manali Local Sightseeing',
                    description: 'Morning visit to Hadimba Devi Temple and Ghatotkach Temple. Visit the Clubhouse for activities. Evening explore the Mall Road and Van Vihar.',
                    activities: ['Hadimba Temple', 'Clubhouse', 'Mall Road', 'Van Vihar'],
                    meals: 'Breakfast, Dinner',
                    accommodation: 'Manali Hotel'
                },
                {
                    day: 5,
                    title: 'Solang Valley Excursion',
                    description: 'Full day excursion to Solang Valley. Enjoy adventure activities like paragliding, zorbing, and skiing (seasonal). Return to hotel for dinner.',
                    activities: ['Solang Valley', 'Adventure Sports'],
                    meals: 'Breakfast, Dinner',
                    accommodation: 'Manali Hotel'
                },
                {
                    day: 6,
                    title: 'Transfer to Amritsar',
                    description: 'Early morning drive to Amritsar. Check in to hotel. Evening visit to the Golden Temple to witness the Palki Sahib ceremony.',
                    activities: ['Drive to Amritsar', 'Golden Temple (Night View)'],
                    meals: 'Breakfast, Dinner',
                    accommodation: 'Amritsar Hotel'
                },
                {
                    day: 7,
                    title: 'Amritsar Sightseeing',
                    description: 'Visit Jallianwala Bagh and Durgiana Temple. Afternoon drive to Wagah Border for the beating retreat ceremony. Shopping in local markets.',
                    activities: ['Jallianwala Bagh', 'Wagah Border Ceremony', 'Local Market'],
                    meals: 'Breakfast, Dinner',
                    accommodation: 'Amritsar Hotel'
                },
                {
                    day: 8,
                    title: 'Departure',
                    description: 'After breakfast, transfer to Amritsar Airport/Railway Station for your onward journey.',
                    activities: ['Airport/Station Drop'],
                    meals: 'Breakfast',
                    accommodation: '-'
                }
            ];

            // Adjust length if trip duration is different (slice if shorter, though unlikely for this fixed circuit)
            // For this specific circuit, we force the full 8 days because the DB duration might be wrong (parsed from "MNL(3)")
            if (displayItinerary.length > days && !cityKey.includes('Agra-Delhi-Manali-Amritsar')) {
                displayItinerary = displayItinerary.slice(0, days);
            }
        }

        // 3. Generic Generation Logic (Fallback if no exact circuit match)
        else if (foundCities.length > 0) {
            const generated: any[] = [];
            const perCityDays = Math.max(1, Math.floor((days - 2) / foundCities.length));
            let currentDay = 1;

            // Day 1: Arrival
            generated.push({
                day: 1,
                title: `Arrival in ${foundCities[0]}`,
                description: `Arrive at destination. Transfer to your hotel in ${foundCities[0]}. Evening at leisure to explore the local market.`,
                activities: ['Airport/Station Pickup', 'Hotel Check-in', 'Leisure Time'],
                meals: 'Dinner',
                accommodation: `${foundCities[0]} Hotel`
            });
            currentDay++;

            // Intermediate Days
            foundCities.forEach((city, idx) => {
                // If it's the first city, we already did arrival, so maybe just 1 more day if needed
                // If it's next cities, we add transfer + stay
                if (idx > 0) {
                    generated.push({
                        day: currentDay,
                        title: `Transfer to ${city}`,
                        description: `After breakfast, proceed to ${city}. Check in to your hotel and relax.`,
                        activities: ['Scenic Drive', 'Hotel Check-in', 'Sightseeing'],
                        meals: 'Breakfast, Dinner',
                        accommodation: `${city} Hotel`
                    });
                    currentDay++;
                }

                // Add sightseeing days for this city
                // We roughly distribute remaining days, but keep it simple: 1 full day for each major city if space permits
                if (currentDay < days) {
                    generated.push({
                        day: currentDay,
                        title: `Explore ${city}`,
                        description: `Full day of sightseeing in ${city}. Visit popular landmarks and enjoy local culture.`,
                        activities: [`${city} Sightseeing`, 'Local Attractions', 'Photo Stops'],
                        meals: 'Breakfast, Dinner',
                        accommodation: `${city} Hotel`
                    });
                    currentDay++;
                }
            });

            // Fill remaining days if any (e.g., if duration is long)
            while (currentDay < days) {
                const lastCity = foundCities[foundCities.length - 1];
                generated.push({
                    day: currentDay,
                    title: `Leisure in ${lastCity}`,
                    description: `Enjoy a relaxed day in ${lastCity}. Optional activities or shopping.`,
                    activities: ['Shopping', 'Optional Tours'],
                    meals: 'Breakfast, Dinner',
                    accommodation: `${lastCity} Hotel`
                });
                currentDay++;
            }

            // Last Day: Departure
            generated.push({
                day: days,
                title: 'Departure',
                description: 'After breakfast, check out and transfer to the airport/station for your onward journey.',
                activities: ['Check-out', 'Airport Drop'],
                meals: 'Breakfast',
                accommodation: '-'
            });

            displayItinerary = generated;

        } else {
            // Fallback to region-based defaults
            const key = title.toLowerCase() + ' ' + (region || '').toLowerCase();
            if (key.includes('kerala')) displayItinerary = FALLBACK_ITINERARIES['kerala'];
            else if (key.includes('rajasthan') || key.includes('jaipur')) displayItinerary = FALLBACK_ITINERARIES['rajasthan'];
            else displayItinerary = FALLBACK_ITINERARIES['default'];
        }
    }

    // Determine Inclusions (DB or Fallback)
    const inclusions = trip.tripItems?.filter((i: any) => i.type === 'inclusion').map((i: any) => i.item) || ['Accommodation', 'Daily Breakfast', 'Transfers', 'Sightseeing'];
    const exclusions = trip.tripItems?.filter((i: any) => i.type === 'exclusion').map((i: any) => i.item) || ['Airfare', 'Personal Expenses', 'GST'];

    // Helper to get region image if trip image is missing or looks like a placeholder
    const getHeroImage = () => {
        if (trip.imageUrl && !trip.imageUrl.includes('unsplash.com/photo-1469854523086')) return trip.imageUrl;

        const r = trip.region?.toUpperCase() || '';
        if (r.includes('MUMBAI')) return 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=80';
        if (r.includes('RAJASTHAN') || r.includes('JAIPUR')) return 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80';
        if (r.includes('NORTH') || r.includes('AGRA') || r.includes('DELHI')) return 'https://images.unsplash.com/photo-1588665792900-53da5643a3d5?w=1200&q=80'; // Taj Mahal / North India
        if (r.includes('KERALA')) return 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80';

        return 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80'; // Default fallback
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <Link
                    href="/dashboard/trips"
                    className="inline-flex items-center space-x-2 text-gray-600 hover:text-emerald-600 mb-6 font-semibold transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Catalog</span>
                </Link>

                {/* Hero Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                    <div className="relative h-64 md:h-80 bg-gray-900">
                        <Image
                            src={getHeroImage()}
                            alt={trip.title}
                            fill
                            className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-lg text-sm font-bold border border-white/10">
                                    {trip.code}
                                </span>
                                <span className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                                    B2B Exclusive
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 shadow-sm">{trip.title}</h1>
                            <div className="flex flex-wrap items-center gap-6 text-white/90">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-5 h-5 text-emerald-400" />
                                    <span className="font-medium">{trip.region}</span>
                                </div>
                                {trip.durationDays > 0 && (
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-5 h-5 text-orange-400" />
                                        <span className="font-medium">{trip.durationDays} Days / {trip.durationNights} Nights</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Tabs */}
                        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex space-x-1 overflow-x-auto">
                            {['itinerary', 'overview', 'inclusions', 'brochure'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 min-w-[100px] py-3 rounded-xl font-bold capitalize transition-all flex items-center justify-center space-x-2 ${activeTab === tab
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {tab === 'brochure' && <FileText className="w-4 h-4" />}
                                    <span>{tab}</span>
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">

                            {activeTab === 'brochure' && (
                                <div className="h-[800px] w-full bg-gray-100 flex flex-col items-center justify-center">
                                    {trip.pdfUrl ? (
                                        <iframe
                                            src={trip.pdfUrl}
                                            className="w-full h-full"
                                            title="Trip Brochure"
                                        />
                                    ) : (
                                        <div className="text-center p-10">
                                            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                            <h3 className="text-xl font-bold text-gray-900">No Brochure Available</h3>
                                            <p className="text-gray-500">The PDF for this trip is currently unavailable.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'overview' && (
                                <div className="p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip Overview</h2>
                                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                                        {trip.overview || "Experience an unforgettable journey through " + trip.region + ". This carefully curated itinerary ensures you see the best sights while enjoying comfortable accommodations and seamless transfers."}
                                    </p>

                                    {trip.highlights && trip.highlights.length > 0 && (
                                        <>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights</h3>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {trip.highlights.map((highlight: string, idx: number) => (
                                                    <div key={idx} className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-xl">
                                                        <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                                        <span className="text-gray-700 font-medium">{highlight}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {activeTab === 'inclusions' && (
                                <div className="p-8">
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
                                        <div className="space-y-3">
                                            {inclusions.map((item: string, idx: number) => (
                                                <div key={idx} className="flex items-start space-x-3 p-4 bg-emerald-50 rounded-xl">
                                                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-700 font-medium">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Not Included</h2>
                                        <div className="space-y-3">
                                            {exclusions.map((item: string, idx: number) => (
                                                <div key={idx} className="flex items-start space-x-3 p-4 bg-gray-100 rounded-xl">
                                                    <Info className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-600">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'itinerary' && (
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900">Day-by-Day Itinerary</h2>
                                        {(!trip.itineraryDays || trip.itineraryDays.length === 0) && (
                                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-bold">
                                                Sample Itinerary
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-8">
                                        {displayItinerary.map((day: any, idx: number) => (
                                            <div key={idx} className="relative pl-8 border-l-2 border-emerald-200 last:border-0">
                                                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-emerald-500 border-4 border-white shadow-sm" />

                                                <div className="mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900">Day {day.day}: {day.title}</h3>
                                                </div>

                                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                                                    <p className="text-gray-600 leading-relaxed mb-4">{day.description}</p>

                                                    {day.activities && day.activities.length > 0 && (
                                                        <div className="space-y-2 mb-4">
                                                            {day.activities.map((activity: string, actIdx: number) => (
                                                                <div key={actIdx} className="flex items-center space-x-2 text-sm text-gray-700">
                                                                    <Clock className="w-4 h-4 text-emerald-500" />
                                                                    <span>{activity}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                                                        {day.meals && (
                                                            <div className="flex items-center space-x-2 text-sm">
                                                                <Utensils className="w-4 h-4 text-orange-500" />
                                                                <span className="font-semibold text-gray-700">{day.meals}</span>
                                                            </div>
                                                        )}
                                                        {day.accommodation && (
                                                            <div className="flex items-center space-x-2 text-sm">
                                                                <Hotel className="w-4 h-4 text-blue-500" />
                                                                <span className="font-semibold text-gray-700">{day.accommodation}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar: Calculator */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sticky top-8 shadow-xl">
                            <div className="mb-6">
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">B2B Net Price</p>
                                {isPriceAvailable ? (
                                    <>
                                        <p className="text-4xl font-extrabold text-gray-900">₹{basePrice.toLocaleString()}</p>
                                        <p className="text-sm text-emerald-600 font-bold mt-1">Per Person (Valid for {numPax} Pax)</p>
                                    </>
                                ) : (
                                    <p className="text-2xl font-bold text-orange-500">Price on Request</p>
                                )}
                            </div>

                            {/* Price Calculator */}
                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-6">
                                <div className="flex items-center space-x-2 mb-4 text-gray-900">
                                    <Calculator className="w-5 h-5 text-blue-600" />
                                    <span className="font-bold">Margin Calculator</span>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                            Passengers
                                        </label>
                                        <select
                                            value={numPax}
                                            onChange={(e) => setNumPax(Number(e.target.value))}
                                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map(num => (
                                                <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                            Total Markup (₹)
                                        </label>
                                        <input
                                            type="number"
                                            value={yourMargin}
                                            onChange={(e) => setYourMargin(Number(e.target.value))}
                                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                                            placeholder="0"
                                        />
                                        {isPriceAvailable && (
                                            <p className="text-xs text-gray-500 mt-1.5 text-right font-medium">
                                                {marginPercentage}% Markup
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <div className="flex justify-between items-end mb-1">
                                            <p className="text-sm text-gray-600 font-medium">Steps to Client:</p>
                                        </div>
                                        <p className="text-3xl font-extrabold text-blue-600">
                                            ₹{isPriceAvailable ? clientPrice.toLocaleString() : (yourMargin).toLocaleString()}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1 font-medium">Total Price (Incl. Taxes)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => trip.pdfUrl && window.open(trip.pdfUrl, '_blank')}
                                    className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center space-x-2"
                                >
                                    <Download className="w-5 h-5" />
                                    <span>Download Original PDF</span>
                                </button>
                                <button className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center space-x-2 shadow-emerald-200 shadow-lg">
                                    <Send className="w-5 h-5" />
                                    <span>Share Quote with Client</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
