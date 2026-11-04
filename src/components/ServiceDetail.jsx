
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { services, getService } from "./ServicesData";
import "./ServiceDetail.css";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  useEffect(() => {
    const elements = document.querySelectorAll(".sd-reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("sd-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sd-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [slug]);

  if (!service) {
    return (
      <main className="sd-not-found">
        <span>404 / SERVICE NOT FOUND</span>
        <h1>This service doesn't exist.</h1>
        <Link to="/">Back to Home</Link>
      </main>
    );
  }

  const relatedServices = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  return (
    <main className="service-detail-page">
      {/* HERO */}
      <section className="sd-hero">
        <img
          className="sd-hero-image"
          src={service.image}
          alt={service.title}
        />
        <div className="sd-hero-overlay" />

        <div className="sd-hero-content">
          <div className="sd-breadcrumb">
            <Link to="/">HOME</Link>
            <span>/</span>
            <span>SERVICES</span>
          </div>

          <span className="sd-eyebrow">
            KINETIX FITNESS CLUB / OUR SERVICES
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
        </div>

        <div className="sd-hero-bottom">
          <span>TRAIN SMARTER. GET STRONGER.</span>
          <span>01 — 06</span>
        </div>
        <span className="sd-hero-side-text">KINETIX / FITNESS CLUB</span>
      </section>

      {/* INTRO */}
      <section className="sd-intro sd-section">
        <div className="sd-intro-number sd-reveal">01</div>

        <div className="sd-intro-content sd-reveal">
          <span className="sd-eyebrow">BUILT AROUND YOUR GOALS</span>
          <h2>{service.heading}</h2>
          <p>{service.description}</p>
        </div>

        <div className="sd-intro-mark">K</div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="sd-offer-section sd-section" id="what-we-offer">
        <div className="sd-section-heading sd-reveal">
          <div>
            <span className="sd-eyebrow">02 / THE EXPERIENCE</span>
            <h2>
              WHAT WE <span>OFFER.</span>
            </h2>
          </div>
          <p>
            Everything you need to make every session count.
          </p>
        </div>

        <div className="sd-offer-layout">
          <div className="sd-offer-visual sd-reveal">
            <img src={service.image} alt={`${service.title} at Kinetix`} />
            <div className="sd-image-shade" />
            <div className="sd-image-caption">
              <span>THE KINETIX EXPERIENCE</span>
              <strong>{service.title}</strong>
            </div>
            <div className="sd-image-corner">K.</div>
          </div>

          <div className="sd-offer-list">
            {service.features?.map((feature, index) => (
              <article
                className="sd-offer-card sd-reveal"
                key={`${feature.title}-${index}`}
                style={{ "--sd-delay": `${index * 0.1}s` }}
              >
                <span className="sd-offer-index">
                  {String(index + 1).padStart(2, "0")}
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

      {/* BENEFITS */}
      {service.benefits?.length > 0 && (
        <section className="sd-benefits-section">
          <div className="sd-benefits-inner sd-section">
            <div className="sd-benefits-heading sd-reveal">
              <span className="sd-eyebrow">03 / WHY IT MATTERS</span>
              <h2>
                MORE THAN
                <br />
                <span>JUST A WORKOUT.</span>
              </h2>
              <p>
                A better experience. A stronger routine. Progress that matters.
              </p>
            </div>

            <div className="sd-benefits-list">
              {service.benefits.map((benefit, index) => (
                <div
                  className="sd-benefit-item sd-reveal"
                  key={`${benefit}-${index}`}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{benefit}</h3>
                  
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      {service.steps?.length > 0 && (
        <section className="sd-process-section sd-section">
          <div className="sd-section-heading sd-reveal">
            <div>
              <span className="sd-eyebrow">04 / YOUR NEXT MOVE</span>
              <h2>
                HOW IT <span>WORKS.</span>
              </h2>
            </div>
            <p>A simple approach to getting started.</p>
          </div>

          <div className="sd-process-grid">
            {service.steps.map((step, index) => (
              <article className="sd-process-card sd-reveal" key={index}>
                <span className="sd-process-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="sd-process-line" />
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="sd-cta-section">
        <div className="sd-cta-watermark">K</div>
        <div className="sd-cta-content sd-reveal">
          <span className="sd-eyebrow">READY TO LEVEL UP?</span>
          <h2>
            YOUR NEXT
            <br />
            <span>MOVE STARTS HERE.</span>
          </h2>
          <p>Take the first step. We'll help you make it count.</p>
          <Link to="/contact" className="sd-primary-btn">
            START YOUR JOURNEY <span>↗</span>
          </Link>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="sd-related-section sd-section">
        <div className="sd-section-heading sd-reveal">
          <div>
            <span className="sd-eyebrow">05 / KEEP EXPLORING</span>
            <h2>
              MORE TO <span>DISCOVER.</span>
            </h2>
          </div>
          <Link to="/" className="sd-text-link">
            BACK TO HOME ↗
          </Link>
        </div>

        <div className="sd-related-grid">
          {relatedServices.map((item, index) => (
            <Link
              to={`/services/${item.slug}`}
              className="sd-related-card sd-reveal"
              key={item.slug}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="sd-related-overlay" />
              <span className="sd-related-number">
                0{index + 1} / SERVICE
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
