import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DepositRequest {
  id: number;
  userId: number;
  userName: string;
  amount: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  receipt: string;
}

const DepositRequests = () => {
  const [requests, setRequests] = useState<DepositRequest[]>([
    {
      id: 1,
      userId: 1,
      userName: "John Doe",
      amount: "$500",
      status: "pending",
      date: "2024-02-20",
      receipt: "receipt.jpg"
    },
  ]);

  const [rejectionReason, setRejectionReason] = useState("");
  const { toast } = useToast();

  const handleApprove = (requestId: number) => {
    setRequests(requests.map(request => {
      if (request.id === requestId) {
        return { ...request, status: 'approved' };
      }
      return request;
    }));

    toast({
      title: "Request approved",
      description: "Deposit request has been approved and user has been notified.",
    });
  };

  const handleReject = (requestId: number) => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
      return;
    }

    setRequests(requests.map(request => {
      if (request.id === requestId) {
        return { ...request, status: 'rejected' };
      }
      return request;
    }));

    toast({
      title: "Request rejected",
      description: "Deposit request has been rejected and user has been notified.",
    });

    setRejectionReason("");
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Deposit Requests</h1>
        </div>

        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApprove(request.id)}
                        >
                          Approve
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="destructive" size="sm">Reject</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reject Deposit Request</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label>Reason for Rejection</Label>
                                <Textarea 
                                  value={rejectionReason}
                                  onChange={(e) => setRejectionReason(e.target.value)}
                                  placeholder="Please provide a reason for rejection"
                                />
                              </div>
                              <Button 
                                variant="destructive"
                                onClick={() => handleReject(request.id)}
                              >
                                Confirm Rejection
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
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

export default DepositRequests;