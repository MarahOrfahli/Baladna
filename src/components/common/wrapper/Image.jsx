export const Image = ({ url , classes, alt }) => {
  return (
    <img
      src={url}
      alt={alt}
      className={`${classes} object-cover`}
    />
  );
};
