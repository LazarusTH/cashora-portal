import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 flex items-center bg-gradient-to-b from-mint-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Your Trusted Partner for{" "}
              <span className="text-mint-500">Financial Success</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Experience seamless money management with our premium services. Join thousands of satisfied customers who trust Cashora.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => navigate("/auth/signup")}
                size="lg"
                className="bg-mint-500 hover:bg-mint-600 group"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={() => navigate("/auth/signin")}
                variant="outline"
                size="lg"
              >
                Sign In
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="relative animate-slideIn">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              alt="Hero"
              className="rounded-lg shadow-2xl hover-scale"
            />
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-xl animate-fadeIn">
              <p className="text-sm font-medium">Trusted by 10,000+ users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;