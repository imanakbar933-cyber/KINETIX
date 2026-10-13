import { useEffect } from "react";
import "./TrainerHero.css";

function TrainerHero({ trainer }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [trainer]);

  if (!trainer) return null;

  return (
    <section className="trainer-hero">
      {/* Background Image */}
      <div className="trainer-hero-bg">
        <img src={trainer.image} alt={trainer.name} />
      </div>

      {/* Dark Overlay */}
      <div className="trainer-hero-overlay"></div>

      {/* Content */}
      <div className="trainer-hero-content">
        <h1 className="trainer-hero-name">{trainer.name}</h1>
        <p className="trainer-hero-breadcrumb">
          HOME <span>/</span> {trainer.name}
        </p>
      </div>
    </section>
  );
}

export default TrainerHero;