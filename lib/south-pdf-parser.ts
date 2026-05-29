export type ParsedSouthDay = {
    day: number;
    title: string;
    description: string;
    activities: string[];
    meals: string | null;
    accommodation: string | null;
};

export type ParsedSouthContent = {
    destinations: string[];
    durationLine: string;
    tagline: string;
    overview: string;
    highlights: string[];
    days: ParsedSouthDay[];
    thingsToCarry: string[];
    notes: string[];
    paymentTerms: string[];
    termsAndConditions: string[];
};

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

function cleanBullet(line: string): string {
    return line.replace(/^[•\-*]\s*/, '').replace(/\s+/g, ' ').trim();
}

function parseBullets(lines: string[]): string[] {
    return lines
        .map(cleanBullet)
        .filter((line) => line.length > 3 && !line.startsWith('--') && !/^\d+\s+of\s+\d+/i.test(line));
}

const TIME_LINE_RE = /^(\d{1,2}:\d{2})\s*(.*)$/;

function extractMeals(text: string): string | null {
    const parts: string[] = [];
    if (/\bbreakfast\b/i.test(text) && !parts.includes('Breakfast')) parts.push('Breakfast');
    if (/\blunch\b/i.test(text) && !parts.includes('Lunch')) parts.push('Lunch');
    if (/\bdinner\b/i.test(text) && !parts.includes('Dinner')) parts.push('Dinner');
    return parts.length > 0 ? parts.join(', ') : null;
}

/** Merge PDF line wraps into timed schedule blocks (07:00 — full activity text). */
function groupIntoScheduleBlocks(lines: string[]): string[] {
    const blocks: string[] = [];
    let currentTime: string | null = null;
    let currentParts: string[] = [];

    const flush = () => {
        const text = currentParts.join(' ').replace(/\s+/g, ' ').trim();
        if (!text) {
            currentTime = null;
            currentParts = [];
            return;
        }
        blocks.push(currentTime ? `${currentTime} — ${text}` : text);
        currentTime = null;
        currentParts = [];
    };

    for (const line of lines) {
        const timeMatch = line.match(TIME_LINE_RE);
        if (timeMatch) {
            flush();
            currentTime = timeMatch[1];
            if (timeMatch[2].trim()) {
                currentParts.push(timeMatch[2].trim());
            }
            continue;
        }

        const cleaned = line.replace(/^[•\-*]\s*/, '').trim();
        if (cleaned) {
            currentParts.push(cleaned);
        }
    }

    flush();
    return blocks;
}

function buildDay(dayNum: number, title: string, lines: string[]): ParsedSouthDay {
    const scheduleBlocks = groupIntoScheduleBlocks(lines);
    const description =
        scheduleBlocks.length > 0
            ? scheduleBlocks.join('\n\n')
            : lines
                  .map((line) => line.replace(/^[•\-*]\s*/, '').trim())
                  .filter(Boolean)
                  .join('\n\n');

    const fullText = lines.join(' ');
    const accommodationLine = scheduleBlocks.find((block) =>
        /hotel|resort|houseboat|stay|settle in|unwind for the night/i.test(block)
    );

    return {
        day: dayNum,
        title: title.replace(/\s+/g, ' ').trim() || `Day ${dayNum}`,
        description: description.slice(0, 4000),
        activities: [],
        meals: extractMeals(fullText),
        accommodation: accommodationLine ? accommodationLine.slice(0, 200) : null,
    };
}

export function parseSouthPdfText(text: string): ParsedSouthContent {
    const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
    const dayStartIdx = lines.findIndex((line) => DAY_HEADER_RE.test(line));

    const headerLines = dayStartIdx >= 0 ? lines.slice(0, dayStartIdx) : lines;
    const destinations = headerLines.filter(
        (line) => !DURATION_RE.test(line) && !TAGLINE_RE.test(line) && line.length > 1
    );
    const durationLine = headerLines.find((line) => DURATION_RE.test(line)) || '';
    const tagline = headerLines.find((line) => TAGLINE_RE.test(line)) || 'Lot more than just traveling';

    const days: ParsedSouthDay[] = [];
    const sections: Record<string, string[]> = {};

    let currentDay: { num: number; title: string } | null = null;
    let currentDayLines: string[] = [];
    let currentSection: string | null = null;
    let currentSectionLines: string[] = [];

    const flushDay = () => {
        if (currentDay !== null) {
            days.push(buildDay(currentDay.num, currentDay.title, currentDayLines));
            currentDay = null;
            currentDayLines = [];
        }
    };

    const flushSection = () => {
        if (currentSection) {
            sections[currentSection] = currentSectionLines;
            currentSection = null;
            currentSectionLines = [];
        }
    };

    for (let i = Math.max(dayStartIdx, 0); i < lines.length; i++) {
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
            currentDay = {
                num: parseInt(dayMatch[1], 10),
                title: dayMatch[2]?.trim() || '',
            };
            currentDayLines = [];
            continue;
        }

        if (currentDay !== null) {
            currentDayLines.push(line);
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

export function extractTripCodeFromFilename(filename: string): string | null {
    const base = filename.replace(/\.pdf$/i, '');
    const variantMatch = base.match(/^(FWS\d{3})\s*\(([A-Z])\)/i);
    if (variantMatch) {
        return `${variantMatch[1].toUpperCase()}${variantMatch[2].toUpperCase()}`;
    }

    const codeMatch = base.match(/^(FWS\d{3})/i);
    return codeMatch ? codeMatch[1].toUpperCase() : null;
}
