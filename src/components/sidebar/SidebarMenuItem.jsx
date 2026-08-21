// components/Sidebar/SidebarMenuItem.jsx
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { SidebarSubMenuItem } from "./SidebarSubMenuItem";

export const SidebarMenuItem = ({
  item,
  isOpen,
  onToggle,
  isVisible,
  isActivePath
}) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);

  if (!hasSubItems) {
    const active = isActivePath(item.path);
    return (
      <li>
        <Link
          to={item.path}
          className={`menu-item group ${
            active ? "menu-item-active" : "menu-item-inactive"
          }`}
        >
          <span
            className={`menu-item-icon-size ${
              active ? "menu-item-icon-active" : "menu-item-icon-inactive"
            }`}
          >
            {item.icon}
          </span>
          {isVisible && <span className="menu-item-text">{item.name}</span>}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={onToggle}
        className={`menu-item group ${
          isOpen ? "menu-item-active" : "menu-item-inactive"
        } cursor-pointer ${
          !isVisible ? "lg:justify-center" : "lg:justify-start"
        }`}
      >
        <span
          className={`menu-item-icon-size ${
            isOpen ? "menu-item-icon-active" : "menu-item-icon-inactive"
          }`}
        >
          {item.icon}
        </span>
        {isVisible && <span className="menu-item-text">{item.name}</span>}
        {isVisible && (
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`ml-auto w-5 h-5 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-brand-500" : ""
            }`}
          />
        )}
      </button>

      {isVisible && (
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-300"
          style={{ height: `${height}px` }}
        >
          <ul className="mt-2 space-y-1 ml-9">
            {item.subItems.map((subItem) => (
              <SidebarSubMenuItem
                key={subItem.name}
                subItem={subItem}
                isActive={isActivePath(subItem.path)}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};