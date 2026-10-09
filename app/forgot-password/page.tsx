'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { requestPasswordReset } from '../actions/password-reset';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');
        try {
            const res = await requestPasswordReset(email);
            if ('error' in res && res.error) {
                setErrorMsg(res.error);
                return;
            }
            setSent(true);
        } catch {
            setErrorMsg('Could not send the reset email right now. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-white">
            <div className="w-full max-w-md">
                <Link href="/" className="inline-flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gradient">B2B</span>
                </Link>

                <h1 className="text-4xl font-bold mb-2 text-gray-800">Forgot password?</h1>

                {sent ? (
                    <>
                        <div role="status" className="mt-6 mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium">
                            If an account exists for <strong>{email.trim()}</strong>, we've sent a link to reset your password.
                            It's valid for 1 hour. Check your spam folder if you don't see it.
                        </div>
                        <button
                            type="button"
                            onClick={() => setSent(false)}
                            className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold"
                        >
                            Use a different email
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-gray-600 mb-8">Enter your account email and we'll send you a link to reset your password.</p>

                        {errorMsg && (
                            <div role="alert" className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
                                {errorMsg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                        placeholder="you@company.com"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full gradient-primary text-white py-3.5 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center text-lg disabled:opacity-70 disabled:hover:scale-100"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send reset link'}
                            </button>
                        </form>
                    </>
                )}

                <Link href="/login" className="mt-8 inline-flex items-center text-sm text-gray-600 hover:text-gray-800 font-semibold">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to sign in
                </Link>
            </div>
        </div>
    );
}
