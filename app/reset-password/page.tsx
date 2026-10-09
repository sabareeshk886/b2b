'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Globe, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { resetPassword } from '../actions/password-reset';

export default function ResetPasswordPage() {
    return (
        <Suspense>
            <ResetPasswordForm />
        </Suspense>
    );
}

function ResetPasswordForm() {
    const token = useSearchParams().get('token') ?? '';
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        if (password !== confirmPassword) {
            setErrorMsg('Passwords do not match.');
            return;
        }
        setIsLoading(true);
        try {
            const res = await resetPassword(token, password);
            if ('error' in res && res.error) {
                setErrorMsg(res.error);
                setIsLoading(false);
                return;
            }
            window.location.href = '/login?reset=1';
        } catch {
            setErrorMsg('Could not reset your password right now. Please try again.');
            setIsLoading(false);
        }
    };

    const inputClass = 'w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all';

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-white">
            <div className="w-full max-w-md">
                <Link href="/" className="inline-flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gradient">B2B</span>
                </Link>

                <h1 className="text-4xl font-bold mb-2 text-gray-800">Set a new password</h1>

                {!token ? (
                    <div role="alert" className="mt-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
                        This reset link is invalid. <Link href="/forgot-password" className="underline font-semibold">Request a new one</Link>.
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 mb-8">Choose a password with at least 8 characters.</p>

                        {errorMsg && (
                            <div role="alert" className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
                                {errorMsg}
                                {errorMsg.includes('expired') && (
                                    <> <Link href="/forgot-password" className="underline font-semibold">Request a new link</Link></>
                                )}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={inputClass}
                                        placeholder="••••••••"
                                        minLength={8}
                                        autoComplete="new-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={inputClass}
                                        placeholder="••••••••"
                                        minLength={8}
                                        autoComplete="new-password"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full gradient-primary text-white py-3.5 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center text-lg disabled:opacity-70 disabled:hover:scale-100"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update password'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
