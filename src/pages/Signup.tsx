import { AuthLayout } from "@/components/auth";
import { SignupForm } from "@/components/auth";
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
