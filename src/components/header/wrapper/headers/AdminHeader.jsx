import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useSidebar } from "../../../../hooks/context/SidebarContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationDropdown from "../NotificationDropdown";
import UserDropdown from "../UserDropdown";
import {
  faBars,
  faTimes,
  faEllipsisH,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { Logo, ToggleBtn } from "../../../common";
import { Button } from "../../../ui";
import { Form, Input } from "../../../form";
import AppHeader from "../Header";

export const AdminHeader = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const inputRef = useRef(null);

  // Handle sidebar toggle based on screen width
  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  // Toggle application menu (mobile)
  const toggleApplicationMenu = () => {
    setApplicationMenuOpen((prev) => !prev);
  };

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AppHeader isAdmin>
      {/* Top row: toggle, logo, mobile menu button */}
      <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
        {/* Sidebar toggle button */}
        <Button
          fn={handleToggle}
          elementIcon={
            <FontAwesomeIcon
              icon={isMobileOpen ? faTimes : faBars}
              className="w-5 h-5"
            />
          }
          className={`items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border`}
        />

        {/* Logo (visible on mobile) */}
        <Link to="/" className="lg:hidden">
          <Logo />
        </Link>

        {/* Application menu toggle (mobile) */}
        <Button
          fn={toggleApplicationMenu}
          elementIcon={
            <FontAwesomeIcon icon={faEllipsisH} className="w-5 h-5" />
          }
          className={`flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden`}
        />

        {/* Search bar (desktop) */}
        <div className="hidden lg:block">
          <Form>
            <div className="relative">
              <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-gray-500 dark:text-gray-400 w-4 h-4"
                />
              </span>
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search or type command..."
                className={`dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-107.5`}
              />
            </div>
          </Form>
        </div>
      </div>

      {/* Right side: theme toggle, notifications, user dropdown */}
      <div
        className={`${
          isApplicationMenuOpen ? "flex" : "hidden"
        } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
      >
        <div className="flex items-center gap-2 2xsm:gap-3">
          <ToggleBtn isTheme />
          <NotificationDropdown />
        </div>
        <UserDropdown />
      </div>
    </AppHeader>
  );
};
