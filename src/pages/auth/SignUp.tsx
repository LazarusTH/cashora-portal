import { SignUpForm } from "@/components/auth/SignUpForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-mint-50 to-white">
      <div className="w-full max-w-md space-y-8 text-center fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="text-muted-foreground">
            Join Cashora to start managing your finances
          </p>
        </div>
        
        <SignUpForm />
        
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button
            variant="link"
            className="p-0 h-auto font-medium"
            onClick={() => navigate("/auth/signin")}
          >
            Sign in
          </Button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;