/**
 * One-time extractor: reads D:\ITINERARIES PDFs and writes data/trip-content.json
 * Run before deleting the external ITINERARIES folder.
 */
import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';
import { parseItineraryPdfText } from '../lib/itinerary-pdf-parser';
import { extractTripCodeFromFilename } from '../lib/extract-trip-code';
import {
    buildShortDescription,
    sanitizeParsedContent,
} from '../lib/sanitize-itinerary-text';
import type { TripContentStore } from '../lib/trip-content-types';

const SOURCE_DIR = process.env.ITINERARIES_DIR || 'D:\\ITINERARIES';
const OUTPUT_FILE = path.join(process.cwd(), 'data', 'trip-content.json');

async function extractPdfText(filePath: string): Promise<string> {
    const buf = fs.readFileSync(filePath);
    const parser = new PDFParse({ data: buf });
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
}

function collectPdfFiles(dir: string): string[] {
    const files: string[] = [];
    const walk = (current: string) => {
        for (const entry of fs.readdirSync(current)) {
            const full = path.join(current, entry);
            if (fs.statSync(full).isDirectory()) {
                walk(full);
            } else if (entry.toLowerCase().endsWith('.pdf')) {
                files.push(full);
            }
        }
    };
    walk(dir);
    return files;
}

function regionFromPath(filePath: string): string | undefined {
    const normalized = filePath.replace(/\\/g, '/').toUpperCase();
    if (normalized.includes('/SOUTH/')) return 'SOUTH';
    if (normalized.includes('/NORTH')) return 'NORTH';
    if (normalized.includes('/RAJASTHAN')) return 'RAJASTHAN';
    if (normalized.includes('/MUMBAI')) return 'MUMBAI';
    if (normalized.includes('/KASHMIR')) return 'KASHMIR';
    if (normalized.includes('/NORTH EAST')) return 'NORTH EAST';
    return undefined;
}

async function main() {
    console.log(`📂 Reading itineraries from: ${SOURCE_DIR}`);

    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`❌ Folder not found: ${SOURCE_DIR}`);
        process.exit(1);
    }

    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });

    const pdfFiles = collectPdfFiles(SOURCE_DIR);
    const store: TripContentStore = {};
    const byCode = new Map<string, string[]>();

    for (const filePath of pdfFiles) {
        const filename = path.basename(filePath);
        const code = extractTripCodeFromFilename(filename);
        if (!code) continue;
        const list = byCode.get(code) || [];
        list.push(filePath);
        byCode.set(code, list);
    }

    let parsed = 0;
    let failed = 0;

    for (const [code, paths] of byCode) {
        const sortedPaths = [...paths].sort((a, b) => {
            const aVar = /\([A-Z]\)/i.test(path.basename(a));
            const bVar = /\([A-Z]\)/i.test(path.basename(b));
            if (aVar !== bVar) return aVar ? 1 : -1;
            return a.localeCompare(b);
        });
        const filePath = sortedPaths[0];

        try {
            const rawText = await extractPdfText(filePath);
            const parsedContent = parseItineraryPdfText(rawText);
            if (parsedContent.days.length === 0) {
                console.log(`  ⚠ ${code}: no itinerary days parsed`);
                failed++;
                continue;
            }

            const sanitized = sanitizeParsedContent(parsedContent, code);
            const relativeSource = path.relative(SOURCE_DIR, filePath).replace(/\\/g, '/');

            store[code] = {
                code,
                overview: sanitized.overview,
                shortDescription: buildShortDescription(sanitized, code),
                highlights: sanitized.highlights,
                days: sanitized.days,
                thingsToCarry: sanitized.thingsToCarry,
                notes: sanitized.notes,
                paymentTerms: sanitized.paymentTerms,
                termsAndConditions: sanitized.termsAndConditions,
                sourceFile: relativeSource,
                regionHint: regionFromPath(filePath),
            };

            parsed++;
            if (parsed % 25 === 0) {
                console.log(`  … ${parsed} packages parsed`);
            }
        } catch (error) {
            failed++;
            console.error(`  ✗ ${code}:`, error instanceof Error ? error.message : error);
        }
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(store, null, 2), 'utf-8');

    console.log(`\n✅ Saved ${parsed} packages to ${OUTPUT_FILE}`);
    console.log(`   PDF files scanned: ${pdfFiles.length}, unique codes: ${byCode.size}, failed: ${failed}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
