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
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-mint-100 text-mint-700 text-sm font-medium">
                Trusted by 10,000+ users worldwide
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Your Trusted Partner for{" "}
              <span className="text-mint-500">Financial Success</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              Experience seamless money management with our premium services. Join thousands of satisfied customers who trust Cashora.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => navigate("/auth/signup")}
                size="lg"
                className="bg-mint-500 hover:bg-mint-600 group"
              >
                Create Account
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={() => navigate("/auth/signin")}
                variant="outline"
                size="lg"
                className="group"
              >
                Sign In
                <Sparkles className="ml-2 h-4 w-4 transition-all group-hover:rotate-12" />
              </Button>
            </div>
          </div>
          <div className="relative animate-slideIn">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="Hero"
                className="rounded-2xl shadow-2xl hover-scale"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-xl shadow-xl animate-fadeIn">
                <p className="text-sm font-medium">Join our growing community</p>
                <p className="text-mint-600 font-bold">10,000+ active users</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-mint-500/10 to-mint-500/5 rounded-2xl transform rotate-3 scale-105" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;