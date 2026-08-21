import { Link } from "react-router";
import { SidebarBadge } from "./SidebarBadge";

export const SidebarSubMenuItem = ({ subItem, isActive }) => {
  return (
    <li>
      <Link
        to={subItem.path}
        className={`menu-dropdown-item ${
          isActive
            ? "menu-dropdown-item-active"
            : "menu-dropdown-item-inactive"
        }`}
      >
        {subItem.name}
        <SidebarBadge
          isNew={subItem.new}
          isPro={subItem.pro}
          isActive={isActive}
        />
      </Link>
    </li>
  );
};