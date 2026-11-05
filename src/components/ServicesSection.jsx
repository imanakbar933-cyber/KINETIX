
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { services } from "./ServicesData";
import "./ServicesSection.css";

function ServicesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("show");
          observer.unobserve(section);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="services-section"
      id="services"
      ref={sectionRef}
    >
      <div className="services-heading">
        <span className="services-eyebrow">
          KINETIX FITNESS CLUB
        </span>

        <h2>
          SERVICES WE <span>OFFER</span>
        </h2>

        <p>
          Professional services designed to make your fitness
          journey easier and more effective.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <Link
            to={`/services/${service.slug}`}
            className="service-card"
            key={service.slug}
            style={{ "--delay": `${index * 0.12}s` }}
          >
            <div className="service-image">
              <img
                src={service.image}
                alt={service.title}
              />
            </div>

            <div className="service-content">
              <h3>{service.title}</h3>

              <p>{service.shortDescription}</p>

              <span className="service-arrow">
                EXPLORE SERVICE →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
