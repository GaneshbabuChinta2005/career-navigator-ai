import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
import MockInterview from "./pages/MockInterview";
import Schedule from "./pages/Schedule";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />

          {/* App routes with MainLayout */}
          <Route path="/app" element={<MainLayout />}>
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="simulation" element={<Simulation />} />
            <Route path="skill-gap" element={<SkillGap />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="profile" element={<Profile />} />
            <Route path="mock-interview" element={<MockInterview />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="resume" element={<ResumeAnalyzer />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
