import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import DashboardShell from '@/components/DashboardShell';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const session = await auth();
    if (!session?.user?.companyId) redirect('/login');

    return (
        <SessionProvider session={session}>
            <DashboardShell>{children}</DashboardShell>
        </SessionProvider>
    );
}
