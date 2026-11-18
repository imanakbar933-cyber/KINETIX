
import { useEffect } from "react";
import "./TrainerHero.css";

function TrainerHero({ trainer }) {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [trainer]);

  if (!trainer) return null;

  return (
    <section className="trainer-hero">

      {/* Background Image */}
      <div className="trainer-hero-bg">
        <img
          src={trainer.image}
          alt={`${trainer.name} - KINETIX Fitness Trainer`}
        />
      </div>

      {/* Dark Overlay */}
      <div className="trainer-hero-overlay"></div>

      {/* Hero Content */}
      <div className="trainer-hero-content">

        <h1 className="trainer-hero-name">
          {trainer.name}
        </h1>

        <p className="trainer-hero-breadcrumb">
          HOME <span>/</span> TEAM <span>/</span> {trainer.name}
        </p>

      </div>

    </section>
  );
}

export default TrainerHero;
