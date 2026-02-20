# 📘 Phase 1 Guide — Project Setup

> **GitHub Issue:** [#1 — Project Setup](https://github.com/Seekers747/Nexus/issues/1)
> **Branch:** `issue1`
> **Goal:** Establish the foundation for Nexus — Next.js + Tailwind CSS, Supabase DB, Clerk Auth, and Vercel deployment.

---

## 📋 Checklist

- [x] Initialize Next.js project and configure Tailwind CSS
- [x] Set up Supabase project and connection
- [ ] Integrate Clerk for authentication
- [ ] Deploy frontend to Vercel
- [ ] Test end-to-end: register, login, protected routes

---

## ⚠️ Important Version Notes

| Tool | Version | Notes |
|------|---------|-------|
| Next.js | 16.1.6 | App Router |
| React | 19.2.3 | |
| Tailwind CSS | v4 | **No `tailwind.config.ts`** — CSS-first config via `globals.css` |
| Supabase keys | New 2025 system | `anon` key is **legacy/deprecated** — use **Publishable** key |

---

## ✅ Step 1 — Initialize Next.js + Tailwind CSS

### Commands

```bash
# From OUTSIDE the Nexus folder (avoids capital letter issue)
cd ..
npx create-next-app@latest nexus-temp --typescript --eslint --app

# Move files into your actual repo folder
Move-Item -Path nexus-temp\* -Destination Nexus\ -Force
Move-Item -Path nexus-temp\.* -Destination Nexus\ -Force
Remove-Item -Path nexus-temp -Recurse -Force

cd Nexus
```

### Tailwind v4 — No Config File
Tailwind v4 uses CSS-first configuration. There is **no `tailwind.config.ts`**. Everything goes in `app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary: #6366f1;
  --color-secondary: #0ea5e9;
  --font-sans: 'Inter', sans-serif;
}
```

### 📚 References
- [Next.js Installation](https://nextjs.org/docs/getting-started/installation)
- [Tailwind CSS v4 — What's New](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS v4 — CSS-first Configuration](https://tailwindcss.com/docs/configuration)
- [Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs)

---

## ✅ Step 2 — Set Up Supabase

### Install

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### Create Supabase Project
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **New Project**, set a name, DB password, and region
3. Go to **Settings → API** and copy:
   - `Project URL`
   - `Publishable key` (**not** the legacy anon key)

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...   # server only, never expose
```

### Supabase Client Files

**Browser client** (`lib/db/supabase/client.ts`) — used in "use client" components:

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
```

**Server client** (`lib/db/supabase/server.ts`) — used in Server Components, API routes, middleware:

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component — cookies can be read but not set
          }
        },
      },
    }
  )
}
```

### Test Connection
Add temporarily to `app/page.tsx` to verify:

```typescript
import { createClient } from '@/lib/db/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { error } = await supabase.from('_test').select('*').limit(1)
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Nexus</h1>
      <p>Supabase: {error?.message.includes('does not exist') ? '✅ Connected' : '❌ ' + error?.message}</p>
    </main>
  )
}
```

> ✅ **Expected result:** `Could not find the table 'public._test' in the schema cache` = connection is working fine. The table just doesn't exist yet.

### 📚 References
- [Supabase Next.js App Router Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase New Publishable & Secret Keys](https://supabase.com/blog/introducing-publishable-and-secret-keys)
- [Supabase API Key Migration Guide](https://supabase.com/docs/guides/platform/migrating-api-keys)
- [Supabase SSR Package](https://supabase.com/docs/guides/auth/server-side-rendering)

---

## ✅ Step 3 — Set Up Clerk (Authentication)

### Install

```bash
npm install @clerk/nextjs
```

### Create Clerk Application
1. Go to [clerk.com/dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Go to **API Keys** and copy:
   - `Publishable key`
   - `Secret key`

### Environment Variables

```bash
# .env.local — add these alongside Supabase vars
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Wrap App with ClerkProvider (`app/layout.tsx`)

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus",
  description: "AI-Powered Knowledge Base",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
```

### Middleware (`middleware.ts`)

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
])

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

### Sign In Page (`app/sign-in/[[...sign-in]]/page.tsx`)

```typescript
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignIn />
    </main>
  )
}
```

### Sign Up Page (`app/sign-up/[[...sign-up]]/page.tsx`)

```typescript
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignUp />
    </main>
  )
}
```

### Protected Dashboard Page (`app/dashboard/page.tsx`)

```typescript
import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

export default async function DashboardPage() {
  const user = await currentUser()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Welcome to Nexus</h1>
      <p className="text-gray-500">Logged in as: {user?.emailAddresses[0].emailAddress}</p>
      <UserButton />
    </main>
  )
}
```

### 📚 References
- [Clerk Next.js Quickstart (App Router)](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Environment Variables](https://clerk.com/docs/deployments/clerk-environment-variables)
- [Clerk Middleware](https://clerk.com/docs/references/nextjs/clerk-middleware)
- [Clerk Dashboard](https://dashboard.clerk.com)

---

## ✅ Step 4 — Deploy to Vercel

1. Push your branch to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import `Seekers747/Nexus`
3. Set **all** `.env.local` variables in **Settings → Environment Variables**
4. Deploy

### 📚 References
- [Deploy Next.js to Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Railway — Deploy a Node.js App](https://docs.railway.app/getting-started)

---

## ✅ Step 5 — Test End-to-End

| URL | Expected Result |
|-----|----------------|
| `/sign-up` | Clerk sign up form renders |
| `/sign-in` | Clerk sign in form renders |
| `/dashboard` (unauthenticated) | Redirects to `/sign-in` |
| `/dashboard` (authenticated) | Shows welcome page with user email |
| Supabase dashboard | Connection confirmed via test query |

---

## 📁 Final Folder Structure

```
Nexus/
├── app/
│   ├── sign-in/[[...sign-in]]/page.tsx
│   ├── sign-up/[[...sign-up]]/page.tsx
│   ├── dashboard/page.tsx
│   ├── layout.tsx                        ← ClerkProvider added
│   ├── page.tsx                          ← clean landing page
│   └── globals.css                       ← Tailwind v4 config here
├── lib/
│   └── db/
│       └── supabase/
│           ├── client.ts                 ← browser client
│           └── server.ts                 ← server client
├── middleware.ts                          ← Clerk route protection
├── ROADMAP.md                            ← full project roadmap
├── docs/
│   └── PHASE_1_GUIDE.md                  ← this file
└── .env.local                            ← never committed
```

---

## 🔑 Full `.env.local` Reference

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

---

## 📚 All Reference Links

| Topic | Link |
|-------|------|
| Next.js Docs | https://nextjs.org/docs |
| Tailwind CSS v4 | https://tailwindcss.com/docs |
| Tailwind v4 Blog Post | https://tailwindcss.com/blog/tailwindcss-v4 |
| Supabase Next.js Guide | https://supabase.com/docs/guides/getting-started/quickstarts/nextjs |
| Supabase SSR Guide | https://supabase.com/docs/guides/auth/server-side/nextjs |
| Supabase New Keys Blog | https://supabase.com/blog/introducing-publishable-and-secret-keys |
| Supabase Key Migration | https://supabase.com/docs/guides/platform/migrating-api-keys |
| Clerk Next.js Quickstart | https://clerk.com/docs/quickstarts/nextjs |
| Clerk Middleware Docs | https://clerk.com/docs/references/nextjs/clerk-middleware |
| Clerk Environment Variables | https://clerk.com/docs/deployments/clerk-environment-variables |
| Vercel Deployment | https://vercel.com/docs/frameworks/nextjs |
| Railway Deployment | https://docs.railway.app/getting-started |
```
