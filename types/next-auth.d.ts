import type { DefaultSession } from 'next-auth';

export type UserRole = 'admin' | 'manager' | 'user';

declare module 'next-auth' {
    interface User {
        companyId: string;
        companyName: string;
        role: UserRole;
        isPlatformAdmin: boolean;
    }
    interface Session {
        user: {
            id: string;
            companyId: string;
            companyName: string;
            role: UserRole;
            isPlatformAdmin: boolean;
        } & DefaultSession['user'];
    }
}

