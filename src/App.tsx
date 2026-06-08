import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

// Layouts
import MainLayout from "@/layouts/MainLayout";

// Pages
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Simulation from "./pages/Simulation";
import SkillGap from "./pages/SkillGap";
import Roadmap from "./pages/Roadmap";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AITools from "./pages/AITools";
import AICoverLetter from "./pages/AICoverLetter";
import AILinkedin from "./pages/AILinkedin";
import AISalary from "./pages/AISalary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, login } = useAuthStore();
  if (!isAuthenticated) {
    login({
      id: 'demo-user-123',
      name: 'Demo User',
      email: 'demo@career.ai',
      role: 'user',
    }, 'demo-jwt-token-auto');
  }
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />


          {/* Protected routes with MainLayout - all under /app prefix */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="simulation" element={<Simulation />} />
            <Route path="skill-gap" element={<SkillGap />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="profile" element={<Profile />} />
            <Route path="ai-tools" element={<AITools />} />
            <Route path="ai-tools/cover-letter" element={<AICoverLetter />} />
            <Route path="ai-tools/linkedin" element={<AILinkedin />} />
            <Route path="ai-tools/salary" element={<AISalary />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
