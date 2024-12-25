import DashboardLayout from "@/components/layout/DashboardLayout";
import { AccountOverview } from "@/components/dashboard/AccountOverview";
import { TransactionsList } from "@/components/dashboard/TransactionsList";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, John</h1>
          <p className="text-gray-500">Here's what's happening with your account today.</p>
        </div>
        <AccountOverview />
        <TransactionsList />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;