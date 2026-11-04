
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { services, getService } from "./ServicesData";
import "./ServiceDetail.css";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  useEffect(() => {
    if (!service) return;

    const elements = document.querySelectorAll(
      ".service-detail-page .sd-motion"
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("sd-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sd-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [slug, service]);

  useEffect(() => {
    if (service) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [slug]);

  if (!service) {
    return (
      <main className="sd-not-found">
        <span>404 / SERVICE NOT FOUND</span>
        <h1>This service doesn't exist.</h1>
        <Link to="/">Back to Home ↗</Link>
      </main>
    );
  }

  const relatedServices = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  return (
    <main className="service-detail-page">

      {/* ==================================
          HERO SECTION
      ================================== */}

      <section className="sd-hero">

        <img
          className="sd-hero-image"
          src={service.image}
          alt={`${service.title} at KINETIX`}
        />

        <div className="sd-hero-overlay" />

        <div className="sd-hero-content">

          <div className="sd-breadcrumb">
            <Link to="/">HOME</Link>
            <span>/</span>
            <Link to="/#services">SERVICES</Link>
            <span>/</span>
            <span>{service.title.toUpperCase()}</span>
          </div>

          <span className="sd-eyebrow">
            KINETIX FITNESS CLUB / {service.category}
          </span>

          <h1>{service.title}</h1>

          <p>{service.shortDescription}</p>

          <div className="sd-hero-actions">

            <a href="#what-we-offer" className="sd-primary-btn">
              EXPLORE SERVICE <span>↘</span>
            </a>

            <Link to="/contact" className="sd-text-link">
              GET IN TOUCH <span>↗</span>
            </Link>

          </div>

          <div className="sd-hero-accent" />

        </div>

        <div className="sd-hero-bottom">
          <span>TRAIN SMARTER. GET STRONGER.</span>
          <span>KINETIX / FITNESS CLUB</span>
        </div>

        <span className="sd-hero-side-text">
          FITNESS REDEFINED
        </span>

      </section>


      {/* ==================================
          INTRODUCTION
      ================================== */}

      <section className="sd-intro sd-section">

        <div className="sd-intro-number sd-motion">
          <span>01</span>
          <small>INTRODUCTION</small>
        </div>

        <div className="sd-intro-content sd-motion">

          <span className="sd-eyebrow">
            {service.category}
          </span>

          <h2>{service.heading}</h2>

          <p>{service.description}</p>

        </div>

        <div className="sd-intro-mark">K</div>

      </section>


      {/* ==================================
          WHAT WE OFFER
      ================================== */}

      <section
        className="sd-offer-section sd-section"
        id="what-we-offer"
      >

        <div className="sd-section-heading sd-motion">

          <div>
            <span className="sd-eyebrow">
              02 / SERVICE EXPERIENCE
            </span>

            <h2>
              {service.offerHeading}
            </h2>
          </div>

          <p>{service.offerDescription}</p>

        </div>


        <div className="sd-offer-layout">

          {/* SERVICE IMAGE */}

          <div className="sd-offer-visual sd-motion">

            <img
              src={service.image}
              alt={`${service.title} service experience`}
              loading="lazy"
            />

            <div className="sd-image-shade" />

            <div className="sd-image-caption">

              <span>{service.offerCaption}</span>

              <strong>{service.title}</strong>

            </div>

            <div className="sd-image-corner">
              K.
            </div>

          </div>


          {/* SERVICE FEATURES */}

          <div className="sd-offer-list">

            {service.features.map((feature, index) => (

              <article
                className="sd-offer-card sd-motion"
                key={feature.title}
                style={{
                  "--sd-delay": `${index * 0.12}s`,
                }}
              >

                <span className="sd-offer-index">
                  0{index + 1}
                </span>

                <div className="sd-offer-copy">

                  <h3>{feature.title}</h3>

                  <p>{feature.text}</p>

                </div>


              </article>

            ))}

          </div>

        </div>

      </section>


      {/* ==================================
          BENEFITS
      ================================== */}

      <section className="sd-benefits-section">

        <div className="sd-benefits-inner sd-section">

          <div className="sd-benefits-heading sd-motion">

            <span className="sd-eyebrow">
              03 / WHY IT MATTERS
            </span>

            <h2>
              {service.benefitsHeading}
            </h2>

            <p>{service.benefitsDescription}</p>

            <div className="sd-benefit-accent" />

          </div>


          <div className="sd-benefits-list">

            {service.benefits.map((benefit, index) => (

              <div
                className="sd-benefit-item sd-motion"
                key={benefit}
                style={{
                  "--sd-delay": `${index * 0.1}s`,
                }}
              >

                <span className="sd-benefit-index">
                  0{index + 1}
                </span>

                <h3>{benefit}</h3>


              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ==================================
          HOW IT WORKS
      ================================== */}

      <section className="sd-process-section sd-section">

        <div className="sd-section-heading sd-motion">

          <div>

            <span className="sd-eyebrow">
              04 / YOUR EXPERIENCE
            </span>

            <h2>
              HOW IT <span>WORKS.</span>
            </h2>

          </div>

          <p>{service.processDescription}</p>

        </div>


        <div className="sd-process-grid">

          {service.steps.map((step, index) => (

            <article
              className="sd-process-card sd-motion"
              key={step.title}
              style={{
                "--sd-delay": `${index * 0.12}s`,
              }}
            >

              <span className="sd-process-number">
                0{index + 1}
              </span>

              <div className="sd-process-line" />

              <h3>{step.title}</h3>

              <p>{step.text}</p>

              <span className="sd-process-watermark">
                0{index + 1}
              </span>

            </article>

          ))}

        </div>

      </section>


      {/* ==================================
          CALL TO ACTION
      ================================== */}

      <section className="sd-cta-section">

        <div className="sd-cta-watermark">
          K
        </div>

        <div className="sd-cta-content sd-motion">

          <span className="sd-eyebrow">
            KINETIX / YOUR FITNESS JOURNEY
          </span>

          <h2>
            {service.ctaHeading}
          </h2>

          <p>{service.ctaDescription}</p>

          <Link to="/contact" className="sd-primary-btn">
            START YOUR JOURNEY <span>↗</span>
          </Link>

        </div>

      </section>


      {/* ==================================
          RELATED SERVICES
      ================================== */}

      <section className="sd-related-section sd-section">

        <div className="sd-section-heading sd-motion">

          <div>

            <span className="sd-eyebrow">
              05 / KEEP EXPLORING
            </span>

            <h2>
              MORE TO <span>DISCOVER.</span>
            </h2>

          </div>

          <Link to="/#services" className="sd-text-link">
            ALL SERVICES ↗
          </Link>

        </div>


        <div className="sd-related-grid">

          {relatedServices.map((item, index) => (

            <Link
              to={`/services/${item.slug}`}
              className="sd-related-card sd-motion"
              key={item.slug}
              style={{
                "--sd-delay": `${index * 0.12}s`,
              }}
            >

              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />

              <div className="sd-related-overlay" />

              <span className="sd-related-number">
                0{index + 1} / EXPLORE
              </span>

              <div className="sd-related-info">

                <h3>{item.title}</h3>

                <span>EXPLORE ↗</span>

              </div>

            </Link>

          ))}

        </div>

      </section>

    </main>
  );
}
