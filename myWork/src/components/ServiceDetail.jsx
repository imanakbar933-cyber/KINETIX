import { useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getService, services } from './servicesData';
import './ServiceDetail.css';
import Nutrient from './Nutrient';
import SupplementConsultation from './SupplementConsultation';
import SmoothieBar from './SmoothieBar';
import LockerRooms from './LockerRooms';
import GroupClasses from './GroupClasses';
import PersonalTraining from './PersonalTraining';

// Kis service ke page pe kaun sa apna component dikhana hai (slug -> component)
const EXTRA_SECTIONS = {
  'supplement-consultation': SupplementConsultation,
  'smoothie-bar': SmoothieBar,
  'locker-rooms-and-showers': LockerRooms,
  'nutritional-guidance': Nutrient,
  'group-classes': GroupClasses,
  'personal-training': PersonalTraining,
};

// Title ko words mein todta hai taake har word mask ke andar se upar uthe
function SplitTitle({ text }) {
  return text.split(' ').map((word, i) => (
    <span key={i}>
      <span className="sd-word">
        <span style={{ '--i': i }}>{word}</span>
      </span>{' '}
    </span>
  ));
}

// Professional line icons (emoji ki jagah)
const ICON_PATHS = {
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  shield: <><path d="M12 21s7-3.5 7-9V5.5L12 3 5 5.5V12c0 5.5 7 9 7 9z" /><path d="m9 12 2 2 4-4" /></>,
  leaf: <><path d="M5 19c0-8 5-14 15-14 0 10-5 15-13 15" /><path d="M5 19c2-5 5-8 9-10" /></>,
  bolt: <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7z" />,
  sliders: <><path d="M4 6h8m4 0h4M4 12h2m4 0h10M4 18h10m4 0h2" /><circle cx="14" cy="6" r="2" /><circle cx="8" cy="12" r="2" /><circle cx="16" cy="18" r="2" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  drop: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
  sparkle: <><path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8L11 3z" /><path d="M19 16v4M17 18h4" /></>,
  clipboard: <><rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4h6v3H9z" /><path d="M9 12h6M9 16h4" /></>,
  pin: <><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  chart: <><path d="M4 4v16h16" /><path d="m8 15 3-4 3 2 5-6" /></>,
  pulse: <path d="M3 12h4l2-6 4 12 2-6h6" />,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle cx="17" cy="9" r="2.5" /><path d="M17 14.5a5 5 0 0 1 4.5 5" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor"
         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {ICON_PATHS[name] || ICON_PATHS.bolt}
    </svg>
  );
}

// Mouse ke peeche chalne wali glow (card spotlight)
const spotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);
  const pageRef = useRef(null);

  // Naya page hamesha top se shuru
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Scroll progress bar + hero parallax
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        root.style.setProperty('--progress', max > 0 ? y / max : 0);
        root.style.setProperty('--py', `${Math.min(y, 600) * 0.25}px`);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      cancelAnimationFrame(raf);
    };
  }, [slug]);

  // Scroll reveal
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    root.querySelectorAll('.sd-reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slug]);

  if (!service) return <Navigate to="/services" replace />;

  const index = services.findIndex((s) => s.slug === slug);
  const pad = (n) => String(n).padStart(2, '0');
  const others = services.filter((s) => s.slug !== slug).slice(0, 3);
  const ticker = services.map((s) => s.title);
  const Extra = EXTRA_SECTIONS[slug];

  return (
    <main className="sd" ref={pageRef} key={slug}>
      <div className="sd-progress" />
      {/* <div className="sd-curtain" aria-hidden="true" /> */}

      {/* ---------- HERO ---------- */}
      <header className="sd-hero">
        <div className="sd-hero-media">
          <img src={service.image} alt="" />
        </div>
        <div className="sd-hero-shade" />
        <div className="sd-hero-inner">
          <nav className="sd-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <b>{service.title}</b>
          </nav>
          <p className="sd-badge">
            Service {pad(index + 1)} of {pad(services.length)}
          </p>
          <div className="sd-title">
            <h1 className="sd-zoom">
              <SplitTitle text={service.title} />
            </h1>
            <div className="sd-pulse" aria-hidden="true">
              <i className="sd-pl sd-pl-a" />
              <svg className="sd-pulse-svg" viewBox="0 0 60 36">
                <path pathLength="100" d="M0 18 H14 L20 4 L30 32 L38 8 L44 18 H60" />
              </svg>
              <i className="sd-pl sd-pl-b" />
            </div>
          </div>
          <p className="sd-tagline sd-zoom">{service.tagline}</p>
        </div>
      </header>

      {/* Agar is service ka apna component hai (jaise Nutrient) to sirf wohi dikhao,
          warna normal template (strip, intro, benefits, CTA) */}
      {Extra ? (
        <section className="sd-extra">
          <Extra />
        </section>
      ) : (
        <>
      {/* ---------- MOVING STRIP ---------- */}
      <div className="sd-marquee" aria-hidden="true">
        <div className="sd-marquee-track">
          {[0, 1].map((g) => (
            <div className="sd-marquee-group" key={g}>
              {ticker.map((t) => (
                <span key={t + g}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- INTRO ---------- */}
      <section className="sd-intro">
        <div className="sd-intro-text">
          <h2 className="sd-reveal sd-zoom">{service.tagline}</h2>
          <p className="sd-reveal sd-zoom" style={{ '--d': '.12s' }}>{service.intro}</p>
          <Link className="sd-btn sd-reveal" style={{ '--d': '.24s' }} to="/contact">
            <span>Join us</span>
            <i aria-hidden="true">→</i>
          </Link>
        </div>
        <div className="sd-intro-img sd-reveal">
          <div className="sd-intro-inner">
            <img src={service.image} alt={service.title} />
          </div>
        </div>
      </section>

      {/* ---------- BENEFITS ---------- */}
      <section className="sd-benefits">
        <h2 className="sd-reveal sd-zoom">Why choose {service.title}?</h2>
        <div className="sd-grid">
          {service.benefits.map((b, i) => (
            <article
              className="sd-card sd-reveal"
              key={b.title}
              style={{ '--d': `${i * 0.14}s` }}
              onMouseMove={spotlight}
            >
              <span className="sd-icon" aria-hidden="true"><Icon name={b.icon} /></span>
              <h3 className="sd-zoom">{b.title}</h3>
              <p className="sd-zoom">{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="sd-cta sd-reveal">
        <h2 className="sd-zoom">Ready to try {service.title}?</h2>
        <Link className="sd-btn sd-btn-light" to="/contact">
          <span>Join us today</span>
          <i aria-hidden="true">→</i>
        </Link>
      </section>

        </>
      )}

      {/* ---------- OTHER SERVICES ---------- */}
      <section className="sd-more">
        <h2 className="sd-reveal sd-zoom">Other services</h2>
        <div className="sd-more-grid">
          {others.map((s, i) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="sd-more-card sd-reveal"
              style={{ '--d': `${i * 0.12}s` }}
            >
              <img src={s.image} alt="" loading="lazy" />
              <div>
                <h3>{s.title}</h3>
                <span>View details</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ServiceDetail;