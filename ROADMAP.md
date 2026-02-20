# 🗺️ Nexus — Full Development Roadmap

> AI-Powered Internal Knowledge Base
> **Repo:** [Seekers747/Nexus](https://github.com/Seekers747/Nexus)

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (React) + Tailwind CSS |
| Backend | Node.js with Express or Next.js API routes |
| AI Layer | OpenAI API (GPT-4o) / Anthropic Claude + LangChain or LlamaIndex |
| Vector DB | Pinecone, Weaviate, or Supabase pgvector |
| Database | Supabase (Postgres) |
| File Ingestion | PDF, DOCX, TXT + Google Drive, Notion, Confluence |
| Auth | Clerk (SSO support) |
| Hosting | Vercel (frontend) + Railway or Render (backend/workers) |

---

## 📌 GitHub Issues

| Phase | Issue | Title |
|-------|-------|-------|
| 1 | [#1](https://github.com/Seekers747/Nexus/issues/1) | Project Setup — Frontend, Backend, and Deployment |
| 1 | [#2](https://github.com/Seekers747/Nexus/issues/2) | Document Ingestion Pipeline — File Upload, Parsing, and Embeddings |
| 1 | [#3](https://github.com/Seekers747/Nexus/issues/3) | Chat Interface & Retrieval-Augmented Generation (RAG) Pipeline |
| 1 | [#4](https://github.com/Seekers747/Nexus/issues/4) | Authentication & User Management |

---

## 🏗️ Phase 1 — Core MVP (Single Tenant)
**Goal:** One company can upload docs, query them via a chat interface.
**Estimated Duration:** 4–6 weeks
**Guide:** [docs/PHASE_1_GUIDE.md](docs/PHASE_1_GUIDE.md)

### Milestone 1.1 — Project Setup
- [ ] Initialize **Next.js** project with **Tailwind CSS**
- [ ] Set up **Supabase** project (Postgres DB)
- [ ] Configure **Clerk** for basic email/password auth
- [ ] Set up **Vercel** deployment pipeline
- [ ] Initialize backend: Next.js API routes or a separate **Express** server on **Railway/Render**

### Milestone 1.2 — Document Ingestion Pipeline
- [ ] Build a file upload UI (PDF, DOCX, TXT support)
- [ ] On upload, parse and chunk documents using **LangChain** or **LlamaIndex**
- [ ] Generate embeddings via **OpenAI Embeddings API** (`text-embedding-3-small`)
- [ ] Store embeddings in **Pinecone**, **Weaviate**, or **Supabase pgvector**
- [ ] Store document metadata (filename, upload date, owner) in Supabase Postgres

### Milestone 1.3 — Chat Interface & RAG Pipeline
- [ ] Build a chat UI (message input, message history display)
- [ ] On user query: embed the query → vector similarity search → retrieve top-k chunks
- [ ] Feed retrieved chunks + query into **GPT-4o** or **Claude** with a system prompt
- [ ] Stream the response back to the UI
- [ ] Display source document references alongside answers

### Milestone 1.4 — Basic Auth & User Management
- [ ] Protect all routes behind authentication
- [ ] Associate uploaded documents and conversations with the logged-in user

---

## 🏢 Phase 2 — Multi-Tenancy
**Goal:** Isolated workspaces per company, admin panel.
**Estimated Duration:** 3–5 weeks

### Milestone 2.1 — Tenant Architecture
- [ ] Add a `tenants` / `organizations` table in Supabase
- [ ] Scope all data (docs, embeddings, users, conversations) by `tenant_id`
- [ ] Implement **Row-Level Security (RLS)** in Supabase to enforce isolation
- [ ] Use separate Pinecone **namespaces** (or Weaviate classes) per tenant

### Milestone 2.2 — Admin Panel
- [ ] Build a company admin dashboard at `/admin`
- [ ] Admin can: invite users, manage roles (admin / member), view uploaded documents
- [ ] Admin can delete documents and re-trigger ingestion
- [ ] Basic usage stats (# of queries, # of docs)

### Milestone 2.3 — Branding Config
- [ ] Store per-tenant branding config (logo URL, primary color, company name) in Supabase
- [ ] Load branding config at runtime and apply to Tailwind theme / CSS variables

---

## 🔌 Phase 3 — Integrations
**Goal:** Automatic document sync from external tools.
**Estimated Duration:** 4–6 weeks

### Milestone 3.1 — Google Drive Connector
- [ ] OAuth2 flow for connecting a Google account
- [ ] Use **Google Drive API** to list and fetch files
- [ ] Sync on a schedule (cron job) or on-demand
- [ ] Track last-synced timestamp; re-embed only changed files

### Milestone 3.2 — Notion Connector
- [ ] OAuth2 flow for Notion integration
- [ ] Use **Notion API** to fetch pages and databases
- [ ] Convert Notion blocks to plain text for chunking
- [ ] Incremental sync via `last_edited_time`

### Milestone 3.3 — Confluence Connector
- [ ] API token-based auth for Confluence (Cloud)
- [ ] Fetch pages from configured spaces
- [ ] Strip HTML, chunk content, embed and store

### Milestone 3.4 — Sync Infrastructure
- [ ] Background job queue (e.g., **BullMQ** on Redis, or **Inngest**) for async ingestion
- [ ] Webhook or polling-based triggers per connector
- [ ] Sync status UI in the admin panel (last synced, errors, document count)

---

## 🚀 Phase 4 — Polish & Enterprise Features
**Goal:** Enterprise-ready: SSO, permissions, citations, analytics.
**Estimated Duration:** 4–6 weeks

### Milestone 4.1 — SSO (Single Sign-On)
- [ ] Implement **SAML 2.0** via Clerk or a library like **WorkOS** / **BoxyHQ**
- [ ] Support **OAuth** (Google Workspace, Microsoft Entra ID)
- [ ] Per-tenant SSO configuration in admin settings

### Milestone 4.2 — Permissions & Access Control
- [ ] Add document-level permissions (e.g., `HR Only`, `Engineering Only`)
- [ ] Associate teams/groups with users in Supabase
- [ ] Filter vector search results by user's permitted documents at query time

### Milestone 4.3 — Source Citations
- [ ] Return chunk metadata (source doc name, page number, section) alongside AI answers
- [ ] Render inline citation links in the chat UI
- [ ] "View Source" modal or link to the original document

### Milestone 4.4 — Conversation History
- [ ] Persist full conversation history per user in Supabase
- [ ] Display past conversations in a sidebar
- [ ] Pass recent conversation context into the prompt (sliding window)

### Milestone 4.5 — Admin Analytics
- [ ] Query volume over time
- [ ] Most queried documents
- [ ] Unanswered / low-confidence queries (for identifying knowledge gaps)
- [ ] Export as CSV

---

## 📦 Phase 5 — Productize
**Goal:** Fast onboarding, billing, multi-tenant management.
**Estimated Duration:** 3–4 weeks

### Milestone 5.1 — Onboarding Flow
- [ ] Self-serve signup: company name → invite teammates → connect a doc source → first query
- [ ] Guided setup wizard (< 30 min to live)
- [ ] Welcome email sequence (via **Resend** or **SendGrid**)

### Milestone 5.2 — Subscription Billing
- [ ] Integrate **Stripe** for subscription management
- [ ] Define pricing tiers (e.g., Starter / Pro / Enterprise)
- [ ] Gate features by plan (e.g., SSO only on Enterprise)
- [ ] Usage-based limits (# of documents, # of queries/month)
- [ ] Customer portal for managing subscriptions

### Milestone 5.3 — Super-Admin Dashboard
- [ ] Internal dashboard listing all tenants
- [ ] View per-tenant usage, billing status, last active
- [ ] Ability to impersonate a tenant for debugging/support
- [ ] One-click tenant provisioning

### Milestone 5.4 — Launch Prep
- [ ] Marketing landing page
- [ ] Docs / Help center
- [ ] Status page (e.g., via **Instatus** or **BetterUptime**)

---

## 🗂️ Project Structure

```
nexus/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Login, signup, SSO
│   ├── (app)/              # Main app (chat, docs)
│   │   ├── chat/
│   │   └── documents/
│   ├── admin/              # Admin panel
│   └── api/                # API routes (ingestion, query, auth)
├── lib/
│   ├── ai/                 # LangChain / LlamaIndex logic
│   ├── db/                 # Supabase client
│   ├── connectors/         # Google Drive, Notion, Confluence
│   └── queue/              # BullMQ / Inngest jobs
├── components/             # Shared UI components
├── docs/                   # Phase guides
├── middleware.ts            # Clerk auth middleware
└── .env.local              # Secrets (never committed)
```

---

## 📊 Summary Timeline

| Phase | Focus | Duration |
|-------|-------|----------|
| 1 | MVP — upload + chat | 4–6 weeks |
| 2 | Multi-tenancy + admin | 3–5 weeks |
| 3 | Integrations (Drive, Notion, Confluence) | 4–6 weeks |
| 4 | Enterprise features (SSO, permissions, analytics) | 4–6 weeks |
| 5 | Productize (billing, onboarding, super-admin) | 3–4 weeks |
| **Total** | | **~18–27 weeks** |
