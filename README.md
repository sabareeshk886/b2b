# Fernway B2B - Premium Travel Platform

🚀 A modern, feature-rich B2B travel platform built with Next.js 15, TypeScript, and Supabase. Designed to surpass competitors like Journey Meister with stunning UI and powerful features.

## ✨ Features

### For Partner Companies
- 🎯 **Exclusive B2B Pricing** - Up to 30% discount on all trips
- 📦 **Comprehensive Trip Catalog** - 150+ destinations worldwide
- 📝 **Instant Quote Generation** - Create professional quotes in seconds
- 🎨 **White-Label Brochures** - Download PDFs with your company branding
- 👥 **Multi-User Access** - Add unlimited team members with role-based permissions
- 📊 **Analytics Dashboard** - Track your performance and revenue
- 🔔 **Real-time Notifications** - Stay updated on new trips and pricing

### For Platform Admins
- 🏢 **Company Management** - Approve and manage partner companies
- 🌍 **Trip Management** - Add/edit destinations and packages
- 💰 **Flexible Pricing Tiers** - Standard, Premium, and Custom pricing
- 📈 **Comprehensive Analytics** - Track bookings, revenue, and performance
- 👨‍💼 **User Management** - Role-based access control

## 🎨 Design Highlights

- **Premium UI** with glassmorphism effects
- **Animated gradients** and smooth transitions
- **Dark mode support**
- **Mobile-responsive** design
- **Custom color system** with vibrant palettes
- **Micro-animations** for enhanced UX

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Drizzle ORM
- **Authentication**: NextAuth.js v5
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **PDF Generation**: jsPDF

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or Supabase account)

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL=postgresql://user:password@host:5432/database
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # Supabase (if using)
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. **Set Up Database**
   ```bash
   # Generate migrations
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed database with demo data
   npx tsx db/seed.ts
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Demo Credentials

After running the seed script, use these credentials to login:

- **Email**: `demo@wanderlust.com`
- **Password**: `demo123`
- **Company**: Wanderlust Travels (Premium Tier, 25% discount)

## 📁 Project Structure

```
fernway-b2b/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/         # Protected dashboard routes
│   │   ├── trips/         # Trip catalog
│   │   ├── quotes/        # Quote management
│   │   ├── bookings/      # Booking management
│   │   ├── team/          # Team management
│   │   └── settings/      # Settings
│   ├── globals.css        # Global styles & design system
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable React components
│   ├── ui/               # UI primitives
│   └── layout/           # Layout components
├── db/                   # Database configuration
│   ├── schema.ts         # Drizzle ORM schema
│   ├── index.ts          # DB connection
│   └── seed.ts           # Seed data
├── lib/                  # Utility functions
├── public/               # Static assets
└── package.json
```

## 🌐 Database Schema

### Core Tables
- **companies** - Partner travel companies
- **users** - Company users with role-based access
- **destinations** - Travel destinations
- **trips** - Trip packages with pricing
- **quotes** - Customer quotes
- **bookings** - Confirmed bookings

### Key Features
- UUID primary keys
- Timestamp tracking (created_at, updated_at)
- Enum types for status fields
- JSON fields for flexible data (itineraries, highlights)
- Proper foreign key relationships
- Cascade deletes where appropriate

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Database Setup (Supabase)

1. Create a new Supabase project
2. Copy the connection string
3. Run migrations: `npm run db:push`
4. Seed data: `npx tsx db/seed.ts`

## 🎯 Roadmap

### Phase 1 - MVP (Current)
- ✅ Landing page
- ✅ Authentication (Login/Register)
- ✅ Dashboard overview
- ✅ Trip catalog
- ⏳ Quote creation
- ⏳ Booking management

### Phase 2 - Enhanced Features
- [ ] PDF brochure generation
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Payment integration
- [ ] Multi-currency support

### Phase 3 - Advanced
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Automated inventory management
- [ ] CRM integration

## 💡 Key Advantages Over Competitors

### vs. Journey Meister
1. **Modern Design** - Glassmorphism, gradients, animations
2. **Better UX** - Intuitive navigation, quick actions
3. **Advanced Features** - White-label brochures, multi-user, analytics
4. **Flexible Pricing** - Custom tiers per company
5. **Real-time Updates** - Live notifications and inventory
6. **Mobile Optimized** - Fully responsive design

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm start            # Start production server

# Database
npm run db:generate  # Generate migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio

# Linting
npm run lint         # Run ESLint
```

## 🤝 Support

For questions or issues, please contact support or create an issue in the repository.

## 📄 License

MIT License - feel free to use this for your business!

---

Built with ❤️ by the Fernway Team
