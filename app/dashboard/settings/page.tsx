import { Building2, User, Bell, Lock, CreditCard, Globe } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold text-[#222222] mb-1">Settings</h1>
                <p className="text-[#717171] font-medium">Manage your agency profile, team access, and billing</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Company Profile */}
                <div className="lg:col-span-2 bg-white border border-[#EBEBEB] p-8 rounded-3xl">
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-[#EBEBEB]">
                            <Building2 className="w-6 h-6 text-[#222222]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#222222]">Agency Profile</h2>
                            <p className="text-sm text-[#717171] font-medium">Update your public business information</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-[#222222] mb-2 uppercase tracking-tight">Agency Name</label>
                                <input
                                    type="text"
                                    defaultValue="Wanderlust Travels"
                                    className="w-full px-4 py-3 border border-[#EBEBEB] rounded-xl focus:outline-none focus:border-[#222222] transition-colors font-medium text-[#222222]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#222222] mb-2 uppercase tracking-tight">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue="admin@gmail.com"
                                    className="w-full px-4 py-3 border border-[#EBEBEB] rounded-xl focus:outline-none focus:border-[#222222] transition-colors font-medium text-[#222222]"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#222222] mb-2 uppercase tracking-tight">Phone Number</label>
                            <input
                                type="tel"
                                defaultValue="+91 98765 43210"
                                className="w-full px-4 py-3 border border-[#EBEBEB] rounded-xl focus:outline-none focus:border-[#222222] transition-colors font-medium text-[#222222]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#222222] mb-2 uppercase tracking-tight">Business Address</label>
                            <textarea
                                rows={3}
                                defaultValue="123 Travel Street, Mumbai, India"
                                className="w-full px-4 py-3 border border-[#EBEBEB] rounded-xl focus:outline-none focus:border-[#222222] transition-colors font-medium text-[#222222] resize-none"
                            />
                        </div>
                        <div className="pt-4">
                            <button className="px-10 py-3.5 bg-[#222222] text-white rounded-xl font-bold hover:bg-black transition-all shadow-md active:scale-95">
                                Save Agency Changes
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Settings */}
                <div className="space-y-6">
                    {/* Billing */}
                    <div className="bg-[#222222] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-4">
                                <CreditCard className="w-5 h-5 text-emerald-400" />
                                <h3 className="font-bold uppercase tracking-widest text-xs">Current Plan</h3>
                            </div>
                            <p className="text-3xl font-bold mb-2">PREMIUM</p>
                            <p className="text-sm text-gray-400 font-medium mb-6">Enjoy 25% flat discount on all wholesale itineraries.</p>
                            <button className="text-sm font-black text-white hover:underline flex items-center">
                                Manage Subscription <Globe className="w-3 h-3 ml-2" />
                            </button>
                        </div>
                        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                    </div>

                    {[
                        { label: 'Security', icon: Lock, desc: 'Passwords and 2FA', color: 'text-orange-600 bg-orange-50' },
                        { label: 'Notifications', icon: Bell, desc: 'Email and alerts', color: 'text-blue-600 bg-blue-50' },
                        { label: 'Personal Access', icon: User, desc: 'Member permissions', color: 'text-purple-600 bg-purple-50' },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white border border-[#EBEBEB] p-6 rounded-2xl hover:shadow-airbnb transition-all cursor-pointer group">
                            <div className="flex items-center space-x-4">
                                <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-[#222222]">{item.label}</h3>
                                    <p className="text-xs text-[#717171] font-medium">{item.desc}</p>
                                </div>
                                <button className="text-xs font-bold text-[#222222] group-hover:underline">Manage</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

