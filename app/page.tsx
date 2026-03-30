import Navbar from '@/components/Navbar';
import CategoryBar from '@/components/CategoryBar';
import Hero from '@/components/Hero';
import TripCard from '@/components/TripCard';
import { db } from '@/db';
import { trips } from '@/db/schema';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';

export default async function HomePage() {
    let featuredTrips: any[] = [];
    try {
        featuredTrips = await db.select().from(trips).limit(12);
    } catch (error) {
        console.error("Database connection timed out during Vercel prerender:", error);
    }
    
    // Helper to get a rich fallback image based on region (Keeping existing logic but slightly refined)
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
                                        image: getTripImg(trip.region || '', trip.code)
                                    }} 
                                />
                            ))}
                        </div>
                        
                        {/* More Button like Airbnb "Show more" */}
                        <div className="mt-20 text-center">
                            <button className="px-6 py-3 border border-[#222222] rounded-xl font-bold hover:bg-gray-50 transition-all">
                                Show more packages
                            </button>
                        </div>
                    </div>
                </section>
                
                {/* Benefits Section - Airbnb style (Minimal) */}
                <section className="py-24 border-t border-gray-100 bg-gray-50/30">
                    <div className="container mx-auto px-6 md:px-12">
                        <h2 className="text-3xl font-bold mb-12 text-center">The Fernway Advantage</h2>
                        <div className="grid md:grid-cols-3 gap-12">
                            <div>
                                <h3 className="text-xl font-bold mb-3">Best Wholesale Rates</h3>
                                <p className="text-[#717171] leading-relaxed">Save up to 30% compared to retail prices. Our volume allows us to offer unmatched pricing for B2B partners.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">White-Label Branding</h3>
                                <p className="text-[#717171] leading-relaxed">Generate professional brochures and itineraries with your own company logo and branding in seconds.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
                                <p className="text-[#717171] leading-relaxed">Dedicated account managers and operations team available around the clock to support your clients.</p>
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
                            <Link href="#" className="hover:underline">Privacy</Link>
                            <Link href="#" className="hover:underline">Terms</Link>
                            <Link href="#" className="hover:underline">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
