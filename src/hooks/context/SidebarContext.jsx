/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

// Create context with undefined default value
const SidebarContext = createContext(false);
/**
 * @typedef {Object} SidebarContextType
 * @property {boolean} isExpanded - Whether sidebar is expanded on desktop
 * @property {boolean} isMobileOpen - Whether sidebar is open on mobile
 * @property {boolean} isHovered - Whether sidebar is being hovered (for expand on hover)
 * @property {string|null} activeItem - Currently active navigation item ID
 * @property {string|null} openSubmenu - Currently open submenu item ID
 * @property {Function} toggleSidebar - Toggle desktop sidebar expanded state
 * @property {Function} toggleMobileSidebar - Toggle mobile sidebar open state
 * @property {Function} setIsHovered - Set hover state
 * @property {Function} setActiveItem - Set active navigation item
 * @property {Function} toggleSubmenu - Toggle submenu open/close
 */

/**
 * Custom hook to use sidebar context
 * @throws {Error} If used outside of SidebarProvider
 */


export const SidebarProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Handle window resize to detect mobile viewport
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle desktop sidebar expanded state
  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  // Toggle mobile sidebar open state
  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  // Toggle submenu: close if same item, open if different
  const toggleSubmenu = (item) => {
    setOpenSubmenu((prev) => (prev === item ? null : item));
  };

  const contextValue = {
    // On mobile, sidebar is always collapsed (expanded = false)
    isExpanded: isMobile ? false : isExpanded,
    isMobileOpen,
    isHovered,
    activeItem,
    openSubmenu,
    toggleSidebar,
    toggleMobileSidebar,
    setIsHovered,
    setActiveItem,
    toggleSubmenu,
  };

  return (
    <SidebarContext value={contextValue}>
      {children}
    </SidebarContext>
  );
};


export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};