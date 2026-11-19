import { useEffect, useRef } from "react";
import "./Facilities.css";

function Facilities() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("in-view");
        } else {
          section.classList.remove("in-view"); // Har baar animate hone ke liye
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  
const facilities = [
  {
    title: "Strength Training Zone",
    description:
      "Train with dumbbells, barbells, weight plates, benches, and strength machines for muscle building and overall strength development.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Cardio Training Area",
    description:
      "Improve stamina and cardiovascular fitness with dedicated cardio equipment and workout routines suited to different fitness levels.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Modern Gym Equipment",
    description:
      "Use a range of training equipment for upper-body, lower-body, and full-body workouts, with options for beginners and experienced members.",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Functional Training Zone",
    description:
      "Work on balance, coordination, mobility, and everyday strength through functional exercises and guided training sessions.",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Personal Training",
    description:
      "Get individual attention from fitness trainers who can guide your exercise technique, workout routine, and progress according to your goals.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Comfortable Training Hours",
    description:
      "Plan your gym visits around your daily routine with convenient training hours and a focused workout environment.",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Post-Workout Nutrition",
    description:
      "Explore suitable post-workout refreshments and nutrition options to complement your training and recovery routine.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=85",
  },
];


  return (
    <section className="facilities-wrapper" id="facilities" ref={sectionRef}>
      <div className="facilities-container">
        
        {/* HEADER */}
        <div className="facilities-header">
          {/* <p className="facilities-eyebrow">KINETIX FITNESS CLUB</p> */}
          <h2 className="facilities-title">OUR FACILITIES</h2>
          <p className="facilities-subtitle">
         From strength and cardio training to personal guidance and recovery,
explore the facilities designed to support your fitness journey at KINETIX.
          </p>
        </div>

        {/* SHOWCASE (Hover to expand) */}
        <div className="facilities-showcase">
          {facilities.map((facility, index) => (
            <article
              className="facility-panel"
              key={facility.title}
              style={{ "--delay": `${index * 0.08}s` }}
            >
              {/* Background Image */}
              <div 
                className="facility-image" 
                style={{ backgroundImage: `url("${facility.image}")` }} 
              />
              
              {/* Overlay */}
              <div className="facility-overlay" />

              {/* Outline Vertical Text */}
              <div className="facility-vertical-title">
                <span>{facility.title}</span>
              </div>

              {/* Content on Hover */}
              <div className="facility-content">
                <h3>{facility.title}</h3>
                <p>{facility.description}</p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Facilities;