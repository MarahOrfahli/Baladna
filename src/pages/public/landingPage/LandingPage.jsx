import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import AppHeader from "../../../components/header/Header";
import Nav from "../../../components/header/Navbar/Navbar";
import Logo from "../../../components/ui/Logo";
import Hero from "./Hero/HeroSection";
import Button from "../../../components/ui/Button";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import Statics from "./Static/StaticsSection";
import { HowItWorks } from "./HowWork/HowWorkSection";
import DiscoverReports from "./discoverReport/DiscoverReports";
import CommunityDiscussions from "./community/Community";
import FAQ from "./faq/FAQ";
import Footer from "../../../components/footer/Footer";
import ToggleBtn from "../../../components/common/ToggleBtn";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tabletMenuOpen, setTabletMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero_section");
  const { t } = useTranslation();

  const sectionRefs = useRef({});
  const navigate = useNavigate();

  // const reportsData = [
  //   {
  //     id: 1,
  //     lat: 33.5138,
  //     lng: 36.2765,
  //     type: 'lighting',   // إنارة
  //     title: 'عمود إنارة مكسور',
  //     description: 'العمود رقم 5 في شارع الثورة',
  //     status: 'new',      // اختياري
  //   },
  //   {
  //     id: 2,
  //     lat: 33.5200,
  //     lng: 36.2900,
  //     type: 'waste',      // مخلفات
  //     title: 'تراكم نفايات',
  //     description: 'بجانب مدرسة اليرموك',
  //     status: 'processing',
  //   },
  //   {
  //     id: 3,
  //     lat: 33.5050,
  //     lng: 36.2700,
  //     type: 'water',      // مياه صحية
  //     title: 'تسرب مياه',
  //     description: 'شارع بغداد',
  //   },
  // ];

  // تعريف الأنواع (يمكنك تخصيص الألوان والأيقونات)
  const reportTypes = {
    lighting: { color: "#fbbf24", icon: "💡" },
    waste: { color: "#6b7280", icon: "🗑️" },
    water: { color: "#3b82f6", icon: "💧" },
    roads: { color: "#f97316", icon: "🛣️" },
    default: { color: "#9ca3af", icon: "📍" }
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);

    const targetElement = sectionRefs.current[sectionId];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const Links = [
    {
      id: "hero_section",
      className: "landing-page-links-active",
      name: t("landing_page.header_nav.main")
    },
    {
      id: "how_work_section",
      className: "landing-page-links-active",
      name: t("landing_page.header_nav.how_work")
    },
    {
      id: "communities_section",
      className: "landing-page-links-active",
      name: t("landing_page.header_nav.communities")
    },
    {
      id: "reports_section",
      className: "landing-page-links-active",
      name: t("landing_page.header_nav.reports")
    },
    {
      id: "faq_section",
      className: "landing-page-links-active",
      name: t("landing_page.header_nav.faq")
    }
  ];
  return (
    <>
      <AppHeader>
        <div
          className={`dark:bg-basic-green-gray/90 p-2 rounded-sm dark:shadow-sm dark:shadow-gray-400`}
        >
          <Logo />
        </div>
        <Nav
          links={Links}
          activeSection={activeSection}
          handleNavClick={handleNavClick}
        />
        <div>
          <div className="hidden [@media(min-width:1176px)]:flex items-center gap-3">
            <Button
              fn={() => {
                navigate("./login");
              }}
              content={t("landing_page.header_btns.login")}
              className={`w-full hover:bg-slate-100 text-slate-700 dark:bg-basic-green-gray px-5 py-2.5 rounded-4xl font-bold`}
            />
            <Button
              content={t("landing_page.header_btns.report")}
              className={`w-full bg-basic-green dark:bg-emerald-700 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-4xl font-bold text-sm shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] flex items-center gap-2 active:scale-95`}
            />
            <ToggleBtn isLang />
            <ToggleBtn isTheme />
          </div>
          <div className="hidden md:flex [@media(min-width:1176px)]:hidden items-center">
            <Button
              fn={() => setTabletMenuOpen(!tabletMenuOpen)}
              elementIcon={<FontAwesomeIcon icon={faChevronDown} />}
              className={`relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white`}
            />
          </div>

          <div className="md:hidden flex items-center">
            <Button
              fn={() => setMobileMenuOpen(!mobileMenuOpen)}
              elementIcon={
                mobileMenuOpen ? (
                  <FontAwesomeIcon icon={faXmark} />
                ) : (
                  <FontAwesomeIcon icon={faBars} />
                )
              }
              className={`text-slate-700 hover:text-slate-900 p-2 bg-slate-100 rounded-xl`}
            />
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="w-full md:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 absolute top-[4.3rem] left-0 shadow-2xl">
            <a
              href="#explore"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 font-bold text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              استكشاف البلاغات
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 font-bold text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              كيف تعمل المنصة
            </a>
            <a
              href="#community"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 font-bold text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              مجتمع بلدنا
            </a>
            <a
              href="#gov-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 font-bold text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              بوابة المسؤولين
            </a>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                // onClick={() => { onOpenReportModal(); setMobileMenuOpen(false); }}
                className="w-full bg-sky-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                قدم بلاغاً جديداً
              </button>
            </div>
          </div>
        )}

        {tabletMenuOpen && (
          <div className="hidden md:inline-flex [@media(min-width:1176px)]:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 absolute top-17 lg:top-19 ltr:right-0 rtl:left-0 shadow-2xl">
            test
          </div>
        )}
      </AppHeader>
      <Hero
        handleNavClick={handleNavClick}
        ref={(element) => {
          if (element) {
            sectionRefs.current[Links[0].id] = element;
          }
        }}
      />
      <Statics />
      <HowItWorks
        ref={(element) => {
          if (element) {
            sectionRefs.current[Links[1].id] = element;
          }
        }}
      />

      <CommunityDiscussions
        ref={(element) => {
          if (element) {
            sectionRefs.current[Links[2].id] = element;
          }
        }}
      />

      <DiscoverReports
        reportTypes={reportTypes}
        onReportClick={(report) => console.log("تم النقر على بلاغ:", report)}
        fetchParams={{ status: "active" }}
        ref={(element) => {
          if (element) {
            sectionRefs.current[Links[3].id] = element;
          }
        }}
      />

      <FAQ
        ref={(element) => {
          if (element) {
            sectionRefs.current[Links[4].id] = element;
          }
        }}
      />
      <Footer />
    </>
  );
};

export default LandingPage;
