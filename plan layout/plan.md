
# AI Career Simulator - Complete Frontend Architecture

## Executive Summary

Building a production-grade SaaS frontend with 8 core page groups, 40+ components, and a scalable architecture. This plan prioritizes clarity over decoration, decision-making over data display, and professional UX patterns that survive interview scrutiny.

---

## Architecture Overview

```text
src/
├── components/
│   ├── ui/                    # Shadcn base components (existing)
│   ├── common/                # Shared app components
│   │   ├── PageHeader.tsx
│   │   ├── StatCard.tsx
│   │   ├── ProgressRing.tsx
│   │   ├── EmptyState.tsx
│   │   ├── LoadingState.tsx
│   │   ├── ErrorState.tsx
│   │   └── SkillBar.tsx
│   ├── landing/               # Landing page (existing, needs refinement)
│   ├── auth/                  # Auth components
│   │   ├── AuthLayout.tsx
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── onboarding/            # Multi-step onboarding
│   │   ├── OnboardingLayout.tsx
│   │   ├── ProgressIndicator.tsx
│   │   ├── RoleSelector.tsx
│   │   ├── SkillRater.tsx
│   │   ├── ProjectAdder.tsx
│   │   └── AvailabilityPicker.tsx
│   ├── dashboard/             # Main dashboard
│   │   ├── DashboardLayout.tsx
│   │   ├── ReadinessScore.tsx
│   │   ├── StrengthsPanel.tsx
│   │   ├── WeaknessPanel.tsx
│   │   ├── NextStepsCard.tsx
│   │   └── TrendIndicator.tsx
│   ├── simulation/            # Role simulation
│   │   ├── RoleSelector.tsx
│   │   ├── ScoreBreakdown.tsx
│   │   ├── WeightExplainer.tsx
│   │   └── SkillImpactChart.tsx
│   ├── skillgap/              # Skill gap analysis
│   │   ├── GapList.tsx
│   │   ├── PriorityBadge.tsx
│   │   ├── EffortEstimate.tsx
│   │   └── ActionSuggestion.tsx
│   ├── roadmap/               # Learning roadmap
│   │   ├── TimelineView.tsx
│   │   ├── WeekCard.tsx
│   │   ├── TaskItem.tsx
│   │   └── MilestoneMarker.tsx
│   └── profile/               # Profile settings
│       ├── SkillEditor.tsx
│       ├── GoalUpdater.tsx
│       └── AccountSettings.tsx
├── pages/
│   ├── Index.tsx              # Landing (existing)
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Onboarding.tsx
│   ├── Dashboard.tsx
│   ├── Simulation.tsx
│   ├── SkillGap.tsx
│   ├── Roadmap.tsx
│   └── Profile.tsx
├── hooks/
│   ├── use-toast.ts           # (existing)
│   ├── use-mobile.tsx         # (existing)
│   ├── useOnboardingState.ts  # Multi-step form state
│   ├── useSimulation.ts       # Simulation calculations
│   └── useRoadmap.ts          # Roadmap generation
├── services/
│   ├── auth.ts                # Auth logic (mock for now)
│   ├── simulation.ts          # Scoring algorithms
│   ├── skillgap.ts            # Gap analysis logic
│   └── roadmap.ts             # Roadmap generation
├── types/
│   ├── user.ts
│   ├── skill.ts
│   ├── role.ts
│   └── roadmap.ts
└── lib/
    ├── utils.ts               # (existing)
    ├── animations.ts          # (existing)
    └── constants.ts           # Role weights, skill categories
```

---

## Design System Refinements

### Current Issues to Fix
1. Landing page has excessive animations (floating orbs, rotating rings)
2. Color palette is too complex (3 accent colors)
3. Some glassmorphism effects hurt readability

### Simplified Color Palette
- **Primary**: Electric cyan `hsl(185 100% 50%)` - CTAs, highlights
- **Foreground**: White/off-white - text
- **Muted**: Slate grays - secondary text, borders
- **Status colors**: Green (success), Amber (warning), Red (danger)

### Typography Hierarchy (Strict)
| Element | Font | Weight | Size |
|---------|------|--------|------|
| H1 | Space Grotesk | 700 | 48-64px |
| H2 | Space Grotesk | 600 | 32-40px |
| H3 | Space Grotesk | 600 | 24px |
| Body | Inter | 400 | 16px |
| Caption | Inter | 400 | 14px |
| Data | JetBrains Mono | 500 | 14-16px |

---

## Page-by-Page Implementation

### 1. Landing Page (Refinement)

**Current State**: Over-designed with too many animations

**Changes Required**:
- Remove floating orbs and rotating ring decorations
- Simplify to single gradient background
- Hero: Clearer value proposition in 5 seconds
- Add "Why students fail interviews" problem section
- Reduce CTA buttons from 2 to 1 primary + 1 text link

**Component Structure**:
```text
Landing
├── Navbar (simplified)
├── Hero (cleaner, faster value communication)
├── ProblemStatement (NEW - why interviews fail)
├── HowItWorks (keep, simplify animations)
├── Features (keep bento grid, reduce hover effects)
├── SkillPreview (keep, this demonstrates value)
├── CTA (single focused CTA)
└── Footer (simplified)
```

---

### 2. Authentication Pages

**Design Principle**: Distraction-free, single-purpose

**Login Page Layout**:
```text
┌─────────────────────────────────────┐
│                                     │
│           [Logo]                    │
│     Welcome back                    │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ Email                       │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │ Password                    │   │
│   └─────────────────────────────┘   │
│                                     │
│   [      Sign In (primary)     ]    │
│                                     │
│   Don't have an account? Sign up    │
│                                     │
└─────────────────────────────────────┘
```

**Components**:
- `AuthLayout.tsx` - Centered card with subtle background
- `LoginForm.tsx` - Email, password, validation, loading state
- `SignupForm.tsx` - Name, email, password, confirm password

**Validation Rules (using Zod)**:
- Email: Valid format, max 255 chars
- Password: Min 8 chars, max 100 chars
- Name: Required, max 100 chars

**States to Handle**:
- Loading (button shows spinner)
- Error (inline message below form)
- Success (redirect to onboarding/dashboard)

---

### 3. Onboarding Flow (Critical Feature)

**Design Principle**: One task per screen, explain why data is collected

**Flow Architecture**:
```text
Step 1: Target Role    →  Step 2: Skill Rating  →  Step 3: Projects  →  Step 4: Availability
   [Progress: 25%]           [Progress: 50%]         [Progress: 75%]       [Progress: 100%]
```

**Step 1: Role Selection**
```text
┌─────────────────────────────────────────────────┐
│  Step 1 of 4                    [Skip for now]  │
├─────────────────────────────────────────────────┤
│                                                 │
│  What role are you preparing for?               │
│                                                 │
│  We'll customize your simulation based on       │
│  the skills that matter most for this role.     │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐             │
│  │  Frontend    │  │   Backend    │             │
│  │  Developer   │  │   Developer  │             │
│  │      ○       │  │      ○       │             │
│  └──────────────┘  └──────────────┘             │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐             │
│  │  Full Stack  │  │   DevOps     │             │
│  │  Developer   │  │   Engineer   │             │
│  │      ○       │  │      ○       │             │
│  └──────────────┘  └──────────────┘             │
│                                                 │
│  [← Back]                        [Continue →]   │
└─────────────────────────────────────────────────┘
```

**Step 2: Skill Rating**
```text
┌─────────────────────────────────────────────────┐
│  Step 2 of 4                    [Skip for now]  │
├─────────────────────────────────────────────────┤
│                                                 │
│  Rate your current skills                       │
│                                                 │
│  Be honest - this helps us identify real gaps.  │
│  You can always update these later.             │
│                                                 │
│  Data Structures & Algorithms                   │
│  [────────────●────────────────] 3/5            │
│  "Can solve medium problems"                    │
│                                                 │
│  Frontend (React/Vue/Angular)                   │
│  [──────────────────●──────────] 4/5            │
│  "Built production apps"                        │
│                                                 │
│  Backend (Node/Python/Java)                     │
│  [────●────────────────────────] 2/5            │
│  "Know the basics"                              │
│                                                 │
│  System Design                                  │
│  [──●──────────────────────────] 1/5            │
│  "Just starting"                                │
│                                                 │
│  [← Back]                        [Continue →]   │
└─────────────────────────────────────────────────┘
```

**Skill Level Descriptions**:
| Level | Label | Description |
|-------|-------|-------------|
| 0 | No experience | Never worked with this |
| 1 | Beginner | Just starting, know basics |
| 2 | Familiar | Can complete simple tasks |
| 3 | Intermediate | Can solve medium problems |
| 4 | Advanced | Built production systems |
| 5 | Expert | Can teach others, deep knowledge |

**Step 3: Projects**
- Add 1-3 projects
- Each project: Name, tech stack (multi-select), complexity (1-5)
- Option to skip

**Step 4: Availability**
- Weekly hours available for learning (slider: 0-40)
- Preferred learning time (morning/afternoon/evening)

**State Management (useOnboardingState hook)**:
```typescript
interface OnboardingState {
  currentStep: 1 | 2 | 3 | 4;
  targetRole: string | null;
  skills: Record<string, number>;
  projects: Project[];
  weeklyHours: number;
  isComplete: boolean;
}
```

---

### 4. Main Dashboard (Decision Center)

**Design Principle**: Answer "What should I do next?" immediately

**Layout**:
```text
┌─────────────────────────────────────────────────────────────────┐
│  Dashboard                                    [Profile] [Help]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────┐  ┌──────────────────┐  │
│  │  Role Readiness                     │  │  What's Next     │  │
│  │                                     │  │                  │  │
│  │        ┌────────┐                   │  │  1. Complete     │  │
│  │        │  72%   │  Full Stack       │  │     DSA course   │  │
│  │        │        │  Developer        │  │                  │  │
│  │        └────────┘                   │  │  2. Build REST   │  │
│  │                                     │  │     API project  │  │
│  │  ↑ +5% from last week              │  │                  │  │
│  │                                     │  │  [View Roadmap]  │  │
│  │  [Run New Simulation]              │  └──────────────────┘  │
│  └─────────────────────────────────────┘                        │
│                                                                 │
│  ┌───────────────────────┐  ┌───────────────────────────────┐  │
│  │  Your Strengths       │  │  Focus Areas                  │  │
│  │                       │  │                               │  │
│  │  ● React/Frontend     │  │  ● System Design (Critical)   │  │
│  │  ● API Design         │  │  ● Advanced DSA               │  │
│  │  ● TypeScript         │  │  ● Cloud/DevOps               │  │
│  │                       │  │                               │  │
│  │  [View All Skills]   │  │  [Start Improving]            │  │
│  └───────────────────────┘  └───────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Components**:
- `ReadinessScore.tsx` - Large circular progress with percentage
- `TrendIndicator.tsx` - Shows improvement/decline with arrow
- `StrengthsPanel.tsx` - Top 3-5 skills above threshold
- `WeaknessPanel.tsx` - Top 3 gaps with priority badges
- `NextStepsCard.tsx` - Immediate actionable items

---

### 5. Role Simulation Page

**Design Principle**: Explainable algorithm, transparent scoring

**Layout**:
```text
┌─────────────────────────────────────────────────────────────────┐
│  Role Simulation                              [Back to Dashboard]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Select a role to simulate:                                     │
│  [Frontend ▼] [Backend] [Full Stack] [DevOps] [Data Engineer]   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                                                             ││
│  │   Full Stack Developer Readiness                            ││
│  │                                                             ││
│  │              ┌────────────┐                                 ││
│  │              │    72%     │                                 ││
│  │              │   Ready    │                                 ││
│  │              └────────────┘                                 ││
│  │                                                             ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  Skill Breakdown                           [ℹ️ How we calculate] │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Skill              │ Weight │ Your Level │ Contribution  │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │ DSA                │  30%   │   ████░░   │    18/30     │  │
│  │ Frontend           │  25%   │   █████░   │    21/25     │  │
│  │ Backend            │  25%   │   ███░░░   │    15/25     │  │
│  │ Projects           │  20%   │   ████░░   │    18/20     │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │ TOTAL              │ 100%   │            │    72/100    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  💡 To reach 85%, focus on: Backend (+10%) and DSA (+3%)        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Scoring Algorithm (in services/simulation.ts)**:
```typescript
const ROLE_WEIGHTS = {
  fullstack: {
    dsa: 0.30,
    frontend: 0.25,
    backend: 0.25,
    projects: 0.20
  },
  frontend: {
    dsa: 0.20,
    frontend: 0.45,
    backend: 0.10,
    projects: 0.25
  }
  // ... other roles
};
```

**Explainability Features**:
- Tooltip on each weight explaining why
- "How we calculate" expandable section
- Actionable insight at bottom

---

### 6. Skill Gap Analysis Page

**Design Principle**: Prioritized, actionable gaps

**Layout**:
```text
┌─────────────────────────────────────────────────────────────────┐
│  Skill Gap Analysis                           [Refresh Analysis]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Based on 127 job postings for "Full Stack Developer"           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  🔴 Critical Gap                                 Est: 4 wks ││
│  │                                                             ││
│  │  System Design                                              ││
│  │  Required by 89% of job postings. You rated: 1/5           ││
│  │                                                             ││
│  │  Suggested Action:                                          ││
│  │  Complete "Grokking System Design" course                   ││
│  │  Practice 2 design problems weekly                          ││
│  │                                                             ││
│  │  [Add to Roadmap]                            [Mark as Done] ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  🟡 Important Gap                                Est: 2 wks ││
│  │                                                             ││
│  │  Advanced Data Structures                                   ││
│  │  Required by 76% of job postings. You rated: 3/5           ││
│  │                                                             ││
│  │  [Expand for details...]                                    ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  [Show 5 more gaps...]                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Priority Logic**:
- Critical (Red): Required by 80%+ jobs AND user level < 3
- Important (Yellow): Required by 50%+ jobs AND user level < 4
- Nice-to-have (Gray): Everything else

---

### 7. Personalized Roadmap Page (Killer Feature)

**Design Principle**: Time-based, achievable, encouraging

**Layout**:
```text
┌─────────────────────────────────────────────────────────────────┐
│  Your Learning Roadmap                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [30 Days] [60 Days] [90 Days]              Progress: 23%       │
│                                                                 │
│  ──●────────────────○──────────────────○──────────────────○──   │
│   Now           Week 4              Week 8              Week 12  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Week 1 (Current)                           ✓ 3/5 Complete  ││
│  │                                                             ││
│  │  ☑ Complete Binary Search problems (2 hrs)                  ││
│  │  ☑ Read System Design primer (1 hr)                         ││
│  │  ☑ Set up learning environment                              ││
│  │  ☐ Complete Tree traversal problems (2 hrs)                 ││
│  │  ☐ Build REST API mini-project (3 hrs)                      ││
│  │                                                             ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Week 2                                      [Expand ▼]     ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Week 3                                      [Expand ▼]     ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  🎯 Milestone: Complete DSA fundamentals                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Components**:
- `TimelineView.tsx` - Visual progress line with milestones
- `WeekCard.tsx` - Collapsible week with task list
- `TaskItem.tsx` - Checkbox with time estimate
- `MilestoneMarker.tsx` - Achievement markers

---

### 8. Profile & Settings Page

**Sections**:
1. **Skills & Goals** - Update skill ratings, change target role
2. **Account** - Email, password change
3. **Preferences** - Notification settings
4. **Data** - Export data, delete account

---

## Routing Structure

```typescript
// App.tsx routes
<Routes>
  {/* Public routes */}
  <Route path="/" element={<Index />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  
  {/* Protected routes (check auth state) */}
  <Route path="/onboarding" element={<Onboarding />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/simulation" element={<Simulation />} />
  <Route path="/skill-gap" element={<SkillGap />} />
  <Route path="/roadmap" element={<Roadmap />} />
  <Route path="/profile" element={<Profile />} />
  
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## State Management Strategy

### Local State (useState)
- Form inputs
- UI toggles (modals, dropdowns)
- Current step in onboarding

### Custom Hooks
- `useOnboardingState` - Multi-step form with persistence
- `useSimulation` - Scoring calculations
- `useRoadmap` - Roadmap generation and task tracking

### React Query (Future)
- API data fetching
- Cache management
- Optimistic updates

---

## Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Keyboard navigation | All interactive elements focusable, logical tab order |
| ARIA labels | Form inputs, buttons, icons have descriptive labels |
| Color contrast | WCAG AA minimum (4.5:1 for text) |
| Focus indicators | Visible focus rings on all interactive elements |
| Screen reader | Semantic HTML, role attributes where needed |
| Motion | Respect `prefers-reduced-motion` |

---

## Implementation Order

### Phase 1: Core Infrastructure (Week 1)
1. Set up routing structure
2. Create common components (PageHeader, StatCard, EmptyState, etc.)
3. Define TypeScript types
4. Create constants file with role weights

### Phase 2: Authentication (Week 1)
5. AuthLayout component
6. Login page with validation
7. Signup page with validation
8. Protected route wrapper

### Phase 3: Onboarding (Week 2)
9. OnboardingLayout with progress
10. Step 1: Role selection
11. Step 2: Skill rating with sliders
12. Step 3: Project addition
13. Step 4: Availability
14. State persistence (localStorage)

### Phase 4: Dashboard & Simulation (Week 2-3)
15. Dashboard layout
16. ReadinessScore component
17. Simulation page with role selector
18. Scoring algorithm (services/simulation.ts)
19. Score breakdown table

### Phase 5: Skill Gap & Roadmap (Week 3)
20. Skill gap analysis page
21. Priority ranking logic
22. Roadmap page with timeline
23. Task checkboxes with persistence

### Phase 6: Polish (Week 4)
24. Refine landing page (remove excess animations)
25. Profile page
26. Loading/error/empty states everywhere
27. Mobile responsive testing
28. Accessibility audit

---

## Technical Decisions & Trade-offs

| Decision | Reasoning |
|----------|-----------|
| No Redux/Zustand | App size doesn't warrant global state management; React Query + hooks sufficient |
| Framer Motion kept but reduced | Good for page transitions, but removing decorative animations |
| Recharts only for roadmap timeline | Minimal charting needs; custom components for skill bars |
| LocalStorage for onboarding | Simpler than context for multi-step form persistence |
| Mock data initially | Build UI first, connect to backend later |

---

## Files to Create

### New Pages (9 files)
- `src/pages/Login.tsx`
- `src/pages/Signup.tsx`
- `src/pages/Onboarding.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/Simulation.tsx`
- `src/pages/SkillGap.tsx`
- `src/pages/Roadmap.tsx`
- `src/pages/Profile.tsx`

### New Components (25+ files)
- Common: `PageHeader`, `StatCard`, `ProgressRing`, `EmptyState`, `LoadingState`, `ErrorState`, `SkillBar`
- Auth: `AuthLayout`, `LoginForm`, `SignupForm`
- Onboarding: `OnboardingLayout`, `ProgressIndicator`, `RoleSelector`, `SkillRater`, `ProjectAdder`, `AvailabilityPicker`
- Dashboard: `DashboardLayout`, `ReadinessScore`, `StrengthsPanel`, `WeaknessPanel`, `NextStepsCard`, `TrendIndicator`
- Simulation: `RoleSelector`, `ScoreBreakdown`, `WeightExplainer`
- SkillGap: `GapList`, `GapCard`, `PriorityBadge`
- Roadmap: `TimelineView`, `WeekCard`, `TaskItem`, `MilestoneMarker`

### New Hooks (3 files)
- `src/hooks/useOnboardingState.ts`
- `src/hooks/useSimulation.ts`
- `src/hooks/useRoadmap.ts`

### New Services (3 files)
- `src/services/simulation.ts`
- `src/services/skillgap.ts`
- `src/services/roadmap.ts`

### New Types (4 files)
- `src/types/user.ts`
- `src/types/skill.ts`
- `src/types/role.ts`
- `src/types/roadmap.ts`

### New Constants (1 file)
- `src/lib/constants.ts` (role weights, skill categories)

---

## Landing Page Simplifications

### Remove
- Floating orb animations (Hero.tsx lines 17-43)
- Rotating ring decoration (lines 46-52)
- Excessive hover animations on cards
- FloatingCard components

### Keep
- Gradient background (simpler)
- Stagger animations on content (subtle)
- Skill preview section (demonstrates value)
- Bento grid layout

### Add
- Problem statement section ("Why 70% of students fail technical interviews")
- Single primary CTA focus

---

## Ready for Implementation

This plan provides a complete, production-grade frontend architecture that:

1. Prioritizes user decisions over decoration
2. Implements explainable algorithms for interview discussions
3. Follows accessibility best practices
4. Uses a scalable component architecture
5. Handles all states (loading, error, empty)
6. Works on all device sizes

Click **Approve** to begin implementation with Phase 1.
