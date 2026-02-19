import AuthLayout from "@/layouts/AuthLayout";
import { SignupForm } from "@/features/auth/components/SignupForm";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your career simulation journey"
      footerText={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
