import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SignInFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

export const SignInForm = ({
  email,
  setEmail,
  password,
  setPassword,
}: SignInFormProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      if (!data?.user) {
        throw new Error("No user returned after login");
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .maybeSingle();

      if (profileError) {
        await supabase.auth.signOut();
        throw new Error("Failed to fetch user profile");
      }

      if (profile?.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error("Unauthorized: Admin access required");
      }

      toast({
        title: "Welcome back!",
        description: "Successfully signed in to admin panel.",
      });
      
      navigate("/admin/dashboard");
    } catch (error: any) {
      console.error("Admin sign in error:", error);
      
      let errorMessage = "Failed to sign in";
      
      if (error.message?.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password";
      } else if (error.message === "Unauthorized: Admin access required") {
        errorMessage = "This account does not have admin access";
      } else if (error.message === "Failed to fetch user profile") {
        errorMessage = "Error accessing user profile";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      await supabase.auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-12 bg-dark-200 border-dark-100 text-white placeholder:text-gray-400"
        disabled={loading}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="h-12 bg-dark-200 border-dark-100 text-white placeholder:text-gray-400"
        disabled={loading}
      />
      <Button
        type="submit"
        className="w-full h-12 text-lg font-medium"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};