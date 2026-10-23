
import Hero from "../components/Hero";
import Headlines from "../components/Headlines";
import GymShowcase from "../components/GymShowcase";
import About from "../components/About";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";
import Schedule from "../components/Schedule";
import Facilities from "../components/Facilities";
import ServicesSection from "../components/ServicesSection";
import MembershipPlans from "../components/MembershipPlans";
function Home() {
  return (
    <>
      {/* Iman's Existing Home Components */}
      <Hero />
      <Headlines />
      <GymShowcase />
      <About />
      <Headlines />
      {/* Muneeba's Existing Home Components */}
      <Facilities />
      <ServicesSection />
      <MembershipPlans />

      {/* Your Home Components */}
      <Schedule />
      <Contact />
      <FAQ />
      <Newsletter />
    </>
  );
}

export default Home;
