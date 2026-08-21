// components/Sidebar/SidebarBadge.jsx
export const SidebarBadge = ({ isNew, isPro, isActive }) => {
  if (!isNew && !isPro) return null;

  const badgeClass = isActive
    ? "menu-dropdown-badge-active"
    : "menu-dropdown-badge-inactive";

  return (
    <span className="flex items-center gap-1 ml-auto">
      {isNew && <span className={`${badgeClass} menu-dropdown-badge`}>new</span>}
      {isPro && <span className={`${badgeClass} menu-dropdown-badge`}>pro</span>}
    </span>
  );
};