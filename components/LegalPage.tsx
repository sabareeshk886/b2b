import Link from 'next/link';
import { ReactNode } from 'react';
import { Globe } from 'lucide-react';

export const LEGAL_LAST_UPDATED = '9 October 2026';

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="mb-10">
            <h2 className="text-xl font-bold text-[#222222] mb-3">{title}</h2>
            <div className="space-y-3 text-[#484848] leading-relaxed">{children}</div>
        </section>
    );
}

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="min-h-screen bg-white">
            <header className="border-b border-gray-100 px-6 md:px-12 py-5">
                <Link href="/" className="inline-flex items-center space-x-2 text-[#006A4E]">
                    <Globe className="w-6 h-6" />
                    <span className="text-xl font-black tracking-tighter">FERNWAY</span>
                </Link>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-[#222222] mb-2">{title}</h1>
                <p className="text-sm text-[#717171] mb-10">Last updated: {LEGAL_LAST_UPDATED}</p>
                {children}
            </main>

            <footer className="border-t border-gray-100 px-6 md:px-12 py-8 text-sm text-[#717171]">
                <div className="max-w-3xl mx-auto flex flex-wrap gap-6">
                    <span>&copy; 2026 Fernway Inc.</span>
                    <Link href="/terms" className="hover:underline">Terms of Service</Link>
                    <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                    <Link href="/register" className="hover:underline">Become a Partner</Link>
                </div>
            </footer>
        </div>
    );
}
