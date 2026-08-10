import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage, faBars, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import AppHeader from "../components/header/Header";
import Nav from "../components/header/Navbar/Navbar";
import Logo from "../components/ui/Logo";
import Hero from "../pages/public/landingPage/Hero/HeroSection";
import Button from "../components/ui/Button";
import { useLangStore } from "../store/useLangStore";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Statics from "../pages/public/landingPage/Static/StaticsSection";

const PublicLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [tabletMenuOpen, setTabletMenuOpen ] = useState(false)
  const { toggleLanguage } = useLangStore();
  const { t } = useTranslation();

  const Links = [
    {
      id: 1,
      to: "#hero_section",
      element: <Hero />,
      className: "landing-page-links-active",
      name: t("landing_page.header_nav.main")
    },
    {
      id: 2,
      to: "#hero_section",
      element: <Hero />,
      className: "landing-page-links-active",
      name: t("landing_page.header_nav.how_word")
    },
    {
      id: 2,
      to: "#hero_section",
      element: <Hero />,
      className: "landing-page-links-active",
      name: t("landing_page.header_nav.features")
    },
    {
      id: 2,
      to: "#hero_section",
      element: <Hero />,
      className: "landing-page-links-active",
      name: t("landing_page.header_nav.communities")
    },
    {
      id: 2,
      to: "#hero_section",
      element: <Hero />,
      className: "landing-page-links-active",
      name: t("landing_page.header_nav.faq")
    }
  ];
  return (
    <>
      <AppHeader>
        <Logo />
        <Nav links={Links} />
        <div>
          <div className="hidden [@media(min-width:1176px)]:flex items-center gap-3">
          <Button
            content={t('landing_page.header_btns.login')}
            className={`w-full hover:bg-slate-100 text-slate-700 px-5 py-2.5 rounded-4xl font-bold`}
          />
          <Button
            content={t('landing_page.header_btns.report')}
            className={`w-full bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-4xl font-bold text-sm shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] flex items-center gap-2 active:scale-95`}
          />
          <Button
            fn={toggleLanguage}
            elementIcon={<FontAwesomeIcon icon={faLanguage} />}
            className={`relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white`}
          />
        </div>
        <div className="hidden md:flex [@media(min-width:1176px)]:hidden items-center">
            <Button
            fn={() => setTabletMenuOpen(!tabletMenuOpen)}
            elementIcon={ <FontAwesomeIcon icon={faChevronDown} />}
            className={`relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white`}
            />
          </div>

          <div className="md:hidden flex items-center">
            <Button
            fn={() => setMobileMenuOpen(!mobileMenuOpen)}
            elementIcon={ mobileMenuOpen ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
            className={`text-slate-700 hover:text-slate-900 p-2 bg-slate-100 rounded-xl`}
            />
          </div>
        </div>
        {mobileMenuOpen && (
        <div className="w-full md:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 absolute top-[4.3rem] left-0 shadow-2xl">
          <a href="#explore" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 font-bold text-slate-700 hover:bg-slate-50 rounded-xl">استكشاف البلاغات</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 font-bold text-slate-700 hover:bg-slate-50 rounded-xl">كيف تعمل المنصة</a>
          <a href="#community" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 font-bold text-slate-700 hover:bg-slate-50 rounded-xl">مجتمع بلدنا</a>
          <a href="#gov-section" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 font-bold text-slate-700 hover:bg-slate-50 rounded-xl">بوابة المسؤولين</a>
          
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

      { tabletMenuOpen && (
        <div className="hidden md:inline-flex [@media(min-width:1176px)]:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 absolute top-17 lg:top-19 ltr:right-0 rtl:left-0 shadow-2xl">
          test
        </div>
      )}
      </AppHeader>
      <Hero />
      <Statics/>
    </>
  );
};

export default PublicLayout;
