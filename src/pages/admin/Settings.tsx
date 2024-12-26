import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Admin Settings</h1>

        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">System Settings</h2>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-500">Disable user access during maintenance</p>
              </div>
              <Switch />
            </div>

            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input type="email" placeholder="support@cashora.com" />
            </div>

            <div className="space-y-2">
              <Label>Transaction Fee (%)</Label>
              <Input type="number" placeholder="1.5" min="0" max="100" step="0.1" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Security Settings</h2>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Login Notifications</Label>
                <p className="text-sm text-gray-500">Send email alerts for admin logins</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">Save Settings</Button>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;