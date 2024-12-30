import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, History, Settings, LogOut, Building2, ArrowDownToLine, ArrowUpFromLine, Send, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loading } = useAdminAuth();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the admin panel.",
      });
      navigate("/admin/signin");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-300">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-dark-300">
        <Sidebar className="fixed left-0 top-0 z-40 h-screen transition-transform -translate-x-full md:translate-x-0 bg-dark-200 border-r border-dark-100 w-[280px]">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-brand-orange">CASHORA</span>
            </div>
            <div className="mt-6">
              <Input 
                type="search"
                placeholder="Search..."
                className="search-input"
              />
            </div>
          </SidebarHeader>
          <SidebarContent className="flex flex-col justify-between h-[calc(100vh-180px)]">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard" onClick={() => navigate("/admin/dashboard")} className="sidebar-item">
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Banks" onClick={() => navigate("/admin/banks")} className="sidebar-item">
                  <Building2 className="h-5 w-5" />
                  <span>Banks</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Users" onClick={() => navigate("/admin/users")} className="sidebar-item">
                  <Users className="h-5 w-5" />
                  <span>Users</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Deposit Requests" onClick={() => navigate("/admin/deposit-requests")} className="sidebar-item">
                  <ArrowDownToLine className="h-5 w-5" />
                  <span>Deposit Requests</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Send Requests" onClick={() => navigate("/admin/send-requests")} className="sidebar-item">
                  <Send className="h-5 w-5" />
                  <span>Send Requests</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Withdrawal Requests" onClick={() => navigate("/admin/withdrawal-requests")} className="sidebar-item">
                  <ArrowUpFromLine className="h-5 w-5" />
                  <span>Withdrawal Requests</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Transactions" onClick={() => navigate("/admin/transactions")} className="sidebar-item">
                  <History className="h-5 w-5" />
                  <span>Transactions</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Email" onClick={() => navigate("/admin/email")} className="sidebar-item">
                  <Mail className="h-5 w-5" />
                  <span>Email</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <div className="mt-auto px-4 space-y-2">
              <SidebarMenuButton tooltip="Settings" onClick={() => navigate("/admin/settings")} className="sidebar-item w-full">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </SidebarMenuButton>
              <SidebarMenuButton tooltip="Logout" onClick={handleLogout} className="sidebar-item w-full">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </SidebarMenuButton>
            </div>
          </SidebarContent>
        </Sidebar>
        
        {/* Mobile Trigger */}
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <SidebarTrigger className="p-2 bg-dark-200 rounded-lg text-white hover:bg-dark-100" />
        </div>
        
        <main className="flex-1 p-6 md:p-8 md:ml-[280px] w-full">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;