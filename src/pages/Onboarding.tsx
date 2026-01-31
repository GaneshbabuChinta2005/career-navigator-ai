import { PageHeader, EmptyState } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Onboarding = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-muted-foreground">Step 1 of 4</span>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Skip for now
            </Link>
          </div>
          {/* Progress bar */}
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/4 transition-all duration-300" />
          </div>
        </div>
        
        <EmptyState
          title="Onboarding Flow Coming Soon"
          description="Multi-step onboarding will be implemented in Phase 3"
          action={{
            label: "Go to Dashboard",
            onClick: () => window.location.href = "/dashboard"
          }}
        />
      </div>
    </div>
  );
};

export default Onboarding;
