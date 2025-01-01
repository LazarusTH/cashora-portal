import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Home, MessageSquare, LogOut, Upload, Download, Send, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // TODO: Implement actual logout logic with Supabase
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/auth/signin");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-dark-300">
        <Sidebar className="fixed left-0 top-0 z-40 h-screen transition-transform -translate-x-full md:translate-x-0 bg-dark-200 border-r border-dark-100 w-[250px]">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-brand-orange">CASHORA</span>
            </div>
            <div className="mt-4">
              <div className="relative">
                <input 
                  type="search"
                  placeholder="Search..."
                  className="search-input"
                />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard" onClick={() => navigate("/dashboard")} className="sidebar-item">
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Profile" onClick={() => navigate("/profile")} className="sidebar-item">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Deposit" onClick={() => navigate("/portal/deposit")} className="sidebar-item">
                  <Upload className="h-5 w-5" />
                  <span>Deposit</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Withdraw" onClick={() => navigate("/portal/withdraw")} className="sidebar-item">
                  <Download className="h-5 w-5" />
                  <span>Withdraw</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Send Money" onClick={() => navigate("/portal/send")} className="sidebar-item">
                  <Send className="h-5 w-5" />
                  <span>Send Money</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Support" onClick={() => navigate("/portal/support")} className="sidebar-item">
                  <MessageSquare className="h-5 w-5" />
                  <span>Support</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <div className="absolute bottom-8 left-0 right-0 px-4">
              <SidebarMenuButton tooltip="Logout" onClick={handleLogout} className="sidebar-item">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </SidebarMenuButton>
            </div>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 md:ml-[250px]">
          <div className="px-4 py-6 md:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;