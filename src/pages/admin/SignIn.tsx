import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Implement actual admin authentication
    if (email === "admin@cashora.com" && password === "admin123") {
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "Welcome Admin!",
          description: "Successfully signed in to admin panel.",
        });
        navigate("/admin/dashboard");
      }, 1000);
    } else {
      setLoading(false);
      toast({
        title: "Error",
        description: "Invalid admin credentials.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Admin Portal</h2>
          <p className="mt-2 text-gray-600">Sign in to access the admin dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full h-12 text-lg font-medium"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In to Admin Panel"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignIn;