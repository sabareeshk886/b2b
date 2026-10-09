import { auth } from '@/auth';

/** Returns the signed-in user's session, or null when unauthenticated. */
export async function getSessionUser() {
    const session = await auth();
    return session?.user?.companyId ? session.user : null;
}

/** Throws unless the caller is signed in as an admin. */
export async function requireAdmin() {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') throw new Error('Unauthorized');
    return user;
}
