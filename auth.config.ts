import type { NextAuthConfig, User } from 'next-auth';

// Claims we add to the JWT (next-auth/jwt can't be augmented through its re-export)
type AppClaims = { userId: string; companyId: string; companyName: string; role: User['role']; isPlatformAdmin?: boolean };

// Edge-safe config shared by middleware and the full auth setup in auth.ts.
// Must not import the database or bcrypt.
export const authConfig = {
    pages: {
        signIn: '/login',
    },
    session: { strategy: 'jwt' },
    providers: [],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const user = auth?.user;
            const { pathname } = nextUrl;

            if (pathname.startsWith('/dashboard/admin')) {
                if (!user) return false;
                if (!user.isPlatformAdmin) return Response.redirect(new URL('/dashboard', nextUrl));
                return true;
            }
            if (pathname.startsWith('/dashboard')) return !!user;

            // Signed-in users don't need the login page
            if (user && pathname === '/login') return Response.redirect(new URL('/dashboard', nextUrl));
            return true;
        },
        jwt({ token, user, trigger, session }) {
            // Settings page refreshes the cached company name after renaming
            if (trigger === 'update' && typeof session?.companyName === 'string') {
                token.companyName = session.companyName;
            }
            if (user) {
                token.userId = user.id!;
                token.companyId = user.companyId;
                token.companyName = user.companyName;
                token.role = user.role;
                token.isPlatformAdmin = user.isPlatformAdmin;
            }
            return token;
        },
        session({ session, token }) {
            const claims = token as typeof token & AppClaims;
            session.user.id = claims.userId;
            session.user.companyId = claims.companyId;
            session.user.companyName = claims.companyName;
            session.user.role = claims.role;
            session.user.isPlatformAdmin = claims.isPlatformAdmin === true;
            return session;
        },
    },
} satisfies NextAuthConfig;
