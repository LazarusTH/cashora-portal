import AdminLayout from "@/components/layout/AdminLayout";
import { AdminTransactionsList } from "@/components/dashboard/AdminTransactionsList";

const AdminTransactions = () => {
  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Transactions</h1>
        </div>
        <AdminTransactionsList />
      </div>
    </AdminLayout>
  );
};

export default AdminTransactions;