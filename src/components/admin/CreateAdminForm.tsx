import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CreateAdminFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onSuccess: () => void;
}

export const CreateAdminForm = ({
  email,
  setEmail,
  password,
  setPassword,
  onSuccess,
}: CreateAdminFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateAdmin = async () => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: "Admin User",
            role: "admin"
          }
        }
      });

      if (signUpError) throw signUpError;

      if (!authData.user) {
        throw new Error("Failed to create admin user");
      }

      toast({
        title: "Success",
        description: "Admin account created successfully. Please sign in.",
      });

      onSuccess();
    } catch (error: any) {
      console.error("Create admin error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create admin account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
      <Button
        type="button"
        className="w-full h-12 text-lg font-medium"
        disabled={loading}
        onClick={handleCreateAdmin}
      >
        {loading ? "Creating Admin..." : "Create Admin Account"}
      </Button>
    </div>
  );
};