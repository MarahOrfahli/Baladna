const Image = ({ url , classes }) => {
  return (
    <img
      src={url}
    //   alt="Description of the image"
      className={`${classes} object-cover`}
    />
  );
};

export default Image;
