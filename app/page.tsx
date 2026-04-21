import Navbar from '@/components/Navbar';
import CategoryBar from '@/components/CategoryBar';
import Hero from '@/components/Hero';
import TripCard from '@/components/TripCard';
import { db } from '@/db';
import { trips } from '@/db/schema';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';

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
        'MUMBAI': [
            '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/mum%203.jpg', '/images/catalog/mum%204.jpg', '/images/catalog/mum%205.jpg', '/images/catalog/mum%206.jpg', '/images/catalog/mum%207.jpg',
        ],
        'MATHERAN': [
            '/images/catalog/mat%201.jpg', '/images/catalog/mat%203.jpg', '/images/catalog/mat%204.jpg', '/images/catalog/mat%205.jpg', '/images/catalog/mat%206.jpg', '/images/catalog/mat%207.jpg', '/images/catalog/mat%209.jpg', '/images/catalog/mat%2010.jpg', '/images/catalog/mat.jpg',
        ],
        'AGRA': [
            'https://unsplash.com/photos/_Qtgj2nXqyY/download?force=true&w=800', 'https://unsplash.com/photos/qCKSpvJfNtU/download?force=true&w=800', 'https://unsplash.com/photos/pqY0n4KNO0s/download?force=true&w=800', 'https://unsplash.com/photos/B3-lUYDbyDo/download?force=true&w=800', 'https://unsplash.com/photos/8goGYCLzrLs/download?force=true&w=800',
        ],
        'RAJASTHAN': [
            '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/raj%203.jpg', '/images/catalog/raj%204.jpg', '/images/catalog/raj%206.jpg', '/images/catalog/raj%207.jpg', '/images/catalog/raj%208.jpg', '/images/catalog/raj%2010.jpg',
        ],
        'PUNJAB': [
            '/images/catalog/amr%201.jpg', '/images/catalog/amr%202.jpg', '/images/catalog/amr%203.jpg', '/images/catalog/amr%204.jpg', '/images/catalog/amr%205.jpg', '/images/catalog/amr%206.jpg',
        ],
        'CHENNAI': [
            '/images/catalog/chn%201.jpg', '/images/catalog/chn%202.jpg', '/images/catalog/chn%203.jpg', '/images/catalog/chn%204.jpg',
        ],
        'DELHI': [
            '/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/del%203.jpg', '/images/catalog/del%204.jpg', '/images/catalog/del%205.jpg',
        ],
        'KASOL': [
            '/images/catalog/ksl%201.jpg', '/images/catalog/ksl%202.jpg', '/images/catalog/ksl%203.jpg', '/images/catalog/ksl%204.jpg',
        ],
        'MANALI': [
            '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg', '/images/catalog/man%203.jpg', '/images/catalog/man%204.jpg', '/images/catalog/man%205.jpg', '/images/catalog/man%206.jpg', '/images/catalog/man%207.jpg', '/images/catalog/man%208.jpg', '/images/catalog/man%209.jpg', '/images/catalog/man%2010.jpg', '/images/catalog/man%2011.jpg',
        ],
        'KERALA': [
            'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80', 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80', 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80', 'https://images.unsplash.com/photo-1590623696884-2454a32fa123?w=800&q=80', 'https://images.unsplash.com/photo-1583259974246-880946b2cb9e?w=800&q=80',
        ],
        'SOUTH': [
            'https://images.unsplash.com/photo-1582510003544-5292b399252c?w=800&q=80', 'https://images.unsplash.com/photo-1621245089209-663806a6c4b2?w=800&q=80', 'https://images.unsplash.com/photo-1600100598655-63529d469733?w=800&q=80',
        ],
        'GOA': [
            'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80', 'https://images.unsplash.com/photo-1540206395-688085723adb?w=800&q=80', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        ],
        'NORTH': [
            'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80', '/images/catalog/del%201.jpg', 'https://images.unsplash.com/photo-1596396825227-817882209772?w=800&q=80', 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80', 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
        ],
        'DUBAI': [
            'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80', 'https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&q=80',
        ],
        'BALI': [
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80', 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
        ],
        'MALDIVES': [
            'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
        ],
        'THAI': [
            'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80', 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80',
        ],
        'EUROPE': [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80', 'https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?w=800&q=80',
        ],
        'DEFAULT': [
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        ]
    };

    const getTripImage = (trip: any) => {
        const seedStr = trip.id || trip.code;
        const hash = seedStr.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
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
                                        image: trip.imageUrl || getTripImage(trip)
                                    }} 
                                />
                            ))}
                        </div>
                        
                        {/* More Button like Airbnb "Show more" */}
                        <div className="mt-20 text-center">
                            <Link href="/login">
                                <button className="px-6 py-3 border border-[#222222] rounded-xl font-bold hover:bg-gray-50 transition-all">
                                    Show more packages
                                </button>
                            </Link>
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
