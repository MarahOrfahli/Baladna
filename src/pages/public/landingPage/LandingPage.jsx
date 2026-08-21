import Hero from "./Hero/HeroSection";
import { useOutletContext } from "react-router";
import Statics from "./Static/StaticsSection";
import { HowItWorks } from "./HowWork/HowWorkSection";
import DiscoverReports from "./discoverReport/DiscoverReports";
import CommunityDiscussions from "./community/Community";
import FAQ from "./faq/FAQ";

const LandingPage = () => {
  const { sectionsLinks, handleNavClick, setRefLink } = useOutletContext();

  return (
    <>
      <Hero
        handleNavClick={handleNavClick}
        ref={(element) => {
          setRefLink(element, sectionsLinks[0].id);
        }}
      />

      <Statics />

      <HowItWorks
        ref={(element) => {
          setRefLink(element, sectionsLinks[1].id);
        }}
      />

      <CommunityDiscussions
        ref={(element) => {
          setRefLink(element, sectionsLinks[2].id);
        }}
      />

      <DiscoverReports
        fetchParams={{ status: "active" }}
        ref={(element) => {
          setRefLink(element, sectionsLinks[3].id);
        }}
      />

      <FAQ
        ref={(element) => {
          setRefLink(element, sectionsLinks[4].id);
        }}
      />
    </>
  );
};

export default LandingPage;
