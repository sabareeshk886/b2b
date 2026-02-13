'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login:', { email, password });
        // Redirect to dashboard for demo
        window.location.href = '/dashboard';
    };

    const fillDemoCredentials = () => {
        setEmail('admin@gmail.com');
        setPassword('admin');
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <Link href="/" className="inline-flex items-center space-x-3 mb-8">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gradient">B2B</span>
                    </Link>

                    <h1 className="text-4xl font-bold mb-2 text-gray-800">Welcome Back!</h1>
                    <p className="text-gray-600 mb-8">Sign in to access your B2B portal</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                    placeholder="you@company.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
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

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={fillDemoCredentials}
                            className="w-full border-2 border-emerald-500 text-emerald-600 py-3.5 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center text-lg"
                        >
                            Use Demo Credentials
                        </button>

                        <button
                            type="submit"
                            className="w-full gradient-primary text-white py-3.5 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center text-lg"
                        >
                            Sign In
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>

                        <p className="text-xs text-center text-gray-500">
                            Demo: <span className="font-semibold">admin@gmail.com</span> / <span className="font-semibold">admin</span>
                        </p>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-emerald-600 font-semibold hover:text-emerald-700">
                                Register Now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Green Gradient */}
            <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12 text-white relative overflow-hidden">
                <div className="max-w-lg relative z-10">
                    <h2 className="text-5xl font-bold mb-6">Grow Your Travel Business</h2>
                    <p className="text-xl opacity-95 mb-8 font-light leading-relaxed">
                        Access exclusive B2B rates, generate instant quotes, and manage bookings with ease.
                    </p>
                    <div className="space-y-4">
                        {['150+ Destinations', 'Up to 30% B2B Discount', 'White-Label Brochures'].map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-3 glass-dark p-4 rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                                <span className="text-lg font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
