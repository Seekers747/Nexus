# Nexus — AI-Powered Knowledge Base

Nexus is a self-hosted AI knowledge base. Upload your company documents and query them via a chat interface powered by GPT-4o.

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Seekers747/Nexus.git
cd Nexus
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your environment variables

Copy the example file:

```bash
cp .env.local.example .env.local
```

Then fill in the values (see below for how to get each one).

---

## 🔑 Getting Your Keys

### Supabase
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **Project Settings** → **API**
4. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `service_role` key → `SUPABASE_SECRET_KEY`

### Clerk
1. Go to [clerk.com](https://clerk.com) and create a free account
2. Create a new application
3. Go to **API Keys**
4. Copy:
   - `Publishable key` → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `Secret key` → `CLERK_SECRET_KEY`
5. Go to **Domains** and add your Vercel URL

### OpenAI
1. Go to [platform.openai.com](https://platform.openai.com) and create an account
2. Go to **API Keys** → **Create new secret key**
3. Copy the key → `OPENAI_API_KEY`

---

## 🌐 Deploying to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import this repository
3. Add all environment variables from your `.env.local`
4. Click **Deploy**

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 + Tailwind CSS v4 |
| Auth | Clerk |
| Database | Supabase (Postgres) |
| AI | OpenAI GPT-4o |
| Vector Search | Supabase pgvector |
| Hosting | Vercel |