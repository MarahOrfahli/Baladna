// src/components/map/GpsButton.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";

const GpsButton = ({ onLocate, isLocating }) => {
  return (
    <button
      onClick={onLocate}
      disabled={isLocating}
      className={`flex items-center justify-center gap-2 px-5 py-4 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap ${
        isLocating
          ? "bg-gray-400 text-gray-600 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {isLocating ? (
        <>
          <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
          جاري التحديد...
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faLocation} /> موقعي الحالي
        </>
      )}
    </button>
  );
};

export default GpsButton;
