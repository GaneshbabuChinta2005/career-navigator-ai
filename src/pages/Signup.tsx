import AuthLayout from "@/layouts/AuthLayout";
import { SignupForm } from "@/features/auth/components/SignupForm";

const Signup = () => {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your career simulation journey"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
