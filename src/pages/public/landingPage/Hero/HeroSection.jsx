import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFileText } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../../components/ui";
import { useTranslation } from "react-i18next";
import ImgCard from "./ImgCard";
import { forwardRef } from "react";

const Hero = forwardRef(({handleNavClick}, ref) => {
  const { t } = useTranslation();
  return (
    <section ref={ref}
      className="relative pt-20 pb-15 lg:pb-18 overflow-hidden bg-linear-to-b dark:bg-basic-green  from-emerald-50/50 via-white to-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 text-center lg:rtl:text-right lg:ltr:text-left space-y-6">
            <div className="inline-flex items-center p-0.5 mb-10 rounded-full bg-emerald-100/80 text-emerald-800 font-bold text-xs sm:text-sm border border-emerald-200/60 animate-border-rotate bg-[conic-gradient(from_var(--border-angle),var(--color-emerald-200),var(--color-basic-green),var(--color-emerald-200))]"> 
              <div className="bg-white rounded-full p-2 m-0 dark:bg-[#a7c1bb]">
                {t("landing_page.hero_section.official_title")}
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
              <span className="bg-linear-to-r from-emerald-600 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                {t("landing_page.hero_section.title")}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
              {t("landing_page.hero_section.description_p1")}
              <br />
              {t("landing_page.hero_section.description_p2")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                content={t("landing_page.header_btns.report")}
                elementIcon={<FontAwesomeIcon icon={faFileText} />}
                className={`w-full sm:w-auto bg-basic-green hover:bg-emerald-700 dark:border-gray-800 dark:bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-base active:translate-y-0`}
              />
              <Button
              fn={()=>{ handleNavClick('reports_section') }}
                content={t("landing_page.hero_section.btn")}
                elementIcon={<FontAwesomeIcon icon={faSearch} />}
                className={`w-full sm:w-auto bg-white hover:bg-slate-50 text-basic-green border border-slate-300 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-base shadow-sm`}
              />
            </div>
          </div>
          <div className="lg:col-span-6 relative hidden lg:inline">
            <ImgCard border_color="white" img="bg-hero-track" animation="animate-page-load" imageCard_style="translate-x-8 -translate-y-4 h-112.5"/>
            <ImgCard border_color="white" img="bg-hero-person" animation="animate-page-load-person" imageCard_style="absolute left-0 bottom-0 opacity-0 h-100 w-2/5" img_style="lg:[background-position-x:-60px] md:[background-position-x:-80px]"/>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
