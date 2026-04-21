'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
    return (
        <section className="pt-40 pb-16 px-6 md:px-12 bg-white">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center space-x-2 mb-6 px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-xs font-bold text-[#006A4E] uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>B2B Travel Excellence</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#222222] leading-[1.1]">
                            The standard for <br />
                            <span className="text-[#006A4E]">wholesale travel.</span>
                        </h1>
                        
                        <p className="text-xl text-[#717171] mb-10 max-w-xl font-light leading-relaxed">
                            Access exclusive rates, white-label brochures, and premium itineraries. Built for the modern travel agency.
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <Link href="/register" className="px-8 py-4 bg-[#006A4E] text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center">
                                Join as Partner
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link href="#trips" className="px-8 py-4 border border-gray-200 text-[#222222] rounded-xl font-bold hover:bg-gray-50 transition-all duration-300">
                                Browse Catalog
                            </Link>
                        </div>
                    </div>
                    
                    <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                        <img 
                            src="/images/travel.jpg" 
                            alt="Premium Travel" 
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
}
