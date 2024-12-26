import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "active", balance: "$1,234", role: "user", bank: "Chase Bank", withdrawalLimit: "$5,000" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", balance: "$567", role: "user", bank: "Bank of America", withdrawalLimit: "$3,000" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "active", balance: "$890", role: "admin", bank: "Wells Fargo", withdrawalLimit: "$10,000" },
  ]);

  const { toast } = useToast();

  const handleUpdateBalance = (userId: number, amount: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, balance: amount };
      }
      return user;
    }));
    toast({
      title: "Balance updated",
      description: "User balance has been updated successfully.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Users Management</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New User</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email" />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bank">Bank</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chase">Chase Bank</SelectItem>
                      <SelectItem value="boa">Bank of America</SelectItem>
                      <SelectItem value="wells">Wells Fargo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Create User</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Withdrawal Limit</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>{user.bank}</TableCell>
                  <TableCell>{user.balance}</TableCell>
                  <TableCell>{user.withdrawalLimit}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Manage</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Manage User: {user.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Update Balance</Label>
                            <div className="flex gap-2">
                              <Input type="number" placeholder="Enter amount" />
                              <Button onClick={() => handleUpdateBalance(user.id, "$2,000")}>Update</Button>
                            </div>
                          </div>
                          <div>
                            <Label>Withdrawal Limit</Label>
                            <div className="flex gap-2">
                              <Input type="number" placeholder="Enter limit" />
                              <Button variant="outline">Set Limit</Button>
                            </div>
                          </div>
                          <div>
                            <Label>Status</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder={user.status} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;