import { Card } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Send, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { TransactionDetailsDialog } from "@/components/admin/transactions/TransactionDetailsDialog";

const transactions = [
  {
    id: 1,
    client: {
      name: "John Carter",
      email: "hello@johncarter.com"
    },
    type: "send",
    recipient: {
      name: "Alice Smith",
      email: "alice@example.com"
    },
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

const ITEMS_PER_PAGE = 15;

export const AdminTransactionsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredTransactions = transactions.filter(transaction => 
    filter === "all" ? true : transaction.type === filter
  );

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Card className="bg-dark-200 border-dark-100 animate-fade-in">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
            <p className="text-sm text-gray-400">A list of recent transactions</p>
          </div>
          <Select 
            value={filter} 
            onValueChange={setFilter}
          >
            <SelectTrigger className="w-[180px] bg-dark-100 border-dark-100">
              <SelectValue placeholder="Filter transactions" />
            </SelectTrigger>
            <SelectContent className="bg-dark-100 border-dark-200">
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
              <SelectItem value="send">Sends</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <ScrollArea className="h-[600px] -mx-6">
          <div className="px-6">
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
                {paginatedTransactions.map((transaction) => (
                  <tr 
                    key={transaction.id}
                    className="cursor-pointer hover:bg-dark-100 transition-colors"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
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
                            <span className="text-gray-400 ml-1">to {transaction.recipient.name}</span>
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
                          <DropdownMenuItem 
                            className="hover:bg-dark-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTransaction(transaction);
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between mt-4 border-t border-dark-100 pt-4">
          <p className="text-sm text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredTransactions.length)} of {filteredTransactions.length} transactions
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <TransactionDetailsDialog
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </Card>
  );
};