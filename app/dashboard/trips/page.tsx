'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, MapPin, Calendar, Users, TrendingDown, Star } from 'lucide-react';
import Image from 'next/image';

const trips = [
    {
        id: '1',
        title: 'Bali Paradise - 6 Days 5 Nights',
        destination: 'Bali, Indonesia',
        duration: 6,
        basePrice: 45000,
        discountedPrice: 33750,
        imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
        highlights: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Seminyak Beach'],
        maxCapacity: 20,
        rating: 4.8,
    },
    {
        id: '2',
        title: 'Maldives Luxury Escape - 5 Days 4 Nights',
        destination: 'Maldives',
        duration: 5,
        basePrice: 85000,
        discountedPrice: 63750,
        imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
        highlights: ['Overwater Bungalows', 'Coral Reefs', 'Spa Retreats'],
        maxCapacity: 15,
        rating: 4.9,
    },
    {
        id: '3',
        title: 'Dubai Extravaganza - 4 Days 3 Nights',
        destination: 'Dubai, UAE',
        duration: 4,
        basePrice: 55000,
        discountedPrice: 41250,
        imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
        highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall'],
        maxCapacity: 25,
        rating: 4.7,
    },
    {
        id: '4',
        title: 'Swiss Alps Adventure - 7 Days 6 Nights',
        destination: 'Switzerland',
        duration: 7,
        basePrice: 125000,
        discountedPrice: 93750,
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        highlights: ['Swiss Alps', 'Interlaken', 'Lucerne'],
        maxCapacity: 18,
        rating: 4.9,
    },
    {
        id: '5',
        title: 'Amazing Thailand - 6 Days 5 Nights',
        destination: 'Bangkok & Phuket, Thailand',
        duration: 6,
        basePrice: 38000,
        discountedPrice: 28500,
        imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80',
        highlights: ['Grand Palace', 'Floating Market', 'Phi Phi Islands'],
        maxCapacity: 30,
        rating: 4.6,
    },
];

export default function TripsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Trip Catalog</h1>
                <p className="text-gray-600 text-lg">Browse and select trips for your customers</p>
            </div>

            {/* Search & Filters */}
            <div className="glass p-6 rounded-2xl mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search destinations, trips..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                    </div>
                    <button className="flex items-center space-x-2 px-6 py-3.5 glass rounded-xl hover:shadow-lg transition-all border-2 border-gray-200 font-semibold">
                        <Filter className="w-5 h-5" />
                        <span>Filters</span>
                    </button>
                </div>

                {/* Filter Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {['All Destinations', 'Asia', 'Europe', 'Middle East', '< 5 Days', '5-7 Days', '7+ Days'].map((tag, idx) => (
                        <button
                            key={idx}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${idx === 0
                                ? 'gradient-primary text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Trip Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip) => (
                    <div key={trip.id} className="glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all group cursor-pointer premium-card">
                        {/* Trip Image */}
                        <div className="relative h-52 overflow-hidden">
                            <Image
                                src={trip.imageUrl}
                                alt={trip.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 px-3 py-1.5 gradient-accent rounded-full text-white text-xs font-bold shadow-lg">
                                25% OFF
                            </div>
                            <div className="absolute top-4 left-4 px-3 py-1.5 glass-dark rounded-full text-white text-xs font-bold flex items-center space-x-1">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <span>{trip.rating}</span>
                            </div>
                        </div>

                        {/* Trip Details */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                                {trip.title}
                            </h3>

                            <div className="flex items-center text-sm text-gray-600 mb-4 font-medium">
                                <MapPin className="w-4 h-4 mr-1.5 text-blue-500" />
                                {trip.destination}
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-600 mb-4 font-medium">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1.5 text-orange-500" />
                                    {trip.duration} Days
                                </div>
                                <div className="flex items-center">
                                    <Users className="w-4 h-4 mr-1.5 text-cyan-500" />
                                    Max {trip.maxCapacity}
                                </div>
                            </div>

                            {/* Highlights */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {trip.highlights.slice(0, 2).map((highlight, idx) => (
                                    <span key={idx} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-semibold border border-blue-100">
                                        {highlight}
                                    </span>
                                ))}
                            </div>

                            {/* Pricing */}
                            <div className="border-t-2 border-gray-100 pt-4">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 line-through font-medium">₹{trip.basePrice.toLocaleString()}</p>
                                        <p className="text-2xl font-bold text-gradient">₹{trip.discountedPrice.toLocaleString()}</p>
                                        <p className="text-xs text-gray-600 font-semibold">B2B Price</p>
                                    </div>
                                    <Link href={`/dashboard/trips/${trip.id}`} className="px-5 py-2.5 gradient-primary text-white rounded-full font-bold hover:shadow-xl transition-all hover:scale-105 text-sm">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats Footer */}
            <div className="mt-8 glass p-6 rounded-2xl border-2 border-blue-100">
                <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                        <p className="text-4xl font-bold text-gradient mb-1">{trips.length}</p>
                        <p className="text-sm text-gray-600 font-semibold">Available Trips</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-gradient mb-1">150+</p>
                        <p className="text-sm text-gray-600 font-semibold">Destinations</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <div>
                            <p className="text-4xl font-bold text-gradient-sunset mb-1">25%</p>
                            <p className="text-sm text-gray-600 font-semibold">Your Discount</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
