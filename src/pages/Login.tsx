import { AuthLayout } from "@/components/auth";
import { LoginForm } from "@/components/auth";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your career simulation"
      footerText={
        <>
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
