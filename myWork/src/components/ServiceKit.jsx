import { useEffect, useRef, useState } from "react";
import "./ServiceKit.css";

/* Nutrient.jsx ke hi hooks / Reveal / classes (nt-*), taake sab services ka look ek jaisa rahe */
const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window) || prefersReduced()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function useTween(value, duration = 800) {
  const [v, setV] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    if (prefersReduced()) {
      setV(value);
      from.current = value;
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf;
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const cur = a + (value - a) * (1 - Math.pow(1 - p, 3));
      from.current = cur;
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return Math.round(v);
}

export function Reveal({ children, delay = 0, variant = "up", as: Tag = "div", className = "", ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`nt-reveal nt-${variant} ${inView ? "is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------------- icons ---------------- */
const ICONS = {
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  drop: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle cx="17" cy="9" r="2.5" /><path d="M17 14.5a5 5 0 0 1 4.5 5" /></>,
  sparkle: <><path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8L11 3z" /><path d="M19 16v4M17 18h4" /></>,
};
export function Icon({ name, size = 26 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
         strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

export const Check = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------- building blocks ---------------- */
export function Bar({ label, value, shown, delay = 0 }) {
  const [ref, inView] = useInView(0.5);
  return (
    <div className="nt-food" ref={ref}>
      <div className="nt-food-top">
        <span>{label}</span>
        <b>{shown ?? `${value}%`}</b>
      </div>
      <div className="nt-track">
        <div className="nt-fill" style={{ width: inView ? `${value}%` : "0%", transitionDelay: `${delay}ms` }} />
      </div>
    </div>
  );
}

function StatCard({ value, suffix = "", label, delay }) {
  const [ref, inView] = useInView(0.4);
  const n = useTween(inView ? value : 0, 1600);
  return (
    <Reveal delay={delay}>
      <div className="nt-stat" ref={ref}>
        <strong>{n.toLocaleString()}{suffix}</strong>
        <span>{label}</span>
      </div>
    </Reveal>
  );
}

/** Poora page ka dhancha: marquee, heading, stats, phir children */
export function ServicePage({ id, marquee, kicker, title, accent, lead, stats, children }) {
  return (
    <section className="nt-section sv" id={id}>
      <div className="nt-marquee" aria-hidden="true">
        <div className="nt-marquee-track">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((t, i) => (
            <span key={i}>{t}<i /></span>
          ))}
        </div>
      </div>
      <div className="nt-wrap">
        <header className="nt-head">
          <Reveal as="p" className="nt-kicker" variant="fade">{kicker}</Reveal>
          <Reveal as="h2" className="nt-title" delay={100}>{title} <span>{accent}</span></Reveal>
          <Reveal as="p" className="nt-lead" delay={200}>{lead}</Reveal>
        </header>
        {stats && (
          <div className="nt-stats">
            {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 120} />)}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Block({ title, children }) {
  return (
    <div className="nt-block">
      <Reveal as="h3" className="nt-h3">{title}</Reveal>
      {children}
    </div>
  );
}

export function CardGrid({ items }) {
  return (
    <div className="nt-grid4">
      {items.map((s, i) => (
        <Reveal key={s.name} delay={i * 110} variant="zoom">
          <article className="nt-card">
            <span className="nt-chip">{s.tag}</span>
            <h4>{s.name}</h4>
            <p>{s.text}</p>
            {s.note && <div className="nt-dose"><Check />{s.note}</div>}
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function Steps({ items }) {
  return (
    <div className="nt-timeline">
      {items.map((t, i) => (
        <Reveal key={t.title} delay={i * 130} className="nt-step-wrap" variant={i % 2 ? "right" : "left"}>
          <div className="nt-step">
            <span className="nt-when">{t.when}</span>
            <h4>{t.title}</h4>
            <p>{t.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function TipList({ items }) {
  return (
    <div className="nt-tips">
      {items.map((t, i) => (
        <Reveal key={t.title} delay={i * 100} className="nt-tip-wrap">
          <div className="nt-tip">
            <span className="nt-check"><Check /></span>
            <div>
              <h4>{t.title}</h4>
              <p>{t.text}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Faq({ items }) {
  return (
    <div className="sv-faq">
      {items.map((q, i) => (
        <Reveal key={q.q} delay={i * 80}>
          <details className="sv-faq-item">
            <summary>{q.q}<i aria-hidden="true" /></summary>
            <p>{q.a}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

export function Cta({ title, text, label, href = "/contact" }) {
  return (
    <Reveal className="nt-cta" variant="zoom">
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <a href={href} className="nt-btn">{label}</a>
    </Reveal>
  );
}