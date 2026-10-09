'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getCompanyDetails } from '@/app/actions/team';
import { downloadQuotePdf, type QuotePdfTrip } from '@/lib/generate-quote-pdf';

type QuotePdfDownloadProps = {
    tripId: string;
    trip?: QuotePdfTrip & { id?: string };
    customerName?: string;
    travelDate?: string;
    numPax: number;
    pricePerPerson?: number;
    className?: string;
    compact?: boolean;
};

export function QuotePdfDownload({
    tripId,
    trip: tripProp,
    customerName,
    travelDate,
    numPax,
    pricePerPerson = 0,
    className = '',
    compact = false,
}: QuotePdfDownloadProps) {
    const [includePricing, setIncludePricing] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            let trip = tripProp;
            if (!trip?.itineraryDays?.length) {
                const response = await fetch(`/api/trips/${tripId}`);
                const data = await response.json();
                if (!data.trip) {
                    toast.error('Could not load trip details for PDF');
                    return;
                }
                trip = data.trip;
            }

            const companyName =
                typeof window !== 'undefined'
                    ? localStorage.getItem('companyName') || 'g holidays'
                    : 'g holidays';
            const company = await getCompanyDetails(companyName);

            if (!company) {
                toast.error('Company profile not found. Update Settings first.');
                return;
            }

            if (!trip?.title) {
                toast.error('Trip details are incomplete for PDF generation.');
                return;
            }

            const perPerson = includePricing ? pricePerPerson : 0;
            const pricing =
                includePricing && perPerson > 0
                    ? {
                          perPerson,
                          total: perPerson * numPax,
                          pax: numPax,
                      }
                    : null;

            downloadQuotePdf({
                company: {
                    name: company.name,
                    email: company.email,
                    phone: company.phone,
                    address: company.address,
                    logoUrl: company.logoUrl,
                    brandColor: company.brandColor,
                },
                trip: {
                    title: trip.title,
                    region: trip.region,
                    durationDays: trip.durationDays,
                    durationNights: trip.durationNights,
                    overview: trip.overview,
                    itineraryDays: trip.itineraryDays,
                },
                customer: {
                    name: customerName || undefined,
                    travelDate: travelDate || undefined,
                },
                pricing,
            });

            toast.success(
                includePricing ? 'Quote PDF downloaded (with pricing)' : 'Itinerary PDF downloaded (no pricing)'
            );
        } catch (error) {
            console.error('PDF generation failed:', error);
            toast.error('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className={`space-y-3 ${className}`}>
            <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                    type="checkbox"
                    checked={includePricing}
                    onChange={(e) => setIncludePricing(e.target.checked)}
                    className="w-4 h-4 rounded border-[#EBEBEB] text-[#006A4E] focus:ring-[#006A4E]"
                />
                <span className="text-xs font-bold text-[#222222] uppercase tracking-widest">
                    Include pricing in PDF
                </span>
            </label>

            <button
                type="button"
                onClick={handleDownload}
                disabled={isGenerating}
                className={`w-full ${
                    compact ? 'h-12' : 'h-14'
                } bg-[#222222] text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-black disabled:opacity-60 transition-all flex items-center justify-center gap-3`}
            >
                {isGenerating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <Download className="w-5 h-5" />
                )}
                <span>{isGenerating ? 'Generating...' : 'Download Branded PDF'}</span>
            </button>
        </div>
    );
}
