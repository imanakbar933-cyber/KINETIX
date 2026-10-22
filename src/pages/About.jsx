
import AboutHero from "../components/AboutHero";
import InfoCard from "../components/InfoCards";
import OurStory from "../components/OurStory";
import Trainers from "../components/Trainers";

// Your About Components
import Exercises from "../components/Exercises";
import Features from "../components/Features";
import AboutFAQ from "../components/AbouFAQ";
// import ClientStories from "../components/Clientstories";

function About() {
  return (
    <>
      {/* Iman's Existing About Components */}
      <AboutHero />
      <OurStory />
      <InfoCard />
      <Trainers />

      {/* Your About Components */}
      <Exercises />
      <Features />
      <AboutFAQ />
      {/* <ClientStories /> */}
    </>
  );
}

export default About;
