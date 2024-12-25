import { SignInForm } from "@/components/auth/SignInForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-mint-50 to-white">
      <div className="w-full max-w-md space-y-8 text-center fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Sign in to access your account
          </p>
        </div>
        
        <SignInForm />
        
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Button
            variant="link"
            className="p-0 h-auto font-medium"
            onClick={() => navigate("/auth/signup")}
          >
            Create one now
          </Button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;