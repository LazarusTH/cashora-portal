import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-mint-50 to-white">
      <div className="max-w-4xl w-full text-center space-y-8 fade-in">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            Welcome to Cashora
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner for secure and efficient financial transactions.
            Experience seamless money management with our premium services.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => navigate("/auth/signin")}
            className="h-12 px-8 text-lg"
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate("/auth/signup")}
            variant="outline"
            className="h-12 px-8 text-lg"
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;