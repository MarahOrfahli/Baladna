import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

/**
 * Checkbox component with label and custom styling
 *
 * @param {Object} props
 * @param {string} [props.label] - Optional label text displayed next to the checkbox
 * @param {boolean} props.checked - Whether the checkbox is checked (controlled)
 * @param {string} [props.className=""] - Additional CSS classes for the checkbox input
 * @param {string} [props.id] - HTML id attribute for the input
 * @param {function} props.onChange - Callback function triggered when checkbox toggles, receives checked state
 * @param {boolean} [props.disabled=false] - Disables the checkbox interaction
 */
export const Checkbox = ({
  label,
  checked,
  id,
  onChange,
  className = "",
  disabled = false,
  error = false,  
  validation
}) => {
  return (
    <label
      className={`flex items-center space-x-3 group cursor-pointer ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      }`}
    >
      <div className="relative w-5 h-5">
        <input
          id={id}
          type="checkbox"
          className={`w-5 h-5 appearance-none cursor-pointer ${ error ? 'border-red-500 ':'' } dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-emerald-500 disabled:opacity-60 ${className}`}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          {...validation}
        />
        {checked && (
          <FontAwesomeIcon
            icon={faCheck}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none w-3.5 h-3.5 ${
              disabled ? "text-gray-300" : "text-basic-green"
            }`}
          />
        )}
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {label}
        </span>
      )}
    </label>
  );
};