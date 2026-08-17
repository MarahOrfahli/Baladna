import { useEffect, useRef } from "react";

/**
 * Dropdown component that renders a floating menu when open.
 * Closes automatically when clicking outside.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the dropdown is visible
 * @param {function} props.onClose - Callback to close the dropdown
 * @param {React.ReactNode} props.children - Content to display inside the dropdown
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element|null} The dropdown or null if closed
 */
export const Dropdown = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest?.(".dropdown-toggle")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-40 right-0 mt-2 rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`}
    >
      {children}
    </div>
  );
};