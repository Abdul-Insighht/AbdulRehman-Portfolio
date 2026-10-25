# Hafiz Abdul Rehman — AI Engineer & Data Scientist Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg?style=flat-square)](LICENSE)

A state-of-the-art AI Engineer & Data Scientist portfolio featuring **live GitHub repository synchronization** (57 repos indexed), **AbdulInsight AI** (conversational RAG agent), **empirical research publications** (BraTS 99.64% Attention U-Net), **freelance services catalog**, **interactive case study modals**, **printable CV export**, and an **authenticated Admin Control Center**.

Live URL: [https://abdul-rehman-portfolio-iota.vercel.app/](https://abdul-rehman-portfolio-iota.vercel.app/)

---

## 🚀 Key Features by Phase

### 1. Dynamic GitHub Sync & Domain-Filtered Project Catalog
- **Live Sync Engine** (`lib/github-sync.ts`): Automatically queries `@Abdul-Insighht` on GitHub, fetching non-fork public repositories, analyzing commit metadata, languages, and star counts.
- **Intelligent Domain Classifier**: Sorts 57 repositories into:
  - 🧠 Deep Learning (16 repos)
  - 👁️ Computer Vision (14 repos)
  - 🤖 Agentic AI & RAG (8 repos)
  - 📊 Data Science & Analytics (4 repos)
  - 💻 Full-Stack AI & MLOps
- **Interactive Case Study Modals**: Deep-dive modals displaying Problem Statement, Solution, 4-Step Technical Architecture, Benchmarked Results, and direct links.
- **Webhook Endpoint** (`/api/webhooks/github`): Supports real-time cache invalidation and re-indexing whenever code is pushed to GitHub.

### 2. AbdulInsight AI Conversational Assistant
- **Floating Glassmorphic Widget** (`components/abdul-insight-bot.tsx`): Persistent assistant with glowing teal orb, quick follow-up chips, and suggested action cards.
- **Multi-Tier RAG Engine** (`app/api/chat/route.ts`):
  - Tier 1: Google Gemini 2.0 Flash (`GEMINI_API_KEY`)
  - Tier 2: Groq Llama-3.3-70b-versatile (`GROQ_API_KEY`)
  - Tier 3: High-speed Local Smart RAG with Hafiz's verified profile and 57 indexed repositories (works offline with zero external tokens).
- **Session & Lead Persistence** (`lib/chat-logger.ts`): Logs chat conversations to `data/chat-sessions.json` and flags client inquiries with hiring intent.

### 3. Hero Proof Strip, Meet Hafiz & Domain Tech Stack
- **Hero Proof Strip** (`components/hero.tsx`): 4-pill verification strip (*"Agents with purpose"*, *"AI engineering"*, *"Built to hand over"*, *"Verified accuracy: 99.64% & 98.93%"*).
- **01 / Meet Hafiz Abdul Rehman** (`components/meet-hafiz.tsx`): Introduces the 3 core engineering pillars:
  1. *From Paper to Production* (converting research into deployable containers)
  2. *Autonomous Agent Architectures* (multi-agent orchestration with LangGraph & CrewAI)
  3. *Empirical Verification* (rigorous metrics and latency profiling)
- **Domain-Filtered Tech Stack** (`components/tech-stack.tsx`): Grouped by Vision, Deep Learning, Agentic AI, Backend/MLOps, and Data Science.

### 4. Enterprise Services, Empirical Research & Credentials
- **Freelance & Enterprise Services** (`components/services.tsx`): Solutions in Computer Vision, Production RAG, Medical AI Diagnostics, and High-Throughput MLOps.
- **Empirical Research Whitepapers** (`components/research-publications.tsx`): Highlights publications and benchmarks:
  - *BraTS Brain Tumor Segmentation* (Attention U-Net — **99.64% validation accuracy**)
  - *COVID-19 Chest CT Screening* (Fuzzy Rank-Based Deep Ensemble — **98.93% accuracy**)
  - *SOCT-SAM* (Segment Anything Model adaptation for ophthalmic imaging)
  - *RRSIS* (Remote Sensing Referring Image Segmentation)
- **Certificates & Badges** (`components/certificates.tsx`): Verified credentials from Coursera, DeepLearning.AI, and Kaggle.

### 5. 06 / Contact & Signature / 01
- **Inquiry Portal** (`components/contact-form.tsx`): Structured form with direct WhatsApp, "Copy Email" button with toast notification, and backend lead capture into `data/contact-leads.json`.
- **Signature / 01** (`components/signature.tsx`): Animated closing quote: *"My work is done when you no longer need me! — Hafiz Abdul Rehman"*.

### 6. Printable CV & Admin Control Center
- **Printable CV** (`/resume`): Clean, ATS-friendly single/multi-page curriculum vitae with `@media print` layout and one-click PDF download.
- **Admin Control Center** (`/admin` & `/admin/login`):
  - Secure credential authentication (`hafizrehman3321@gmail.com`)
  - Live metric KPI cards (Indexed Repos, Contact Leads, Bot Sessions, Hiring Inquiries)
  - Projects CMS with Featured toggles and direct GitHub sync trigger
  - Leads management table with quick reply links
  - Bot transcripts inspector

---

## 🛠️ Project Structure

```
├── app/
│   ├── admin/             # Admin Control Center (/admin & /admin/login)
│   ├── api/
│   │   ├── admin/         # /api/admin/login and /api/admin/data
│   │   ├── chat/          # AbdulInsight AI RAG API route
│   │   ├── contact/       # Lead capture API route
│   │   ├── projects/      # Dynamic project filter & sync API
│   │   └── webhooks/      # GitHub webhook listener
│   ├── resume/            # Printable ATS-friendly CV page
│   ├── layout.tsx         # Root layout with AbdulInsight AI bot
│   └── page.tsx           # Assembled single-page application
├── components/
│   ├── abdul-insight-bot.tsx # Floating AI assistant
│   ├── certificates.tsx      # Verified credentials & badges
│   ├── contact-form.tsx      # 06 / Contact section
│   ├── hero.tsx              # Hero section with Proof Strip
│   ├── meet-hafiz.tsx        # 01 / Meet Hafiz introduction
│   ├── navbar.tsx            # Navigation bar with CV & Admin links
│   ├── project-modal.tsx     # Case study deep-dive modal
│   ├── projects.tsx          # 57-repo catalog with domain tabs
│   ├── research-publications.tsx # Empirical research whitepapers
│   ├── services.tsx          # Freelance services catalog
│   ├── signature.tsx         # Animated closing quote
│   └── tech-stack.tsx        # Domain-segregated skill matrices
├── data/
│   ├── chat-sessions.json    # Bot conversation transcripts
│   ├── contact-leads.json    # Captured inquiries
│   ├── curated-projects.ts   # Case study data & architecture details
│   └── projects-cache.json   # 57 indexed GitHub repositories
├── lib/
│   ├── bot-context.ts        # RAG grounding facts & system prompts
│   ├── chat-logger.ts        # Chat persistence & hiring intent parser
│   └── github-sync.ts        # Dynamic GitHub sync & domain classifier
└── scripts/
    └── run-sync.mjs          # Standalone CLI sync script
```

---

## ⚙️ Environment Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API Key for Gemini 2.0 Flash | *(Optional, falls back to Local RAG)* |
| `GROQ_API_KEY` | Groq API Key for Llama-3.3 70B | *(Optional)* |
| `GITHUB_TOKEN` | GitHub Personal Access Token for higher rate limits | *(Optional)* |
| `ADMIN_EMAIL` | Admin login email | `hafizrehman3321@gmail.com` |
| `ADMIN_PASSWORD` | Admin login password | `AbdulInsight2026!` |
| `ADMIN_JWT_SECRET` | Secret token used to sign admin session tokens | Generated string |

---

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Sync GitHub repositories**:
   ```bash
   node scripts/run-sync.mjs
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Main Portfolio: [http://localhost:3000](http://localhost:3000)
   - Printable CV: [http://localhost:3000/resume](http://localhost:3000/resume)
   - Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
   - Admin Center: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🚀 Deployment to Vercel

1. Commit your changes to Git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete all 6 enhancement phases for Abdul Rehman portfolio"
   git branch -M main
   git remote add origin https://github.com/Abdul-Insighht/AbdulRehman-Portfolio.git
   git push -u origin main --force
   ```

2. In the Vercel Dashboard:
   - Import the repository.
   - Framework Preset: **Next.js**.
   - Under **Environment Variables**, add:
     - `GEMINI_API_KEY` *(optional)*
     - `GROQ_API_KEY` *(optional)*
     - `GITHUB_TOKEN` *(recommended)*
     - `ADMIN_EMAIL` (`hafizrehman3321@gmail.com`)
     - `ADMIN_PASSWORD` (`AbdulInsight2026!`)
     - `ADMIN_JWT_SECRET` (any 32-character random string)
   - Click **Deploy**.

---

## 👤 Author

**Hafiz Abdul Rehman**
- **GitHub**: [@Abdul-Insighht](https://github.com/Abdul-Insighht)
- **LinkedIn**: [hafiz-abdul-rehman-9990ab329](https://linkedin.com/in/hafiz-abdul-rehman-9990ab329)
- **WhatsApp**: [+92 328 3121702](https://wa.me/923283121702)
- **Email**: [hafizrehman3321@gmail.com](mailto:hafizrehman3321@gmail.com)
