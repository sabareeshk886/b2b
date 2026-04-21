import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './db/schema';
import { count } from 'drizzle-orm';

async function check() {
    let connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('DATABASE_URL is not defined');
        process.exit(1);
    }
    connectionString = connectionString.replace(/[\r\n\t]/g, '').trim();

    const client = postgres(connectionString, { prepare: false, ssl: 'require' });
    const db = drizzle(client, { schema });

    try {
        const res = await db.select({ value: count() }).from(schema.trips);
        console.log('TRIP_COUNT:', res[0].value);
    } catch (err: any) {
        console.error('TRIP_CHECK_FAILED:', err.message);
    } finally {
        await client.end();
        process.exit(0);
    }
}

check();
