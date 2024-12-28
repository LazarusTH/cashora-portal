import { Card } from "@/components/ui/card";
import { DollarSign, ArrowUpRight, Send } from "lucide-react";

export const AccountOverview = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 fade-in">
      <Card className="p-6 bg-dark-200 border-dark-100 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-blue/10 rounded-full">
            <DollarSign className="h-6 w-6 text-brand-blue" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Total Balance</h3>
            <p className="text-2xl font-bold mt-1 text-white">$10,000.00</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-dark-200 border-dark-100 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-full">
            <ArrowUpRight className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Total Withdrawals</h3>
            <p className="text-2xl font-bold mt-1 text-white">$3,500.00</p>
            <span className="text-sm text-red-500">Last 30 days</span>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-dark-200 border-dark-100 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-blue/10 rounded-full">
            <Send className="h-6 w-6 text-brand-blue" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Total Sent</h3>
            <p className="text-2xl font-bold mt-1 text-white">$2,500.00</p>
            <span className="text-sm text-brand-blue">Last 30 days</span>
          </div>
        </div>
      </Card>
    </div>
  );
};