import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { services } from './ServicesData';

function ServicesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('show');
          observer.unobserve(section);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="services section" id="services" ref={sectionRef}>
      <div className="services-watermark" aria-hidden="true">
        <span>OUR SERVICES</span>
      </div>

      <div className="section-heading services-heading">
        <p className="eyebrow">WHAT WE PROVIDE</p>
        <h2>SERVICES WE OFFER</h2>
        <p>
          Professional services designed to make your fitness journey easier
          and more effective.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <article
            className="service-card"
            key={service.slug}
            style={{ '--delay': `${index * 0.12}s` }}
          >
            <div className="service-image">
              <img src={service.image} alt={service.title} loading="lazy" />
            </div>
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              {/* Link instead of <a href="#plans"> */}
              <Link to={`/services/${service.slug}`}>
                Learn More <span>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;