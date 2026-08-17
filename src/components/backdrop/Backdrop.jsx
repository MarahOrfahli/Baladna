import { useSidebar } from "../../hooks/context/SidebarContext";


const Backdrop = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  // Don't render if mobile sidebar is not open
  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
      onClick={toggleMobileSidebar}
      aria-hidden="true"
    />
  );
};

export default Backdrop;