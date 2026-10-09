/**
 * Grants (or with --revoke, removes) Fernway platform-admin rights, which allow managing the shared trip catalog.
 * Usage: npx tsx scripts/make-platform-admin.ts <email> [--revoke]
 * The user must sign out and back in for the change to reach their session.
 */
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema';

async function main() {
    const args = process.argv.slice(2);
    const revoke = args.includes('--revoke');
    const email = args.find(a => !a.startsWith('--'))?.trim().toLowerCase();
    if (!email) {
        console.error('Usage: npx tsx scripts/make-platform-admin.ts <email> [--revoke]');
        process.exit(1);
    }

    const [updated] = await db
        .update(users)
        .set({ isPlatformAdmin: !revoke, updatedAt: new Date() })
        .where(eq(users.email, email))
        .returning({ email: users.email, isPlatformAdmin: users.isPlatformAdmin });

    if (!updated) {
        console.error(`No user found with email ${email}`);
        process.exit(1);
    }
    console.log(`${updated.email}: isPlatformAdmin = ${updated.isPlatformAdmin}`);
    process.exit(0);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
