import { EcommerceMetrics } from "../../features/dashboard";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <EcommerceMetrics />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
