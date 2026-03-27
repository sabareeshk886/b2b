import 'dotenv/config';
import postgres from 'postgres';
import fs from 'fs';

const poolerUrl = process.env.DATABASE_URL!;

async function main() {
    let out = "Testing pooler URL (No SSL)\n";
    try {
        const client = postgres(poolerUrl);
        const result = await client`SELECT 1 as result`;
        out += 'Success connecting to pooler postgres: ' + JSON.stringify(result) + '\n';
        
        const tripsCount = await client`SELECT count(*) FROM trips`;
        out += 'Trips count: ' + JSON.stringify(tripsCount) + '\n';
    } catch(e: any) {
        out += 'Error with pooler URL (No SSL): ' + e.toString() + '\n';
        if (e.message) out += e.message + '\n';
    }
    fs.writeFileSync('out.txt', out);
    process.exit(0);
}
main();
