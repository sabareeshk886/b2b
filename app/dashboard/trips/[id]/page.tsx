'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Users, Star, Check, Download, Send, Info, Clock, Utensils, Hotel, Plane, Calculator } from 'lucide-react';
import Image from 'next/image';

// Trip data with full itineraries
const tripData: Record<string, any> = {
    '1': {
        id: '1',
        title: 'Bali Paradise - 6 Days 5 Nights',
        destination: 'Bali, Indonesia',
        duration: '6 Days 5 Nights',
        basePrice: 45000,
        discountedPrice: 33750,
        suggestedMargin: 8500,
        imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
        rating: 4.8,
        maxCapacity: 20,
        overview: 'Experience the magic of Bali with our carefully curated 6-day package. From ancient temples to pristine beaches, immerse yourself in the island\'s rich culture and natural beauty.',
        highlights: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Seminyak Beach', 'Balinese Cooking Class', 'Monkey Forest'],
        inclusions: [
            '5 nights accommodation in 4-star hotels',
            'Daily breakfast and 3 dinners',
            'Airport transfers',
            'All sightseeing with English-speaking guide',
            'Entry tickets to all monuments',
        ],
        exclusions: [
            'International flights',
            'Travel insurance',
            'Personal expenses',
            'Lunch on most days',
            'Tips and gratuities',
        ],
        itinerary: [
            {
                day: 1,
                title: 'Arrival in Bali',
                description: 'Welcome to Bali! Arrive at Ngurah Rai International Airport where our representative will greet you and transfer you to your hotel in Seminyak.',
                activities: ['Airport pickup', 'Hotel check-in', 'Evening at leisure', 'Welcome dinner at beachfront restaurant'],
                meals: 'Dinner',
                accommodation: 'Seminyak Beach Resort (4-star)',
            },
            {
                day: 2,
                title: 'Ubud Cultural Tour',
                description: 'Explore the artistic heart of Bali with visits to Ubud\'s most iconic attractions including the monkey forest and stunning rice terraces.',
                activities: ['Visit Ubud Monkey Forest', 'Tegalalang Rice Terraces photo stop', 'Traditional Balinese lunch', 'Tirta Empul Temple holy spring bath', 'Ubud Art Market shopping'],
                meals: 'Breakfast, Lunch',
                accommodation: 'Seminyak Beach Resort (4-star)',
            },
            {
                day: 3,
                title: 'Tanah Lot & Beach Day',
                description: 'Visit the iconic Tanah Lot temple perched on a rocky outcrop, then enjoy a relaxing afternoon at Seminyak Beach.',
                activities: ['Tanah Lot Temple sunrise visit', 'Taman Ayun Royal Temple', 'Seminyak Beach relaxation', 'Optional water sports', 'Sunset dinner at beach club'],
                meals: 'Breakfast, Dinner',
                accommodation: 'Seminyak Beach Resort (4-star)',
            },
            {
                day: 4,
                title: 'Nusa Penida Island Excursion',
                description: 'Take a day trip to the stunning Nusa Penida island to witness dramatic cliffs and crystal-clear waters.',
                activities: ['Speed boat to Nusa Penida', 'Kelingking Beach (T-Rex viewpoint)', 'Angel\'s Billabong natural pool', 'Broken Beach', 'Return to Bali'],
                meals: 'Breakfast, Lunch (packed)',
                accommodation: 'Seminyak Beach Resort (4-star)',
            },
            {
                day: 5,
                title: 'Cooking Class & Spa',
                description: 'Learn to cook traditional Balinese dishes, then unwind with a rejuvenating spa treatment.',
                activities: ['Traditional market visit', 'Balinese cooking class', 'Enjoy your prepared lunch', '2-hour Balinese spa treatment', 'Free evening for shopping'],
                meals: 'Breakfast, Lunch',
                accommodation: 'Seminyak Beach Resort (4-star)',
            },
            {
                day: 6,
                title: 'Departure',
                description: 'Enjoy your final morning in Bali before transferring to the airport for your departure flight.',
                activities: ['Leisure breakfast', 'Hotel check-out', 'Last-minute shopping (time permitting)', 'Airport transfer'],
                meals: 'Breakfast',
                accommodation: '-',
            },
        ],
    },
    '2': {
        id: '2',
        title: 'Maldives Luxury Escape - 5 Days 4 Nights',
        destination: 'Maldives',
        duration: '5 Days 4 Nights',
        basePrice: 85000,
        discountedPrice: 63750,
        suggestedMargin: 16000,
        imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
        rating: 4.9,
        maxCapacity: 15,
        overview: 'Indulge in the ultimate tropical paradise with our Maldives luxury package. Stay in overwater bungalows, snorkel in crystal-clear waters, and experience world-class hospitality.',
        highlights: ['Overwater Bungalows', 'Coral Reefs Snorkeling', 'Spa Retreats', 'Private Beach Dinners', 'Water Sports'],
        inclusions: [
            '4 nights in overwater bungalow',
            'All meals (breakfast, lunch, dinner)',
            'Speedboat/seaplane transfers',
            'Complimentary snorkeling equipment',
            'One spa treatment per person',
        ],
        exclusions: [
            'International flights',
            'Travel insurance',
            'Alcoholic beverages',
            'Premium water sports',
            'Personal expenses',
        ],
        itinerary: [
            {
                day: 1,
                title: 'Arrival & Resort Check-in',
                description: 'Arrive at Malé International Airport and take a scenic seaplane or speedboat transfer to your luxury resort.',
                activities: ['Airport arrival', 'Seaplane/speedboat transfer', 'Resort check-in', 'Welcome refreshments', 'Sunset viewing from your villa'],
                meals: 'Lunch, Dinner',
                accommodation: 'Overwater Bungalow (5-star)',
            },
            {
                day: 2,
                title: 'Snorkeling & Water Adventures',
                description: 'Explore the vibrant underwater world with guided snorkeling excursions to pristine coral reefs.',
                activities: ['Morning snorkeling trip', 'Coral reef exploration', 'Tropical fish watching', 'Lunch at resort', 'Kayaking or paddleboarding', 'Sunset cruise'],
                meals: 'Breakfast, Lunch, Dinner',
                accommodation: 'Overwater Bungalow (5-star)',
            },
            {
                day: 3,
                title: 'Island Hopping & Local Culture',
                description: 'Visit nearby local islands to experience Maldivian culture and pristine sandbanks.',
                activities: ['Visit local fishing village', 'Cultural interactions', 'Sandbank picnic lunch', 'Swimming & beach games', 'Return to resort', 'Couples spa treatment (included)'],
                meals: 'Breakfast, Lunch, Dinner',
                accommodation: 'Overwater Bungalow (5-star)',
            },
            {
                day: 4,
                title: 'Relaxation & Private Dining',
                description: 'Enjoy a leisurely day at the resort with optional activities and a romantic private beach dinner.',
                activities: ['Morning at leisure', 'Optional diving excursion', 'Pool and beach time', 'Beach volleyball', 'Private beach dinner setup', 'Stargazing'],
                meals: 'Breakfast, Lunch, Dinner',
                accommodation: 'Overwater Bungalow (5-star)',
            },
            {
                day: 5,
                title: 'Departure',
                description: 'Savor your final morning in paradise before your transfer back to Malé.',
                activities: ['Sunrise from villa', 'Checkout after breakfast', 'Resort departure', 'Transfer to airport'],
                meals: 'Breakfast',
                accommodation: '-',
            },
        ],
    },
    '3': {
        id: '3',
        title: 'Dubai Extravaganza - 4 Days 3 Nights',
        destination: 'Dubai, UAE',
        duration: '4 Days 3 Nights',
        basePrice: 55000,
        discountedPrice: 41250,
        suggestedMargin: 10000,
        imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
        rating: 4.7,
        maxCapacity: 25,
        overview: 'Discover the glamour and opulence of Dubai with visits to iconic landmarks, thrilling desert safaris, and world-class shopping experiences.',
        highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall', 'Palm Jumeirah', 'Dubai Marina'],
        inclusions: [
            '3 nights accommodation in 4-star hotel',
            'Daily breakfast',
            'Airport transfers',
            'Desert safari with BBQ dinner',
            'Dubai city tour',
        ],
        exclusions: [
            'International flights',
            'Lunch and dinner (except safari)',
            'Entry to Burj Khalifa (optional)',
            'Shopping expenses',
            'Travel insurance',
        ],
        itinerary: [
            {
                day: 1,
                title: 'Arrival & Dubai Marina',
                description: 'Arrive in Dubai and get settled before exploring the stunning Dubai Marina area.',
                activities: ['Airport pickup', 'Hotel check-in', 'Dubai Marina walk', 'Dhow cruise dinner (optional)', 'Marina skyline views'],
                meals: 'Breakfast',
                accommodation: 'Dubai Downtown Hotel (4-star)',
            },
            {
                day: 2,
                title: 'City Tour & Desert Safari',
                description: 'Explore Dubai\'s iconic landmarks during a comprehensive city tour, followed by an exciting desert safari.',
                activities: ['Burj Al Arab photo stop', 'Palm Jumeirah monorail', 'Burj Khalifa visit (optional)', 'Dubai Mall visit', 'Evening desert safari', 'Dune bashing & camel ride', 'BBQ dinner under stars'],
                meals: 'Breakfast, Dinner',
                accommodation: 'Dubai Downtown Hotel (4-star)',
            },
            {
                day: 3,
                title: 'Shopping & Modern Dubai',
                description: 'Spend the day exploring Dubai\'s incredible shopping scene and modern attractions.',
                activities: ['Gold & Spice Souk visit', 'Dubai Mall shopping', 'Dubai Fountain show', 'Mall of Emirates', 'Ski Dubai (optional)', 'Evening at Global Village (seasonal)'],
                meals: 'Breakfast',
                accommodation: 'Dubai Downtown Hotel (4-star)',
            },
            {
                day: 4,
                title: 'Departure',
                description: 'Enjoy a leisurely morning before your departure transfer.',
                activities: ['Breakfast at hotel', 'Last-minute shopping', 'Hotel checkout', 'Airport transfer'],
                meals: 'Breakfast',
                accommodation: '-',
            },
        ],
    },
};

export default function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [activeTab, setActiveTab] = useState('itinerary');
    const [numPax, setNumPax] = useState(2);
    const [yourMargin, setYourMargin] = useState(8500);
    const [showPriceCalculator, setShowPriceCalculator] = useState(false);

    const trip = tripData[resolvedParams.id];

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

    // B2B rate is fixed based on PAX - will be customized per trip later
    const b2bRatePerPax = trip.discountedPrice;
    const totalB2BPrice = b2bRatePerPax; // Will be multiplied by PAX once rates are provided

    const clientPrice = totalB2BPrice + yourMargin;
    const marginPercentage = totalB2BPrice > 0 ? ((yourMargin / totalB2BPrice) * 100).toFixed(1) : '0.0';

    const handleDownloadPDF = () => {
        alert(`Downloading PDF brochure with:\n\nNumber of PAX: ${numPax}\nB2B Rate: ₹${totalB2BPrice.toLocaleString()}\nYour Margin: ₹${yourMargin.toLocaleString()}\nClient Price: ₹${clientPrice.toLocaleString()}\n\nPDF generation will be implemented with a backend service.`);
    };

    return (
        <div>
            {/* Back Button */}
            <Link
                href="/dashboard/trips"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-emerald-600 mb-6 font-semibold transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Trips</span>
            </Link>

            {/* Hero Section */}
            <div className="relative h-96 rounded-3xl overflow-hidden mb-8">
                <Image
                    src={trip.imageUrl}
                    alt={trip.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex items-center space-x-3 mb-3">
                        <span className="px-4 py-1.5 bg-emerald-500 rounded-full text-sm font-bold flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{trip.rating}</span>
                        </span>
                        <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                            25% B2B Discount
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">{trip.title}</h1>
                    <div className="flex items-center space-x-6 text-lg">
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5" />
                            <span>{trip.destination}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5" />
                            <span>{trip.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5" />
                            <span>Max {trip.maxCapacity} pax</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Tabs */}
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-2 mb-6 flex space-x-2">
                        {['itinerary', 'overview', 'inclusions'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-3 rounded-xl font-bold capitalize transition-all ${activeTab === tab
                                    ? 'gradient-primary text-white shadow-lg'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                        {activeTab === 'overview' && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip Overview</h2>
                                <p className="text-gray-600 leading-relaxed mb-6">{trip.overview}</p>

                                <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights</h3>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {trip.highlights.map((highlight: string, idx: number) => (
                                        <div key={idx} className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-xl">
                                            <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                            <span className="text-gray-700 font-medium">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'inclusions' && (
                            <div>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
                                    <div className="space-y-3">
                                        {trip.inclusions.map((item: string, idx: number) => (
                                            <div key={idx} className="flex items-start space-x-3 p-4 bg-emerald-50 rounded-xl">
                                                <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Not Included</h2>
                                    <div className="space-y-3">
                                        {trip.exclusions.map((item: string, idx: number) => (
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
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h2>
                                <div className="space-y-6">
                                    {trip.itinerary.map((day: any, idx: number) => (
                                        <div key={idx} className="border-l-4 border-emerald-500 pl-6 pb-6 relative">
                                            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white" />

                                            <div className="bg-gradient-to-r from-emerald-50 to-white p-5 rounded-xl mb-3">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900">Day {day.day}: {day.title}</h3>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                        <div className="flex items-center space-x-1">
                                                            <Utensils className="w-4 h-4 text-emerald-600" />
                                                            <span className="font-semibold">{day.meals}</span>
                                                        </div>
                                                        {day.accommodation !== '-' && (
                                                            <div className="flex items-center space-x-1">
                                                                <Hotel className="w-4 h-4 text-emerald-600" />
                                                                <span className="font-semibold">Hotel</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 leading-relaxed">{day.description}</p>
                                            </div>

                                            <div className="space-y-2">
                                                {day.activities.map((activity: string, actIdx: number) => (
                                                    <div key={actIdx} className="flex items-start space-x-2 text-gray-700">
                                                        <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                                                        <span>{activity}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {day.accommodation !== '-' && (
                                                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                                    <p className="text-sm text-gray-700">
                                                        <span className="font-semibold">Accommodation:</span> {day.accommodation}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pricing Sidebar */}
                <div>
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sticky top-8">
                        <div className="mb-6">
                            <p className="text-sm text-gray-600 mb-1">Our B2B Price (25% OFF):</p>
                            <p className="text-3xl font-bold text-gradient">₹{trip.discountedPrice.toLocaleString()}</p>
                            <p className="text-sm text-gray-500 line-through">₹{trip.basePrice.toLocaleString()}</p>
                        </div>

                        {/* Price Calculator */}
                        <div className="border-2 border-emerald-200 rounded-xl p-4 mb-6 bg-emerald-50/30">
                            <button
                                onClick={() => setShowPriceCalculator(!showPriceCalculator)}
                                className="w-full flex items-center justify-between mb-3"
                            >
                                <div className="flex items-center space-x-2">
                                    <Calculator className="w-5 h-5 text-emerald-600" />
                                    <span className="font-bold text-gray-900">Calculate Your Price</span>
                                </div>
                                <span className="text-emerald-600 font-bold">{showPriceCalculator ? '−' : '+'}</span>
                            </button>

                            {showPriceCalculator && (
                                <div className="space-y-4 mt-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Number of Passengers
                                        </label>
                                        <select
                                            value={numPax}
                                            onChange={(e) => setNumPax(Number(e.target.value))}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="p-3 bg-gray-100 rounded-lg">
                                        <p className="text-xs text-gray-600 mb-1">Our B2B Rate (Fixed):</p>
                                        <p className="text-2xl font-bold text-gray-900">₹{totalB2BPrice.toLocaleString()}</p>
                                        <p className="text-xs text-gray-500 mt-1">For {numPax} {numPax === 1 ? 'person' : 'people'}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Add Your Margin (₹)
                                        </label>
                                        <input
                                            type="number"
                                            value={yourMargin}
                                            onChange={(e) => setYourMargin(Number(e.target.value))}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="Enter your margin"
                                        />
                                        <p className="text-xs text-gray-600 mt-1">Margin: {marginPercentage}% of B2B rate</p>
                                    </div>

                                    <div className="pt-3 border-t-2 border-gray-200">
                                        <p className="text-sm text-gray-600 mb-1">Client Sees:</p>
                                        <p className="text-3xl font-bold text-emerald-600">₹{clientPrice.toLocaleString()}</p>
                                        <p className="text-xs text-gray-500 mt-1">Total for {numPax} {numPax === 1 ? 'person' : 'people'}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3 mb-6">
                            <button
                                onClick={handleDownloadPDF}
                                className="w-full gradient-primary text-white py-3.5 rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center space-x-2"
                            >
                                <Download className="w-5 h-5" />
                                <span>Download PDF Brochure</span>
                            </button>
                            <button className="w-full border-2 border-emerald-500 text-emerald-600 py-3.5 rounded-xl font-bold hover:bg-emerald-50 transition-all flex items-center justify-center space-x-2">
                                <Send className="w-5 h-5" />
                                <span>Send to Client</span>
                            </button>
                        </div>

                        <div className="border-t-2 border-gray-200 pt-4">
                            <p className="text-xs text-gray-500 text-center leading-relaxed">
                                Set your cost and margin above to generate a custom PDF with your pricing
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
