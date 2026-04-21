import 'dotenv/config';
import postgres from 'postgres';

async function test() {
    const url = process.env.DATABASE_URL;
    console.log('Testing connection to:', url?.replace(/:[^:@]+@/, ':****@'));
    if (!url) {
        console.error('DATABASE_URL not found');
        process.exit(1);
    }
    const sql = postgres(url, { ssl: 'require' });
    try {
        const res = await sql`SELECT 1`;
        console.log('Connection successful:', res);
    } catch (err) {
        console.error('Connection failed:', err);
    } finally {
        await sql.end();
    }
}

test();
