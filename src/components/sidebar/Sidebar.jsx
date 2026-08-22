// components/Sidebar/Sidebar.jsx
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSidebar } from "../../hooks/context/SidebarContext";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarGroup } from "./SidebarGroup";

export const Sidebar = ({ LogoIn = false, sections = [], children }) => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();

  const isVisible = isExpanded || isHovered || isMobileOpen;

  const isActivePath = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    sections.forEach((section, gIdx) => {
      section.items.forEach((item, iIdx) => {
        if (item.subItems?.some((sub) => isActivePath(sub.path))) {
          setOpenSubmenu({ groupIndex: gIdx, itemIndex: iIdx });
        }
      });
    });
  }, [location, isActivePath, sections]);

  const handleToggleSubmenu = (groupIndex, itemIndex) => {
    setOpenSubmenu((prev) => {
      if (
        prev &&
        prev.groupIndex === groupIndex &&
        prev.itemIndex === itemIndex
      ) {
        return null;
      }
      return { groupIndex, itemIndex };
    });
  };
  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 rtl:left-0 ltr:right-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 rtl:border-r ltr:border-l border-gray-200 
        ${isVisible ? "w-72.5" : "w-22.5"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-2.5 mb-3 flex justify-between items-center border-b ${!isVisible && "mt-10"}`}
      >
        {LogoIn && <SidebarLogo isVisible={isVisible} />}
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {sections.map((section, idx) => (
              <SidebarGroup
                key={section.title || idx}
                title={section.title}
                items={section.items}
                groupIndex={idx}
                openSubmenu={openSubmenu}
                onToggleSubmenu={handleToggleSubmenu}
                isVisible={isVisible}
                isActivePath={isActivePath}
              />
            ))}
          </div>
        </nav>
        {children}
      </div>
    </aside>
  );
};
