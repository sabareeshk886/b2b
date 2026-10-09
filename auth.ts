import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from './db';
import { users, companies } from './db/schema';
import { authConfig } from './auth.config';

class InactiveAccountError extends CredentialsSignin {
    code = 'inactive';
}

const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(raw) {
                const parsed = credentialsSchema.safeParse(raw);
                if (!parsed.success) return null;
                const email = parsed.data.email.trim().toLowerCase();

                const [row] = await db
                    .select({ user: users, company: companies })
                    .from(users)
                    .innerJoin(companies, eq(users.companyId, companies.id))
                    .where(eq(users.email, email))
                    .limit(1);

                // Invited users have a placeholder instead of a bcrypt hash; compare fails for them.
                if (!row || !(await bcrypt.compare(parsed.data.password, row.user.passwordHash))) return null;
                if (!row.user.isActive || row.company.status === 'suspended') throw new InactiveAccountError();

                return {
                    id: row.user.id,
                    name: row.user.name,
                    email: row.user.email,
                    companyId: row.company.id,
                    companyName: row.company.name,
                    role: row.user.role,
                    isPlatformAdmin: row.user.isPlatformAdmin,
                };
            },
        }),
    ],
});
