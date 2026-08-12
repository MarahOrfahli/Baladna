/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from "react-i18next";
import StaticCard from "./staticsCard";
import useStatusStore from "../../../../store/publicStore";
import { useEffect } from "react";

const StatusSection = () => {
  const { status, fetchStatus } = useStatusStore();
  const {t} = useTranslation()
  useEffect(() => {
    fetchStatus();
  }, []);
  return (
    <section id="statics_section" className="bg-[#033d34]">
      <div className="relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 max-[320px]:grid-cols-1 lg:grid-cols-4 gap-7 items-center justify-center py-12">
            {status.map((state) => (
              <StaticCard
                key={state.type}
                statusNumber={state.number}
                type={state.type}
                description={t(state.des)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatusSection;
