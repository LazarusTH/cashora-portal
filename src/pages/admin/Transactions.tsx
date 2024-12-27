import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const AdminTransactions = () => {
  const [filter, setFilter] = useState<string>("all");

  const transactions = [
    { id: 1, user: "John Doe", type: "deposit", amount: "$500", date: "2024-02-20", status: "completed" },
    { id: 2, user: "Jane Smith", type: "withdrawal", amount: "$200", date: "2024-02-19", status: "pending" },
    { id: 3, user: "Bob Johnson", type: "transfer", amount: "$300", date: "2024-02-18", status: "completed" },
    { id: 4, user: "Alice Brown", type: "deposit", amount: "$1000", date: "2024-02-17", status: "completed" },
    { id: 5, user: "Charlie Wilson", type: "withdrawal", amount: "$150", date: "2024-02-16", status: "pending" },
    { id: 6, user: "Diana Miller", type: "transfer", amount: "$450", date: "2024-02-15", status: "completed" },
    { id: 7, user: "Edward Davis", type: "deposit", amount: "$750", date: "2024-02-14", status: "pending" },
    { id: 8, user: "Frank White", type: "withdrawal", amount: "$300", date: "2024-02-13", status: "completed" },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === "all") return true;
    return transaction.type === filter;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <div className="w-full sm:w-[200px]">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter transactions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
                <SelectItem value="transfer">Transfers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="overflow-hidden">
          <ScrollArea className="h-[600px] w-full rounded-md">
            <Table>
              <TableHeader className="bg-gray-50 sticky top-0">
                <TableRow>
                  <TableHead className="w-[200px]">User</TableHead>
                  <TableHead className="w-[150px]">Type</TableHead>
                  <TableHead className="w-[150px]">Amount</TableHead>
                  <TableHead className="w-[200px]">Date</TableHead>
                  <TableHead className="w-[150px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{transaction.user}</TableCell>
                    <TableCell>
                      <Badge variant={
                        transaction.type === "deposit" ? "default" :
                        transaction.type === "withdrawal" ? "destructive" : "secondary"
                      } className="capitalize">
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className={
                      transaction.type === "deposit" ? "text-green-600 font-medium" :
                      "text-red-600 font-medium"
                    }>
                      {transaction.type === "deposit" ? "+" : "-"}{transaction.amount}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="capitalize">
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminTransactions;