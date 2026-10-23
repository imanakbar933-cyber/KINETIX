import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { services } from "./ServicesData";
import "./ServicesSection.css"; // 👈 Iski nayi CSS banayenge

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
    <section className="services-wrapper" id="services" ref={sectionRef}>
      {/* Background Watermark */}
      <div className="services-watermark" aria-hidden="true">
        <span>OUR SERVICES</span>
      </div>

      <div className="services-container">
        {/* Header */}
        <div className="services-header">
          <p className="services-eyebrow">WHAT WE PROVIDE</p>
          <h2 className="services-title">SERVICES WE OFFER</h2>
          <p className="services-subtitle">
            Everything you need to train better, recover well and reach your fitness goals.
          </p>
        </div>

        {/* Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <Link
              to={`/services/${service.slug}`}
              className="service-card-link"
              key={service.slug}
              style={{ '--delay': `${index * 0.15}s` }}
            >
              <article className="service-card">
                <div className="service-image">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>

                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <span className="service-view-link">
                    View Details <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;