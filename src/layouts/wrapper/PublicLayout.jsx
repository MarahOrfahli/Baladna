import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PublicHeader } from "../../components/header/wrapper/headers/PublicHeader";
import Footer from "../../components/footer/Footer";
import { useState, useRef } from "react";
import { useAuthStore } from "../../features/auth";

const PublicLayout = () => {
  const { t } = useTranslation();
  const sectionRefs = useRef({});
  const [activeSection, setActiveSection] = useState("hero_section");
  const {isAuthenticated} = useAuthStore()
  const sectionsLinks = [
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

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);

    const targetElement = sectionRefs.current[sectionId];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const setRefLink = (element, id)=> {
    if (element) sectionRefs.current[id] = element;
          
  }
  
  return (
    <>
      <PublicHeader
        activeSection={activeSection}
        sectionsLinks={sectionsLinks}
        handleNavClick={handleNavClick}
      />
      <Outlet context={{sectionsLinks, handleNavClick, setRefLink}} />
      { !isAuthenticated && <Footer />}
    </>
  );
};

export default PublicLayout;
