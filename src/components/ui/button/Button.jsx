export const Button = ({
  fn,
  elementIcon,
  content,
  className,
  style,
  type,
  disabled
}) => {
  return (
    <div className="Btn">
      <button
        disabled={disabled}
        type={type}
        onClick={fn}
        style={style}
        className={`cursor-pointer ` + className}
      >
        {content}
        {elementIcon}
      </button>
    </div>
  );
};
