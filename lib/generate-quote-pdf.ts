import { jsPDF } from 'jspdf';
import { expandTripTitle } from './expand-trip-title';

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 14;
const MAX_W = PAGE_W - 2 * MARGIN;
const LINE_HEIGHT = 5.2;
const FOOTER_Y = PAGE_H - 10;

export type QuotePdfCompany = {
    name: string;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    logoUrl?: string | null;
    brandColor?: string | null;
};

export type QuotePdfItineraryDay = {
    day: number;
    title: string;
    description?: string | null;
    meals?: string | null;
    accommodation?: string | null;
};

export type QuotePdfTrip = {
    title: string;
    region?: string | null;
    durationDays?: number | null;
    durationNights?: number | null;
    overview?: string | null;
    itineraryDays?: QuotePdfItineraryDay[];
};

export type QuotePdfCustomer = {
    name?: string;
    travelDate?: string;
};

export type QuotePdfPricing = {
    perPerson: number;
    total: number;
    pax: number;
};

export type QuotePdfOptions = {
    company: QuotePdfCompany;
    trip: QuotePdfTrip;
    customer?: QuotePdfCustomer;
    /** When null/undefined, pricing section is omitted. */
    pricing?: QuotePdfPricing | null;
};

function hexToRgb(hex: string): [number, number, number] {
    const h = hex.replace('#', '');
    if (h.length !== 6) return [34, 34, 34];
    return [
        parseInt(h.slice(0, 2), 16),
        parseInt(h.slice(2, 4), 16),
        parseInt(h.slice(4, 6), 16),
    ];
}

function sanitizeFilename(value: string): string {
    return value.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(0, 48) || 'quote';
}

function formatInr(amount: number): string {
    return `Rs. ${Math.round(amount).toLocaleString('en-IN')}`;
}

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
    if (y + needed > FOOTER_Y - 4) {
        doc.addPage();
        return MARGIN + 4;
    }
    return y;
}

function addWrappedText(doc: jsPDF, text: string, y: number, fontSize = 9): number {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, MAX_W);
    for (const line of lines) {
        y = ensureSpace(doc, y, LINE_HEIGHT + 1);
        doc.text(line, MARGIN, y);
        y += LINE_HEIGHT;
    }
    return y + 2;
}

function addSectionHeading(doc: jsPDF, title: string, y: number): number {
    y = ensureSpace(doc, y, 14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(34, 34, 34);
    doc.text(title, MARGIN, y);
    doc.setDrawColor(235, 235, 235);
    doc.line(MARGIN, y + 1.5, PAGE_W - MARGIN, y + 1.5);
    return y + 8;
}

function addFooters(doc: jsPDF, companyName: string) {
    const total = doc.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
        doc.setPage(i);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(130, 130, 130);
        doc.text(`Prepared by ${companyName}`, MARGIN, FOOTER_Y);
        doc.text(`Page ${i} of ${total}`, PAGE_W - MARGIN - 18, FOOTER_Y);
    }
}

export function buildQuotePdf(options: QuotePdfOptions): jsPDF {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const [brandR, brandG, brandB] = hexToRgb(options.company.brandColor || '#222222');
    let y = MARGIN;

    doc.setFillColor(brandR, brandG, brandB);
    doc.rect(0, 0, PAGE_W, 30, 'F');

    let headerTextX = MARGIN;
    const logoUrl = options.company.logoUrl;
    if (logoUrl && logoUrl.startsWith('data:image')) {
        try {
            const format = logoUrl.includes('image/png') ? 'PNG' : 'JPEG';
            doc.addImage(logoUrl, format, MARGIN, 7, 18, 18);
            headerTextX = MARGIN + 22;
        } catch {
            // Logo optional — continue without it
        }
    }

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(options.company.name, headerTextX, 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const contactParts = [options.company.phone, options.company.email].filter(Boolean);
    if (contactParts.length > 0) {
        doc.text(contactParts.join('  |  '), headerTextX, 19);
    }
    if (options.company.address) {
        const addressLines = doc.splitTextToSize(options.company.address, PAGE_W - headerTextX - MARGIN);
        doc.text(addressLines.slice(0, 2), headerTextX, 24);
    }

    y = 38;
    doc.setTextColor(34, 34, 34);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('TRAVEL QUOTATION & ITINERARY', MARGIN, y);
    y += 9;

    const tripTitle = expandTripTitle(options.trip.title).toUpperCase();
    doc.setFontSize(15);
    const titleLines = doc.splitTextToSize(tripTitle, MAX_W);
    doc.text(titleLines, MARGIN, y);
    y += titleLines.length * 6.5 + 2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const meta: string[] = [];
    if (options.trip.region) meta.push(options.trip.region);
    if (options.trip.durationDays) {
        const nights = options.trip.durationNights ?? Math.max(options.trip.durationDays - 1, 0);
        meta.push(`${options.trip.durationDays} Days / ${nights} Nights`);
    }
    if (options.customer?.travelDate) meta.push(`Travel date: ${options.customer.travelDate}`);
    if (options.pricing?.pax) meta.push(`${options.pricing.pax} passengers`);
    if (options.customer?.name) meta.push(`Guest: ${options.customer.name}`);
    if (meta.length > 0) {
        y = addWrappedText(doc, meta.join('   |   '), y, 9);
    }

    if (options.pricing && options.pricing.perPerson > 0) {
        y = ensureSpace(doc, y, 26);
        doc.setFillColor(236, 253, 245);
        doc.roundedRect(MARGIN, y, MAX_W, 24, 2, 2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(0, 106, 78);
        doc.text('PACKAGE PRICE', MARGIN + 5, y + 9);
        doc.setFontSize(13);
        doc.text(`${formatInr(options.pricing.perPerson)} per person`, MARGIN + 5, y + 17);
        doc.setFontSize(10);
        doc.text(`Total: ${formatInr(options.pricing.total)}`, MARGIN + MAX_W - 52, y + 17);
        doc.setTextColor(34, 34, 34);
        y += 30;
    }

    const overview = options.trip.overview?.trim();
    if (overview) {
        y = addSectionHeading(doc, 'Overview', y);
        const shortOverview = overview.length > 600 ? `${overview.slice(0, 600)}...` : overview;
        y = addWrappedText(doc, shortOverview, y);
    }

    const days = [...(options.trip.itineraryDays || [])].sort((a, b) => a.day - b.day);
    if (days.length > 0) {
        y = addSectionHeading(doc, 'Day-wise Itinerary', y);
        for (const day of days) {
            y = ensureSpace(doc, y, 12);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            const dayLabel = day.title
                ? `Day ${day.day} — ${day.title.toUpperCase()}`
                : `Day ${day.day}`;
            doc.text(dayLabel, MARGIN, y);
            y += 6;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            const paragraphs = (day.description || '')
                .split(/\n\n+/)
                .map((p) => p.trim())
                .filter(Boolean);

            if (paragraphs.length === 0) {
                y = addWrappedText(doc, 'Itinerary details for this day will be shared separately.', y);
            } else {
                for (const paragraph of paragraphs) {
                    y = addWrappedText(doc, paragraph, y);
                }
            }

            const dayMeta = [
                day.meals ? `Meals: ${day.meals}` : null,
                day.accommodation ? `Stay: ${day.accommodation}` : null,
            ]
                .filter(Boolean)
                .join('  |  ');

            if (dayMeta) {
                doc.setFontSize(8);
                doc.setTextColor(113, 113, 113);
                y = addWrappedText(doc, dayMeta, y, 8);
                doc.setTextColor(34, 34, 34);
                doc.setFontSize(9);
            }
            y += 4;
        }
    } else if (!overview) {
        y = addSectionHeading(doc, 'Itinerary', y);
        y = addWrappedText(
            doc,
            'Detailed day-wise itinerary is available on request. Please contact us for the full schedule.',
            y
        );
    }

    y = ensureSpace(doc, y, 12);
    doc.setFontSize(8);
    doc.setTextColor(113, 113, 113);
    y = addWrappedText(
        doc,
        'This document is prepared for your reference. Rates and itinerary are subject to availability and confirmation at the time of booking.',
        y,
        8
    );

    addFooters(doc, options.company.name);
    return doc;
}

export function downloadQuotePdf(options: QuotePdfOptions): void {
    const doc = buildQuotePdf(options);
    const tripSlug = sanitizeFilename(expandTripTitle(options.trip.title));
    const companySlug = sanitizeFilename(options.company.name);
    const suffix = options.pricing ? 'with-price' : 'itinerary-only';
    doc.save(`${companySlug}-${tripSlug}-${suffix}.pdf`);
}
