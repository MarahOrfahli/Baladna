import StaticCard from "../../../../components/ui/staticsCard";


const StatusSection = () => {
  return (
    <section id="statics_section" className="bg-[#1a1a2e]">
      <div className="relative">
        {/* قسم الإحصائيات */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 max-[320px]:grid-cols-1 lg:grid-cols-4 gap-7 items-center justify-center py-12">
            <StaticCard/>
            <StaticCard/>
            <StaticCard/>
            <StaticCard/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatusSection;