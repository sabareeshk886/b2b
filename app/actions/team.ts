'use server';

import { db } from '../../db';
import { users, companies } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getSessionUser } from '@/lib/session';

/**
 * Fetches all team members of the signed-in user's company.
 */
export async function getTeamMembers() {
    try {
        const user = await getSessionUser();
        if (!user) return [];

        const teamMembers = await db.select({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
            isActive: users.isActive,
            createdAt: users.createdAt,
        })
            .from(users)
            .where(eq(users.companyId, user.companyId))
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
}) {
    try {
        const user = await getSessionUser();
        if (!user || user.role !== 'admin') {
            return { error: 'Only company admins can add team members' };
        }

        // Check if user already exists
        const [existingUser] = await db.select().from(users).where(eq(users.email, data.email.trim().toLowerCase())).limit(1);
        if (existingUser) {
            return { error: 'User with this email already exists' };
        }

        // Insert new user
        // Note: For a real app, we'd send an invite email or set a temp password
        await db.insert(users).values({
            companyId: user.companyId,
            name: data.name,
            email: data.email.trim().toLowerCase(),
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
 * Fetches the signed-in user's company details.
 */
export async function getCompanyDetails() {
    try {
        const user = await getSessionUser();
        if (!user) return null;

        const [company] = await db.select().from(companies).where(eq(companies.id, user.companyId)).limit(1);
        return company || null;
    } catch (error) {
        console.error('Error fetching company details:', error);
        return null;
    }
}

/**
 * Updates the signed-in user's company details.
 */
export async function updateCompanyDetails(data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    logoUrl?: string | null;
}) {
    try {
        const user = await getSessionUser();
        if (!user || user.role !== 'admin') {
            return { error: 'Only company admins can update the profile' };
        }

        await db.update(companies)
            .set({
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                logoUrl: data.logoUrl,
                updatedAt: new Date(),
            })
            .where(eq(companies.id, user.companyId));

        revalidatePath('/dashboard/settings');
        revalidatePath('/dashboard/layout'); // To update branding in sidebar/header
        return { success: true };
    } catch (error: any) {
        console.error('Error updating company details:', error);
        return { error: error.message || 'Failed to update company details' };
    }
}
