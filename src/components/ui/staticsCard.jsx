const StaticCard = () => {
  return (
    <div className="status-card relative overflow-hidden text-[#9b9595] p-6 text-center rounded-[1.3rem] shadow-[0.1px_1px_2px_1px_#9b9595] h-50">
      <div className="stat-number mb-4 text-2xl">
        <span>+</span> 1.2 M
      </div>
      <div className="stat-label">
        <span className="lang-en">
          <i className="fa-solid fa-cloud-arrow-down"></i> Downloaded
        </span>
      </div>
    </div>
  );
};

export default StaticCard;
