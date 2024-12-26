import { Card } from "@/components/ui/card";
import { DollarSign, ArrowUpRight, Send } from "lucide-react";

export const AccountOverview = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 fade-in">
      <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-mint-100 rounded-full">
            <DollarSign className="h-6 w-6 text-mint-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Balance</h3>
            <p className="text-2xl font-bold mt-1">$10,000.00</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-full">
            <ArrowUpRight className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Withdrawals</h3>
            <p className="text-2xl font-bold mt-1">$3,500.00</p>
            <span className="text-sm text-red-600">Last 30 days</span>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Send className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Sent</h3>
            <p className="text-2xl font-bold mt-1">$2,500.00</p>
            <span className="text-sm text-blue-600">Last 30 days</span>
          </div>
        </div>
      </Card>
    </div>
  );
};