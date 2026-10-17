
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { services } from './servicesData';

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
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="services section"
      id="services"
      ref={sectionRef}
    >

      <div className="services-watermark" aria-hidden="true">
        <span>OUR SERVICES</span>
      </div>
      <div className="section-heading services-heading">
        <p className="eyebrow">WHAT WE PROVIDE</p>
        <h2>SERVICES WE OFFER</h2>
        <p>
          Everything you need to train better, recover well
          and reach your fitness goals.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <Link
            to={`/services/${service.slug}`}
            className="service-card-link"
            key={service.slug}
            aria-label={`View ${service.title} details`}
            style={{ '--delay': `${index * 0.12}s` }}
          >
            <article className="service-card">
              <div className="service-image">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                />
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
    </section>
  );
}

export default ServicesSection;
