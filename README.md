# 🚀 CareerNav AI

> **AI-Powered Career Development Platform** — analyze your resume, identify skill gaps, practice mock interviews, follow a personalized learning roadmap, and track your daily progress. All in one place.

[![GitHub repo](https://img.shields.io/badge/GitHub-career--navigator--ai-black?logo=github)](https://github.com/GaneshbabuChinta2005/career-navigator-ai)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📌 Overview

CareerNav AI helps developers and job seekers understand exactly where they stand and what to do next. Upload your resume, pick a target role, and the platform instantly tells you your readiness score, which skills you're missing, and gives you a step-by-step action plan. Then practice what you learned through mock interviews with real-time AI feedback, and track every day's work with the built-in daily scheduler.

No login required — everything runs locally in your browser with data persisted via `localStorage`.

---

## ✨ Features

### 📄 Resume Analyzer
- Drag-and-drop PDF / DOC / DOCX upload
- Client-side text extraction — no file ever leaves your machine
- **Google Gemini AI** analysis: skill extraction with levels (beginner → expert), experience summary, detected roles & companies, education
- Three scores: **Role Fit**, **ATS Compatibility**, **Resume Clarity**
- Missing skills list, priority skills to learn (with time estimates), and numbered improvement tips
- Full analysis history stored locally — switch between past analyses anytime
- Works without a Gemini API key (smart keyword-based mock analysis as fallback)

### 🎯 Role Readiness Simulation
- Select a target role (Frontend, Backend, Full Stack, DevOps, Data Engineer)
- Animated readiness score with skill-by-skill breakdown
- Strengths and weaknesses panels with weighted contributions

### 📊 Skill Gap Analysis
- Identify exactly which skills are holding you back for your target role
- Visual progress bars and priority rankings

### 🗺️ Interactive Roadmap
- 30 / 60 / 90-day learning phases
- Add, reorder, and complete tasks within each week
- AI-assisted roadmap generation based on your target role
- Full CRUD: add phases, weeks, tasks with priority and deadlines

### 🧠 Mock Interview
- Choose a role and number of questions (3, 5, or 6)
- Questions across behavioral, technical, and system-design categories with difficulty labels
- Per-question hint and sample answer reveal
- **Heuristic AI scorer**: behavioral answers scored on STAR method coverage; technical answers scored on keyword coverage against curated sample answers
- Animated results ring, per-question star ratings, full session breakdown
- All sessions persisted locally with history

### 📅 Daily Schedule Tracker
- 7-day week strip with colour-coded completion dots
- Add tasks with category (Study / Practice / Interview / Project), priority, estimated time, and notes
- Daily focus goal (pinnable intention for the day)
- Check off tasks directly from the Dashboard widget
- **14-day activity heatmap** (GitHub contribution style)
- **Streak counter** — consecutive days with at least one completed task
- Weekly progress bar sidebar

### 📈 Dashboard
- Live widgets for today's schedule, last mock interview score, and latest resume analysis
- 5-item Quick Actions grid linking to every key feature
- Learning activity charts and skills radar
- Recent activity feed

### 🌗 Dark / Light Mode
- System-aware theme with manual toggle
- Persisted across sessions

---

## 🖥️ App Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Marketing page with feature overview |
| `/app/dashboard` | Dashboard | Live overview of all progress |
| `/app/resume` | Resume Analyzer | Upload & AI-analyze resume |
| `/app/skill-gap` | Skill Gap | Identify skill gaps per role |
| `/app/roadmap` | Roadmap | 30/60/90-day learning plan |
| `/app/simulation` | Simulation | Role readiness score |
| `/app/mock-interview` | Mock Interview | Practice Q&A with scoring |
| `/app/schedule` | Daily Schedule | Task tracker & heatmap |
| `/app/profile` | Profile | User info & logout |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.3 | UI framework |
| **TypeScript** | 5.8 | Type safety |
| **Vite** | 5.4 | Build tool & dev server |
| **Tailwind CSS** | 3.4 | Utility-first styling |
| **shadcn/ui** | latest | Accessible component library (Radix UI based) |
| **Framer Motion** | 12 | Animations |
| **React Router** | 6.30 | Client-side routing |
| **Zustand** | 5 | State management with `persist` middleware |
| **TanStack Query** | 5 | Server state & caching |
| **Recharts** | 2.15 | Charts (line, bar, radar) |
| **React Hook Form** | 7.61 | Form management |
| **Zod** | 3.25 | Schema validation |
| **Axios** | 1.13 | HTTP client |
| **@google/generative-ai** | 0.24 | Gemini AI (client-side) |
| **Sonner** | 1.7 | Toast notifications |
| **lucide-react** | 0.462 | Icon set |

### Backend (Express API)
| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **TypeScript** | Strict type checking |
| **MongoDB + Mongoose** | NoSQL database |
| **JWT + bcryptjs** | Authentication & password hashing |
| **Multer** | File upload handling |
| **pdf-parse** | PDF text extraction |
| **mammoth** | DOCX text extraction |
| **Google Gemini AI** | Resume & interview AI analysis |
| **Helmet + express-rate-limit** | Security |

---

## 🗂️ Project Structure

```
career-navigator-ai/
├── src/
│   ├── app/                    # Router config (routes.tsx)
│   ├── components/             # Shared UI components
│   │   ├── ui/                 # shadcn/ui primitives
│   │   ├── auth/               # Auth components
│   │   └── landing/            # Landing page sections
│   ├── features/               # Feature modules
│   │   ├── ai-coach/           # AI chat assistant
│   │   ├── auth/               # Auth forms & services
│   │   ├── dashboard/          # Stats grid & charts
│   │   ├── interview/          # Question bank & scoring engine
│   │   │   ├── data/questions.ts
│   │   │   └── utils/scoring.ts
│   │   ├── resume/             # Resume AI service
│   │   │   └── services/resumeAnalyzer.ts
│   │   ├── roadmap/            # Roadmap components & store
│   │   └── skill-gap/          # Skill gap service
│   ├── layouts/                # MainLayout, Sidebar, Navbar, AuthLayout
│   ├── lib/                    # Utilities (api.ts, constants.ts, animations.ts)
│   ├── pages/                  # One file per route
│   │   ├── Dashboard.tsx
│   │   ├── MockInterview.tsx
│   │   ├── ResumeAnalyzer.tsx
│   │   ├── Schedule.tsx
│   │   ├── Simulation.tsx
│   │   ├── SkillGap.tsx
│   │   ├── Roadmap.tsx
│   │   └── Profile.tsx
│   ├── store/                  # Zustand stores
│   │   ├── useAuthStore.ts
│   │   ├── useInterviewStore.ts
│   │   ├── useResumeStore.ts
│   │   ├── useScheduleStore.ts
│   │   └── useThemeStore.ts
│   └── types/                  # Shared TypeScript types
│
├── server/                     # Express backend
│   └── src/
│       ├── controllers/        # Route handlers
│       ├── models/             # Mongoose schemas
│       ├── routes/             # Express routers
│       ├── services/           # AI services (Gemini)
│       ├── middleware/         # Auth guard, file upload
│       └── utils/              # Resume parser, error helpers
│
├── public/
├── index.html
├── package.json
└── vite.config.ts
```

---

## ⚙️ Local Setup

### Prerequisites
- **Node.js 18+**
- A **Google Gemini API key** (optional — app works without it using mock analysis)
  - Get one free at [Google AI Studio](https://aistudio.google.com/app/apikey)

### 1. Clone & install

```bash
git clone https://github.com/GaneshbabuChinta2005/career-navigator-ai.git
cd career-navigator-ai
npm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Optional — enables full Gemini AI resume analysis
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Optional — only needed if running the backend server
VITE_API_URL=http://localhost:3000/api
```

### 3. Run the frontend

```bash
npm run dev
# Open http://localhost:5173
```

The app works fully in the browser without the backend. All data (resume analyses, interview sessions, schedule tasks, roadmap) is stored in `localStorage`.

### 4. Run the backend (optional)

The backend provides MongoDB-persisted data and server-side PDF parsing.

```bash
cd server
npm install
cp .env.example .env
# Add MONGODB_URI, JWT_SECRET, VITE_GEMINI_API_KEY to server/.env
npm run dev
```

---

## 🔑 Key Design Decisions

### No login required
Authentication has been intentionally removed from the frontend flow. The app is immediately accessible — no signup friction. All user data is persisted client-side via Zustand's `persist` middleware (localStorage).

### Client-side AI
The Gemini API is called directly from the browser using `@google/generative-ai`. This means resume analysis works without the backend server running. The backend AI services exist as an alternative for server-side processing with MongoDB persistence.

### Mock fallback
Every AI feature has a smart fallback. If no Gemini API key is set, the resume analyzer scans for tech keywords and returns a structured mock analysis. The mock interview uses a curated question bank with a heuristic scoring engine — no API needed.

---

## 📊 Data Persistence

All app data is stored in the browser via `localStorage` through Zustand's `persist` middleware:

| Store | Key | Data |
|---|---|---|
| `useAuthStore` | `auth-storage` | User profile |
| `useResumeStore` | `resume-analysis-storage` | All resume analyses |
| `useInterviewStore` | `interview-storage` | All interview sessions |
| `useScheduleStore` | `schedule-storage` | Daily tasks & history |
| `useRoadmapStore` | `roadmap-storage` | Phases, weeks, tasks |
| `useThemeStore` | `theme-storage` | Light/dark preference |

---

## 🚀 Deployment

### Frontend (Vercel — recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Add `VITE_GEMINI_API_KEY` in Vercel's Environment Variables dashboard.

### Frontend (Netlify)

```bash
npm run build
# Upload dist/ folder to Netlify, or connect the GitHub repo
```

### Backend (Render)

1. Connect the `server/` directory to a new Render Web Service
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables: `MONGODB_URI`, `JWT_SECRET`, `VITE_GEMINI_API_KEY`, `PORT`

---

## 🗺️ Roadmap

### In progress
- [ ] AI-generated daily schedule based on resume skill gaps
- [ ] Export resume analysis as PDF report
- [ ] Interview session comparison (trend over time)

### Planned
- [ ] Job description matcher — paste a JD, see your match %
- [ ] Peer benchmarking — compare skills against role averages
- [ ] Email digest — weekly progress summary
- [ ] Mobile-responsive PWA with offline support
- [ ] Multi-language support (i18n)
- [ ] Redis caching for backend AI responses
- [ ] GitHub Actions CI/CD pipeline

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push: `git push origin feat/your-feature`
5. Open a Pull Request

Please follow the existing code style — TypeScript strict mode, functional components, Zustand for state, shadcn/ui for components.

---

## 📝 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 👨‍💻 Author

**Ganeshbabu Chinta**

[![GitHub](https://img.shields.io/badge/GitHub-GaneshbabuChinta2005-black?logo=github)](https://github.com/GaneshbabuChinta2005)

---

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) — powering resume analysis and skill insights
- [shadcn/ui](https://ui.shadcn.com/) — beautiful, accessible component primitives
- [Zustand](https://zustand-demo.pmnd.rs/) — delightfully simple state management
- [Recharts](https://recharts.org/) — composable chart library
- [Lucide](https://lucide.dev/) — clean, consistent icon set

---

<p align="center">Built with ❤️ — <a href="https://github.com/GaneshbabuChinta2005/career-navigator-ai">⭐ Star on GitHub</a></p>
