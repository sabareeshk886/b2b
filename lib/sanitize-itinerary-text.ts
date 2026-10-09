import type { ParsedSouthContent, ParsedSouthDay } from './south-pdf-parser';

function applyPhraseVariants(text: string, seed: string): string {
    const variants: Array<[RegExp, string[]]> = [
        [/\bwe will\b/gi, ['you will', 'the plan includes', 'the day includes']],
        [/\bwe'll\b/gi, ['you will', 'the schedule includes']],
        [/\bwe shall\b/gi, ['you will', 'the itinerary includes']],
        [/\bour companion\b/gi, ['your guide', 'the local representative', 'the tour coordinator']],
        [/\bdelightful\b/gi, ['pleasant', 'enjoyable', 'relaxed']],
        [/\bdelectable\b/gi, ['hearty', 'satisfying', 'local']],
        [/\bcaptivating\b/gi, ['memorable', 'scenic', 'engaging']],
        [/\bmajestic\b/gi, ['grand', 'historic', 'striking']],
        [/\bembark on\b/gi, ['begin', 'start', 'set out on']],
        [/\bset off on\b/gi, ['begin', 'start', 'head out on']],
        [/\brelish\b/gi, ['enjoy', 'share', 'have']],
        [/\bunwind\b/gi, ['relax', 'rest', 'settle in']],
        [/\bour journey\b/gi, ['the journey', 'the route', 'the drive']],
        [/\bour day\b/gi, ['the day', 'your day']],
        [/\bconclude our day\b/gi, ['wrap up the day', 'end the day']],
    ];

    let out = text;
    let seedIndex = 0;
    for (const [pattern, replacements] of variants) {
        out = out.replace(pattern, () => {
            const pick = replacements[seedIndex % replacements.length];
            seedIndex += 1;
            return pick;
        });
    }
    return out;
}

function sanitizeParagraph(text: string, seed: string): string {
    if (!text) return '';

    let cleaned = text
        .replace(/fernway\s*holidays?\s*(pvt\.?\s*ltd\.?)?/gi, 'the tour operator')
        .replace(/fernway\s*holidays?/gi, 'the tour operator')
        .replace(/fernwayholidays@gmail\.com/gi, '')
        .replace(/www\.fernwayholidays\.com/gi, '')
        .replace(/LOT MORE THAN JUST TRAVELING/gi, 'A thoughtfully planned travel experience')
        .replace(/8891\s*12\s*34\s*56/g, '')
        .replace(/9153\s*44\s*44\s*\d{2}/g, '')
        .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, '')
        .replace(/[ \t]+/g, ' ')
        .trim();

    cleaned = applyPhraseVariants(cleaned, seed);
    return cleaned;
}

/** Sanitize text; preserves paragraph breaks (\\n\\n) for itinerary descriptions. */
export function sanitizeItineraryText(text: string, seed = 'trip'): string {
    if (!text) return '';
    if (text.includes('\n\n')) {
        return text
            .split('\n\n')
            .map((part) => sanitizeParagraph(part, seed))
            .filter(Boolean)
            .join('\n\n');
    }
    return sanitizeParagraph(text, seed);
}

export function sanitizeDay(day: ParsedSouthDay, seed: string): ParsedSouthDay {
    return {
        ...day,
        title: sanitizeItineraryText(day.title, `${seed}-title`),
        description: sanitizeItineraryText(day.description, `${seed}-desc`),
        activities: [],
        meals: day.meals ? sanitizeItineraryText(day.meals, `${seed}-meals`) : null,
        accommodation: day.accommodation
            ? sanitizeItineraryText(day.accommodation, `${seed}-stay`)
            : null,
    };
}

export function buildShortDescription(content: ParsedSouthContent, code: string): string {
    const places =
        content.destinations.length > 0
            ? content.destinations.slice(0, 3).join(', ')
            : 'key highlights of the route';
    const duration = content.durationLine || 'multi-day journey';

    const templates = [
        `Discover ${places} on a ${duration.toLowerCase()} route designed for comfort and sightseeing.`,
        `Experience ${places} with a clear day-by-day plan across this ${duration.toLowerCase()} package.`,
        `A balanced ${duration.toLowerCase()} itinerary covering ${places}, with time for landmarks and local experiences.`,
        `Explore ${places} at an easy pace, with structured sightseeing and relaxed evenings.`,
    ];

    const index = code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % templates.length;
    return sanitizeItineraryText(templates[index], `${code}-short`);
}

export function sanitizeParsedContent(content: ParsedSouthContent, code: string): ParsedSouthContent {
    const overviewBase = content.destinations.length
        ? `A curated route through ${content.destinations.join(' · ')}${content.durationLine ? ` (${content.durationLine})` : ''}.`
        : 'A curated travel package with structured sightseeing and comfortable pacing.';

    return {
        ...content,
        tagline: sanitizeItineraryText(
            content.tagline || 'A thoughtfully planned travel experience',
            `${code}-tagline`
        ),
        overview: sanitizeItineraryText(
            content.overview || overviewBase,
            `${code}-overview`
        ),
        highlights: content.destinations.map((d, i) =>
            sanitizeItineraryText(`Visit ${d}`, `${code}-hl-${i}`)
        ),
        days: content.days.map((day) => sanitizeDay(day, `${code}-d${day.day}`)),
        thingsToCarry: content.thingsToCarry.map((item, i) =>
            sanitizeItineraryText(item, `${code}-carry-${i}`)
        ),
        notes: content.notes.map((item, i) =>
            sanitizeItineraryText(
                item.replace(/the tour operator cannot be held responsible/gi, 'itinerary changes may occur'),
                `${code}-note-${i}`
            )
        ),
        paymentTerms: content.paymentTerms.map((item, i) =>
            sanitizeItineraryText(item, `${code}-pay-${i}`)
        ),
        termsAndConditions: content.termsAndConditions.map((item, i) =>
            sanitizeItineraryText(
                item.replace(/the tour operator reserves the right/gi, 'rates and availability are subject to confirmation'),
                `${code}-term-${i}`
            )
        ),
    };
}
