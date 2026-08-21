import { useSidebar, SidebarProvider } from "../hooks/context/SidebarContext";
import { Sidebar } from "../components/sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Backdrop from "../components/backdrop/Backdrop";
import { AdminHeader } from "../components/header";
import { Outlet } from "react-router";
import {
  faBorderAll,
  faUserCircle,
  faAreaChart,
  // faBuilding,
  faUser,
  faFile,
  faShapes,
  faBuilding
} from "@fortawesome/free-solid-svg-icons";
const LayoutContent = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const sidebarSections = [
    {
      title: "Menu",
      items: [
        {
          icon: <FontAwesomeIcon icon={faUserCircle} className="w-5 h-5" />,
          name: "User Profile",
          path: "/profile"
        },
        {
          icon: <FontAwesomeIcon icon={faBorderAll} className="w-5 h-5" />,
          name: "Dashboard",
          subItems: [{ name: "Statues", path: "/dashboard", pro: false }]
        },
        {
          name: "Users",
          icon: <FontAwesomeIcon icon={faUser} className="w-5 h-5" />,
          subItems: [{ name: "Users", path: "/users", pro: false }]
        },
        {
          name: "Agencies",
          icon: <FontAwesomeIcon icon={faBuilding} className="w-5 h-5" />,
          subItems: [{ name: "Agencies", path: "/agencies", pro: false }]
        },
        {
          name: "Reports",
          icon: <FontAwesomeIcon icon={faFile} className="w-5 h-5" />,
          subItems: [{ name: "Reports", path: "/reports", pro: false }]
        }
      ]
    },
    {
      title: "Others",
      items: [
        {
          name: "Areas",
          icon: <FontAwesomeIcon icon={faAreaChart} className="w-5 h-5" />,
          subItems: [
            { name: "Areas", path: "/areas", pro: false },
            { name: "Area Suggestions", path: "/area-suggestions", pro: false }
          ]
        },
        {
          name: "Categories",
          icon: <FontAwesomeIcon icon={faShapes} className="w-5 h-5" />,
          subItems: [{ name: "Categories", path: "/categories", pro: false }]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen xl:flex">
      <div >
        <Sidebar LogoIn sections={sidebarSections} />
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
