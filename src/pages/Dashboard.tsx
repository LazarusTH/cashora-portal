import DashboardLayout from "@/components/layout/DashboardLayout";
import { AccountOverview } from "@/components/dashboard/AccountOverview";
import { TransactionsList } from "@/components/dashboard/TransactionsList";
import { BalanceChart } from "@/components/dashboard/BalanceChart";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John</h1>
          <p className="text-gray-400">Here's what's happening with your account today.</p>
        </div>
        <AccountOverview />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="chart-card">
            <h2 className="text-lg font-semibold text-white mb-4">Balance Overview</h2>
            <BalanceChart />
          </div>
          <div className="chart-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
              <button 
                onClick={() => window.location.href = '/transactions'} 
                className="text-sm text-brand-blue hover:underline"
              >
                View All
              </button>
            </div>
            <TransactionsList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;