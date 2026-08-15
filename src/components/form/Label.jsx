/**
 * Label component for form inputs
 * 
 * @param {Object} props
 * @param {string} [props.htmlFor] - ID of the associated input element
 * @param {React.ReactNode} props.children - Label content
 * @param {string} [props.className] - Additional CSS classes
 */
const Label = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 ` + className}
    >
      {children}
    </label>
  );
};

export default Label;