'use server';

import { db } from '../../db';
import { companies, users } from '../../db/schema';
import { eq, sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

type RegistrationField = 'companyEmail' | 'companyPhone';

// Compare phones by their last 10 digits so "+91 98765 43210" matches "9876543210"
function phoneKey(phone: unknown): string {
    const digits = typeof phone === 'string' ? phone.replace(/\D/g, '') : '';
    return digits.length >= 10 ? digits.slice(-10) : '';
}

async function findTakenField(email: string, phone: unknown): Promise<{ error: string; field: RegistrationField } | null> {
    if (email) {
        const [company] = await db.select({ id: companies.id }).from(companies).where(eq(companies.email, email)).limit(1);
        const [user] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
        if (company || user) {
            return { error: 'This email is already registered. Log in instead, or use a different email.', field: 'companyEmail' };
        }
    }

    const key = phoneKey(phone);
    if (key) {
        const [company] = await db
            .select({ id: companies.id })
            .from(companies)
            .where(sql`right(regexp_replace(${companies.phone}, '[^0-9]', '', 'g'), 10) = ${key}`)
            .limit(1);
        if (company) {
            return { error: 'This phone number is already registered. Log in instead, or use a different number.', field: 'companyPhone' };
        }
    }
    return null;
}

/** Step-1 check so a duplicate email/phone is reported before the user fills in their account details. */
export async function checkRegistrationAvailability(
    companyEmail: string,
    companyPhone: string,
): Promise<{ error?: string; field?: RegistrationField }> {
    try {
        const email = typeof companyEmail === 'string' ? companyEmail.trim().toLowerCase() : '';
        return (await findTakenField(email, companyPhone)) ?? {};
    } catch (error: any) {
        console.error('Registration check error:', error);
        return { error: 'Could not verify your details. Please try again.' };
    }
}

export async function registerCompany(formData: any) {
    try {
        const { companyName, companyPhone, address, licenseNumber, gstNumber, userName, password } = formData;
        const companyEmail = typeof formData.companyEmail === 'string' ? formData.companyEmail.trim().toLowerCase() : '';

        if (!companyName || !companyEmail || !userName || !password) {
            return { error: 'Missing required fields' };
        }

        const taken = await findTakenField(companyEmail, companyPhone);
        if (taken) return taken;

        const passwordHash = await bcrypt.hash(password, 10);

        // Insert new company
        const [newCompany] = await db.insert(companies).values({
            name: companyName,
            email: companyEmail,
            phone: companyPhone || '',
            address: address || null,
            licenseNumber: licenseNumber || null,
            gstNumber: gstNumber || null,
        }).returning();

        // Insert admin user link
        await db.insert(users).values({
            companyId: newCompany.id,
            name: userName,
            email: companyEmail,
            passwordHash: passwordHash,
            role: 'admin',
        });

        return { success: true };
    } catch (error: any) {
        console.error('Registration Error:', error);
        return { error: error.message || 'An unexpected error occurred' };
    }
}
