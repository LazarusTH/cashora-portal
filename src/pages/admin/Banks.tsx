import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const AdminBanks = () => {
  const [banks, setBanks] = useState([
    { id: 1, name: "Chase Bank", users: 15 },
    { id: 2, name: "Bank of America", users: 23 },
    { id: 3, name: "Wells Fargo", users: 18 },
  ]);
  const [newBankName, setNewBankName] = useState("");
  const { toast } = useToast();

  const handleAddBank = () => {
    if (newBankName.trim()) {
      setBanks([...banks, { id: banks.length + 1, name: newBankName, users: 0 }]);
      setNewBankName("");
      toast({
        title: "Bank added successfully",
        description: `${newBankName} has been added to the system.`,
      });
    }
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
                  <TableCell>{bank.users}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Manage Users
                    </Button>
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