import Link from 'next/link';
import { ArrowRight, Globe, Shield, TrendingUp, Users, Zap, CreditCard, Sparkles, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';
import { db } from '@/db';
import { trips } from '@/db/schema';

export default async function HomePage() {
    const featuredTrips = await db.select().from(trips).limit(8);
    
    // Helper to get a rich fallback image based on region
    const getTripImg = (region: string, code: string) => {
        const hash = code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        if (region.includes('NORTH') || region.includes('AGRA') || region.includes('DELHI')) {
            const arr = [
                'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
                'https://images.unsplash.com/photo-1587474265402-9e6b7d584844?w=800&q=80',
                'https://images.unsplash.com/photo-1596396825227-817882209772?w=800&q=80',
                'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80'
            ];
            return arr[hash % arr.length];
        }
        return 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80';
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
                <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gradient">B2B</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/login" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                            Login
                        </Link>
                        <Link href="/register" className="px-6 py-2.5 gradient-primary text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
                            Get Started
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 gradient-hero text-white">
                <div className="container mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 mb-6 px-5 py-2.5 glass-dark rounded-full text-sm font-semibold animate-float">
                        <Sparkles className="w-4 h-4" />
                        <span>Trusted by 500+ Travel Companies Worldwide</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                        Your Gateway to
                        <br />
                        <span className="text-white">Premium Travel</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto font-light">
                        Access exclusive wholesale rates, customize brochures with your branding, and grow your travel business with our comprehensive B2B platform.
                    </p>

                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <Link href="/register" className="group px-8 py-4 bg-white text-emerald-600 rounded-full font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center text-lg">
                            Start Your Journey
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="#features" className="px-8 py-4 glass-dark border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 text-lg">
                            Explore Features
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            { label: 'Destinations', value: '150+' },
                            { label: 'Trip Packages', value: '500+' },
                            { label: 'Partner Companies', value: '500+' },
                            { label: 'B2B Discount', value: 'Up to 30%' },
                        ].map((stat, idx) => (
                            <div key={idx} className="glass-dark border-2 border-white/20 p-6 rounded-2xl premium-card hover:bg-white/10">
                                <div className="text-4xl font-bold text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-medium text-white/80">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Trips Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="container mx-auto">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Featured <span className="text-emerald-600">Packages</span></h2>
                            <p className="text-xl text-gray-600 font-light">Explore our newest wholesale itineraries</p>
                        </div>
                        <Link href="/register" className="hidden md:inline-flex items-center text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
                            View All <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredTrips.map((trip) => (
                            <div key={trip.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden group">
                                <div className="h-48 md:h-56 bg-gray-200 relative overflow-hidden">
                                    <Image
                                        src={getTripImg(trip.region || '', trip.code)}
                                        alt={trip.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-gray-900 shadow-lg border border-gray-100 uppercase tracking-wide">
                                        {trip.code}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                                    <div className="absolute bottom-4 left-4 text-white font-medium flex items-center shadow-sm">
                                        <MapPin className="w-4 h-4 mr-1 text-emerald-400 drop-shadow-md" />
                                        <span className="drop-shadow-md font-bold uppercase tracking-wider text-sm">{trip.region}</span>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                        {trip.title}
                                    </h3>

                                    <div className="flex items-center text-sm text-gray-500 mb-6 mt-auto">
                                        {(trip.durationDays !== null && trip.durationDays > 0) && (
                                            <div className="flex items-center bg-orange-50 text-orange-700 px-3 py-1.5 rounded-lg font-bold">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>{trip.durationDays} Days / {trip.durationNights} Nights</span>
                                            </div>
                                        )}
                                    </div>

                                    <Link href="/register" className="w-full bg-gray-50 text-gray-700 py-3 rounded-xl font-bold text-sm flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all border border-gray-100 group-hover:border-emerald-600">
                                        Login for B2B Pricing
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold mb-4">
                            Why Choose <span className="text-gradient">B2B</span>
                        </h2>
                        <p className="text-xl text-gray-600 font-light">Everything you need to scale your travel business</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: TrendingUp,
                                title: 'Exclusive B2B Rates',
                                description: 'Get up to 30% discount on all trips. Custom pricing tiers available for premium partners.',
                            },
                            {
                                icon: Zap,
                                title: 'Instant Quotes',
                                description: 'Generate professional quotes in seconds with automated pricing and custom branding.',
                            },
                            {
                                icon: Shield,
                                title: 'White-Label Brochures',
                                description: 'Download beautifully designed PDFs with your company logo and branding.',
                            },
                            {
                                icon: Users,
                                title: 'Multi-User Access',
                                description: 'Add unlimited team members with role-based permissions and access control.',
                            },
                            {
                                icon: CreditCard,
                                title: 'Flexible Payment',
                                description: 'Net payment terms available for established partners. No upfront costs.',
                            },
                            {
                                icon: Globe,
                                title: '150+ Destinations',
                                description: 'Comprehensive catalog covering international and domestic destinations worldwide.',
                            },
                        ].map((feature, idx) => (
                            <div key={idx} className="group bg-white border-2 border-gray-200 p-8 rounded-3xl hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 cursor-pointer premium-card">
                                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="container mx-auto text-center">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">Simple. Fast. Powerful.</h2>
                    <p className="text-xl text-gray-600 mb-16 font-light">Get started in 3 easy steps</p>

                    <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {[
                            { step: '01', title: 'Create Account', description: 'Sign up with your company details and get instant approval', icon: Users },
                            { step: '02', title: 'Browse & Select', description: 'Explore our extensive catalog and select trips for your clients', icon: Globe },
                            { step: '03', title: 'Quote & Book', description: 'Generate branded quotes and manage bookings effortlessly', icon: Zap },
                        ].map((item, idx) => (
                            <div key={idx} className="relative bg-white border-2 border-gray-200 p-8 rounded-3xl premium-card hover:border-emerald-400 transition-all">
                                <div className="text-7xl font-bold text-emerald-50 mb-4">{item.step}</div>
                                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 mx-auto shadow-lg">
                                    <item.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 gradient-hero text-white">
                <div className="container mx-auto">
                    <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 p-12 md:p-16 rounded-3xl text-center max-w-4xl mx-auto shadow-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Ready to <span className="text-white">Elevate</span> Your Business?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 font-light">
                            Join hundreds of successful travel companies using B2B
                        </p>
                        <Link href="/register" className="inline-flex items-center px-10 py-4 bg-white text-emerald-600 rounded-full font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg">
                            Get Started Now
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-gray-200 bg-white">
                <div className="container mx-auto text-center">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                            <Globe className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl text-gradient">B2B</span>
                    </div>
                    <p className="text-gray-600">&copy; 2026 B2B. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
