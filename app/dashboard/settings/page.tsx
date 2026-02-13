import { Building2, User, Bell, Lock, CreditCard, Globe } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                <p className="text-gray-600">Manage your account and company settings</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Company Profile */}
                <div className="lg:col-span-2 bg-white border-2 border-gray-200 p-6 rounded-2xl">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Company Profile</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                            <input
                                type="text"
                                defaultValue="Wanderlust Travels"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                defaultValue="admin@gmail.com"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                            <input
                                type="tel"
                                defaultValue="+91 98765 43210"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                            <textarea
                                rows={3}
                                defaultValue="123 Travel Street, Mumbai, India"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>
                        <button className="w-full gradient-primary text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all">
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Quick Settings */}
                <div className="space-y-6">
                    {/* Account Settings */}
                    <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                <User className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h3 className="font-bold text-gray-900">Account</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Manage your personal information</p>
                        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
                            Edit Profile →
                        </button>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <Bell className="w-5 h-5 text-green-600" />
                            </div>
                            <h3 className="font-bold text-gray-900">Notifications</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Configure notification preferences</p>
                        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
                            Configure →
                        </button>
                    </div>

                    {/* Security */}
                    <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                                <Lock className="w-5 h-5 text-teal-600" />
                            </div>
                            <h3 className="font-bold text-gray-900">Security</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Update password and security settings</p>
                        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
                            Manage →
                        </button>
                    </div>

                    {/* Billing */}
                    <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-gray-900">Billing</h3>
                        </div>
                        <div className="mb-3">
                            <p className="text-sm text-gray-600">Current Plan</p>
                            <p className="text-lg font-bold text-gradient">Premium</p>
                        </div>
                        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
                            Manage Plan →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
