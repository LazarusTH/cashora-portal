import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Users, ArrowUpRight, ArrowDownRight, Send } from "lucide-react";
import { AdminTransactionsList } from "@/components/dashboard/AdminTransactionsList";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const transactionData = [
    { name: "Jan 1", value: 100 },
    { name: "Jan 8", value: 150 },
    { name: "Jan 15", value: 180 },
    { name: "Jan 24", value: 250 },
    { name: "Jan 31", value: 220 },
    { name: "Feb 1", value: 200 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="stats-card">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-orange-400">
                <ArrowDownRight className="h-5 w-5" />
                <span className="text-sm">Total Deposit</span>
              </div>
              <p className="text-2xl font-bold text-white">$10,000,000</p>
            </div>
          </Card>
          
          <Card className="stats-card">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-blue-400">
                <Users className="h-5 w-5" />
                <span className="text-sm">Total Users</span>
              </div>
              <p className="text-2xl font-bold text-white">230</p>
            </div>
          </Card>
          
          <Card className="stats-card">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-red-400">
                <ArrowUpRight className="h-5 w-5" />
                <span className="text-sm">Total Withdrawals</span>
              </div>
              <p className="text-2xl font-bold text-white">$10,000,000</p>
            </div>
          </Card>
          
          <Card className="stats-card">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-green-400">
                <Send className="h-5 w-5" />
                <span className="text-sm">Total Sendings</span>
              </div>
              <p className="text-2xl font-bold text-white">$10,000,000</p>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="chart-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Banks</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-dark-100 rounded-lg">
                <div>
                  <p className="text-sm text-white">Commercial Bank Of Ethiopia</p>
                  <p className="text-xs text-gray-400">200 Users</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-dark-100 rounded-lg">
                <div>
                  <p className="text-sm text-white">Awash Bank</p>
                  <p className="text-xs text-gray-400">100 Users</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="chart-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Transactions Overview</h3>
                <p className="text-3xl font-bold text-white mt-2">257</p>
              </div>
              <select className="bg-dark-100 text-white text-sm rounded-lg px-3 py-1.5 border border-dark-100">
                <option>Jan 2024</option>
              </select>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={transactionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A303C" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6' }}
                  />
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