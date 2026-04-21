import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './db/schema';

async function audit() {
    let connectionString = process.env.DATABASE_URL;
    if (!connectionString) process.exit(1);
    connectionString = connectionString.replace(/[\r\n\t]/g, '').trim();

    const client = postgres(connectionString, { prepare: false, ssl: 'require' });
    const db = drizzle(client, { schema });

    try {
        const trips = await db.select().from(schema.trips);
        console.log(JSON.stringify(trips.map(t => ({ code: t.code, title: t.title, pdf: t.pdfUrl })), null, 2));
    } catch (err: any) {
        console.error('AUDIT_FAILED:', err.message);
    } finally {
        await client.end();
        process.exit(0);
    }
}

audit();
