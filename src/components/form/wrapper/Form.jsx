/**
 * Form component that wraps a form element and prevents default submission
 *
 * @param {Object} props
 * @param {function} props.onSubmit - Callback function invoked with the form event after default prevention
 * @param {React.ReactNode} props.children - Form content (inputs, buttons, etc.)
 * @param {string} [props.className] - Additional CSS classes for the form element
 */
export const Form = ({ onSubmit, children, className = "" }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event);
      }}
      className={className}
    >
      {children}
    </form>
  );
};