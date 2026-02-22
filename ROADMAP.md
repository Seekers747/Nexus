# 🗺️ Nexus — Development Roadmap

> AI-Powered Knowledge Base — sold as a self-hosted product
> **Repo:** [Seekers747/Nexus](https://github.com/Seekers747/Nexus)

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 + Tailwind CSS v4 |
| Auth | Clerk |
| Database | Supabase (Postgres) |
| AI | OpenAI API (GPT-4o) |
| Vector Search | Supabase pgvector |
| File Ingestion | PDF, DOCX, TXT |
| Hosting | Vercel |

---

## 📌 GitHub Issues

| Phase | Issue | Title |
|-------|-------|-------|
| 1 | [#1](https://github.com/Seekers747/Nexus/issues/1) | Project Setup — Frontend, Backend, and Deployment |
| 1 | [#2](https://github.com/Seekers747/Nexus/issues/2) | Document Ingestion Pipeline — File Upload, Parsing, and Embeddings |
| 1 | [#3](https://github.com/Seekers747/Nexus/issues/3) | Chat Interface & RAG Pipeline |
| 1 | [#4](https://github.com/Seekers747/Nexus/issues/4) | Authentication & User Management |

---

## ✅ Phase 1 — Project Setup (Complete)
**Goal:** Working Next.js app with auth and database connected, deployed to Vercel.

- [x] Initialize **Next.js 16** with **Tailwind CSS v4**
- [x] Set up **Supabase** project
- [x] Configure **Clerk** auth (sign in, sign up, protected routes)
- [x] Deploy to **Vercel**

---

## 🏗️ Phase 2 — Document Ingestion & AI Chat (Core MVP)
**Goal:** Client can upload documents and chat with them using AI.

### Milestone 2.1 — Document Upload
- [ ] Build file upload UI (PDF, DOCX, TXT)
- [ ] Parse and chunk documents using **LangChain**
- [ ] Generate embeddings via **OpenAI** (`text-embedding-3-small`)
- [ ] Store embeddings in **Supabase pgvector**
- [ ] Store document metadata (filename, upload date, owner) in Supabase

### Milestone 2.2 — Chat Interface & RAG Pipeline
- [ ] Build chat UI (message input + message history)
- [ ] On query: embed → vector search → retrieve top-k chunks
- [ ] Feed chunks + query into **GPT-4o** with a system prompt
- [ ] Stream the response to the UI
- [ ] Show source document references with answers

---

## 🔌 Phase 3 — Integrations
**Goal:** Automatic document sync from external tools.

### Milestone 3.1 — Google Drive Connector
- [ ] OAuth2 flow for Google account
- [ ] List and fetch files via **Google Drive API**
- [ ] Sync on demand or on schedule
- [ ] Re-embed only changed files

### Milestone 3.2 — Notion Connector
- [ ] OAuth2 flow for Notion
- [ ] Fetch pages and databases via **Notion API**
- [ ] Incremental sync via `last_edited_time`

### Milestone 3.3 — Confluence Connector
- [ ] API token auth for Confluence Cloud
- [ ] Fetch and chunk pages from configured spaces

---

## 🚀 Phase 4 — Polish
**Goal:** Production-ready experience.

### Milestone 4.1 — Source Citations
- [ ] Return chunk metadata (doc name, page, section) with AI answers
- [ ] Render inline citation links in chat UI
- [ ] "View Source" modal

### Milestone 4.2 — Conversation History
- [ ] Persist conversations per user in Supabase
- [ ] Show past conversations in a sidebar
- [ ] Pass recent context into the prompt

### Milestone 4.3 — Analytics Dashboard
- [ ] Query volume over time
- [ ] Most queried documents
- [ ] Low-confidence query detection

---

## 📦 Phase 5 — Client Handoff
**Goal:** Client can fully self-manage and deploy Nexus independently.

- [ ] Written setup guide covering all keys (Supabase, Clerk, OpenAI)
- [ ] Step-by-step Vercel deployment walkthrough
- [ ] `.env.local.example` with all required variables documented
- [ ] README polished and complete

---

## 🗂️ Project Structure

```
nexus/
├── app/
│   ├── dashboard/          # Main app
│   ├── sign-in/            # Clerk sign in
│   ├── sign-up/            # Clerk sign up
│   └── api/                # API routes
├── lib/
│   ├── ai/                 # LangChain / RAG logic
│   └── db/                 # Supabase client
├── components/             # Shared UI components
├── docs/                   # Phase guides
├── proxy.ts                # Clerk auth middleware
└── .env.local              # Secrets (never committed)
```

---

## 📊 Summary Timeline

| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Project setup + auth + deploy | ✅ Done |
| 2 | Document upload + AI chat | 🔲 Next |
| 3 | Integrations (Drive, Notion, Confluence) | 🔲 Pending |
| 4 | Polish (citations, history, analytics) | 🔲 Pending |
| 5 | Client handoff guide | 🔲 Pending |