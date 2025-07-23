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
   AUTH_GOOGLE_ID=your-google-client-id
   AUTH_GOOGLE_SECRET=your-google-client-secret
   AUTH_SECRET=your-auth-secret
   DATABASE_URL=your-mongodb-connection-string
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

---

## Links

- [View Source Code on GitHub](https://github.com/SSazzadur/nextjs-google-auth)
- [About Me](https://github.com/SSazzadur)
