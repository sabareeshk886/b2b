import Image from 'next/image';
import { Star, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

interface TripCardProps {
    trip: {
        id: number;
        title: string;
        region: string;
        code: string;
        durationDays: number | null;
        durationNights: number | null;
        image: string;
    }
}

export default function TripCard({ trip }: TripCardProps) {
    return (
        <Link href={`/login`} className="flex flex-col group cursor-pointer">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 text-white">
                    {/* Placeholder for Heart/Save icon like Airbnb */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black/10 backdrop-blur-sm transition-colors hover:bg-black/20">
                        <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white/80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', overflow: 'visible'}}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0 6.98 6.98 0 0 0 0 9.9L16 28z"></path></svg>
                    </div>
                </div>
            </div>
            
            <div className="mt-3 flex flex-col">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-[#222222] truncate">{trip.title}</h3>
                    <div className="flex items-center space-x-1 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-[#222222]" />
                        <span className="text-sm font-light text-[#222222]">4.9</span>
                    </div>
                </div>
                
                <p className="text-sm text-[#717171] flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {trip.region}
                </p>
                
                <p className="text-sm text-[#717171] flex items-center mt-0.5">
                    <Calendar className="w-3 h-3 mr-1" />
                    {trip.durationDays} Days / {trip.durationNights} Nights
                </p>
                
                <div className="mt-2">
                    <span className="font-bold text-sm">B2B Login</span>
                    <span className="text-sm font-light text-[#222222]"> for pricing</span>
                </div>
            </div>
        </Link>
    );
}
