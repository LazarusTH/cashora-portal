import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Users, ArrowUpRight, ArrowDownRight, AlertCircle, Building2 } from "lucide-react";
import { AdminTransactionsList } from "@/components/dashboard/AdminTransactionsList";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const AdminDashboard = () => {
  const transactionData = [
    { name: "Jan", deposits: 4000, withdrawals: 2400 },
    { name: "Feb", deposits: 3000, withdrawals: 1398 },
    { name: "Mar", deposits: 2000, withdrawals: 9800 },
    { name: "Apr", deposits: 2780, withdrawals: 3908 },
    { name: "May", deposits: 1890, withdrawals: 4800 },
    { name: "Jun", deposits: 2390, withdrawals: 3800 },
  ];

  const userGrowthData = [
    { name: "Jan", users: 400 },
    { name: "Feb", users: 600 },
    { name: "Mar", users: 800 },
    { name: "Apr", users: 1200 },
    { name: "May", users: 1600 },
    { name: "Jun", users: 2000 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                <p className="text-2xl font-bold">2,000</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <ArrowDownRight className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Deposits</h3>
                <p className="text-2xl font-bold">$150,000</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-full">
                <ArrowUpRight className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Withdrawals</h3>
                <p className="text-2xl font-bold">$80,000</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Banks</h3>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Transaction Overview</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="deposits" fill="#22c55e" name="Deposits" />
                  <Bar dataKey="withdrawals" fill="#ef4444" name="Withdrawals" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">User Growth</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <AdminTransactionsList />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
