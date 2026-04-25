import { db } from './db';
import { trips } from './db/schema';
import { eq } from 'drizzle-orm';

async function fixData() {
    console.log('Fixing FWN105...');
    await db.update(trips)
        .set({ 
            title: 'FWN105 - DELHI - MANALI - 3N 4D',
            durationDays: 4,
            durationNights: 3,
            overview: 'Experience the beauty of Manali with this 4 days trip from Delhi.',
            shortDescription: 'Delhi to Manali 4 Days'
        })
        .where(eq(trips.code, 'FWN105'));

    console.log('Fixing FWN116...');
    await db.update(trips)
        .set({ 
            title: 'FWN116 - AGRA - AMRITSAR - CHANDIGARH - DELHI - 5N 6D',
            shortDescription: 'Agra - Amritsar - Chandigarh - Delhi 6 Days'
        })
        .where(eq(trips.code, 'FWN116'));

    console.log('Done.');
    process.exit(0);
}

fixData().catch(err => {
    console.error(err);
    process.exit(1);
});
