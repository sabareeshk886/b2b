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
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Bookings</h1>
                <p className="text-gray-600">Manage all your customer bookings</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Bookings', value: '24', icon: Package, color: 'from-emerald-500 to-green-500' },
                    { label: 'Confirmed', value: '18', icon: Calendar, color: 'from-green-500 to-teal-500' },
                    { label: 'Pending', value: '4', icon: Clock, color: 'from-teal-500 to-emerald-500' },
                    { label: 'Total PAX', value: '52', icon: Users, color: 'from-emerald-600 to-green-600' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white border-2 border-gray-200 p-6 rounded-2xl hover:shadow-xl hover:border-emerald-300 transition-all">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                            <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm text-gray-600 mb-1 font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Bookings List */}
            <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
                <div className="space-y-4">
                    {bookings.map((booking, idx) => (
                        <div key={idx} className="border-2 border-gray-200 p-6 rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{booking.customer}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                                                'bg-amber-100 text-amber-700'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 font-medium">{booking.id}</p>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{booking.amount}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <MapPin className="w-4 h-4 text-emerald-600" />
                                    <span>{booking.destination}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Calendar className="w-4 h-4 text-emerald-600" />
                                    <span>{booking.travelDate}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Users className="w-4 h-4 text-emerald-600" />
                                    <span>{booking.pax} PAX</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
