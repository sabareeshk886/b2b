'use server';

import { db } from '../../db';
import { companies, users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function registerCompany(formData: any) {
    try {
        const { companyName, companyEmail, companyPhone, address, licenseNumber, gstNumber, userName, password } = formData;

        if (!companyName || !companyEmail || !userName || !password) {
            return { error: 'Missing required fields' };
        }

        // Check for existing company
        const existingComp = await db.select().from(companies).where(eq(companies.email, companyEmail));
        if (existingComp.length > 0) {
            return { error: 'Company email is already registered.' };
        }

        // Check for existing admin user
        const existingUser = await db.select().from(users).where(eq(users.email, companyEmail));
        if (existingUser.length > 0) {
            return { error: 'Admin email is already registered.' };
        }

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
