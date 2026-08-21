import { useState } from "react"; //  useEffect,
import { Link } from "react-router";
import { useSidebar } from "../../../../hooks/context/SidebarContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationDropdown from "../NotificationDropdown";
import UserDropdown from "../UserDropdown";
import {
  faBars,
  faTimes,
  faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
import { Logo, ToggleBtn } from "../../../common";
import { Button } from "../../../ui";
import AppHeader from "../Header";

export const AdminHeader = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

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

  return (
    <AppHeader isAdmin>
      <div className="w-full flex justify-between items-center lg:py-2 p-3 ">
        <div className="lg:flex gap-4 items-center hidden">
          <UserDropdown />
          <NotificationDropdown />
        </div>
        <div>
          <Button
            fn={toggleApplicationMenu}
            elementIcon={
              <FontAwesomeIcon icon={faEllipsisH} className="w-5 h-5" />
            }
            className={`flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden`}
          />
        </div>
        <Link to="/" className="lg:hidden">
          <Logo />
        </Link>
        <div className="flex gap-4 items-center">
          <div className="lg:flex gap-4 hidden">
            <ToggleBtn isTheme />
            <ToggleBtn isLang />
          </div>
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
        </div>
      </div>

      <div
        className={`${
          isApplicationMenuOpen ? "flex lg:hidden" : "hidden"
        } items-center justify-between w-full gap-4 px-5 py-4 shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
      >
        <div className="flex items-center gap-4 2xsm:gap-3 lg:hidden">
            <UserDropdown />
            <NotificationDropdown />
          </div>
        <div className="flex items-center gap-4 2xsm:gap-3">
          <ToggleBtn isTheme />
          <ToggleBtn isLang />
        </div>
      </div>
    </AppHeader>
  );
};
