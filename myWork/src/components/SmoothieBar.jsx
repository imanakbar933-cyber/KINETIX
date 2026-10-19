import { useState } from "react";
import { ServicePage, Block, Steps, TipList, Cta, Reveal, useTween } from "./ServiceKit";

/* NOTE: nutrition values approx. hain. Apne menu ke hisaab se edit karein. */
const MARQUEE = ["Made To Order", "Real Fruit", "Protein Packed", "Build Your Own", "Cold And Creamy", "Post-Workout Fuel"];

const STATS = [
  { value: 6, suffix: "", label: "Signature blends" },
  { value: 15, suffix: "+", label: "Ingredients to mix" },
  { value: 24, suffix: " g", label: "Protein with whey" },
  { value: 3, suffix: " min", label: "Blended fresh" },
];

const BASES = [
  { id: "milk", name: "Whole milk", amt: "250 ml", k: 150, p: 8, c: 12, f: 8, col: "#f1e7d3" },
  { id: "almond", name: "Almond milk", amt: "250 ml", k: 40, p: 1, c: 2, f: 3, col: "#e6d5b8" },
  { id: "yogurt", name: "Greek yogurt", amt: "150 g", k: 100, p: 15, c: 6, f: 0, col: "#f6f3ec" },
  { id: "coconut", name: "Coconut water", amt: "250 ml", k: 45, p: 0, c: 11, f: 0, col: "#e9f0e0" },
];
const FRUITS = [
  { id: "banana", name: "Banana", amt: "1 medium", k: 105, p: 1, c: 27, f: 0, col: "#f4d35e" },
  { id: "berries", name: "Mixed berries", amt: "100 g", k: 50, p: 1, c: 12, f: 0, col: "#8e3b8f" },
  { id: "mango", name: "Mango", amt: "100 g", k: 60, p: 1, c: 15, f: 0, col: "#ffae42" },
  { id: "pineapple", name: "Pineapple", amt: "100 g", k: 50, p: 1, c: 13, f: 0, col: "#f8e16c" },
];
const BOOSTS = [
  { id: "whey", name: "Whey protein", amt: "1 scoop", k: 120, p: 24, c: 3, f: 2, col: "#efe6da" },
  { id: "oats", name: "Rolled oats", amt: "30 g", k: 115, p: 4, c: 20, f: 2, col: "#d9c29a" },
  { id: "peanut", name: "Peanut butter", amt: "1 tbsp", k: 95, p: 4, c: 3, f: 8, col: "#b9824a" },
  { id: "chia", name: "Chia seeds", amt: "1 tbsp", k: 60, p: 2, c: 5, f: 4, col: "#6f6a64" },
  { id: "spinach", name: "Spinach", amt: "30 g", k: 7, p: 1, c: 1, f: 0, col: "#4f9d3f" },
  { id: "honey", name: "Honey", amt: "1 tsp", k: 21, p: 0, c: 6, f: 0, col: "#e0a526" },
];

const SIGS = [
  { name: "Power Recovery", tag: "Post-workout", base: "milk", fruits: ["banana"], boosts: ["whey", "oats"] },
  { name: "Green Machine", tag: "Light and fresh", base: "coconut", fruits: ["pineapple"], boosts: ["spinach", "chia"] },
  { name: "Berry Blast", tag: "Antioxidants", base: "yogurt", fruits: ["berries", "mango"], boosts: ["chia"] },
  { name: "Peanut Gains", tag: "Muscle gain", base: "milk", fruits: ["banana"], boosts: ["peanut", "whey"] },
  { name: "Tropical Lite", tag: "Low calorie", base: "almond", fruits: ["mango", "pineapple"], boosts: ["spinach"] },
  { name: "Oat Energizer", tag: "Pre-workout", base: "almond", fruits: ["banana"], boosts: ["oats", "honey"] },
];

const ALL = [...BASES, ...FRUITS, ...BOOSTS];
const byId = (id) => ALL.find((x) => x.id === id);

function sum(ids) {
  return ids.map(byId).filter(Boolean).reduce(
    (t, i) => ({ k: t.k + i.k, p: t.p + i.p, c: t.c + i.c, f: t.f + i.f }),
    { k: 0, p: 0, c: 0, f: 0 }
  );
}
function blend(ids) {
  const items = ids.map(byId).filter(Boolean);
  if (!items.length) return "#2a2a2e";
  const rgb = items.map((i) => [1, 3, 5].map((n) => parseInt(i.col.slice(n, n + 2), 16)));
  const avg = [0, 1, 2].map((c) => Math.round(rgb.reduce((s, x) => s + x[c], 0) / rgb.length));
  return `rgb(${avg.join(",")})`;
}
const pushMax = (list, id, max) =>
  list.includes(id) ? list.filter((x) => x !== id) : list.length >= max ? [...list.slice(1), id] : [...list, id];

const STEPS = [
  { when: "Step 01", title: "Pick a base", text: "Milk, almond milk, Greek yogurt or coconut water." },
  { when: "Step 02", title: "Add fruit", text: "Up to two fruits for natural sweetness." },
  { when: "Step 03", title: "Boost it", text: "Protein, oats, seeds or greens to match your goal." },
  { when: "Step 04", title: "We blend", text: "Made fresh, cold and ready in minutes." },
];
const TIPS = [
  { title: "Drink within an hour of training", text: "Protein and carbs together support recovery while your muscles are ready to use them." },
  { title: "Aim for 20 g protein or more", text: "Add whey or Greek yogurt to reach a solid post-workout dose." },
  { title: "Fruit is already sweet", text: "You rarely need honey. Save it for a pre-workout energy blend." },
  { title: "Match it to your goal", text: "Lighter blends suit fat loss. Add oats and peanut butter when you want to gain." },
];

export default function SmoothieBar() {
  const [base, setBase] = useState("milk");
  const [fruits, setFruits] = useState(["banana"]);
  const [boosts, setBoosts] = useState(["whey"]);

  const ids = [base, ...fruits, ...boosts];
  const t = sum(ids);
  const color = blend(ids);
  const level = Math.min(26 + ids.length * 13, 88);

  const kN = useTween(t.k);
  const pN = useTween(t.p);
  const cN = useTween(t.c);
  const fN = useTween(t.f);

  const verdict = t.p >= 25 ? "Great for recovery" : t.p >= 15 ? "Good everyday blend" : "Light refresher";

  const load = (s) => {
    setBase(s.base);
    setFruits(s.fruits);
    setBoosts(s.boosts);
    document.getElementById("sv-builder")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const chips = (list, active, onPick) =>
    list.map((i) => (
      <button key={i.id} type="button" className={`sv-chip ${active.includes(i.id) ? "on" : ""}`} onClick={() => onPick(i.id)}>
        <b>{i.name}</b>
        <small>{i.amt}</small>
      </button>
    ));

  return (
    <ServicePage
      id="smoothie-bar"
      marquee={MARQUEE}
      kicker="Blended Fresh"
      title="Refuel After Every"
      accent="Workout"
      lead="Build your own smoothie and watch the nutrition update live, or pick one of our signature blends made for recovery, energy and taste."
      stats={STATS}
    >
      <Block title="Build Your Smoothie">
        <div className="nt-calc" id="sv-builder">
          <Reveal className="nt-panel" variant="left" delay={100}>
            <div className="nt-field">
              <label>1. Base <b>pick 1</b></label>
              <div className="sv-chips">{chips(BASES, [base], setBase)}</div>
            </div>
            <div className="nt-field">
              <label>2. Fruit <b>up to 2</b></label>
              <div className="sv-chips">{chips(FRUITS, fruits, (id) => setFruits(pushMax(fruits, id, 2)))}</div>
            </div>
            <div className="nt-field">
              <label>3. Boosters <b>up to 2</b></label>
              <div className="sv-chips">{chips(BOOSTS, boosts, (id) => setBoosts(pushMax(boosts, id, 2)))}</div>
            </div>
          </Reveal>

          <Reveal className="nt-panel nt-result" variant="right" delay={200}>
            <div className="sv-cup-wrap">
              <div className="sv-cup" aria-hidden="true">
                <span className="sv-straw" />
                <div className="sv-glass">
                  <div className="sv-liquid" style={{ height: `${level}%`, background: color }} />
                </div>
              </div>
              <div className="sv-cup-info">
                <strong>{kN}</strong>
                <span>kcal per cup</span>
                <em className="sv-verdict">{verdict}</em>
              </div>
            </div>

            <ul className="sv-macros">
              {[
                { l: "Protein", v: pN, w: (t.p / 50) * 100 },
                { l: "Carbs", v: cN, w: (t.c / 90) * 100 },
                { l: "Fat", v: fN, w: (t.f / 30) * 100 },
              ].map((m) => (
                <li key={m.l}>
                  <div className="nt-food-top"><span>{m.l}</span><b>{m.v} g</b></div>
                  <div className="nt-track"><div className="nt-fill" style={{ width: `${Math.min(m.w, 100)}%`, transitionDelay: "0ms" }} /></div>
                </li>
              ))}
            </ul>
            <p className="nt-note">Approximate values per serving. Ingredients and portions can vary slightly.</p>
          </Reveal>
        </div>
      </Block>

      <Block title="Signature Blends">
        <div className="nt-grid4">
          {SIGS.map((s, i) => {
            const m = sum([s.base, ...s.fruits, ...s.boosts]);
            const names = [s.base, ...s.fruits, ...s.boosts].map((id) => byId(id).name).join(", ");
            return (
              <Reveal key={s.name} delay={i * 90} variant="zoom">
                <article className="nt-card">
                  <span className="nt-chip">{s.tag}</span>
                  <h4>{s.name}</h4>
                  <p>{names}</p>
                  <div className="sv-sig-meta">
                    <span>{m.k} kcal</span>
                    <span>{m.p} g protein</span>
                  </div>
                  <button type="button" className="sv-try" onClick={() => load(s)}>Try in builder</button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Block>

      <Block title="How It Works">
        <Steps items={STEPS} />
      </Block>

      <Block title="Smoothie Rules">
        <TipList items={TIPS} />
      </Block>

      <Cta
        title="Come and taste the difference"
        text="Stop by the smoothie bar after your next session."
        label="Visit the smoothie bar"
      />
    </ServicePage>
  );
}