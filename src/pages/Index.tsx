import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Test the Supabase connection by making a simple query
        const { data, error } = await supabase
          .from('profiles')
          .select('id')
          .limit(1);

        if (error) {
          throw error;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Failed to connect to the server. Please try again later.",
        });
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mint-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
};

export default Index;