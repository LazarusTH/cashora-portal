import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Unlock } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  banks: string[];
  balance: string;
  is_frozen?: boolean;
}

interface UserDetailsDialogProps {
  user: User | null;
  onClose: () => void;
  onUserUpdate: () => void;
}

export const UserDetailsDialog = ({ user, onClose, onUserUpdate }: UserDetailsDialogProps) => {
  const { toast } = useToast();

  const handleFreezeToggle = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_frozen: !user.is_frozen })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: user.is_frozen ? "Account unfrozen" : "Account frozen",
        description: user.is_frozen 
          ? "User can now perform transactions" 
          : "User cannot perform any transactions",
      });
      onUserUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-2xl">User Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="space-y-2">
            <Label className="text-gray-500">User ID</Label>
            <p className="font-mono text-sm bg-gray-100 p-2 rounded">{user.id}</p>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-500">Name</Label>
            <p className="text-lg font-medium">{user.name}</p>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-500">Email</Label>
            <p className="text-lg">{user.email}</p>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-500">Role</Label>
            <p>
              <Badge variant="outline" className="animate-fade-in">{user.role}</Badge>
            </p>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-500">Balance</Label>
            <p className="text-lg font-medium">{user.balance}</p>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-500">Banks</Label>
            <p className="text-lg">{user.banks.join(", ")}</p>
          </div>
          <div className="col-span-2">
            <Button
              variant={user.is_frozen ? "destructive" : "outline"}
              onClick={handleFreezeToggle}
              className="w-full animate-fade-in"
            >
              {user.is_frozen ? (
                <>
                  <Unlock className="w-4 h-4 mr-2" />
                  Unfreeze Account
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Freeze Account
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};