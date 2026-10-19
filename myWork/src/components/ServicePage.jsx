import { useEffect, useRef } from 'react';
import ServicesSection from './ServicesSection';
import './ServicePage.css';

function ServicePage() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  // Hero entrance animation
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hero.classList.add('hero-visible');
          observer.unobserve(hero);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Video parallax
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleScroll = () => {
      const rate = window.scrollY * 0.35;
      video.style.transform = `translateY(${rate}px) scale(1.1)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="services-page">
      {/* ===== HERO (video + PUSH YOUR LIMITS) ===== */}
      <section className="services-hero" ref={heroRef}>
        <div className="hero-video-wrapper">
          <video
            ref={videoRef}
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80"
          >
            <source
              src="https://assets.mixkit.co/videos/52085/52085-720.mp4"
              type="video/mp4"
            />
          </video>
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">WHAT WE OFFER</p>
          <h1 className="hero-title">
            PUSH YOUR <br />
            <span className="hero-accent">LIMITS</span>
          </h1>
          <p className="hero-subtitle">
            Discover the services designed to elevate your fitness journey —
            from expert training to complete recovery.
          </p>
          <div className="hero-actions">
            <a href="#services" className="hero-btn hero-btn-primary">
              Explore Services <span className="btn-arrow">→</span>
            </a>
            <a href="#plans" className="hero-btn hero-btn-ghost">
              View Plans
            </a>
          </div>
        </div>

        <div className="hero-scroll">
          <span className="scroll-line" />
          <span className="scroll-text">SCROLL</span>
        </div>

        <div className="hero-bottom-fade" />
      </section>

      {/* ===== SERVICES SECTION (watermark yahan hai) ===== */}
      <ServicesSection />

      {/* ===== CTA ===== */}
      <section className="services-cta">
        <div className="cta-content">
          <h2>READY TO START?</h2>
          <p>
            Take the first step towards a stronger you. Our team is here to
            guide you every rep of the way.
          </p>
          <a href="#contact" className="hero-btn hero-btn-primary">
            Get In Touch <span className="btn-arrow">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default ServicePage;