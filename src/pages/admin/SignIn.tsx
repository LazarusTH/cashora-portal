import { useState, useEffect } from "react";
import { CreateAdminForm } from "@/components/admin/CreateAdminForm";
import { SignInForm } from "@/components/admin/SignInForm";
import { supabase } from "@/integrations/supabase/client";

const AdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);

  useEffect(() => {
    const checkForAdmin = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin')
        .maybeSingle();
      
      if (error) {
        console.error("Error checking for admin:", error);
        return;
      }
      
      setShowCreateAdmin(!data);
    };

    checkForAdmin();
  }, []);

  const handleAdminCreated = () => {
    setEmail("");
    setPassword("");
    setShowCreateAdmin(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-dark-300">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Admin Access</h1>
          <p className="text-gray-400">
            {showCreateAdmin ? "Create the first admin account" : "Sign in to access the admin panel"}
          </p>
        </div>
        
        {showCreateAdmin ? (
          <CreateAdminForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSuccess={handleAdminCreated}
          />
        ) : (
          <SignInForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        )}
      </div>
    </div>
  );
};

export default AdminSignIn;