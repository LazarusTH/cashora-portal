import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                <p className="text-lg font-semibold">John Doe</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-lg">john.doe@example.com</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                <p className="text-lg">Personal</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                <p className="text-lg">January 2024</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;