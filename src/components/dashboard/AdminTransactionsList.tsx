import { Card } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Send, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const transactions = [
  {
    id: 1,
    client: {
      name: "John Carter",
      email: "hello@johncarter.com"
    },
    type: "send",
    recipient: "Alice Smith",
    amount: 1099.24,
    date: "Jan 30, 2024",
    status: "accepted"
  },
  {
    id: 2,
    client: {
      name: "Sophie Moore",
      email: "contact@sophiemoore.com"
    },
    type: "deposit",
    amount: 5870.32,
    date: "Jan 27, 2024",
    status: "rejected"
  },
  {
    id: 3,
    client: {
      name: "Matt Cannon",
      email: "info@mattcannon.com"
    },
    type: "withdrawal",
    amount: 13899.48,
    date: "Jan 24, 2024",
    status: "accepted"
  },
  {
    id: 4,
    client: {
      name: "Graham Hills",
      email: "hi@grahamhills.com"
    },
    type: "send",
    amount: 1569.12,
    date: "Jan 21, 2024",
    status: "pending"
  },
  {
    id: 5,
    client: {
      name: "Sandy Houston",
      email: "contact@sandyhouston.com"
    },
    type: "deposit",
    amount: 899.16,
    date: "Jan 18, 2024",
    status: "accepted"
  },
  {
    id: 6,
    client: {
      name: "Andy Smith",
      email: "hello@andysmith.com"
    },
    type: "withdrawal",
    amount: 2449.64,
    date: "Jan 15, 2024",
    status: "pending"
  }
];

export const AdminTransactionsList = () => {
  return (
    <Card className="bg-dark-200 border-dark-100">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-dark-100 border-dark-100">
              <SelectValue placeholder="Filter transactions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
              <SelectItem value="send">Sends</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <ScrollArea className="h-[400px]">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Date</th>
                <th>Status</th>
                <th>Transaction Type</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <div>
                      <p className="font-medium text-white">{transaction.client.name}</p>
                      <p className="text-gray-400">{transaction.client.email}</p>
                    </div>
                  </td>
                  <td className="text-gray-300">{transaction.date}</td>
                  <td>
                    <span className={`status-badge ${transaction.status}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="text-gray-300">
                    <div className="flex items-center gap-2">
                      {transaction.type === "deposit" && <ArrowDownRight className="h-4 w-4 text-green-400" />}
                      {transaction.type === "withdrawal" && <ArrowUpRight className="h-4 w-4 text-red-400" />}
                      {transaction.type === "send" && <Send className="h-4 w-4 text-blue-400" />}
                      <span>
                        {transaction.type}
                        {transaction.type === "send" && transaction.recipient && (
                          <span className="text-gray-400 ml-1">to {transaction.recipient}</span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="text-white font-medium">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-dark-100 text-gray-300 border-dark-200">
                        <DropdownMenuItem className="hover:bg-dark-200">
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-dark-200 text-red-400">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </div>
    </Card>
  );
};