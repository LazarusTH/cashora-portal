import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const [profileImage, setProfileImage] = useState("https://github.com/shadcn.png");
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been successfully updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage src={profileImage} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <label 
                  htmlFor="profile-upload" 
                  className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Camera className="h-5 w-5" />
                </label>
                <Input 
                  id="profile-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </div>
              
              <div className="text-center">
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-gray-500">@johndoe</p>
              </div>

              <div className="flex items-center gap-2 text-mint-600">
                <DollarSign className="h-5 w-5" />
                <span className="text-xl font-bold">$10,000.00</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="text-lg">john.doe@example.com</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone</h3>
              <p className="text-lg">+1 (555) 123-4567</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
              <p className="text-lg">Personal</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
              <p className="text-lg">January 2024</p>
            </div>

            <Button className="w-full">Edit Profile</Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;