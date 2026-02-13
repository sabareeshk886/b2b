import { db } from './index';
import { companies, users, destinations, trips, itineraryDays, tripItems } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
    console.log('🌱 Seeding database...');

    // Create demo companies
    const [demoCompany] = await db.insert(companies).values({
        name: 'Wanderlust Travels',
        email: 'info@wanderlust.com',
        phone: '+91 98765 43210',
        address: 'Mumbai, Maharashtra, India',
        licenseNumber: 'TL123456',
        gstNumber: '29ABCDE1234F1Z5',
        status: 'active',
        pricingTier: 'premium',
        discountPercentage: '25',
        brandColor: '#8B5CF6',
    }).returning();

    console.log('✅ Created demo company');

    // Create demo user
    const passwordHash = await bcrypt.hash('demo123', 10);
    await db.insert(users).values({
        companyId: demoCompany.id,
        name: 'Demo User',
        email: 'demo@wanderlust.com',
        passwordHash,
        role: 'admin',
    });

    console.log('✅ Created demo user (email: demo@wanderlust.com, password: demo123)');

    // Create destinations
    const destinationData = [
        {
            name: 'Bali',
            country: 'Indonesia',
            region: 'Southeast Asia',
            description: 'Experience the magic of Bali with pristine beaches, ancient temples, and vibrant culture.',
            highlights: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Seminyak Beach', 'Mount Batur Sunrise'],
            imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
            galleryUrls: [
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
                'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
            ],
        },
        {
            name: 'Maldives',
            country: 'Maldives',
            region: 'South Asia',
            description: 'Paradise on Earth with crystal-clear waters, luxury resorts, and world-class diving.',
            highlights: ['Overwater Bungalows', 'Coral Reefs', 'Water Sports', 'Spa Retreats'],
            imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
            galleryUrls: [
                'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
                'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
            ],
        },
        {
            name: 'Dubai',
            country: 'UAE',
            region: 'Middle East',
            description: 'Luxury and innovation meet in this desert metropolis with world-famous attractions.',
            highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall', 'Palm Jumeirah'],
            imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
            galleryUrls: [
                'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
                'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
            ],
        },
        {
            name: 'Switzerland',
            country: 'Switzerland',
            region: 'Europe',
            description: 'Alpine paradise with stunning mountains, charming villages, and chocolate delights.',
            highlights: ['Swiss Alps', 'Interlaken', 'Lucerne', 'Chocolate Factory Tours'],
            imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
            galleryUrls: [
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
                'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80',
            ],
        },
        {
            name: 'Thailand',
            country: 'Thailand',
            region: 'Southeast Asia',
            description: 'Land of smiles with golden temples, tropical islands, and delicious street food.',
            highlights: ['Bangkok Temples', 'Phi Phi Islands', 'Floating Markets', 'Thai Massage'],
            imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80',
            galleryUrls: [
                'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80',
                'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80',
            ],
        },
    ];

    const createdDestinations = await db.insert(destinations).values(destinationData).returning();
    console.log('✅ Created destinations');

    // Create trips
    const tripData = [
        {
            destinationId: createdDestinations[0].id, // Bali
            code: 'BALI001',
            region: 'Southeast Asia',
            title: 'Bali Paradise - 6 Days 5 Nights',
            durationDays: 6,
            durationNights: 5,
            destinations: ['Bali', 'Ubud', 'Seminyak'],
            shortDescription: 'Culture, beaches and adventure',
            overview: 'Experience the best of Bali with this comprehensive package including cultural sites, beach relaxation, and adventure activities.',
            itinerary: [
                {
                    day: 1,
                    title: 'Arrival & Seminyak Beach',
                    description: 'Arrive in Bali, transfer to hotel, relax at Seminyak Beach',
                    activities: ['Airport pickup', 'Hotel check-in', 'Beach sunset', 'Welcome dinner'],
                },
                {
                    day: 2,
                    title: 'Ubud Cultural Tour',
                    description: 'Explore Ubud rice terraces, temples, and art galleries',
                    activities: ['Tegalalang Rice Terrace', 'Ubud Monkey Forest', 'Traditional dance show'],
                },
                {
                    day: 3,
                    title: 'Water Sports & Beach',
                    description: 'Exciting water sports and beach activities',
                    activities: ['Jet skiing', 'Parasailing', 'Banana boat', 'Beach BBQ'],
                },
            ],
            basePrice: '45000',
            maxCapacity: 20,
            season: 'all_year',
            inclusions: ['Flights', 'Accommodation', 'Daily breakfast', 'Guided tours', 'Transfers'],
            exclusions: ['Travel insurance', 'Personal expenses', 'Visa fees'],
            imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
            galleryUrls: [
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
                'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
            ],
            highlights: ['Ubud', 'Beaches', 'Temples'],
        },
        {
            destinationId: createdDestinations[1].id, // Maldives
            code: 'MALD001',
            region: 'South Asia',
            title: 'Maldives Luxury Escape - 5 Days 4 Nights',
            durationDays: 5,
            durationNights: 4,
            destinations: ['Maldives', 'Male'],
            shortDescription: 'Ultimate luxury in paradise',
            overview: 'Ultimate luxury experience in Maldives with overwater villas and premium amenities.',
            itinerary: [
                {
                    day: 1,
                    title: 'Arrival & Resort Check-in',
                    description: 'Speedboat transfer to luxurious island resort',
                    activities: ['Airport pickup', 'Speedboat transfer', 'Welcome cocktail', 'Sunset cruise'],
                },
                {
                    day: 2,
                    title: 'Snorkeling Adventure',
                    description: 'Explore vibrant coral reefs and marine life',
                    activities: ['Guided snorkeling', 'Dolphin watching', 'Beach relaxation'],
                },
            ],
            basePrice: '85000',
            maxCapacity: 15,
            season: 'all_year',
            inclusions: ['Flights', 'Overwater villa', 'All meals', 'Spa treatments', 'Water sports'],
            exclusions: ['Travel insurance', 'Alcoholic beverages', 'Diving courses'],
            imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
            galleryUrls: [
                'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
                'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
            ],
            highlights: ['Beaches', 'Luxury', 'Diving'],
        },
        {
            destinationId: createdDestinations[2].id, // Dubai
            code: 'DXB001',
            region: 'Middle East',
            title: 'Dubai Extravaganza - 4 Days 3 Nights',
            durationDays: 4,
            durationNights: 3,
            destinations: ['Dubai'],
            shortDescription: 'City of gold and desert adventures',
            overview: 'Discover the marvels of Dubai with city tours, desert safari, and luxury shopping.',
            itinerary: [
                {
                    day: 1,
                    title: 'Dubai City Tour',
                    description: 'Explore Dubai landmarks and attractions',
                    activities: ['Burj Khalifa visit', 'Dubai Mall', 'Dubai Fountain show', 'Creek cruise'],
                },
                {
                    day: 2,
                    title: 'Desert Safari',
                    description: 'Thrilling desert adventure with BBQ dinner',
                    activities: ['Dune bashing', 'Camel riding', 'BBQ dinner', 'Belly dance show'],
                },
            ],
            basePrice: '55000',
            maxCapacity: 25,
            season: 'winter',
            inclusions: ['Flights', '4-star hotel', 'Daily breakfast', 'All tours', 'Visa'],
            exclusions: ['Lunches & dinners', 'Optional activities', 'Travel insurance'],
            imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
            galleryUrls: [
                'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
                'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
            ],
            highlights: ['City', 'Shopping', 'Desert'],
        },
        {
            destinationId: createdDestinations[3].id, // Switzerland
            code: 'SWIZ001',
            region: 'Europe',
            title: 'Swiss Alps Adventure - 7 Days 6 Nights',
            durationDays: 7,
            durationNights: 6,
            destinations: ['Zurich', 'Lucerne', 'Interlaken'],
            shortDescription: 'Mountains, chocolate and trains',
            overview: 'Experience the breathtaking beauty of Swiss Alps with scenic train rides and mountain adventures.',
            itinerary: [
                {
                    day: 1,
                    title: 'Arrival in Zurich',
                    description: 'Explore Zurich city',
                    activities: ['City walking tour', 'Lake Zurich cruise', 'Old town exploration'],
                },
                {
                    day: 2,
                    title: 'Lucerne & Mt. Titlis',
                    description: 'Visit Lucerne and cable car to Mt. Titlis',
                    activities: ['Chapel Bridge', 'Cable car ride', 'Ice grotto', 'Cliff walk'],
                },
            ],
            basePrice: '125000',
            maxCapacity: 18,
            season: 'summer',
            inclusions: ['Flights', 'Hotels', 'Swiss Pass', 'Guided tours', 'Some meals'],
            exclusions: ['Travel insurance', 'Optional excursions', 'Personal expenses'],
            imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
            galleryUrls: [
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
                'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80',
            ],
            highlights: ['Mountains', 'Nature', 'Scenery'],
        },
        {
            destinationId: createdDestinations[4].id, // Thailand
            code: 'THAI001',
            region: 'Southeast Asia',
            title: 'Amazing Thailand - 6 Days 5 Nights',
            durationDays: 6,
            durationNights: 5,
            destinations: ['Bangkok', 'Pattaya'],
            shortDescription: 'Temples, food and culture',
            overview: 'Explore bustling Bangkok and tropical paradise of Phuket in one amazing journey.',
            itinerary: [
                {
                    day: 1,
                    title: 'Bangkok Arrival',
                    description: 'Arrival and Bangkok city tour',
                    activities: ['Grand Palace', 'Wat Pho', 'Chao Phraya river cruise', 'Night market'],
                },
                {
                    day: 2,
                    title: 'Floating Market',
                    description: 'Experience authentic Thai culture',
                    activities: ['Floating market', 'Thai cooking class', 'Temple visits'],
                },
            ],
            basePrice: '38000',
            maxCapacity: 30,
            season: 'all_year',
            inclusions: ['Flights', 'Hotels', 'Daily breakfast', 'Tours', 'Transfers'],
            exclusions: ['Travel insurance', 'Lunches & dinners', 'Optional activities'],
            imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80',
            galleryUrls: [
                'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80',
                'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80',
            ],
            highlights: ['Culture', 'Food', 'Temples'],
        },
    ];

    for (const trip of tripData) {
        // Insert trip main data
        const [createdTrip] = await db.insert(trips).values({
            code: trip.code,
            destinationId: trip.destinationId,
            title: trip.title,
            region: trip.region,
            destinations: trip.destinations,
            durationDays: trip.durationDays,
            durationNights: trip.durationNights,
            shortDescription: trip.shortDescription,
            overview: trip.overview,
            highlights: trip.highlights,
            basePrice: trip.basePrice,
            maxCapacity: trip.maxCapacity,
            season: trip.season,
            imageUrl: trip.imageUrl,
            galleryUrls: trip.galleryUrls,
        }).returning();

        // Insert itinerary days
        if (trip.itinerary && trip.itinerary.length > 0) {
            await db.insert(itineraryDays).values(
                trip.itinerary.map(day => ({
                    tripId: createdTrip.id,
                    day: day.day,
                    title: day.title,
                    description: day.description,
                    activities: day.activities,
                }))
            );
        }

        // Insert inclusions
        if (trip.inclusions && trip.inclusions.length > 0) {
            await db.insert(tripItems).values(
                trip.inclusions.map((item, idx) => ({
                    tripId: createdTrip.id,
                    type: 'inclusion',
                    item: item,
                    displayOrder: idx
                }))
            );
        }

        // Insert exclusions
        if (trip.exclusions && trip.exclusions.length > 0) {
            await db.insert(tripItems).values(
                trip.exclusions.map((item, idx) => ({
                    tripId: createdTrip.id,
                    type: 'exclusion',
                    item: item,
                    displayOrder: idx
                }))
            );
        }
    }

    console.log('✅ Created trips with itinerary and items');

    console.log('\n🎉 Seed completed successfully!');
    console.log('\n📝 Demo credentials:');
    console.log('   Email: demo@wanderlust.com');
    console.log('   Password: demo123');
}

seed()
    .catch((error) => {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    })
    .finally(() => {
        process.exit(0);
    });
