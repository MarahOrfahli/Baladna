import Hero from "./Hero/HeroSection";
import { useOutletContext } from "react-router";
import Statics from "./Static/StaticsSection";
import { HowItWorks } from "./HowWork/HowWorkSection";
import DiscoverReports from "./discoverReport/DiscoverReports";
import CommunityDiscussions from "./community/Community";
import FAQ from "./faq/FAQ";
import { useAuthStore } from "../../../features/auth";

const LandingPage = () => {
  const { sectionsLinks, handleNavClick, setRefLink } = useOutletContext();
  const { isAuthenticated } = useAuthStore();

  const isHidden = !isAuthenticated;

  return (
    <>
      {isHidden && (
        <Hero
          handleNavClick={handleNavClick}
          ref={(element) => {
            setRefLink(element, sectionsLinks[0].id);
          }}
        />
      )}

      {isHidden && <Statics />}

      {isHidden && (
        <HowItWorks
          ref={(element) => {
            setRefLink(element, sectionsLinks[1].id);
          }}
        />
      )}

      {isHidden && (
        <CommunityDiscussions
          ref={(element) => {
            setRefLink(element, sectionsLinks[2].id);
          }}
        />
      )}

      {isHidden && (
        <DiscoverReports
          fetchParams={{ status: "active" }}
          ref={(element) => {
            setRefLink(element, sectionsLinks[3].id);
          }}
        />
      )}

      {isHidden && (
        <FAQ
          ref={(element) => {
            setRefLink(element, sectionsLinks[4].id);
          }}
        />
      )}
    </>
  );
};

export default LandingPage;
