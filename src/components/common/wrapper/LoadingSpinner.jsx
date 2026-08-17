import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SpinnerPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <FontAwesomeIcon icon={faSpinner} spinPulse size="2xl" style={{color: "rgb(50, 118, 97)",}} />
    </div>
  );
};
