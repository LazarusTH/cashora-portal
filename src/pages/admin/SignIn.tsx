import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Attempting admin sign in with email:", email);

    try {
      // First attempt to sign in
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Sign in response:", { data, error: signInError });

      if (signInError) throw signInError;

      if (!data.user) throw new Error("No user returned after login");

      // Then check if user has admin role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      console.log("Profile check response:", { profile, error: profileError });

      if (profileError) throw profileError;

      if (profile?.role !== 'admin') {
        // If not admin, sign them out and throw error
        await supabase.auth.signOut();
        throw new Error('Unauthorized: Admin access required');
      }

      toast({
        title: "Welcome back!",
        description: "Successfully signed in to admin panel.",
      });
      
      navigate("/admin/dashboard");
    } catch (error: any) {
      // Sign out if there was any error
      await supabase.auth.signOut();
      console.error("Admin sign in error:", error);
      
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-dark-300">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Admin Access</h1>
          <p className="text-gray-400">
            Sign in to access the admin panel
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
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
          </div>
          
          <Button
            type="submit"
            className="w-full h-12 text-lg font-medium"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignIn;