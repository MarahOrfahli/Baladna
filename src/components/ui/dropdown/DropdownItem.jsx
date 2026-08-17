import { Link } from "react-router";

/**
 * A single item inside a dropdown. Can be rendered as a Link (anchor) or a button.
 *
 * @param {Object} props
 * @param {string} [props.tag="button"] - The HTML tag to use: "a" or "button"
 * @param {string} [props.to] - If tag is "a", the destination path (used with React Router Link)
 * @param {function} [props.onClick] - Additional click handler
 * @param {function} [props.onItemClick] - Callback when item is clicked (usually to close dropdown)
 * @param {string} [props.baseClassName] - Base CSS classes (can be overridden)
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - The content of the item
 * @returns {JSX.Element} The dropdown item
 */
export const DropdownItem = ({
  tag = "button",
  to,
  onClick,
  onItemClick,
  baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  className = "",
  children,
}) => {
  const combinedClasses = `${baseClassName} ${className}`.trim();

  const handleClick = (event) => {
    if (tag === "button") {
      event.preventDefault();
    }
    if (onClick) onClick();
    if (onItemClick) onItemClick();
  };

  if (tag === "a" && to) {
    return (
      <Link to={to} className={combinedClasses} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={combinedClasses}>
      {children}
    </button>
  );
};