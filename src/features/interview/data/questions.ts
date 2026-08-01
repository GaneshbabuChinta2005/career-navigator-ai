import type { InterviewQuestion } from '@/store/useInterviewStore';

export const INTERVIEW_QUESTIONS: Record<string, InterviewQuestion[]> = {
  frontend: [
    {
      id: 'fe-1',
      question: 'Explain the difference between `useMemo` and `useCallback` in React. When would you use each?',
      category: 'technical',
      difficulty: 'medium',
      hint: 'Think about what each hook memoizes — a value vs a function.',
      sampleAnswer:
        '`useMemo` memoizes the result of a computation and recalculates only when dependencies change. `useCallback` memoizes a function reference. Use `useMemo` when computing expensive values (e.g., filtered lists). Use `useCallback` when passing stable callbacks to child components to prevent unnecessary re-renders.',
    },
    {
      id: 'fe-2',
      question: 'How does the Virtual DOM work and what are its performance trade-offs?',
      category: 'technical',
      difficulty: 'medium',
      hint: 'Describe the reconciliation process and diffing algorithm.',
      sampleAnswer:
        'React keeps a lightweight in-memory copy of the DOM. On state changes it diffs the new virtual tree against the previous one (reconciliation), computes minimal DOM mutations, then batches those updates. Trade-offs: avoids costly direct DOM manipulation, but the diffing step itself has overhead — for very simple UIs it can be slower than direct DOM.',
    },
    {
      id: 'fe-3',
      question: 'What is CSS specificity and how does it affect style cascading?',
      category: 'technical',
      difficulty: 'easy',
      hint: 'Think about the weight of inline styles, IDs, classes, and elements.',
      sampleAnswer:
        'Specificity is a weight browsers assign to CSS rules: inline styles (1,0,0,0) > IDs (0,1,0,0) > classes/pseudo-classes/attributes (0,0,1,0) > elements (0,0,0,1). When rules conflict, higher specificity wins. `!important` overrides specificity entirely, which is why it should be avoided.',
    },
    {
      id: 'fe-4',
      question: 'Describe a challenging UI performance problem you solved. What was the root cause and how did you fix it?',
      category: 'behavioral',
      difficulty: 'medium',
      hint: 'Use the STAR method: Situation, Task, Action, Result.',
    },
    {
      id: 'fe-5',
      question: 'Design a component architecture for a real-time chat UI that supports 1000+ concurrent users.',
      category: 'system-design',
      difficulty: 'hard',
      hint: 'Consider WebSocket connection management, message virtualization, and optimistic UI.',
      sampleAnswer:
        'Use WebSocket (Socket.io) for real-time messages. Virtualize the message list (react-window) to render only visible messages. Implement optimistic UI: add messages locally immediately, confirm/revert on server response. Separate concerns: MessageList, MessageInput, ChatHeader components. Use a message store (Zustand) with per-room slices.',
    },
    {
      id: 'fe-6',
      question: 'Tell me about a time you disagreed with a design decision. How did you handle it?',
      category: 'behavioral',
      difficulty: 'easy',
      hint: 'Focus on how you communicated your perspective while respecting team decisions.',
    },
  ],

  backend: [
    {
      id: 'be-1',
      question: 'Explain database indexing. When does an index hurt performance rather than help?',
      category: 'technical',
      difficulty: 'medium',
      hint: 'Consider read vs write trade-offs and high-cardinality columns.',
      sampleAnswer:
        'Indexes create a B-tree (or other) data structure that speeds up lookups by avoiding full table scans. They hurt when: writes (INSERT/UPDATE/DELETE) become slower because indexes must be updated; low-cardinality columns (e.g., boolean) produce large index scans that are worse than sequential reads; over-indexing wastes storage and confuses the query planner.',
    },
    {
      id: 'be-2',
      question: 'What is the N+1 query problem and how do you prevent it in an ORM?',
      category: 'technical',
      difficulty: 'medium',
      hint: 'Think about eager loading vs lazy loading.',
      sampleAnswer:
        'N+1 occurs when fetching a list of N records then issuing one additional query per record (e.g., loading all posts then separately loading each author). Fix with eager loading: SQL JOINs, or ORM methods like `include`/`populate`/`with` that batch the related query into one. DataLoader is used in GraphQL contexts for batching.',
    },
    {
      id: 'be-3',
      question: 'How would you design a rate-limiting system for an API?',
      category: 'system-design',
      difficulty: 'hard',
      hint: 'Consider token bucket, leaky bucket, or fixed window algorithms.',
      sampleAnswer:
        'Common approaches: fixed window (count requests per time window per IP/key), sliding window (smoother, avoids boundary bursts), token bucket (allows short bursts). Store counters in Redis for fast atomic increments. Return 429 with Retry-After header when limit exceeded. Consider tiers: public endpoints stricter, authenticated users higher limits.',
    },
    {
      id: 'be-4',
      question: 'Describe how you would approach debugging a memory leak in a Node.js service.',
      category: 'technical',
      difficulty: 'hard',
      hint: 'Think about heap snapshots, event listener leaks, and closure traps.',
      sampleAnswer:
        'Start by monitoring heap usage over time (clinic.js or built-in `--inspect`). Take heap snapshots before and after suspected leak using Chrome DevTools. Look for growing retained objects. Common causes: event listeners not removed, closures holding references, caching without eviction, stream not destroyed. Fix by ensuring cleanup in destructors/unmount.',
    },
    {
      id: 'be-5',
      question: 'Tell me about a production incident you caused or helped resolve. What did you learn?',
      category: 'behavioral',
      difficulty: 'medium',
      hint: 'Be honest and focus on the learning. Hiring managers value self-awareness.',
    },
    {
      id: 'be-6',
      question: 'Explain the difference between horizontal and vertical scaling. Which would you choose for a write-heavy workload?',
      category: 'system-design',
      difficulty: 'medium',
      hint: 'Consider stateless vs stateful services.',
      sampleAnswer:
        'Vertical scaling: add more CPU/RAM to one machine — simple but has hardware limits and single point of failure. Horizontal scaling: add more machines — stateless services scale easily; stateful services need sharding or distributed coordination. For write-heavy workloads: shard the database horizontally (partition by user ID or region), use async writes via message queue to decouple, replicate reads.',
    },
  ],

  fullstack: [
    {
      id: 'fs-1',
      question: 'How would you implement authentication in a full-stack Next.js application?',
      category: 'technical',
      difficulty: 'medium',
      hint: 'Consider JWTs, session cookies, OAuth, and middleware.',
      sampleAnswer:
        'Use NextAuth.js or Auth.js for OAuth + credential strategies. Store sessions in httpOnly cookies (more secure than localStorage). Use Next.js middleware to protect routes server-side. For APIs, validate JWT in middleware or use server actions with session checks. Implement CSRF protection for cookie-based auth.',
    },
    {
      id: 'fs-2',
      question: 'Explain the trade-offs between SSR, SSG, and CSR in a modern web app.',
      category: 'technical',
      difficulty: 'medium',
      hint: 'Think about SEO, TTFB, build time, and data freshness.',
      sampleAnswer:
        'SSR: rendered on each request — fresh data, good SEO, higher server load, slower TTFB. SSG: rendered at build time — fast delivery, great for CDN caching, stale for dynamic data. CSR: rendered in browser — minimal server load, poor initial SEO, great for authenticated dashboards. ISR (Next.js): combines SSG + periodic revalidation.',
    },
    {
      id: 'fs-3',
      question: 'Design a URL shortener service (like bit.ly). Cover both backend and frontend architecture.',
      category: 'system-design',
      difficulty: 'hard',
      hint: 'Consider ID generation, redirect performance, analytics, and abuse prevention.',
      sampleAnswer:
        'Backend: generate short ID (Base62 encode auto-increment ID or hash). Store `{shortId, longUrl, userId, clicks, createdAt}` in Postgres. Cache hot redirects in Redis (TTL 24h). Analytics: increment click count async via queue. Frontend: a simple form to create links, a dashboard to manage them. Rate-limit creation to prevent abuse.',
    },
    {
      id: 'fs-4',
      question: 'How do you handle optimistic UI updates and rollbacks in a React + REST API setup?',
      category: 'technical',
      difficulty: 'medium',
      hint: 'Think about TanStack Query\'s optimistic updates API.',
      sampleAnswer:
        'With TanStack Query: in `onMutate`, cancel pending queries, snapshot current data, apply optimistic update to cache. In `onError`, rollback to snapshot. In `onSettled`, refetch to sync with server. This gives instant UI feedback while safely reverting on failure.',
    },
    {
      id: 'fs-5',
      question: 'Tell me about the most complex feature you\'ve shipped. What were the key technical decisions?',
      category: 'behavioral',
      difficulty: 'medium',
      hint: 'Pick something that shows breadth: frontend, backend, and integration.',
    },
    {
      id: 'fs-6',
      question: 'How do you ensure accessibility in your frontend work?',
      category: 'technical',
      difficulty: 'easy',
      hint: 'Mention ARIA, semantic HTML, keyboard navigation, and screen reader testing.',
      sampleAnswer:
        'Use semantic HTML elements (nav, main, button, h1-h6). Add ARIA labels where semantics are insufficient. Ensure all interactive elements are keyboard navigable (Tab + Enter/Space). Maintain 4.5:1 color contrast ratio (WCAG AA). Test with screen readers (NVDA/VoiceOver) and automated tools (axe, Lighthouse).',
    },
  ],

  devops: [
    {
      id: 'do-1',
      question: 'Explain the difference between Docker and a virtual machine. When would you choose one over the other?',
      category: 'technical',
      difficulty: 'easy',
      hint: 'Focus on the isolation layer: OS vs process.',
      sampleAnswer:
        'VMs include a full OS per instance — heavy but fully isolated at hardware level. Containers share the host kernel — lightweight, fast startup, less overhead. Choose VMs for strong security isolation (multi-tenant) or legacy OS requirements. Choose containers for microservices, CI pipelines, or when startup time and density matter.',
    },
    {
      id: 'do-2',
      question: 'How would you design a zero-downtime deployment pipeline?',
      category: 'system-design',
      difficulty: 'hard',
      hint: 'Consider blue-green, canary, and rolling update strategies.',
      sampleAnswer:
        'Blue-green: run two identical environments, switch traffic at load balancer level — instant rollback but double infra cost. Rolling update: replace instances gradually, catches issues early. Canary: route small % to new version, monitor metrics, then full rollout. All require health checks, readiness probes, and database migrations that are backward compatible.',
    },
    {
      id: 'do-3',
      question: 'What is Kubernetes\' role in managing stateful applications? What challenges does it introduce?',
      category: 'technical',
      difficulty: 'hard',
      hint: 'Think about StatefulSets, PersistentVolumes, and pod identity.',
      sampleAnswer:
        'StatefulSets provide stable pod names and network IDs, ordered startup/shutdown, and stable storage via PersistentVolumeClaims. Challenges: storage provisioning complexity, backup/restore, cluster-aware application config (e.g., MongoDB replica set members need to know each other), and slower rolling updates due to ordering.',
    },
    {
      id: 'do-4',
      question: 'Describe how you\'d set up monitoring and alerting for a production microservices system.',
      category: 'technical',
      difficulty: 'medium',
      hint: 'The three pillars: metrics, logs, traces.',
      sampleAnswer:
        'Metrics: Prometheus scrapes service metrics, Grafana dashboards. Logs: structured JSON logs shipped to ELK stack or Loki. Traces: distributed tracing with Jaeger/OpenTelemetry to track request flow across services. Alerting: PagerDuty/OpsGenie rules on error rate, latency p99, saturation. Define SLOs (99.9% uptime) and alert on SLI breaches.',
    },
    {
      id: 'do-5',
      question: 'Tell me about a time you had to reduce infrastructure costs significantly. What was your approach?',
      category: 'behavioral',
      difficulty: 'medium',
      hint: 'Be specific about the before/after metrics.',
    },
  ],
};

export const getQuestionsForRole = (role: string, count = 5): InterviewQuestion[] => {
  const key = role.toLowerCase().replace(/\s+/g, '').replace('developer', '').replace('engineer', '');
  const mapped: Record<string, string> = {
    frontend: 'frontend',
    front: 'frontend',
    backend: 'backend',
    back: 'backend',
    fullstack: 'fullstack',
    full: 'fullstack',
    devops: 'devops',
    dev: 'devops',
  };
  const bank = INTERVIEW_QUESTIONS[mapped[key] || 'fullstack'] || INTERVIEW_QUESTIONS.fullstack;
  // Shuffle and return
  return [...bank].sort(() => Math.random() - 0.5).slice(0, Math.min(count, bank.length));
};

export const ROLE_OPTIONS = [
  { id: 'frontend', label: 'Frontend Developer', icon: '🎨', duration: '~20 min' },
  { id: 'backend', label: 'Backend Developer', icon: '⚙️', duration: '~25 min' },
  { id: 'fullstack', label: 'Full Stack Developer', icon: '🚀', duration: '~25 min' },
  { id: 'devops', label: 'DevOps Engineer', icon: '🔧', duration: '~20 min' },
];
