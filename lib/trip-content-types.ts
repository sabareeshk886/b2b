import type { ParsedSouthDay } from './south-pdf-parser';

export type StoredTripContent = {
    code: string;
    overview: string;
    shortDescription: string;
    highlights: string[];
    days: ParsedSouthDay[];
    thingsToCarry: string[];
    notes: string[];
    paymentTerms: string[];
    termsAndConditions: string[];
    sourceFile: string;
    regionHint?: string;
};

export type TripContentStore = Record<string, StoredTripContent>;
