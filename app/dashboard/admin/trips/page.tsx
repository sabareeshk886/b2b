'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Edit, Trash2, MapPin, FileText, ChevronRight } from 'lucide-react';

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
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#222222] mb-2 tracking-tight">Trip Management</h1>
                    <p className="text-[#717171] font-medium uppercase text-[10px] tracking-widest">Administrator Control Panel</p>
                </div>
                <Link
                    href="/dashboard/admin/trips/add"
                    className="h-12 px-6 bg-[#222222] text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-black transition-all flex items-center space-x-2 shadow-md hover:shadow-lg active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New Trip</span>
                </Link>
            </div>

            {/* Premium Search & Stats Bar */}
            <div className="bg-white border border-[#EBEBEB] rounded-[2rem] p-8 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                    {/* Pill Search */}
                    <div className="flex-1">
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717171] group-focus-within:text-[#222222] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by ID, Title, or Destination..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-full font-bold text-[#222222] placeholder-[#717171] focus:bg-white focus:border-[#222222] focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Stats Pill */}
                    <div className="flex flex-wrap items-center gap-6 px-8 py-4 bg-gray-50 border border-[#EBEBEB] rounded-3xl">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-[#717171] uppercase tracking-tighter">Total</span>
                            <span className="text-lg font-black text-[#222222] leading-none">{stats.total}</span>
                        </div>
                        <div className="w-px h-6 bg-[#EBEBEB]" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-[#717171] uppercase tracking-tighter text-blue-500">North</span>
                            <span className="text-lg font-black text-[#222222] leading-none">{stats.north}</span>
                        </div>
                        <div className="w-px h-6 bg-[#EBEBEB]" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-[#717171] uppercase tracking-tighter text-orange-500">Rajasthan</span>
                            <span className="text-lg font-black text-[#222222] leading-none">{stats.rajasthan}</span>
                        </div>
                        <button className="flex items-center space-x-2 text-xs font-black text-[#222222] uppercase tracking-[0.2em] ml-4 hover:opacity-70 transition-opacity">
                            <Filter className="w-4 h-4" />
                            <span>Filter</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Trips Table Card */}
            <div className="bg-white border border-[#EBEBEB] rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white border-b border-[#EBEBEB]">
                            <tr>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-[#717171] uppercase tracking-[0.2em]">Code</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-[#717171] uppercase tracking-[0.2em]">Trip Details</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-[#717171] uppercase tracking-[0.2em]">Region</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-[#717171] uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-[#717171] uppercase tracking-[0.2em]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EBEBEB]">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#222222] mb-4"></div>
                                            <p className="text-[10px] font-black text-[#717171] uppercase tracking-widest">Fetching Vault Data...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredTrips.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <p className="text-[#717171] font-bold">No trips found in the registry.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredTrips.map((trip) => (
                                    <tr key={trip.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <span className="font-black text-[#222222] text-sm tracking-tight">{trip.code}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <Link 
                                                    href={`/dashboard/trips/${trip.id}`}
                                                    className="font-bold text-[#222222] hover:text-[#006A4E] transition-colors leading-tight mb-1"
                                                >
                                                    {trip.title}
                                                </Link>
                                                <div className="flex items-center space-x-2 text-[10px] text-[#717171] font-black uppercase tracking-tighter">
                                                    <MapPin className="w-3 h-3 text-[#006A4E]" />
                                                    <span>{trip.durationDays}D / {trip.durationNights}N • {trip.destinations.slice(0, 2).join(', ')}{trip.destinations.length > 2 && '...'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 bg-gray-100 text-[#222222] rounded-md text-[10px] font-black uppercase tracking-widest border border-gray-200">
                                                {trip.region}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                                                trip.isActive 
                                                ? 'bg-emerald-50 text-[#006A4E] border-[#006A4E]/20' 
                                                : 'bg-gray-50 text-[#717171] border-gray-200'
                                            }`}>
                                                {trip.isActive ? 'Active' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-end space-x-2">
                                                {trip.pdfUrl && (
                                                    <a
                                                        href={trip.pdfUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                                                        title="Brochure"
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                    </a>
                                                )}
                                                <Link
                                                    href={`/dashboard/admin/trips/${trip.id}/edit`}
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-[#222222]"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#222222] transition-colors ml-2" />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
