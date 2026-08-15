const FaqItem = ({ question, answer, isActive, toggle }) => {
  return (
    <div className="border-b border-gray-200 py-4 md:py-5">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        <h3 className="text-base md:text-lg font-bold text-gray-800">
          {question}
        </h3>
        <i
          className={`fas fa-chevron-down text-orange-500 transition-transform duration-200 ${
            isActive ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isActive ? "max-h-40 pt-2.5" : "max-h-0"
        }`}
      >
        <p className="text-sm md:text-base text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

export default FaqItem