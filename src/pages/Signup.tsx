import { EmptyState } from "@/components/common";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Signup = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-2xl font-bold font-display">Create your account</h1>
          <p className="text-muted-foreground mt-2">Start your career simulation journey</p>
        </div>
        
        <EmptyState
          title="Signup Form Coming Soon"
          description="Authentication will be implemented in Phase 2"
          action={{
            label: "Go to Onboarding",
            onClick: () => window.location.href = "/onboarding"
          }}
        />
        
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
