import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface WithdrawalRequest {
  id: number;
  userId: number;
  userName: string;
  amount: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  bankName: string;
  reference?: string;
}

const WithdrawalRequests = () => {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([
    {
      id: 1,
      userId: 1,
      userName: "John Doe",
      amount: "$500",
      status: "pending",
      date: "2024-02-20",
      bankName: "Chase Bank"
    },
    // Add more sample requests
  ]);

  const { toast } = useToast();

  const handleApprove = (requestId: number, reference: string) => {
    setRequests(requests.map(request => {
      if (request.id === requestId) {
        return { ...request, status: 'approved', reference };
      }
      return request;
    }));

    // Here you would typically send an email to the user
    toast({
      title: "Request approved",
      description: "Withdrawal request has been approved and user has been notified.",
    });
  };

  const handleReject = (requestId: number) => {
    setRequests(requests.map(request => {
      if (request.id === requestId) {
        return { ...request, status: 'rejected' };
      }
      return request;
    }));

    toast({
      title: "Request rejected",
      description: "Withdrawal request has been rejected and user has been notified.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Withdrawal Requests</h1>
        </div>

        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.userName}</TableCell>
                  <TableCell>{request.amount}</TableCell>
                  <TableCell>{request.bankName}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>
                    <Badge variant={
                      request.status === "approved" ? "default" :
                      request.status === "rejected" ? "destructive" : "secondary"
                    }>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">Approve</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Approve Withdrawal Request</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Transaction Reference</Label>
                                <Input
                                  placeholder="Enter transaction reference"
                                  onChange={(e) => {
                                    const reference = e.target.value;
                                    if (reference) {
                                      handleApprove(request.id, reference);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleReject(request.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
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

export default WithdrawalRequests;