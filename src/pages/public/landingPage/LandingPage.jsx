import Hero from "./Hero/HeroSection";
import { useOutletContext } from "react-router";
import Statics from "./Static/StaticsSection";
import { HowItWorks } from "./HowWork/HowWorkSection";
import DiscoverReports from "./discoverReport/DiscoverReports";
import CommunityDiscussions from "./community/Community";
import FAQ from "./faq/FAQ";

const LandingPage = () => {
  const { Links, handleNavClick, setRefLink } = useOutletContext();

  return (
    <>
      <Hero
        handleNavClick={handleNavClick}
        ref={(element) => {
          setRefLink(element, Links[0].id);
        }}
      />

      <Statics />

      <HowItWorks
        ref={(element) => {
          setRefLink(element, Links[1].id);
        }}
      />

      <CommunityDiscussions
        ref={(element) => {
          setRefLink(element, Links[2].id);
        }}
      />

      <DiscoverReports
        fetchParams={{ status: "active" }}
        ref={(element) => {
          setRefLink(element, Links[3].id);
        }}
      />

      <FAQ
        ref={(element) => {
          setRefLink(element, Links[4].id);
        }}
      />
    </>
  );
};

export default LandingPage;
