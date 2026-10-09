import {
    parseSouthPdfText,
    type ParsedSouthContent,
    type ParsedSouthDay,
} from './south-pdf-parser';

const SECTION_HEADERS = [
    'payment and cancellation',
    'things to carry',
    'notes',
    'terms and conditions',
    'contact us',
    'airline/train schedule changes',
    'travel & accommodation',
] as const;

const DAY_HEADER_RE = /^Day\s*(\d+)\s*(.*)$/i;
const DURATION_RE = /\d+\s*DAY\s*\d+\s*NIGHT/i;
const TAGLINE_RE = /LOT MORE THAN JUST TRAVELING/i;
const CITY_SECTION_RE = /^([A-Z][A-Z\s&]{2,28})\s*-\s*(.+)$/;
const CITY_ONLY_RE = /^[A-Z][A-Z\s&]{2,20}$/;
const SKIP_LINE_RE =
    /contact us|fernway|@|www\.|^\d{2,}[\s\d]*$|lot more than just traveling|^\d+\s*day\s*\d+\s*night/i;

function isDestinationLine(line: string): boolean {
    if (!line || line.length < 3 || line.length > 28) return false;
    if (DURATION_RE.test(line) || TAGLINE_RE.test(line) || SKIP_LINE_RE.test(line)) return false;
    if (/[a-z]/.test(line)) return false;
    return /^[A-Z][A-Z\s&'-]+$/.test(line);
}

function parseBullets(lines: string[]): string[] {
    return lines
        .map((line) => line.replace(/^[•\-*]\s*/, '').replace(/\s+/g, ' ').trim())
        .filter((line) => line.length > 3 && !line.startsWith('--') && !/^\d+\s+of\s+\d+/i.test(line));
}

function extractMeals(text: string): string | null {
    const parts: string[] = [];
    if (/\bbreakfast\b/i.test(text)) parts.push('Breakfast');
    if (/\blunch\b/i.test(text)) parts.push('Lunch');
    if (/\bdinner\b/i.test(text)) parts.push('Dinner');
    return parts.length > 0 ? parts.join(', ') : null;
}

function buildDayFromLines(dayNum: number, title: string, lines: string[]): ParsedSouthDay {
    const paragraphs = lines
        .map((line) => line.replace(/^[•\-*]\s*/, '').trim())
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();

    return {
        day: dayNum,
        title: title.replace(/\s+/g, ' ').trim() || `Day ${dayNum}`,
        description: paragraphs.slice(0, 4000),
        activities: [],
        meals: extractMeals(paragraphs),
        accommodation: /hotel|resort|stay|overnight|night's rest/i.test(paragraphs)
            ? 'Hotel stay included'
            : null,
    };
}

/** North-style PDFs use "CITY - Activity" section headers instead of "Day 1". */
export function parseCitySectionPdfText(text: string): ParsedSouthContent {
    const lines = text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .filter((line) => !SKIP_LINE_RE.test(line));

    const contentStart = lines.findIndex(
        (line, idx) =>
            CITY_SECTION_RE.test(line) ||
            (DAY_HEADER_RE.test(line) && idx > 0) ||
            (TAGLINE_RE.test(line) && lines[idx + 1] && CITY_SECTION_RE.test(lines[idx + 1]))
    );

    const headerLines = contentStart > 0 ? lines.slice(0, contentStart) : [];
    const destinations = headerLines.filter(isDestinationLine);
    const durationLine = headerLines.find((line) => DURATION_RE.test(line)) || '';
    const tagline = 'A thoughtfully planned travel experience';

    const days: ParsedSouthDay[] = [];
    const sections: Record<string, string[]> = {};

    let dayNum = 0;
    let currentTitle = '';
    let currentLines: string[] = [];
    let currentSection: string | null = null;
    let currentSectionLines: string[] = [];

    const flushDay = () => {
        if (!currentTitle && currentLines.length === 0) return;
        dayNum += 1;
        days.push(buildDayFromLines(dayNum, currentTitle || `Day ${dayNum}`, currentLines));
        currentTitle = '';
        currentLines = [];
    };

    const flushSection = () => {
        if (currentSection) {
            sections[currentSection] = currentSectionLines;
            currentSection = null;
            currentSectionLines = [];
        }
    };

    for (let i = Math.max(contentStart, 0); i < lines.length; i++) {
        const line = lines[i];
        const sectionKey = SECTION_HEADERS.find((header) => line.toLowerCase().startsWith(header));

        if (sectionKey) {
            flushDay();
            flushSection();
            currentSection = sectionKey;
            currentSectionLines = [];
            continue;
        }

        if (currentSection) {
            currentSectionLines.push(line);
            continue;
        }

        const dayMatch = line.match(DAY_HEADER_RE);
        if (dayMatch) {
            flushDay();
            currentTitle = dayMatch[2]?.trim() || `Day ${dayMatch[1]}`;
            currentLines = [];
            continue;
        }

        const cityMatch = line.match(CITY_SECTION_RE);
        if (cityMatch) {
            flushDay();
            currentTitle = `${cityMatch[1].trim()} — ${cityMatch[2].trim()}`;
            currentLines = [];
            continue;
        }

        if (CITY_ONLY_RE.test(line) && line.length <= 20 && !DURATION_RE.test(line)) {
            flushDay();
            currentTitle = line.trim();
            currentLines = [];
            continue;
        }

        if (currentTitle) {
            currentLines.push(line);
        }
    }

    flushDay();
    flushSection();

    const destinationLabel = destinations.join(' · ');
    const overview = destinationLabel
        ? `${tagline}. Explore ${destinationLabel}${durationLine ? ` (${durationLine})` : ''}.`
        : tagline;

    return {
        destinations,
        durationLine,
        tagline,
        overview,
        highlights: destinations.slice(0, 8),
        days,
        thingsToCarry: parseBullets(sections['things to carry'] || []),
        notes: parseBullets(sections['notes'] || []),
        paymentTerms: parseBullets(sections['payment and cancellation'] || []),
        termsAndConditions: parseBullets(sections['terms and conditions'] || []),
    };
}

export function parseItineraryPdfText(text: string): ParsedSouthContent {
    const hasDayHeaders = /\bDay\s*\d+/i.test(text);
    if (hasDayHeaders) {
        const south = parseSouthPdfText(text);
        if (south.days.length > 0) return south;
    }

    const cityParsed = parseCitySectionPdfText(text);
    if (cityParsed.days.length > 0) return cityParsed;

    return parseSouthPdfText(text);
}
