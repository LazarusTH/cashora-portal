import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  // Add more users as needed
];

const Email = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [emailType, setEmailType] = useState<"all" | "selected">("all");
  const { toast } = useToast();

  const handleSendEmail = () => {
    toast({
      title: "Email sent successfully",
      description: `Email has been sent to ${emailType === "all" ? "all users" : "selected users"}.`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Email</h1>
          <p className="text-gray-500 mt-2">Send emails to your users</p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Recipients</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="all"
                    checked={emailType === "all"}
                    onCheckedChange={() => setEmailType("all")}
                  />
                  <Label htmlFor="all">All Users</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="selected"
                    checked={emailType === "selected"}
                    onCheckedChange={() => setEmailType("selected")}
                  />
                  <Label htmlFor="selected">Selected Users</Label>
                </div>
              </div>
            </div>

            {emailType === "selected" && (
              <div className="space-y-2">
                <Label>Select Users</Label>
                <Card className="p-4">
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-2">
                      {users.map((user) => (
                        <div key={user.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`user-${user.id}`}
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedUsers([...selectedUsers, user.id]);
                              } else {
                                setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                              }
                            }}
                          />
                          <Label htmlFor={`user-${user.id}`}>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter email subject" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                placeholder="Enter email content"
                className="min-h-[200px]"
              />
            </div>

            <Button onClick={handleSendEmail}>Send Email</Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Email;