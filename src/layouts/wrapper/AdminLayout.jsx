import { useSidebar, SidebarProvider } from "../../hooks/context/SidebarContext";
import { Sidebar } from "../../components/sidebar/Sidebar";
import Backdrop from "../../components/backdrop/Backdrop";
import { AdminHeader } from "../../components/header";
import { Outlet } from "react-router";
import { getSidebarItems } from "../PagesURL";
import { useAuthStore } from "../../features/auth";
const LayoutContent = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const {role} = useAuthStore()
 const Sidebar_Items = getSidebarItems(role);
  return (
    <div className="min-h-screen xl:flex">
      <div >
        <Sidebar LogoIn sections={Sidebar_Items} />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "rtl:lg:ml-72.5 ltr:lg:mr-72.5" : "rtl:lg:ml-22.5 ltr:lg:mr-22.5"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AdminHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 bg-slate-100 dark:bg-slate-950">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
