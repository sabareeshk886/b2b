/** Extract trip code from itinerary PDF filename (FWN100, FWS302, FRNK401, etc.). */
export function extractTripCodeFromFilename(filename: string): string | null {
    const base = filename.replace(/\.pdf$/i, '').trim();

    const variantMatch = base.match(/^((?:FWN|FWS|FRNK|FRJ|FWM)\d{3})\s*\(([A-Z])\)/i);
    if (variantMatch) {
        return `${variantMatch[1].toUpperCase()}${variantMatch[2].toUpperCase()}`;
    }

    const codeMatch = base.match(/^((?:FWN|FWS|FRNK|FRJ|FWM)\d{3})/i);
    return codeMatch ? codeMatch[1].toUpperCase() : null;
}
