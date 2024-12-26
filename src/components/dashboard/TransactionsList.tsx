import { Card } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Send } from "lucide-react";

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
    description: "Send to Alice",
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
  return (
    <div className="space-y-4 fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold">Recent Transactions</h2>
        <select className="border rounded-md p-1 w-full sm:w-auto">
          <option value="all">All Transactions</option>
          <option value="deposits">Deposits</option>
          <option value="withdrawals">Withdrawals</option>
          <option value="sends">Sends</option>
        </select>
      </div>
      
      <Card className="divide-y overflow-hidden">
        <div className="max-h-[400px] overflow-y-auto">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === "deposit" 
                    ? "bg-green-100 text-green-600"
                    : transaction.type === "withdrawal"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
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
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <span className={`font-semibold ${
                transaction.type === "deposit" 
                  ? "text-green-600"
                  : "text-red-600"
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