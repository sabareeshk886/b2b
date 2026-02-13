'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, Mail, Lock, Building2, Phone, MapPin, FileText, ArrowRight, Eye, EyeOff, User } from 'lucide-react';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        companyName: '',
        companyEmail: '',
        companyPhone: '',
        address: '',
        licenseNumber: '',
        gstNumber: '',
        userName: '',
        userEmail: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 px-4">
            <div className="container mx-auto max-w-2xl">
                {/* Header */}
                <Link href="/" className="inline-flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 rounded-xl gradient-ocean flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gradient">Fernway B2B</span>
                </Link>

                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-12 h-12 rounded-full ${step >= 1 ? 'gradient-primary shadow-lg' : 'bg-gray-300'} flex items-center justify-center text-white font-bold text-lg`}>
                                1
                            </div>
                            <span className="ml-3 font-semibold hidden sm:inline">Company Details</span>
                        </div>
                        <div className="flex-1 h-1.5 mx-4 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full ${step >= 2 ? 'gradient-primary' : 'bg-gray-200'} rounded-full transition-all duration-500`} style={{ width: step >= 2 ? '100%' : '0%' }}></div>
                        </div>
                        <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-12 h-12 rounded-full ${step >= 2 ? 'gradient-primary shadow-lg' : 'bg-gray-300'} flex items-center justify-center text-white font-bold text-lg`}>
                                2
                            </div>
                            <span className="ml-3 font-semibold hidden sm:inline">User Details</span>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="glass p-8 rounded-3xl border-2 border-blue-100">
                    <h1 className="text-3xl font-bold mb-2 text-gray-800">
                        {step === 1 ? 'Company Information' : 'Create Your Account'}
                    </h1>
                    <p className="text-gray-600 mb-8">
                        {step === 1 ? 'Tell us about your travel company' : 'Setup your admin account'}
                    </p>

                    <form onSubmit={handleSubmit}>
                        {step === 1 ? (
                            <>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Company Name *
                                        </label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="Your Travel Company Ltd."
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Company Email *
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="companyEmail"
                                                    value={formData.companyEmail}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                    placeholder="info@company.com"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Phone Number *
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    name="companyPhone"
                                                    value={formData.companyPhone}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                    placeholder="+91 98765 43210"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Business Address
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="Street, City, State, ZIP"
                                                rows={3}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Tourism License Number
                                            </label>
                                            <div className="relative">
                                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="licenseNumber"
                                                    value={formData.licenseNumber}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                    placeholder="TL123456"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                GST Number
                                            </label>
                                            <div className="relative">
                                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="gstNumber"
                                                    value={formData.gstNumber}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                    placeholder="29ABCDE1234F1Z5"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="w-full mt-8 gradient-primary text-white py-3.5 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center text-lg"
                                >
                                    Continue
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Your Name *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="userName"
                                                value={formData.userName}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                name="userEmail"
                                                value={formData.userEmail}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="john@company.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Confirm Password *
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <input type="checkbox" className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500" required />
                                        <span className="ml-2 text-sm text-gray-600">
                                            I agree to the <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-semibold">Terms of Service</Link>{' '}
                                            and <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-semibold">Privacy Policy</Link>
                                        </span>
                                    </div>
                                </div>

                                <div className="flex space-x-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex-1 border-2 border-gray-300 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-all"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 gradient-primary text-white py-3.5 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center"
                                    >
                                        Create Account
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </button>
                                </div>
                            </>
                        )}
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
