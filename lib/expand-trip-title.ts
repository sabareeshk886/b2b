const SOUTH_PLACE_ABBREVIATIONS: Array<[string, string]> = [
    ['KOD', 'Kodaikanal'],
    ['RMKL', 'Ramakkalmedu'],
    ['MNR', 'Munnar'],
    ['EKM', 'Ernakulam'],
    ['VGM', 'Vagamon'],
    ['OTY', 'Ooty'],
    ['BLR', 'Bangalore'],
    ['MYS', 'Mysore'],
    ['MYSR', 'Mysore'],
    ['CRG', 'Coorg'],
    ['CHIK', 'Chickmagaluru'],
    ['CHK', 'Chickmagaluru'],
    ['CK', 'Chickmagaluru'],
    ['BELR', 'Belur'],
    ['UDP', 'Udupi'],
    ['DND', 'Dandeli'],
    ['GKR', 'Gokarna'],
    ['GKRN', 'Gokarna'],
    ['GA', 'Goa'],
    ['WND', 'Wonderla'],
    ['WNDR', 'Wonderla'],
    ['WGM', 'Wagamon'],
    ['MAL', 'Malwan'],
    ['HMP', 'Hampi'],
];

export function expandTripTitle(title: string): string {
    let out = title;
    const upper = out.toUpperCase();
    if (upper.includes('KODAIKANAL') || upper.includes('RAMAKKALMEDU') || upper.includes('MUNNAR')) {
        return out;
    }
    for (const [abbr, full] of SOUTH_PLACE_ABBREVIATIONS) {
        out = out.replace(new RegExp(`\\b${abbr}\\b`, 'gi'), full);
    }
    return out;
}
