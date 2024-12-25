import { Card } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "deposit",
    amount: 500.00,
    description: "Salary deposit",
    date: "2024-02-20",
  },
  {
    id: 2,
    type: "withdrawal",
    amount: 50.00,
    description: "ATM withdrawal",
    date: "2024-02-19",
  },
  {
    id: 3,
    type: "deposit",
    amount: 200.00,
    description: "Refund",
    date: "2024-02-18",
  },
];

export const TransactionsList = () => {
  return (
    <div className="space-y-4 fade-in">
      <h2 className="text-2xl font-semibold">Recent Transactions</h2>
      <Card className="divide-y">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                transaction.type === "deposit" 
                  ? "bg-green-100 text-green-600" 
                  : "bg-red-100 text-red-600"
              }`}>
                {transaction.type === "deposit" ? (
                  <ArrowDownRight className="h-4 w-4" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
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
      </Card>
    </div>
  );
};