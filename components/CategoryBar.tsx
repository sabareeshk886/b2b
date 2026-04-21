'use client';

import { Plane, Tent, Building2, Mountain, Palmtree, Waves, Wind, Compass } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
    { label: 'Trending', icon: Wind },
    { label: 'Tropical', icon: Palmtree },
    { label: 'Mountains', icon: Mountain },
    { label: 'Luxury', icon: Building2 },
    { label: 'Adventure', icon: Tent },
    { label: 'Flights', icon: Plane },
    { label: 'Beach', icon: Waves },
    { label: 'Explore', icon: Compass },
];

export default function CategoryBar() {
    return (
        <div className="sticky top-20 z-40 bg-white border-b border-gray-100 flex items-center h-20">
            <div className="container mx-auto px-6 md:px-12 flex items-center space-x-8 overflow-x-auto no-scrollbar">
                {categories.map((cat) => (
                    <div
                        key={cat.label}
                        className={`flex flex-col items-center space-y-2 pb-3 min-w-fit border-b-2 ${
                            cat.label === 'Trending'
                                ? 'border-[#222222] text-[#222222]'
                                : 'border-transparent text-[#717171]'
                        }`}
                    >
                        <cat.icon className="w-6 h-6" />
                        <span className="text-xs font-semibold">{cat.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
