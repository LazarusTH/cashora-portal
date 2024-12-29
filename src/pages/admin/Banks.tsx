import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Bank {
  id: string;
  name: string;
  users: {
    id: string;
    full_name: string;
  }[];
}

interface User {
  id: string;
  full_name: string;
}

const AdminBanks = () => {
  const [newBankName, setNewBankName] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch banks with their assigned users
  const { data: banks = [], isLoading } = useQuery({
    queryKey: ['banks'],
    queryFn: async () => {
      const { data: banksData, error: banksError } = await supabase
        .from('banks')
        .select(`
          id,
          name,
          bank_assignments(
            user_id,
            profiles(
              id,
              full_name
            )
          )
        `);

      if (banksError) {
        console.error('Error fetching banks:', banksError);
        throw banksError;
      }

      return banksData.map(bank => ({
        id: bank.id,
        name: bank.name,
        users: bank.bank_assignments
          .map(assignment => assignment.profiles)
          .filter(Boolean)
          .map(profile => ({
            id: profile.id,
            full_name: profile.full_name
          }))
      }));
    }
  });

  // Fetch available users
  const { data: availableUsers = [] } = useQuery({
    queryKey: ['available-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'user');

      if (error) throw error;
      return data;
    }
  });

  // Add new bank mutation
  const addBankMutation = useMutation({
    mutationFn: async (name: string) => {
      const { data, error } = await supabase
        .from('banks')
        .insert([{ name }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] });
      toast({
        title: "Bank added successfully",
        description: `${newBankName} has been added to the system.`,
      });
      setNewBankName("");
    },
    onError: (error) => {
      toast({
        title: "Error adding bank",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Add user to bank mutation
  const addUserToBankMutation = useMutation({
    mutationFn: async ({ bankId, userId }: { bankId: string; userId: string }) => {
      const { error } = await supabase
        .from('bank_assignments')
        .insert([{ bank_id: bankId, user_id: userId }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] });
      toast({
        title: "User added to bank",
        description: "The user has been successfully assigned to the bank.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error adding user to bank",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Remove user from bank mutation
  const removeUserFromBankMutation = useMutation({
    mutationFn: async ({ bankId, userId }: { bankId: string; userId: string }) => {
      const { error } = await supabase
        .from('bank_assignments')
        .delete()
        .match({ bank_id: bankId, user_id: userId });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] });
      toast({
        title: "User removed",
        description: "User has been removed from the bank.",
      });
    }
  });

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('banks-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'banks'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['banks'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const handleAddBank = () => {
    if (newBankName.trim()) {
      addBankMutation.mutate(newBankName);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-lg">Loading banks...</div>
        </div>
      </AdminLayout>
    );
  }

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
            <Button 
              onClick={handleAddBank}
              disabled={addBankMutation.isPending}
            >
              {addBankMutation.isPending ? "Adding..." : "Add Bank"}
            </Button>
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
                            <Select 
                              onValueChange={(value) => {
                                addUserToBankMutation.mutate({ 
                                  bankId: bank.id, 
                                  userId: value 
                                });
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select user to add" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableUsers.map((user) => (
                                  <SelectItem key={user.id} value={user.id}>
                                    {user.full_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Current Users</Label>
                            <div className="mt-2 space-y-2">
                              {bank.users.map((user) => (
                                <div key={user.id} className="flex items-center justify-between bg-dark-200 p-2 rounded">
                                  <span>{user.full_name}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      removeUserFromBankMutation.mutate({
                                        bankId: bank.id,
                                        userId: user.id
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