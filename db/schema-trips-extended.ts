import { pgTable, text, timestamp, integer, uuid, serial } from 'drizzle-orm/pg-core';

// Additional tables for detailed trip management

// Itinerary Days (separate table for flexibility)
export const itineraryDays = pgTable('itinerary_days', {
    id: uuid('id').defaultRandom().primaryKey(),
    tripId: uuid('trip_id').notNull(), // references trips.id
    day: integer('day').notNull(),
    title: text('title').notNull(),
    description: text('description'),
    activities: text('activities').array(), // Array of activity strings
    meals: text('meals'), // e.g., "Breakfast, Lunch, Dinner"
    accommodation: text('accommodation'),
    optionalExtras: text('optional_extras').array(),
    displayOrder: integer('display_order').default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Trip Pricing (PAX-based pricing tiers)
export const tripPricing = pgTable('trip_pricing', {
    id: uuid('id').defaultRandom().primaryKey(),
    tripId: uuid('trip_id').notNull(), // references trips.id
    minPax: integer('min_pax').notNull(),
    maxPax: integer('max_pax'),
    pricePerPerson: integer('price_per_person').notNull(),
    currency: text('currency').default('INR'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Trip Inclusions/Exclusions
export const tripItems = pgTable('trip_items', {
    id: uuid('id').defaultRandom().primaryKey(),
    tripId: uuid('trip_id').notNull(), // references trips.id
    type: text('type').notNull(), // 'inclusion' or 'exclusion'
    item: text('item').notNull(),
    displayOrder: integer('display_order').default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
