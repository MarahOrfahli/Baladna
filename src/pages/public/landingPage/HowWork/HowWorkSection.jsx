import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
// import Button from "../../../../components/ui/Button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { useLangStore } from "../../../../store/useLangStore";

/* Images */
import problemSite from "../../../../assets/images/problemSite.png";
import toEmployee from "../../../../assets/images/toEmployee.png";
import working from "../../../../assets/images/working.png";
import UpdatesImg from "../../../../assets/images/updates.png";
import StepsCard from "./StepsCards";

export const HowItWorks = forwardRef((props, ref) => {
  const { t } = useTranslation();
  // const { lang } = useLangStore();
  const steps = [
    {
      number: 1,
      title: "landing_page.HowItWorks.steps.step1_title",
      description: "landing_page.HowItWorks.Descriptions.step1_des",
      img: problemSite,
      imgClass: 'sm:w-40 sm:h-50 max-sp:w-35 max-sp:h-45 sp:w-30 sp:h-40'
    },
    {
      number: 2,
      title: "landing_page.HowItWorks.steps.step2_title",
      description: "landing_page.HowItWorks.Descriptions.step2_des",
      img: toEmployee,
      imgClass: 'sm:w-60 sm:h-40 lg:mb-6 max-sp:w-50 max-sp:h-40 max-sp:mb-3 sp:w-25 sp:h-20'
    },
    {
      number: 3,
      title: "landing_page.HowItWorks.steps.step3_title",
      description: "landing_page.HowItWorks.Descriptions.step3_des",
      img: working,
      imgClass: 'md:w-40 md:h-50 sp:w-30 sp:h-40'
    },
    {
      number: 4,
      title: "landing_page.HowItWorks.steps.step4_title",
      description: "landing_page.HowItWorks.Descriptions.step4_des",
      img: UpdatesImg,
      imgClass: 'sm:w-40 sm:h-50 sp:w-35 sp:h-40'
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-white relative dark:bg-gray-400/50">
      <div className="container mx-auto max-sp:px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-emerald-600 font-bold tracking-wider uppercase mb-3">
            {t("landing_page.HowItWorks.section.short_title")}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {t("landing_page.HowItWorks.section.long_title")}
          </h3>
          <p className="text-slate-600 text-lg">
            {t("landing_page.HowItWorks.section.discription")}
          </p>
        </div>
        <div className="grid grid-cols-2 max-sp:grid-cols-1 lg:grid-cols-4 group max-sp:h-300 sp:w-full sp:h-130 sp:gap-2 sm:gap-5 lg:h-65 gap-10 perspective-[1000px]">  
          <div className="hidden lg:block absolute top-30 left-[10%] right-[10%] h-0.5 bg-linear-to-r from-slate-100 via-green-200 to-slate-100 z-0"></div>
          {steps.map((step) => {
            return (
              <StepsCard key={step.number} step={step}/>
            );
          })}
        </div>

        {/* <div className="mt-16 text-center">
          <Button
            elementIcon={
              <FontAwesomeIcon
                icon={lang == "ar" ? faArrowLeft : faArrowRight}
              />
            }
            content={t("landing_page.HowItWorks.login_btn")}
            className="bg-slate-900 hover:bg-green-600 text-white px-8 py-3.5 rounded-full font-bold shadow-lg transition-colors inline-flex items-center gap-2"
          />
        </div> */}
      </div>
    </section>
  );
});
