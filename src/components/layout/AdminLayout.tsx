import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, History, Settings, LogOut, Building2, ArrowDownToLine, ArrowUpFromLine, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel.",
    });
    navigate("/admin/signin");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="hidden md:block">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-mint-600">Cashora Admin</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard" onClick={() => navigate("/admin/dashboard")}>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Users" onClick={() => navigate("/admin/users")}>
                  <Users />
                  <span>Users</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Banks" onClick={() => navigate("/admin/banks")}>
                  <Building2 />
                  <span>Banks</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Withdrawal Requests" onClick={() => navigate("/admin/withdrawal-requests")}>
                  <ArrowUpFromLine />
                  <span>Withdrawal Requests</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Deposit Requests" onClick={() => navigate("/admin/deposit-requests")}>
                  <ArrowDownToLine />
                  <span>Deposit Requests</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Send Requests" onClick={() => navigate("/admin/send-requests")}>
                  <Send />
                  <span>Send Requests</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Transactions" onClick={() => navigate("/admin/transactions")}>
                  <History />
                  <span>Transactions</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings" onClick={() => navigate("/admin/settings")}>
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Logout" onClick={handleLogout}>
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        {/* Mobile Trigger */}
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <SidebarTrigger />
        </div>
        
        <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;