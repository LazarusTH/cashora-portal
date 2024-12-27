import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const DepositRequests = () => {
  const { toast } = useToast();
  const requests = [
    { id: 1, user: "John Doe", amount: "$500", date: "2024-02-20", status: "pending" },
    { id: 2, user: "Jane Smith", amount: "$750", date: "2024-02-19", status: "pending" },
  ];

  const handleApprove = (id: number) => {
    toast({
      title: "Request Approved",
      description: "The deposit request has been approved successfully.",
    });
  };

  const handleReject = (id: number) => {
    toast({
      title: "Request Rejected",
      description: "The deposit request has been rejected.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Deposit Requests</h1>

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
                  <TableCell className="font-medium">{request.user}</TableCell>
                  <TableCell>{request.amount}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{request.status}</Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(request.id)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(request.id)}
                    >
                      Reject
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

export default DepositRequests;