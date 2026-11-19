import { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */
const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** true once the element has scrolled into view (fires once) */
function useInView(threshold = 0.15) {
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

/** smoothly tweens a number whenever `value` changes */
function useTween(value, duration = 800) {
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
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = a + (value - a) * eased;
      from.current = cur;
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return Math.round(v);
}

/* ------------------------------------------------------------------ */
/*  Reveal wrapper – every element on the page animates through this   */
/* ------------------------------------------------------------------ */
function Reveal({ children, delay = 0, variant = "up", as: Tag = "div", className = "", ...rest }) {
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

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const MARQUEE = [
  "Eat Balanced",
  "Train Consistently",
  "Protein Rich Foods",
  "Stay Hydrated",
  "Recover Well",
  "Healthy Daily Habits",
];

const STATS = [
  { value: 3, suffix: "", label: "Fitness goals" },
  { value: 4, suffix: "", label: "Sample daily meals" },
  { value: 6, suffix: "", label: "Protein food options" },
  { value: 8, suffix: "", label: "Hydration tracker glasses" },
];

const ACTIVITY = [
  { id: "low", label: "Light", note: "1–2 workouts / week", f: 1.375 },
  { id: "mid", label: "Moderate", note: "3–5 workouts / week", f: 1.55 },
  { id: "high", label: "Intense", note: "6–7 workouts / week", f: 1.725 },
];

const GOALS = [
  { id: "lose", label: "Fat Loss", adj: -500, protein: 2.0 },
  { id: "maintain", label: "Maintain", adj: 0, protein: 1.6 },
  { id: "gain", label: "Muscle Gain", adj: 350, protein: 1.8 },
];

const MEALS = {
  lose: [
    {
      time: "7:30 AM",
      name: "2 boiled eggs, whole-wheat roti & tea",
      kcal: 400,
      p: 22,
    },
    {
      time: "12:30 PM",
      name: "Grilled chicken, small rice portion & salad",
      kcal: 500,
      p: 42,
    },
    {
      time: "4:00 PM",
      name: "Plain yogurt with seasonal fruit",
      kcal: 220,
      p: 10,
    },
    {
      time: "8:00 PM",
      name: "Daal, chapati & cucumber raita",
      kcal: 480,
      p: 22,
    },
  ],

  maintain: [
    {
      time: "7:30 AM",
      name: "2 eggs, whole-wheat paratha & milk",
      kcal: 500,
      p: 26,
    },
    {
      time: "12:30 PM",
      name: "Chicken pulao with raita and salad",
      kcal: 650,
      p: 38,
    },
    {
      time: "4:00 PM",
      name: "Banana, milk & roasted chana",
      kcal: 300,
      p: 14,
    },
    {
      time: "8:00 PM",
      name: "Grilled fish, chapati & cooked vegetables",
      kcal: 600,
      p: 35,
    },
  ],

  gain: [
    {
      time: "7:30 AM",
      name: "3 eggs, whole-wheat paratha & milk",
      kcal: 700,
      p: 32,
    },
    {
      time: "12:30 PM",
      name: "Chicken rice bowl with vegetables",
      kcal: 800,
      p: 48,
    },
    {
      time: "4:00 PM",
      name: "Banana milk shake with peanut butter",
      kcal: 450,
      p: 18,
    },
    {
      time: "8:00 PM",
      name: "Chicken curry, chapati & daal",
      kcal: 750,
      p: 42,
    },
  ],
};

const TIMING = [
  {
    when: "1–2 hours before",
    title: "Pre-workout",
    text: "Choose an easy-to-digest meal such as a banana, oats or a small roti with eggs. Adjust the portion according to your training time.",
  },
  {
    when: "During training",
    title: "Stay Hydrated",
    text: "Drink water regularly during your workout. For longer or particularly sweaty sessions, hydration needs may be different.",
  },
  {
    when: "After training",
    title: "Post-workout",
    text: "Include protein and carbohydrates in your next meal, such as chicken with rice, eggs with roti or daal with chapati.",
  },
  {
    when: "Before bed",
    title: "Night Recovery",
    text: "A balanced evening meal and a consistent sleep routine can support recovery. Milk or plain yogurt can also be convenient food options.",
  },
];

const SUPPLEMENTS = [
  {
    name: "Whey Protein",
    tag: "Protein support",
    text: "A convenient protein source for people who find it difficult to meet their daily protein needs through regular meals.",
    dose: "Follow product instructions and individual dietary needs",
  },
  {
    name: "Creatine",
    tag: "Strength & performance",
    text: "Creatine monohydrate is commonly studied for its potential benefits in strength and high-intensity exercise.",
    dose: "Discuss suitability and use with a qualified professional",
  },
  {
    name: "Omega-3",
    tag: "Dietary fats",
    text: "Omega-3 fats are found in foods such as fish, and are part of a balanced diet.",
    dose: "Consider dietary sources and individual needs",
  },
  {
    name: "Vitamin D",
    tag: "Bone health",
    text: "Vitamin D supports normal bone health. Supplementation may be appropriate for some people depending on their needs.",
    dose: "Seek medical advice before supplementing",
  },
];

const FOODS = [
  { name: "Chicken breast", per: 31 },
  { name: "Fish", per: 20 },
  { name: "Eggs", per: 13 },
  { name: "Plain yogurt", per: 4 },
  { name: "Cooked lentils (daal)", per: 9 },
  { name: "Roasted chickpeas (chana)", per: 19 },
];

const TIPS = [
  {
    title: "Include protein in your meals",
    text: "Eggs, chicken, fish, milk, yogurt, daal and chana can help you include protein in your everyday diet.",
  },
  {
    title: "Choose balanced portions",
    text: "Combine roti or rice with protein-rich foods and vegetables instead of relying on one food group.",
  },
  {
    title: "Drink water regularly",
    text: "Keep water available throughout the day, especially during exercise and in hot weather.",
  },
  {
    title: "Plan your meals ahead",
    text: "Preparing simple foods such as boiled eggs, chicken, daal and vegetables can make daily meal planning easier.",
  },
];

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */
const Check = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function StatCard({ value, suffix, label, delay }) {
  const [ref, inView] = useInView(0.4);
  const n = useTween(inView ? value : 0, 1600);
  return (
    <Reveal delay={delay}>
      <div className="nt-stat" ref={ref}>
        <strong>
          {n.toLocaleString()}
          {suffix}
        </strong>
        <span>{label}</span>
      </div>
    </Reveal>
  );
}

function FoodBar({ name, per, max, delay }) {
  const [ref, inView] = useInView(0.5);
  return (
    <div className="nt-food" ref={ref}>
      <div className="nt-food-top">
        <span>{name}</span>
        <b>{per} g</b>
      </div>
      <div className="nt-track">
        <div
          className="nt-fill"
          style={{ width: inView ? `${(per / max) * 100}%` : "0%", transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function Nutrient() {
  /* calculator state */
  const [sex, setSex] = useState("male");
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);
  const [activity, setActivity] = useState("mid");
  const [goal, setGoal] = useState("gain");

  /* meal plan + hydration */
  const [plan, setPlan] = useState("gain");
  const [glasses, setGlasses] = useState(3);

  const result = useMemo(() => {
    const bmr = 10 * weight + 6.25 * height - 5 * age + (sex === "male" ? 5 : -161);
    const f = ACTIVITY.find((a) => a.id === activity).f;
    const g = GOALS.find((x) => x.id === goal);
    const kcal = Math.max(1200, Math.round((bmr * f + g.adj) / 10) * 10);
    const protein = Math.round(weight * g.protein);
    const fat = Math.round((kcal * 0.25) / 9);
    const carbs = Math.max(0, Math.round((kcal - protein * 4 - fat * 9) / 4));
    const water = Math.round(weight * 0.035 * 10) / 10;
    return { kcal, protein, fat, carbs, water };
  }, [sex, age, height, weight, activity, goal]);

  const kcalN = useTween(result.kcal);
  const proteinN = useTween(result.protein);
  const carbsN = useTween(result.carbs);
  const fatN = useTween(result.fat);

  /* donut segments */
  const C = 2 * Math.PI * 54;
  const pK = result.protein * 4;
  const cK = result.carbs * 4;
  const fK = result.fat * 9;
  const total = pK + cK + fK || 1;
  const segs = [
    { k: "p", len: (pK / total) * C, off: 0 },
    { k: "c", len: (cK / total) * C, off: (pK / total) * C },
    { k: "f", len: (fK / total) * C, off: ((pK + cK) / total) * C },
  ];

  const planMeals = MEALS[plan];
  const planKcal = planMeals.reduce((s, m) => s + m.kcal, 0);
  const planProtein = planMeals.reduce((s, m) => s + m.p, 0);

  return (
    <section className="nt-section" id="nutrition">
      {/* <style>{css}</style> */}

      {/* ---------------- Marquee ---------------- */}
      <div className="nt-marquee" aria-hidden="true">
        <div className="nt-marquee-track">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i}>
              {t}
              <i />
            </span>
          ))}
        </div>
      </div>

      <div className="nt-wrap">
        {/* ---------------- Heading ---------------- */}
        <header className="nt-head">
          
<Reveal as="p" className="nt-kicker" variant="fade">
  KINETIX NUTRITION GUIDE
</Reveal>

<Reveal as="h2" className="nt-title" delay={100}>
  Eat Better, Train <span>Stronger</span>
</Reveal>

<Reveal as="p" className="nt-lead" delay={200}>
  Build healthier eating habits alongside your fitness routine.
  Explore familiar food options, estimate your daily nutrition
  targets, and learn how balanced meals can support your
  training and recovery.
</Reveal>

        </header>

        {/* ---------------- Stats ---------------- */}
        <div className="nt-stats">
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 120} />
          ))}
        </div>

        {/* ---------------- Calculator ---------------- */}
        <div className="nt-block">
          <Reveal as="h3" className="nt-h3">
           Daily Nutrition Calculator
          </Reveal>

          <div className="nt-calc">
            <Reveal className="nt-panel" variant="left" delay={100}>
              <div className="nt-field">
                <label>Gender</label>
                <div className="nt-seg">
                  {["male", "female"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={sex === s ? "on" : ""}
                      onClick={() => setSex(s)}
                    >
                      {s === "male" ? "Male" : "Female"}
                    </button>
                  ))}
                </div>
              </div>

              {[
                { label: "Age", v: age, set: setAge, min: 16, max: 70, unit: "yrs" },
                { label: "Height", v: height, set: setHeight, min: 140, max: 210, unit: "cm" },
                { label: "Weight", v: weight, set: setWeight, min: 40, max: 150, unit: "kg" },
              ].map((r) => (
                <div className="nt-field" key={r.label}>
                  <label htmlFor={`nt-${r.label}`}>
                    {r.label}
                    <b>
                      {r.v} {r.unit}
                    </b>
                  </label>
                  <input
                    id={`nt-${r.label}`}
                    type="range"
                    min={r.min}
                    max={r.max}
                    value={r.v}
                    onChange={(e) => r.set(Number(e.target.value))}
                    style={{ "--pct": `${((r.v - r.min) / (r.max - r.min)) * 100}%` }}
                  />
                </div>
              ))}

              <div className="nt-field">
                <label>Activity level</label>
                <div className="nt-opts">
                  {ACTIVITY.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      className={activity === a.id ? "on" : ""}
                      onClick={() => setActivity(a.id)}
                    >
                      <b>{a.label}</b>
                      <small>{a.note}</small>
                    </button>
                  ))}
                </div>
              </div>

              <div className="nt-field">
                <label>Goal</label>
                <div className="nt-seg">
                  {GOALS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      className={goal === g.id ? "on" : ""}
                      onClick={() => setGoal(g.id)}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="nt-panel nt-result" variant="right" delay={200}>
              <div className="nt-donut">
                <svg viewBox="0 0 140 140" role="img" aria-label="Macro split">
                  <circle cx="70" cy="70" r="54" className="nt-ring-bg" />
                  {segs.map((s) => (
                    <circle
                      key={s.k}
                      cx="70"
                      cy="70"
                      r="54"
                      className={`nt-ring nt-ring-${s.k}`}
                      strokeDasharray={`${Math.max(s.len - 3, 0)} ${C}`}
                      strokeDashoffset={-s.off}
                    />
                  ))}
                </svg>
                <div className="nt-donut-mid">
                  <strong>{kcalN}</strong>
                  <span>kcal / day</span>
                </div>
              </div>

              <ul className="nt-macros">
                <li>
                  <i className="nt-dot p" />
                  <span>Protein</span>
                  <b>{proteinN} g</b>
                </li>
                <li>
                  <i className="nt-dot c" />
                  <span>Carbs</span>
                  <b>{carbsN} g</b>
                </li>
                <li>
                  <i className="nt-dot f" />
                  <span>Fats</span>
                  <b>{fatN} g</b>
                </li>
                <li>
                  <i className="nt-dot w" />
                  <span>Water</span>
                  <b>{result.water} L</b>
                </li>
              </ul>
              <p className="nt-note">
This is an estimated calculation for general information, not a medical or personalised diet prescription. Individual nutritional needs can vary.              </p>
            </Reveal>
          </div>
        </div>

        {/* ---------------- Meal plans ---------------- */}
        <div className="nt-block">
          <Reveal as="h3" className="nt-h3">
            Sample Meal Plans
          </Reveal>
          <Reveal className="nt-tabs" delay={100}>
            {GOALS.map((g) => (
              <button
                key={g.id}
                type="button"
                className={plan === g.id ? "on" : ""}
                onClick={() => setPlan(g.id)}
              >
                {g.label}
              </button>
            ))}
          </Reveal>

          <div className="nt-plan" key={plan}>
            {planMeals.map((m, i) => (
              <div className="nt-meal" key={m.name} style={{ "--i": i }}>
                <span className="nt-time">{m.time}</span>
                <h4>{m.name}</h4>
                <div className="nt-meal-meta">
                  <span>{m.kcal} kcal</span>
                  <span>{m.p} g protein</span>
                </div>
              </div>
            ))}
            <div className="nt-meal nt-meal-total" style={{ "--i": 4 }}>
              <span className="nt-time">Daily total</span>
              <h4>{planKcal.toLocaleString()} kcal</h4>
              <div className="nt-meal-meta">
                <span>{planProtein} g protein</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Timing ---------------- */}
        <div className="nt-block">
          <Reveal as="h3" className="nt-h3">
            When To Eat Around Your Workout
          </Reveal>
          <div className="nt-timeline">
            {TIMING.map((t, i) => (
              <Reveal key={t.title} delay={i * 130} className="nt-step-wrap" variant={i % 2 ? "right" : "left"}>
                <div className="nt-step">
                  <span className="nt-when">{t.when}</span>
                  <h4>{t.title}</h4>
                  <p>{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------------- Supplements ---------------- */}
        <div className="nt-block">
          <Reveal as="h3" className="nt-h3">
            Understanding Fitness Supplements
          </Reveal>
          <div className="nt-grid4">
            {SUPPLEMENTS.map((s, i) => (
              <Reveal key={s.name} delay={i * 110} variant="zoom">
                <article className="nt-card">
                  <span className="nt-chip">{s.tag}</span>
                  <h4>{s.name}</h4>
                  <p>{s.text}</p>
                  <div className="nt-dose">
                    <Check />
                    {s.dose}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------------- Foods + Hydration ---------------- */}
        <div className="nt-block nt-two">
          <Reveal className="nt-panel" variant="left">
            <h3 className="nt-h3 sm">Protein in Common Foods</h3>
            {FOODS.map((f, i) => (
              <FoodBar key={f.name} {...f} max={34} delay={i * 90} />
            ))}
          </Reveal>

          <Reveal className="nt-panel" variant="right" delay={150}>
            <h3 className="nt-h3 sm">Daily Hydration Tracker</h3>
            <p className="nt-muted">
Tap a glass for every 250 ml of water you drink. This tracker uses 8 glasses (2 litres) as a simple example, not a fixed daily requirement.            </p>
            <div className="nt-glasses">
              {Array.from({ length: 8 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`nt-glass ${i < glasses ? "full" : ""}`}
                  style={{ "--i": i }}
                  aria-label={`Glass ${i + 1}`}
                  aria-pressed={i < glasses}
                  onClick={() => setGlasses(i + 1 === glasses ? i : i + 1)}
                >
                  <span />
                </button>
              ))}
            </div>
            <div className="nt-track big">
              <div className="nt-fill water" style={{ width: `${(glasses / 8) * 100}%` }} />
            </div>
            <p className="nt-water-text">
              <b>{(glasses * 0.25).toFixed(2).replace(/\.?0+$/, "")} L</b> of 2 L{" "}
              {glasses === 8 && <em>Goal reached</em>}
            </p>
          </Reveal>
        </div>

        {/* ---------------- Tips ---------------- */}
        <div className="nt-block">
          <Reveal as="h3" className="nt-h3">
            Quick Nutrition Rules
          </Reveal>
          <div className="nt-tips">
            {TIPS.map((t, i) => (
              <Reveal key={t.title} delay={i * 100} className="nt-tip-wrap">
                <div className="nt-tip">
                  <span className="nt-check">
                    <Check />
                  </span>
                  <div>
                    <h4>{t.title}</h4>
                    <p>{t.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------------- CTA ---------------- */}
        <Reveal className="nt-cta" variant="zoom">
          <div>
           <h3>Build Healthier Habits With KINETIX</h3>
            <p>B  Make nutrition part of your fitness journey. Explore balanced
  meal ideas and develop eating habits that support your goals..</p>
          </div>
        <a href="/contact" className="nt-btn">
  Contact KINETIX
</a>
        </Reveal>
      </div>
    </section>
  );
}



