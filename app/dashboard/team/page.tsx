import { Users, Mail, Phone, Shield, Plus } from 'lucide-react';

export default function TeamPage() {
    const teamMembers = [
        {
            name: 'Demo User',
            email: 'admin@gmail.com',
            phone: '+91 98765 43210',
            role: 'Admin',
            status: 'active',
            avatar: 'D',
        },
        {
            name: 'Sarah Johnson',
            email: 'sarah@company.com',
            phone: '+91 98765 43211',
            role: 'Manager',
            status: 'active',
            avatar: 'S',
        },
        {
            name: 'Mike Chen',
            email: 'mike@company.com',
            phone: '+91 98765 43212',
            role: 'Agent',
            status: 'active',
            avatar: 'M',
        },
        {
            name: 'Priya Sharma',
            email: 'priya@company.com',
            phone: '+91 98765 43213',
            role: 'Agent',
            status: 'active',
            avatar: 'P',
        },
    ];

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Members</h1>
                    <p className="text-gray-600">Manage your team and their access</p>
                </div>
                <button className="px-6 py-3 gradient-primary text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add Member</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Members', value: '4', color: 'from-emerald-500 to-green-500' },
                    { label: 'Admins', value: '1', color: 'from-green-500 to-teal-500' },
                    { label: 'Managers', value: '1', color: 'from-teal-500 to-emerald-500' },
                    { label: 'Agents', value: '2', color: 'from-emerald-600 to-green-600' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white border-2 border-gray-200 p-6 rounded-2xl hover:shadow-xl hover:border-emerald-300 transition-all">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm text-gray-600 mb-1 font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Team List */}
            <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl">
                <h2 className="text-xl font-bold text-gray-900 mb-6">All Members</h2>
                <div className="grid gap-4">
                    {teamMembers.map((member, idx) => (
                        <div key={idx} className="border-2 border-gray-200 p-6 rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xl">
                                    {member.avatar}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <div className="flex items-center space-x-1">
                                            <Mail className="w-4 h-4 text-emerald-600" />
                                            <span>{member.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Phone className="w-4 h-4 text-emerald-600" />
                                            <span>{member.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 rounded-full">
                                    <Shield className="w-4 h-4 text-emerald-600" />
                                    <span className="text-sm font-semibold text-emerald-700">{member.role}</span>
                                </div>
                                <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
                                    {member.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
