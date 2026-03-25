'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Edit, Trash2, Eye, MapPin, FileText } from 'lucide-react';

type Trip = {
    id: string;
    code: string;
    title: string;
    region: string;
    destinations: string[];
    durationDays: number;
    durationNights: number;
    isActive: boolean;
    featured: boolean;
    pdfUrl?: string | null;
};

export default function AdminTripsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [regionFilter, setRegionFilter] = useState('ALL');
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);

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

    const filteredTrips = trips.filter((trip) => {
        const matchesRegion = regionFilter === 'ALL' || trip.region === regionFilter;
        const matchesSearch = searchQuery === '' ||
            trip.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trip.destinations.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesRegion && matchesSearch;
    });

    const stats = {
        total: trips.length,
        north: trips.filter(t => t.region === 'NORTH').length,
        rajasthan: trips.filter(t => t.region === 'RAJASTHAN').length,
        mumbai: trips.filter(t => t.region === 'MUMBAI').length,
    };

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Trip Management</h1>
                    <p className="text-gray-600">Manage all B2B itineraries</p>
                </div>
                <Link
                    href="/dashboard/admin/trips/add"
                    className="px-6 py-3 gradient-primary text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New Trip</span>
                </Link>
            </div>

            {/* Search & Filters */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by code, title, or destination..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        />
                    </div>
                    <select
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                        className="px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    >
                        <option value="ALL">All Regions</option>
                        <option value="NORTH">North India</option>
                        <option value="RAJASTHAN">Rajasthan</option>
                        <option value="MUMBAI">Mumbai</option>
                    </select>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t-2 border-gray-200">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-emerald-600">{stats.total}</p>
                        <p className="text-sm text-gray-600">Total Trips</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{stats.north}</p>
                        <p className="text-sm text-gray-600">North India</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-teal-600">{stats.rajasthan}</p>
                        <p className="text-sm text-gray-600">Rajasthan</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{stats.mumbai}</p>
                        <p className="text-sm text-gray-600">Mumbai</p>
                    </div>
                </div>
            </div>

            {/* Trips Table */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Code</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Title</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Region</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Duration</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                            <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    Loading trips...
                                </td>
                            </tr>
                        ) : (
                            filteredTrips.map((trip) => (
                                <tr key={trip.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="font-mono font-bold text-emerald-600">{trip.code}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-gray-900">{trip.title}</p>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                                                <MapPin className="w-3 h-3" />
                                                <span>{trip.destinations.join(', ')}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                            {trip.region}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                        {trip.durationDays}D/{trip.durationNights}N
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${trip.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {trip.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end space-x-2">
                                            {trip.pdfUrl && (
                                                <a
                                                    href={trip.pdfUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                                                    title="View PDF Itinerary"
                                                >
                                                    <FileText className="w-5 h-5" />
                                                </a>
                                            )}
                                            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600">
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <Link
                                                href={`/dashboard/admin/trips/${trip.id}/edit`}
                                                className="p-2 hover:bg-emerald-50 rounded-lg transition-colors text-emerald-600"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                            <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>


                {/* Empty State */}
                {!loading && filteredTrips.length === 0 && (
                    <div className="text-center py-20 px-6">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <MapPin className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No trips found</h3>
                        <p className="text-gray-600 mb-6">Start by creating your first trip</p>
                        <Link
                            href="/dashboard/admin/trips/add"
                            className="inline-flex items-center space-x-2 px-6 py-3 gradient-primary text-white rounded-xl font-bold hover:shadow-xl transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add New Trip</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
