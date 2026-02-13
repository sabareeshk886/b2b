# 🚀 Quick Start Guide - Fernway B2B

## Prerequisites Check

Before starting, make sure you have:
- ✅ Node.js 18 or higher installed
- ✅ npm or yarn package manager
- ✅ A Supabase account (free tier works great!)

## Step-by-Step Setup

### 1. Get Your Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the database to initialize (1-2 minutes)
4. Go to **Settings** → **Database**
5. Copy the **Connection String** (it looks like: `postgresql://postgres:[password]@[host]/postgres`)

### 2. Configure Environment

Create a file named `.env.local` in the project root:

```env
DATABASE_URL=paste_your_supabase_connection_string_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret-key-here
```

**To generate a secret key**, run this in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Install & Run

```bash
# Install dependencies (this may take a few minutes)
npm install

# Set up database schema
npm run db:push

# Seed with demo data
npx tsx db/seed.ts

# Start the development server
npm run dev
```

### 4. Open Your Browser

Go to: **http://localhost:3000**

You should see the stunning landing page! 🎉

### 5. Login with Demo Account

Click "Login" and use:
- **Email**: demo@wanderlust.com
- **Password**: demo123

## 🎯 What's Included

The demo data includes:
- ✅ 1 demo company (Wanderlust Travels)
- ✅ 1 admin user account
- ✅ 5 destinations (Bali, Maldives, Dubai, Switzerland, Thailand)
- ✅ 5 trip packages with full itineraries
- ✅ Premium pricing tier (25% B2B discount)

## 🌟 Explore the Platform

Once logged in, you can:

1. **Dashboard** - View stats, recent quotes, quick actions
2. **Trip Catalog** - Browse all available trips with B2B pricing
3. **Create Quotes** - Generate quotes for customers
4. **Manage Bookings** - Track confirmed bookings
5. **Settings** - Update company branding and preferences

## 🚨 Troubleshooting

### Database Connection Issues
- Make sure your Supabase connection string is correct in `.env.local`
- Check that your IP is allowed in Supabase (go to Settings → Database → Connection Pooling)

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or run on a different port
npm run dev -- -p 3001
```

### Missing Dependencies
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

1. **Customize Branding** - Go to Settings → Branding to upload your logo
2. **Add Team Members** - Invite your colleagues
3. **Create Your First Quote** - Try the quote builder
4. **Explore Trip Details** - Click on any trip to see full information

## 🎨 Visual Tour

### Landing Page
- Hero section with gradient animations
- Feature showcase
- Stats display
- Call-to-action buttons

### Dashboard
- Real-time stats cards
- Recent activity feed
- Quick action buttons
- Pricing tier display

### Trip Catalog
- Search and filter functionality
- Beautiful trip cards
- B2B pricing display
- Discount badges

## 🆘 Need Help?

If you encounter any issues:
1. Check the console for error messages
2. Make sure all environment variables are set
3. Verify the database connection is working
4. Try restarting the development server

## 🎉 You're All Set!

Enjoy exploring your premium B2B travel platform!

---

**Pro Tip**: Open the browser's DevTools (F12) to see the console and inspect the beautiful design elements!
