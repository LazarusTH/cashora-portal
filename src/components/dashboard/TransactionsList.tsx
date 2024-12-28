import { Card } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Send } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const transactions = [
  {
    id: 1,
    type: "deposit",
    amount: 500.00,
    description: "Deposit",
    date: "2024-02-20",
  },
  {
    id: 2,
    type: "withdrawal",
    amount: 50.00,
    description: "Withdrawal",
    date: "2024-02-19",
  },
  {
    id: 3,
    type: "send",
    amount: 200.00,
    description: "Send to Alice Smith",
    recipient: "Alice Smith",
    date: "2024-02-18",
  },
  {
    id: 4,
    type: "deposit",
    amount: 1000.00,
    description: "Deposit",
    date: "2024-02-17",
  },
  {
    id: 5,
    type: "withdrawal",
    amount: 300.00,
    description: "Withdrawal",
    date: "2024-02-16",
  },
  {
    id: 6,
    type: "send",
    amount: 150.00,
    description: "Send to Bob",
    date: "2024-02-15",
  },
  {
    id: 7,
    type: "deposit",
    amount: 2000.00,
    description: "Deposit",
    date: "2024-02-14",
  },
  {
    id: 8,
    type: "withdrawal",
    amount: 400.00,
    description: "Withdrawal",
    date: "2024-02-13",
  }
];

export const TransactionsList = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const filteredTransactions = transactions.filter(transaction => {
    if (filter === "all") return true;
    return transaction.type === filter;
  });

  return (
    <div className="space-y-4 fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold">Recent Transactions</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
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
      
      <Card className="divide-y divide-dark-200 overflow-hidden bg-dark-200 border-dark-100">
        <div className="max-h-[400px] overflow-y-auto">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 flex items-center justify-between hover:bg-dark-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === "deposit" 
                    ? "bg-green-900/30 text-green-400"
                    : transaction.type === "withdrawal"
                    ? "bg-red-900/30 text-red-400"
                    : "bg-blue-900/30 text-blue-400"
                }`}>
                  {transaction.type === "deposit" ? (
                    <ArrowDownRight className="h-4 w-4" />
                  ) : transaction.type === "withdrawal" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-white">
                    {transaction.type === "send" && transaction.recipient
                      ? `Send to ${transaction.recipient}`
                      : transaction.description}
                  </p>
                  <p className="text-sm text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <span className={`font-semibold ${
                transaction.type === "deposit" 
                  ? "text-green-400"
                  : "text-red-400"
              }`}>
                {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};