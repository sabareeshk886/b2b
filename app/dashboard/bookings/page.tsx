import { Calendar, Package, MapPin, Users, Clock } from 'lucide-react';

export default function BookingsPage() {
    const bookings = [
        {
            id: 'BK-001',
            customer: 'Rajesh Kumar',
            destination: 'Bali Paradise - 7 Days',
            travelDate: '15 Mar 2026',
            pax: 2,
            amount: '₹45,000',
            status: 'confirmed',
        },
        {
            id: 'BK-002',
            customer: 'Priya Sharma',
            destination: 'Dubai Extravaganza - 5 Days',
            travelDate: '22 Mar 2026',
            pax: 4,
            amount: '₹55,000',
            status: 'pending',
        },
        {
            id: 'BK-003',
            customer: 'Amit Patel',
            destination: 'Maldives Luxury - 6 Days',
            travelDate: '01 Apr 2026',
            pax: 2,
            amount: '₹85,000',
            status: 'confirmed',
        },
    ];

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold text-[#222222] mb-1">Bookings</h1>
                <p className="text-[#717171] font-medium">Manage and track your active customer trips</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Bookings', value: '24', icon: Package, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Confirmed', value: '18', icon: Calendar, color: 'text-[#006A4E] bg-emerald-50' },
                    { label: 'Pending', value: '4', icon: Clock, color: 'text-orange-600 bg-orange-50' },
                    { label: 'Total PAX', value: '52', icon: Users, color: 'text-purple-600 bg-purple-50' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white border border-[#EBEBEB] p-6 rounded-2xl hover:shadow-airbnb transition-all cursor-pointer group">
                        <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-[#717171] mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-[#222222]">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Bookings List */}
            <div className="bg-white border border-[#EBEBEB] p-8 rounded-3xl">
                <h2 className="text-xl font-bold text-[#222222] mb-8">Confirmed & Upcoming</h2>
                <div className="space-y-6">
                    {bookings.map((booking, idx) => (
                        <div key={idx} className="group border border-[#EBEBEB] p-6 rounded-2xl hover:border-[#222222] hover:shadow-airbnb transition-all cursor-pointer">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <div className="flex items-center space-x-3 mb-1">
                                        <h3 className="text-lg font-bold text-[#222222]">{booking.customer}</h3>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            booking.status === 'confirmed' ? 'bg-emerald-50 text-[#006A4E]' : 'bg-orange-50 text-orange-600'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#717171] font-bold tracking-tight uppercase">{booking.id}</p>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="text-2xl font-bold text-[#222222]">{booking.amount}</p>
                                    <p className="text-xs text-[#717171] font-medium mt-1">Total Package Price</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#EBEBEB]">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-[#006A4E]" />
                                    </div>
                                    <span className="text-sm font-semibold text-[#222222]">{booking.destination}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                                        <Calendar className="w-4 h-4 text-[#006A4E]" />
                                    </div>
                                    <span className="text-sm font-semibold text-[#222222]">{booking.travelDate}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                                        <Users className="w-4 h-4 text-[#006A4E]" />
                                    </div>
                                    <span className="text-sm font-semibold text-[#222222]">{booking.pax} PAX</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

