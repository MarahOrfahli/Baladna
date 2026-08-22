import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFileText } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../components/ui";
import { useTranslation } from "react-i18next";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const StartUp = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  return (
    <section ref={ref}
      className="relative h-80vh pt-20 overflow-hidden bg-linear-to-b dark:bg-basic-green  from-emerald-50/50 via-white to-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-12 text-center space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
              <span className="bg-linear-to-r from-emerald-600 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                {t("landing_page.startup_section.title")}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
              {t("landing_page.startup_section.description_p1")}
              <br />
              {t("landing_page.hero_section.description_p2")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
              fn={()=>{ navigate('/reports') }}
                content={t("landing_page.startup_section.btn_report")}
                elementIcon={<FontAwesomeIcon icon={faFileText} />}
                className={`w-full sm:w-auto bg-basic-green hover:bg-emerald-700 dark:border-gray-800 dark:bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-base active:translate-y-0`}
              />
              <Button
              fn={()=>{ navigate('/communities') }}
                content={t("landing_page.startup_section.btn_community")}
                elementIcon={<FontAwesomeIcon icon={faSearch} />}
                className={`w-full sm:w-auto bg-white hover:bg-slate-50 text-basic-green border border-slate-300 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-base shadow-sm`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default StartUp;
