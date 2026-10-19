
import Hero from "../components/Hero";
import Headlines from "../components/Headlines";
import GymShowcase from "../components/GymShowcase";
import About from "../components/About";

import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";
import Schedule from "../components/Schedule";
import Facilities from "../../myWork/src/components/Facilities";
import ServiceDetail from "../../myWork/src/components/ServiceDetail";
function Home() {
  return (
    <>
      {/* Iman's Existing Home Components */}
      <Hero />
      <Headlines />
      
      <GymShowcase />
      <About />
      <Headlines />
      <Facilities />
      <ServiceDetail />

      {/* Your Home Components */}
      <Schedule />
      <Contact />
      <FAQ />
      <Newsletter />
    </>
  );
}

export default Home;