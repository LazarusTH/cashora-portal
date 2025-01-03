import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Deposit from "./pages/portal/Deposit";
import Withdraw from "./pages/portal/Withdraw";
import Send from "./pages/portal/Send";
import Support from "./pages/portal/Support";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminTransactions from "./pages/admin/Transactions";
import AdminSettings from "./pages/admin/Settings";
import AdminSignIn from "./pages/admin/SignIn";
import AdminBanks from "./pages/admin/Banks";
import WithdrawalRequests from "./pages/admin/WithdrawalRequests";
import DepositRequests from "./pages/admin/DepositRequests";
import SendRequests from "./pages/admin/SendRequests";
import Email from "./pages/admin/Email";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/portal/deposit" element={<Deposit />} />
            <Route path="/portal/withdraw" element={<Withdraw />} />
            <Route path="/portal/send" element={<Send />} />
            <Route path="/portal/support" element={<Support />} />
            {/* Admin Routes */}
            <Route path="/admin/signin" element={<AdminSignIn />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/banks" element={<AdminBanks />} />
            <Route path="/admin/withdrawal-requests" element={<WithdrawalRequests />} />
            <Route path="/admin/deposit-requests" element={<DepositRequests />} />
            <Route path="/admin/send-requests" element={<SendRequests />} />
            <Route path="/admin/transactions" element={<AdminTransactions />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/email" element={<Email />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
