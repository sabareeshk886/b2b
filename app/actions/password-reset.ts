'use server';

import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { and, eq, gt, isNull, sql } from 'drizzle-orm';
import { db } from '../../db';
import { passwordResetTokens, users } from '../../db/schema';

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_HOUR = 3;
const MIN_PASSWORD_LENGTH = 8;

const hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex');

// APP_URL pins the link origin in production so a forged Host header can't redirect the email link
async function appOrigin() {
    if (process.env.APP_URL) return process.env.APP_URL.replace(/\/$/, '');
    const h = await headers();
    const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
    const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
    return `${proto}://${host}`;
}

async function sendResetEmail(to: string, name: string, link: string) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        if (process.env.NODE_ENV !== 'production') {
            console.log(`[password-reset] RESEND_API_KEY not set; reset link for ${to}: ${link}`);
            return;
        }
        throw new Error('RESEND_API_KEY is not configured');
    }

    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            from: process.env.EMAIL_FROM || 'Fernway B2B <onboarding@resend.dev>',
            to,
            subject: 'Reset your Fernway B2B password',
            html: `
                <p>Hi ${name.replace(/[<>&"]/g, '')},</p>
                <p>We received a request to reset your Fernway B2B password. This link is valid for 1 hour and can be used once:</p>
                <p><a href="${link}" style="display:inline-block;padding:12px 20px;background:#006A4E;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold">Reset password</a></p>
                <p>If you didn't ask for this, you can ignore this email; your password won't change.</p>
            `,
        }),
    });
    if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
}

/** Always resolves with the same message so the form can't be used to discover registered emails. */
export async function requestPasswordReset(rawEmail: string) {
    const done = { success: true as const };
    const email = typeof rawEmail === 'string' ? rawEmail.trim().toLowerCase() : '';
    if (!email) return { error: 'Please enter your email address.' };

    try {
        const [user] = await db
            .select({ id: users.id, name: users.name, isActive: users.isActive })
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
        if (!user || !user.isActive) return done;

        const [{ recent }] = await db
            .select({ recent: sql<number>`count(*)::int` })
            .from(passwordResetTokens)
            .where(and(
                eq(passwordResetTokens.userId, user.id),
                gt(passwordResetTokens.createdAt, new Date(Date.now() - 60 * 60 * 1000)),
            ));
        if (recent >= MAX_REQUESTS_PER_HOUR) return done;

        const token = crypto.randomBytes(32).toString('base64url');
        await db.insert(passwordResetTokens).values({
            userId: user.id,
            tokenHash: hashToken(token),
            expiresAt: new Date(Date.now() + TOKEN_TTL_MS),
        });

        await sendResetEmail(email, user.name, `${await appOrigin()}/reset-password?token=${token}`);
        return done;
    } catch (error) {
        console.error('Password reset request error:', error);
        return { error: 'Could not send the reset email right now. Please try again later.' };
    }
}

export async function resetPassword(token: string, password: string) {
    if (typeof token !== 'string' || !token) return { error: 'This reset link is invalid.' };
    if (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
        return { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` };
    }

    try {
        const now = new Date();
        // Claim the token atomically so it can only be used once
        const [claimed] = await db
            .update(passwordResetTokens)
            .set({ usedAt: now })
            .where(and(
                eq(passwordResetTokens.tokenHash, hashToken(token)),
                isNull(passwordResetTokens.usedAt),
                gt(passwordResetTokens.expiresAt, now),
            ))
            .returning({ userId: passwordResetTokens.userId });
        if (!claimed) return { error: 'This reset link is invalid or has expired. Please request a new one.' };

        await db
            .update(users)
            .set({ passwordHash: await bcrypt.hash(password, 10), updatedAt: now })
            .where(eq(users.id, claimed.userId));

        // Any other outstanding links for this user stop working
        await db
            .update(passwordResetTokens)
            .set({ usedAt: now })
            .where(and(eq(passwordResetTokens.userId, claimed.userId), isNull(passwordResetTokens.usedAt)));

        return { success: true as const };
    } catch (error) {
        console.error('Password reset error:', error);
        return { error: 'Could not reset your password right now. Please try again.' };
    }
}
