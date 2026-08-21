// components/Sidebar/SidebarGroup.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { SidebarMenuItem } from "./SidebarMenuItem";

export const SidebarGroup = ({
  title,
  items,
  groupIndex,
  openSubmenu,
  onToggleSubmenu,
  isVisible,
  isActivePath
}) => {
  return (
    <div>
      {title && (
        <h2
          className={`mb-4 text-xs uppercase flex leading-5 text-gray-400 ${
            !isVisible ? "lg:justify-center" : "justify-start"
          }`}
        >
          {isVisible ? title : <FontAwesomeIcon icon={faEllipsisH} className="size-6" />}
        </h2>
      )}
      <ul className="flex flex-col gap-4">
        {items.map((item, itemIndex) => {
          const isOpen =
            openSubmenu?.groupIndex === groupIndex &&
            openSubmenu?.itemIndex === itemIndex;

          return (
            <SidebarMenuItem
              key={item.name}
              item={item}
              isOpen={isOpen}
              onToggle={() => onToggleSubmenu(groupIndex, itemIndex)}
              isVisible={isVisible}
              isActivePath={isActivePath}
            />
          );
        })}
      </ul>
    </div>
  );
};