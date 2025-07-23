# Next.js Google Auth Project

A minimal Next.js 14 project using Google authentication with Auth.js (NextAuth.js), Prisma ORM, and MongoDB.

## Stack
- Next.js 14 (App Router)
- Auth.js (NextAuth.js)
- Prisma ORM
- MongoDB
- Tailwind CSS (minimal usage)

## Features
- Google OAuth login
- User session management
- Vendor management (CRUD)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   AUTH_GOOGLE_ID=
   AUTH_GOOGLE_SECRET=
   AUTH_SECRET=
   DATABASE_URL=
   ```

3. **Push the Prisma schema to your database**
   ```bash
   npx prisma db push
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

---

