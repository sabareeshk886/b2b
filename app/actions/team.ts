'use server';

import { db } from '../../db';
import { users, companies } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

/**
 * Fetches all team members for a given company.
 * In a real app, the companyId would come from the verified session.
 * For this demo, we can pass it or fallback to the first company.
 */
export async function getTeamMembers(companyNameFallback?: string) {
    try {
        let companyId: string | undefined;

        if (companyNameFallback) {
            const [company] = await db.select().from(companies).where(eq(companies.name, companyNameFallback)).limit(1);
            if (company) companyId = company.id;
        }

        // Fallback to the first company if not found (for demo purposes)
        if (!companyId) {
            const allCompanies = await db.select().from(companies).limit(1);
            if (allCompanies.length > 0) {
                companyId = allCompanies[0].id;
            }
        }

        if (!companyId) return [];

        const teamMembers = await db.select()
            .from(users)
            .where(eq(users.companyId, companyId))
            .orderBy(desc(users.createdAt));

        return teamMembers;
    } catch (error) {
        console.error('Error fetching team members:', error);
        return [];
    }
}

/**
 * Adds a new team member to a company.
 */
export async function addTeamMember(data: {
    name: string;
    email: string;
    phone: string;
    role: 'admin' | 'manager' | 'user';
    companyName: string;
}) {
    try {
        // Find company by name (as a demo shortcut)
        let [company] = await db.select().from(companies).where(eq(companies.name, data.companyName)).limit(1);
        
        // Fallback to first company if not found
        if (!company) {
            const allCompanies = await db.select().from(companies).limit(1);
            company = allCompanies[0];
        }

        if (!company) {
            return { error: 'Company not found' };
        }

        // Check if user already exists
        const [existingUser] = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
        if (existingUser) {
            return { error: 'User with this email already exists' };
        }

        // Insert new user
        // Note: For a real app, we'd send an invite email or set a temp password
        await db.insert(users).values({
            companyId: company.id,
            name: data.name,
            email: data.email,
            passwordHash: 'invited_user_placeholder', // Should be handled by an invitation flow
            role: data.role,
            isActive: true,
        });

        revalidatePath('/dashboard/team');
        return { success: true };
    } catch (error: any) {
        console.error('Error adding team member:', error);
        return { error: error.message || 'Failed to add team member' };
    }
}

/**
 * Fetches company details.
 */
export async function getCompanyDetails(companyName: string) {
    try {
        const [company] = await db.select().from(companies).where(eq(companies.name, companyName)).limit(1);
        
        // Fallback to first company for demo
        if (!company) {
            const allCompanies = await db.select().from(companies).limit(1);
            return allCompanies[0] || null;
        }

        return company || null;
    } catch (error) {
        console.error('Error fetching company details:', error);
        return null;
    }
}

/**
 * Updates company details.
 */
export async function updateCompanyDetails(data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    logoUrl?: string | null;
}) {
    try {
        await db.update(companies)
            .set({
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                logoUrl: data.logoUrl,
                updatedAt: new Date(),
            })
            .where(eq(companies.id, data.id));

        revalidatePath('/dashboard/settings');
        revalidatePath('/dashboard/layout'); // To update branding in sidebar/header
        return { success: true };
    } catch (error: any) {
        console.error('Error updating company details:', error);
        return { error: error.message || 'Failed to update company details' };
    }
}
