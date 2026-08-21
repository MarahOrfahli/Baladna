/**
 * @param {Object} props
 * @param {string} [props.type="text"] - Input type (text, number, email, password, date, time, etc.)
 * @param {string} [props.id] - Input id attribute
 * @param {string} [props.name] - Input name attribute
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string|number} [props.value] - Input value
 * @param {function} [props.onChange] - Change event handler
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {string} [props.min] - Minimum value (for number/date)
 * @param {string} [props.max] - Maximum value (for number/date)
 * @param {number} [props.step] - Step increment (for number)
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.success=false] - Success state (green border)
 * @param {boolean} [props.error=false] - Error state (red border)
 * @param {string} [props.hint] - Hint message displayed below input
 */
export const Input = ({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  validation
}) => {
  // Base classes with Tailwind CSS v4 compatible utilities
  let inputClasses =
    "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 " +
    className;

  if (disabled) {
    inputClasses +=
      " text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
  } else if (error) {
    inputClasses +=
      " border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800";
  } else if (success) {
    inputClasses +=
      " border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800";
  } else {
    inputClasses +=
      " bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800";
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
        {...validation}
      />
      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
              ? "text-success-500"
              : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};