import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Bank {
  id: number;
  name: string;
  users: {
    id: number;
    name: string;
  }[];
}

interface User {
  id: number;
  name: string;
}

const AdminBanks = () => {
  const [banks, setBanks] = useState<Bank[]>([
    { 
      id: 1, 
      name: "Chase Bank",
      users: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" }
      ]
    },
    { 
      id: 2, 
      name: "Bank of America",
      users: [
        { id: 1, name: "John Doe" }
      ]
    },
  ]);

  const [availableUsers] = useState<User[]>([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Bob Johnson" },
  ]);

  const [newBankName, setNewBankName] = useState("");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const { toast } = useToast();

  const handleAddBank = () => {
    if (newBankName.trim()) {
      setBanks([...banks, { id: banks.length + 1, name: newBankName, users: [] }]);
      setNewBankName("");
      toast({
        title: "Bank added successfully",
        description: `${newBankName} has been added to the system.`,
      });
    }
  };

  const handleAddUserToBank = (bankId: number, userId: number) => {
    const user = availableUsers.find(u => u.id === userId);
    if (!user) return;

    setBanks(banks.map(bank => {
      if (bank.id === bankId) {
        const userExists = bank.users.some(u => u.id === userId);
        if (!userExists) {
          return {
            ...bank,
            users: [...bank.users, { id: userId, name: user.name }]
          };
        }
      }
      return bank;
    }));

    toast({
      title: "User added to bank",
      description: "The user has been successfully assigned to the bank.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Banks Management</h1>
          <div className="flex gap-4">
            <Input
              placeholder="Enter bank name"
              value={newBankName}
              onChange={(e) => setNewBankName(e.target.value)}
              className="w-64"
            />
            <Button onClick={handleAddBank}>Add Bank</Button>
          </div>
        </div>

        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bank Name</TableHead>
                <TableHead>Total Users</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banks.map((bank) => (
                <TableRow key={bank.id}>
                  <TableCell className="font-medium">{bank.name}</TableCell>
                  <TableCell>{bank.users.length}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Manage Users
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Manage Users - {bank.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Add User</Label>
                            <Select onValueChange={(value) => handleAddUserToBank(bank.id, Number(value))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select user to add" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableUsers.map((user) => (
                                  <SelectItem key={user.id} value={user.id.toString()}>
                                    {user.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Current Users</Label>
                            <div className="mt-2 space-y-2">
                              {bank.users.map((user) => (
                                <div key={user.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                  <span>{user.name}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setBanks(banks.map(b => {
                                        if (b.id === bank.id) {
                                          return {
                                            ...b,
                                            users: b.users.filter(u => u.id !== user.id)
                                          };
                                        }
                                        return b;
                                      }));
                                      toast({
                                        title: "User removed",
                                        description: "User has been removed from the bank.",
                                      });
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            </div>
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

export default AdminBanks;