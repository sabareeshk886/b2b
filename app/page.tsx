import Navbar from '@/components/Navbar';
import CategoryBar from '@/components/CategoryBar';
import Hero from '@/components/Hero';
import TripCard from '@/components/TripCard';
import { db } from '@/db';
import { trips } from '@/db/schema';
import Link from 'next/link';
import { ArrowRight, Globe, Percent, Palette, Headset } from 'lucide-react';

import { Suspense } from 'react';

// Next.js 15 async searchParams
export default async function HomePage() {
    let featuredTrips: any[] = [];
    
    try {
        const rawTrips = await db.select().from(trips);
        
        // Exclude unpolished 'NORTH' cards globally so they don't get accidentally added during padding
        const allTrips = rawTrips.filter((trip) => {
            const r = trip.region || 'UNKNOWN';
            return r !== 'NORTH' && !trip.title.includes('AGR DL');
        });
        
        // Ensure distinct regions first
        const distinctTrips: typeof allTrips = [];
        const seenRegions = new Set();
        for (const trip of allTrips) {
            const r = trip.region || 'UNKNOWN';
            
            if (!seenRegions.has(r) && distinctTrips.length < 6) {
                seenRegions.add(r);
                distinctTrips.push(trip);
            }
        }

        // Fill remaining slots if we have fewer than 6 distinct regions
        for (const trip of allTrips) {
            if (distinctTrips.length >= 6) break;
            if (!distinctTrips.find(t => t.id === trip.id)) {
                distinctTrips.push(trip);
            }
        }

        // Return exactly 6 cards
        featuredTrips = distinctTrips;
    } catch (error) {
        console.error("Database connection times out during prerender:", error);
    }
    
    // Pulling the rich image mapping directly from dashboard source
    const REGION_IMAGES: Record<string, string[]> = {
    'MUMBAI': ['/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/mum%203.jpg', '/images/catalog/mum%204.jpg', '/images/catalog/mum%205.jpg', '/images/catalog/mum%206.jpg', '/images/catalog/mum%207.jpg'],
    'MATHERAN': ['/images/catalog/mat%201.jpg', '/images/catalog/mat%203.jpg', '/images/catalog/mat%204.jpg', '/images/catalog/mat%205.jpg', '/images/catalog/mat%206.jpg', '/images/catalog/mat%207.jpg', '/images/catalog/mat%209.jpg', '/images/catalog/mat%2010.jpg', '/images/catalog/mat.jpg'],
    'AGRA': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/del%203.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg'],
    'RAJASTHAN': ['/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/raj%203.jpg', '/images/catalog/raj%204.jpg', '/images/catalog/raj%206.jpg', '/images/catalog/raj%207.jpg', '/images/catalog/raj%208.jpg', '/images/catalog/raj%2010.jpg'],
    'PUNJAB': ['/images/catalog/amr%201.jpg', '/images/catalog/amr%202.jpg', '/images/catalog/amr%203.jpg', '/images/catalog/amr%204.jpg', '/images/catalog/amr%205.jpg', '/images/catalog/amr%206.jpg'],
    'CHENNAI': ['/images/catalog/chn%201.jpg', '/images/catalog/chn%202.jpg', '/images/catalog/chn%203.jpg', '/images/catalog/chn%204.jpg'],
    'DELHI': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/del%203.jpg', '/images/catalog/del%204.jpg', '/images/catalog/del%205.jpg'],
    'KASOL': ['/images/catalog/ksl%201.jpg', '/images/catalog/ksl%202.jpg', '/images/catalog/ksl%203.jpg', '/images/catalog/ksl%204.jpg'],
    'MANALI': ['/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg', '/images/catalog/man%203.jpg', '/images/catalog/man%204.jpg', '/images/catalog/man%205.jpg', '/images/catalog/man%206.jpg', '/images/catalog/man%207.jpg', '/images/catalog/man%208.jpg', '/images/catalog/man%209.jpg', '/images/catalog/man%2010.jpg', '/images/catalog/man%2011.jpg'],
    'KERALA': ['/images/catalog/chn%201.jpg', '/images/catalog/chn%202.jpg', '/images/catalog/chn%203.jpg', '/images/catalog/chn%204.jpg'],
    'HIMACHAL': ['/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg', '/images/catalog/man%203.jpg', '/images/catalog/man%204.jpg'],
    'KASHMIR': ['/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg', '/images/catalog/man%203.jpg'],
    'ANDAMAN': ['/images/catalog/chn%201.jpg', '/images/catalog/chn%202.jpg'],
    'SOUTH': ['/images/catalog/chn%201.jpg', '/images/catalog/chn%202.jpg', '/images/catalog/chn%203.jpg', '/images/catalog/chn%204.jpg'],
    'GOA': ['/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/mum%203.jpg'],
    'NORTH': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/del%203.jpg', '/images/catalog/del%204.jpg', '/images/catalog/del%205.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg', '/images/catalog/man%203.jpg'],
    'DUBAI': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
    'BALI': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
    'MALDIVES': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
    'THAI': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
    'EUROPE': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
    'VIETNAM': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
    'SINGAPORE': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
    'DEFAULT': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
    };

    const getTripImage = (trip: any) => {
        const seedStr = trip.id || trip.code;
        const hashVal = seedStr.split('').reduce((acc: number, char: string) => (((acc << 5) - acc) + char.charCodeAt(0)) | 0, 0);
        const hash = Math.abs(hashVal);
        const text = (trip.title + ' ' + trip.region + ' ' + (trip.destinations?.join(' ') || '')).toUpperCase();
        
        let category = 'DEFAULT';
        if (text.includes('DUBAI')) category = 'DUBAI';
        else if (text.includes('BALI')) category = 'BALI';
        else if (text.includes('THAI')) category = 'THAI';
        else if (text.includes('MALDIVES')) category = 'MALDIVES';
        else if (text.includes('EUROPE')) category = 'EUROPE';
        else if (text.includes('MANALI')) category = 'MANALI';
        else if (text.includes('KASOL')) category = 'KASOL';
        else if (text.includes('ANDAMAN')) category = 'ANDAMAN';
        else if (text.includes('GOA')) category = 'GOA';
        else if (text.includes('KERALA')) category = 'KERALA';
        else if (text.includes('RAJASTHAN')) category = 'RAJASTHAN';
        else if (text.includes('PUNJAB')) category = 'PUNJAB';
        else if (text.includes('CHENNAI')) category = 'CHENNAI';
        else if (text.includes('MUMBAI')) category = 'MUMBAI';
        else if (text.includes('MATHERAN')) category = 'MATHERAN';
        else if (text.includes('SOUTH')) category = 'SOUTH';
        else if (text.includes('AGRA')) category = 'AGRA';
        else if (text.includes('DELHI')) category = 'DELHI';
        else if (text.includes('NORTH')) category = 'NORTH';

        const pool = REGION_IMAGES[category] || REGION_IMAGES['DEFAULT'];
        return pool[hash % pool.length];
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            <main>
                <Hero />
                <CategoryBar />

                <section id="trips" className="py-12 px-6 md:px-12">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                            {featuredTrips.map((trip) => (
                                <TripCard 
                                    key={trip.id} 
                                    trip={{
                                        ...trip,
                                        image: (trip.imageUrl && !trip.imageUrl.includes('unsplash.com')) ? trip.imageUrl : getTripImage(trip)
                                    }} 
                                />
                            ))}
                        </div>
                        
                                                {/* More Button */}
                        <div className="mt-20 text-center">
                            <Link href="/login">
                                <button className="group relative px-8 py-4 font-bold text-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,106,78,0.3)] hover:-translate-y-1">
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#006A4E] to-[#004d38] transition-transform duration-300 group-hover:scale-105"></div>
                                    <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center text-lg tracking-wide">
                                        Explore All Packages
                                        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
                
                                {/* Benefits Section - Premium Redesign */}
                <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#006A4E] via-transparent to-transparent pointer-events-none"></div>
                    <div className="container mx-auto px-6 md:px-12 relative z-10">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                                The Fernway Advantage
                            </h2>
                            <p className="text-lg text-gray-500">
                                Elevate your travel business with tools and pricing designed strictly for industry professionals.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_40px_rgb(0,106,78,0.08)] hover:-translate-y-2 transition-all duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#006A4E]/10 to-[#006A4E]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Percent className="w-8 h-8 text-[#006A4E]" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-[#006A4E] transition-colors">Best Wholesale Rates</h3>
                                <p className="text-gray-500 leading-relaxed text-lg">Save up to 30% compared to retail prices. Our massive volume allows us to offer unmatched pricing specifically for B2B partners.</p>
                            </div>

                            <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_40px_rgb(0,106,78,0.08)] hover:-translate-y-2 transition-all duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Palette className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">White-Label Branding</h3>
                                <p className="text-gray-500 leading-relaxed text-lg">Generate stunning, professional brochures and itineraries with your company logo and custom branding in seconds.</p>
                            </div>

                            <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_40px_rgb(0,106,78,0.08)] hover:-translate-y-2 transition-all duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Headset className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">24/7 Premium Support</h3>
                                <p className="text-gray-500 leading-relaxed text-lg">Dedicated account managers and operations team available around the clock to ensure your clients have a flawless experience.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-12 px-6 md:px-12 border-t border-gray-100 bg-white">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center space-x-2 text-[#006A4E]">
                            <Globe className="w-5 h-5" />
                            <span className="font-bold">FERNWAY B2B</span>
                        </div>
                        <div className="flex items-center space-x-6 text-sm font-light text-[#717171]">
                            <Link href="#" className="hover:underline">&copy; 2026 Fernway Inc.</Link>
                            <Link href="/privacy" className="hover:underline">Privacy</Link>
                            <Link href="/terms" className="hover:underline">Terms</Link>
                            <Link href="#" className="hover:underline">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
