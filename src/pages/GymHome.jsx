import Newsletter from '../components/Newsletter';import Contact from '../components/Contact'
import  Schedule from '../components/Schedule';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import Exercises from '../components/Exercises';
import AboutFAQ from '../components/AbouFAQ';
import ClientStories from '../components/Clientstories';

function Home() {
  return (
    <div style={{ background: '#fefdfd', minHeight: '100vh' }}>
    <Schedule />
     <Contact />
     <FAQ />
      <Newsletter />
     <Exercises/>
     <Features />
     <AboutFAQ />
     <Contact />
     <ClientStories />
    
    
           </div>
           
  );
}

export default Home