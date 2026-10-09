import type { DefaultSession } from 'next-auth';

export type UserRole = 'admin' | 'manager' | 'user';

declare module 'next-auth' {
    interface User {
        companyId: string;
        companyName: string;
        role: UserRole;
    }
    interface Session {
        user: {
            id: string;
            companyId: string;
            companyName: string;
            role: UserRole;
        } & DefaultSession['user'];
    }
}

