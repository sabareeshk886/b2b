import 'dotenv/config';
import { db } from './db/index';
import { trips } from './db/schema';

async function main() {
    try {
        console.log("Testing Drizzle query...");
        const allTrips = await db.select().from(trips);
        console.log("Success! Found " + allTrips.length + " trips via Drizzle.");
    } catch (e: any) {
        console.error("Drizzle Query Error:", e);
    }
    process.exit(0);
}
main();
