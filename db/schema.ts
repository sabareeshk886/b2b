import { pgTable, text, timestamp, boolean, integer, decimal, jsonb, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const companyStatusEnum = pgEnum('company_status', ['pending', 'active', 'suspended']);
export const pricingTierEnum = pgEnum('pricing_tier', ['standard', 'premium', 'custom']);
export const userRoleEnum = pgEnum('user_role', ['admin', 'manager', 'user']);
export const quoteStatusEnum = pgEnum('quote_status', ['draft', 'sent', 'confirmed', 'cancelled']);
export const bookingStatusEnum = pgEnum('booking_status', ['pending', 'confirmed', 'completed', 'cancelled']);

// Companies Table
export const companies = pgTable('companies', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    phone: text('phone').notNull(),
    address: text('address'),
    licenseNumber: text('license_number'),
    gstNumber: text('gst_number'),
    status: companyStatusEnum('status').default('active').notNull(),
    pricingTier: pricingTierEnum('pricing_tier').default('standard').notNull(),
    discountPercentage: decimal('discount_percentage', { precision: 5, scale: 2 }).default('10'),
    logoUrl: text('logo_url'),
    brandColor: text('brand_color').default('#8B5CF6'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Users Table
export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    companyId: uuid('company_id').references(() => companies.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    role: userRoleEnum('role').default('user').notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Destinations Table
export const destinations = pgTable('destinations', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    country: text('country').notNull(),
    region: text('region'),
    description: text('description'),
    highlights: jsonb('highlights').$type<string[]>(),
    imageUrl: text('image_url'),
    galleryUrls: jsonb('gallery_urls').$type<string[]>(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Trips Table (Extended for B2B Itineraries)
export const trips = pgTable('trips', {
    id: uuid('id').defaultRandom().primaryKey(),
    code: text('code').notNull().unique(), // e.g., FWN100, FRJ301
    destinationId: uuid('destination_id').references(() => destinations.id, { onDelete: 'set null' }),
    title: text('title').notNull(),
    region: text('region').notNull(), // NORTH, RAJASTHAN, MUMBAI
    destinations: jsonb('destinations').$type<string[]>(), // ["Agra", "Delhi", "Manali"]
    durationDays: integer('duration_days').notNull(),
    durationNights: integer('duration_nights').notNull(),
    shortDescription: text('short_description'),
    overview: text('overview'),
    highlights: jsonb('highlights').$type<string[]>(),
    basePrice: decimal('base_price', { precision: 10, scale: 2 }),
    maxCapacity: integer('max_capacity'),
    season: text('season').default('all_year'),
    imageUrl: text('image_url'),
    galleryUrls: jsonb('gallery_urls').$type<string[]>(),
    pdfUrl: text('pdf_url'),
    featured: boolean('featured').default(false),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Quotes Table
export const quotes = pgTable('quotes', {
    id: uuid('id').defaultRandom().primaryKey(),
    companyId: uuid('company_id').references(() => companies.id, { onDelete: 'cascade' }).notNull(),
    createdByUserId: uuid('created_by_user_id').references(() => users.id),
    customerName: text('customer_name'),
    customerEmail: text('customer_email'),
    customerPhone: text('customer_phone'),
    selectedTrips: jsonb('selected_trips').$type<Array<{ tripId: string; travelers: number; travelDate: string }>>(),
    totalBasePrice: decimal('total_base_price', { precision: 10, scale: 2 }).notNull(),
    discountApplied: decimal('discount_applied', { precision: 10, scale: 2 }).default('0'),
    finalPrice: decimal('final_price', { precision: 10, scale: 2 }).notNull(),
    status: quoteStatusEnum('status').default('draft').notNull(),
    validUntil: timestamp('valid_until'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Bookings Table
export const bookings = pgTable('bookings', {
    id: uuid('id').defaultRandom().primaryKey(),
    quoteId: uuid('quote_id').references(() => quotes.id, { onDelete: 'cascade' }),
    tripId: uuid('trip_id').references(() => trips.id).notNull(),
    companyId: uuid('company_id').references(() => companies.id).notNull(),
    travelDate: timestamp('travel_date').notNull(),
    numberOfTravelers: integer('number_of_travelers').notNull(),
    status: bookingStatusEnum('status').default('pending').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const companiesRelations = relations(companies, ({ many }) => ({
    users: many(users),
    quotes: many(quotes),
    bookings: many(bookings),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
    company: one(companies, {
        fields: [users.companyId],
        references: [companies.id],
    }),
    quotes: many(quotes),
}));

export const destinationsRelations = relations(destinations, ({ many }) => ({
    trips: many(trips),
}));

export const tripsRelations = relations(trips, ({ one, many }) => ({
    destination: one(destinations, {
        fields: [trips.destinationId],
        references: [destinations.id],
    }),
    bookings: many(bookings),
    itineraryDays: many(itineraryDays),
    tripPricing: many(tripPricing),
    tripItems: many(tripItems),
}));

export const quotesRelations = relations(quotes, ({ one }) => ({
    company: one(companies, {
        fields: [quotes.companyId],
        references: [companies.id],
    }),
    createdBy: one(users, {
        fields: [quotes.createdByUserId],
        references: [users.id],
    }),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
    trip: one(trips, {
        fields: [bookings.tripId],
        references: [trips.id],
    }),
    company: one(companies, {
        fields: [bookings.companyId],
        references: [companies.id],
    }),
    quote: one(quotes, {
        fields: [bookings.quoteId],
        references: [quotes.id],
    }),
}));

// Extended Trip Management Tables

// Itinerary Days
export const itineraryDays = pgTable('itinerary_days', {
    id: uuid('id').defaultRandom().primaryKey(),
    tripId: uuid('trip_id').references(() => trips.id, { onDelete: 'cascade' }).notNull(),
    day: integer('day').notNull(),
    title: text('title').notNull(),
    description: text('description'),
    activities: jsonb('activities').$type<string[]>(),
    meals: text('meals'),
    accommodation: text('accommodation'),
    optionalExtras: jsonb('optional_extras').$type<string[]>(),
    displayOrder: integer('display_order').default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Trip Pricing (PAX-based)
export const tripPricing = pgTable('trip_pricing', {
    id: uuid('id').defaultRandom().primaryKey(),
    tripId: uuid('trip_id').references(() => trips.id, { onDelete: 'cascade' }).notNull(),
    minPax: integer('min_pax').notNull(),
    maxPax: integer('max_pax'),
    pricePerPerson: decimal('price_per_person', { precision: 10, scale: 2 }).notNull(),
    currency: text('currency').default('INR'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Trip Inclusions/Exclusions
export const tripItems = pgTable('trip_items', {
    id: uuid('id').defaultRandom().primaryKey(),
    tripId: uuid('trip_id').references(() => trips.id, { onDelete: 'cascade' }).notNull(),
    type: text('type').notNull(), // 'inclusion' or 'exclusion'
    item: text('item').notNull(),
    displayOrder: integer('display_order').default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations for extended tables
export const itineraryDaysRelations = relations(itineraryDays, ({ one }) => ({
    trip: one(trips, {
        fields: [itineraryDays.tripId],
        references: [trips.id],
    }),
}));

export const tripPricingRelations = relations(tripPricing, ({ one }) => ({
    trip: one(trips, {
        fields: [tripPricing.tripId],
        references: [trips.id],
    }),
}));

export const tripItemsRelations = relations(tripItems, ({ one }) => ({
    trip: one(trips, {
        fields: [tripItems.tripId],
        references: [trips.id],
    }),
}));

