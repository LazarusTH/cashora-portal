import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface LimitSettings {
  type: 'withdrawal' | 'sending';
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  amount: number;
}

interface FeeSettings {
  type: 'percentage' | 'fixed';
  value: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  role: string;
  banks: string[];
  balance: string;
  withdrawalLimits: LimitSettings[];
  sendingLimits: LimitSettings[];
  feeSettings: FeeSettings;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "active",
      role: "user",
      banks: ["Chase Bank", "Bank of America"],
      balance: "$1,234",
      withdrawalLimits: [
        { type: 'withdrawal', period: 'daily', amount: 5000 },
        { type: 'withdrawal', period: 'monthly', amount: 50000 }
      ],
      sendingLimits: [
        { type: 'sending', period: 'daily', amount: 3000 },
        { type: 'sending', period: 'monthly', amount: 30000 }
      ],
      feeSettings: { type: 'percentage', value: 2.5 }
    },
    // ... Add more sample users
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();

  const handleUpdateLimits = (userId: number, limitType: 'withdrawal' | 'sending', period: string, amount: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const limits = limitType === 'withdrawal' ? user.withdrawalLimits : user.sendingLimits;
        const updatedLimits = [...limits];
        const existingLimitIndex = limits.findIndex(l => l.period === period);
        
        if (existingLimitIndex >= 0) {
          updatedLimits[existingLimitIndex].amount = amount;
        } else {
          updatedLimits.push({ type: limitType, period: period as any, amount });
        }

        return {
          ...user,
          [limitType === 'withdrawal' ? 'withdrawalLimits' : 'sendingLimits']: updatedLimits
        };
      }
      return user;
    }));

    toast({
      title: "Limits updated",
      description: `${limitType.charAt(0).toUpperCase() + limitType.slice(1)} limits have been updated.`,
    });
  };

  const handleUpdateFees = (userId: number, feeType: 'percentage' | 'fixed', value: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          feeSettings: { type: feeType, value }
        };
      }
      return user;
    }));

    toast({
      title: "Fees updated",
      description: "Fee settings have been updated successfully.",
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
            <DialogContent className="max-w-2xl">
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
                <TableHead>Banks</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="cursor-pointer" onClick={() => setSelectedUser(user)}>
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
                  <TableCell>{user.banks.join(", ")}</TableCell>
                  <TableCell>{user.balance}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Manage</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Manage User: {user.name}</DialogTitle>
                        </DialogHeader>
                        <Tabs defaultValue="limits" className="w-full">
                          <TabsList>
                            <TabsTrigger value="limits">Limits</TabsTrigger>
                            <TabsTrigger value="fees">Fees</TabsTrigger>
                            <TabsTrigger value="banks">Banks</TabsTrigger>
                          </TabsList>
                          <TabsContent value="limits" className="space-y-4">
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Withdrawal Limits</h3>
                              <div className="grid grid-cols-2 gap-4">
                                {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
                                  <div key={`withdrawal-${period}`}>
                                    <Label>{period.charAt(0).toUpperCase() + period.slice(1)} Limit</Label>
                                    <div className="flex gap-2">
                                      <Input
                                        type="number"
                                        placeholder="Enter amount"
                                        defaultValue={user.withdrawalLimits.find(l => l.period === period)?.amount}
                                        onChange={(e) => handleUpdateLimits(user.id, 'withdrawal', period, Number(e.target.value))}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Sending Limits</h3>
                              <div className="grid grid-cols-2 gap-4">
                                {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
                                  <div key={`sending-${period}`}>
                                    <Label>{period.charAt(0).toUpperCase() + period.slice(1)} Limit</Label>
                                    <div className="flex gap-2">
                                      <Input
                                        type="number"
                                        placeholder="Enter amount"
                                        defaultValue={user.sendingLimits.find(l => l.period === period)?.amount}
                                        onChange={(e) => handleUpdateLimits(user.id, 'sending', period, Number(e.target.value))}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="fees" className="space-y-4">
                            <div>
                              <Label>Fee Type</Label>
                              <Select
                                defaultValue={user.feeSettings.type}
                                onValueChange={(value: 'percentage' | 'fixed') => 
                                  handleUpdateFees(user.id, value, user.feeSettings.value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="percentage">Percentage</SelectItem>
                                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Fee Value</Label>
                              <div className="flex gap-2">
                                <Input
                                  type="number"
                                  placeholder={user.feeSettings.type === 'percentage' ? "Enter percentage" : "Enter amount"}
                                  value={user.feeSettings.value}
                                  onChange={(e) => handleUpdateFees(user.id, user.feeSettings.type, Number(e.target.value))}
                                />
                                <span className="flex items-center">
                                  {user.feeSettings.type === 'percentage' ? '%' : '$'}
                                </span>
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="banks" className="space-y-4">
                            <div>
                              <Label>Assigned Banks</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select banks" />
                                </SelectTrigger>
                                <SelectContent>
                                  {user.banks.map((bank) => (
                                    <SelectItem key={bank} value={bank}>
                                      {bank}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {selectedUser && (
          <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>User Details</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <p className="text-lg">{selectedUser.name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-lg">{selectedUser.email}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p>
                    <Badge variant={selectedUser.status === "active" ? "default" : "secondary"}>
                      {selectedUser.status}
                    </Badge>
                  </p>
                </div>
                <div>
                  <Label>Role</Label>
                  <p>
                    <Badge variant="outline">{selectedUser.role}</Badge>
                  </p>
                </div>
                <div>
                  <Label>Balance</Label>
                  <p className="text-lg">{selectedUser.balance}</p>
                </div>
                <div>
                  <Label>Banks</Label>
                  <p className="text-lg">{selectedUser.banks.join(", ")}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;