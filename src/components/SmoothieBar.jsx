
import { useState } from "react";
import { ServicePage, Block, Steps, TipList, Cta, Reveal, useTween } from "./ServiceKit";

/* Approximate nutrition values. Actual values depend on ingredients and portions. */

const MARQUEE = [
  "Fresh Fruit",
  "Banana Shakes",
  "Mango Blends",
  "Protein Options",
  "Made To Order",
  "Refresh After Training",
];

const STATS = [
  { value: 6, suffix: "", label: "Sample signature blends" },
  { value: 15, suffix: "+", label: "Ingredient combinations" },
  { value: 24, suffix: " g", label: "Protein in selected blends" },
  { value: 4, suffix: "", label: "Steps to build your drink" },
];

const BASES = [
  { id: "milk", name: "Full-fat milk", amt: "250 ml", k: 150, p: 8, c: 12, f: 8, col: "#f1e7d3" },
  { id: "almond", name: "Almond milk", amt: "250 ml", k: 40, p: 1, c: 2, f: 3, col: "#e6d5b8" },
  { id: "yogurt", name: "Plain yogurt", amt: "150 g", k: 100, p: 8, c: 6, f: 5, col: "#f6f3ec" },
  { id: "coconut", name: "Coconut water", amt: "250 ml", k: 45, p: 0, c: 11, f: 0, col: "#e9f0e0" },
];

const FRUITS = [
  { id: "banana", name: "Banana", amt: "1 medium", k: 105, p: 1, c: 27, f: 0, col: "#f4d35e" },
  { id: "dates", name: "Dates", amt: "2 dates", k: 45, p: 0, c: 12, f: 0, col: "#8b5e3c" },
  { id: "mango", name: "Mango", amt: "100 g", k: 60, p: 1, c: 15, f: 0, col: "#ffae42" },
  { id: "pineapple", name: "Pineapple", amt: "100 g", k: 50, p: 1, c: 13, f: 0, col: "#f8e16c" },
];

const BOOSTS = [
  { id: "whey", name: "Whey protein", amt: "1 scoop", k: 120, p: 24, c: 3, f: 2, col: "#efe6da" },
  { id: "oats", name: "Oats", amt: "30 g", k: 115, p: 4, c: 20, f: 2, col: "#d9c29a" },
  { id: "peanut", name: "Peanut butter", amt: "1 tbsp", k: 95, p: 4, c: 3, f: 8, col: "#b9824a" },
  { id: "chia", name: "Chia seeds", amt: "1 tbsp", k: 60, p: 2, c: 5, f: 4, col: "#6f6a64" },
  { id: "spinach", name: "Spinach", amt: "30 g", k: 7, p: 1, c: 1, f: 0, col: "#4f9d3f" },
  { id: "honey", name: "Honey", amt: "1 tsp", k: 21, p: 0, c: 6, f: 0, col: "#e0a526" },
];

const SIGS = [
  {
    name: "Banana Power",
    tag: "Post-workout",
    base: "milk",
    fruits: ["banana"],
    boosts: ["whey", "oats"],
  },
  {
    name: "Tropical Fresh",
    tag: "Light and refreshing",
    base: "coconut",
    fruits: ["pineapple", "mango"],
    boosts: ["chia"],
  },
  {
    name: "Mango Delight",
    tag: "Fruit favourite",
    base: "yogurt",
    fruits: ["mango"],
    boosts: ["chia"],
  },
  {
    name: "Peanut Banana",
    tag: "Energy rich",
    base: "milk",
    fruits: ["banana"],
    boosts: ["peanut", "whey"],
  },
  {
    name: "Date Recharge",
    tag: "Local favourite",
    base: "milk",
    fruits: ["dates", "banana"],
    boosts: ["oats"],
  },
  {
    name: "Oat Energizer",
    tag: "Before training",
    base: "almond",
    fruits: ["banana"],
    boosts: ["oats", "honey"],
  },
];

const ALL = [...BASES, ...FRUITS, ...BOOSTS];

const byId = (id) => ALL.find((x) => x.id === id);

function sum(ids) {
  return ids.map(byId).filter(Boolean).reduce(
    (t, i) => ({
      k: t.k + i.k,
      p: t.p + i.p,
      c: t.c + i.c,
      f: t.f + i.f,
    }),
    { k: 0, p: 0, c: 0, f: 0 }
  );
}

function blend(ids) {
  const items = ids.map(byId).filter(Boolean);

  if (!items.length) return "#2a2a2e";

  const rgb = items.map((i) =>
    [1, 3, 5].map((n) => parseInt(i.col.slice(n, n + 2), 16))
  );

  const avg = [0, 1, 2].map((c) =>
    Math.round(rgb.reduce((s, x) => s + x[c], 0) / rgb.length)
  );

  return `rgb(${avg.join(",")})`;
}

const pushMax = (list, id, max) =>
  list.includes(id)
    ? list.filter((x) => x !== id)
    : list.length >= max
      ? [...list.slice(1), id]
      : [...list, id];

const STEPS = [
  {
    when: "Step 01",
    title: "Choose Your Base",
    text: "Start with milk, yogurt, almond milk or coconut water.",
  },
  {
    when: "Step 02",
    title: "Pick Your Fruits",
    text: "Choose up to two fruits, such as banana, mango, dates or pineapple.",
  },
  {
    when: "Step 03",
    title: "Add Your Boosters",
    text: "Explore options such as protein, oats, peanut butter or chia seeds.",
  },
  {
    when: "Step 04",
    title: "Enjoy Your Blend",
    text: "Review your ingredient combination and enjoy your selected smoothie.",
  },
];

const TIPS = [
  {
    title: "Keep Your Ingredients Balanced",
    text: "Combine fruit, a suitable base and optional protein or other boosters according to your nutrition preferences.",
  },
  {
    title: "Include Protein When Needed",
    text: "Milk, yogurt and whey are possible protein sources. Choose according to your daily dietary requirements.",
  },
  {
    title: "Use Natural Sweetness",
    text: "Bananas, mangoes and dates already add sweetness. You may not need additional honey or sugar.",
  },
  {
    title: "Choose According To Your Goal",
    text: "For a lighter drink, use simpler combinations. For more energy, consider additions such as oats or peanut butter.",
  },
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

  const verdict =
    t.p >= 25
      ? "Higher protein blend"
      : t.p >= 15
        ? "Protein-containing blend"
        : "Light fruit blend";

  const load = (s) => {
    setBase(s.base);
    setFruits(s.fruits);
    setBoosts(s.boosts);

    document
      .getElementById("sv-builder")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const chips = (list, active, onPick) =>
    list.map((i) => (
      <button
        key={i.id}
        type="button"
        className={`sv-chip ${active.includes(i.id) ? "on" : ""}`}
        onClick={() => onPick(i.id)}
      >
        <b>{i.name}</b>
        <small>{i.amt}</small>
      </button>
    ));

  return (
    <ServicePage
      id="smoothie-bar"
      marquee={MARQUEE}
      kicker="Freshly Blended"
      title="Refresh Your"
      accent="Routine"
      lead="Create your own smoothie using familiar ingredients, explore signature combinations and see the estimated nutrition values update as you build your drink."
      stats={STATS}
    >
      <Block title="Build Your Own Smoothie">
        <div className="nt-calc" id="sv-builder">
          <Reveal className="nt-panel" variant="left" delay={100}>
            <div className="nt-field">
              <label>
                1. Choose Your Base <b>pick 1</b>
              </label>
              <div className="sv-chips">
                {chips(BASES, [base], setBase)}
              </div>
            </div>

            <div className="nt-field">
              <label>
                2. Choose Your Fruits <b>up to 2</b>
              </label>
              <div className="sv-chips">
                {chips(FRUITS, fruits, (id) =>
                  setFruits(pushMax(fruits, id, 2))
                )}
              </div>
            </div>

            <div className="nt-field">
              <label>
                3. Add Your Boosters <b>up to 2</b>
              </label>
              <div className="sv-chips">
                {chips(BOOSTS, boosts, (id) =>
                  setBoosts(pushMax(boosts, id, 2))
                )}
              </div>
            </div>
          </Reveal>

          <Reveal className="nt-panel nt-result" variant="right" delay={200}>
            <div className="sv-cup-wrap">
              <div className="sv-cup" aria-hidden="true">
                <span className="sv-straw" />
                <div className="sv-glass">
                  <div
                    className="sv-liquid"
                    style={{ height: `${level}%`, background: color }}
                  />
                </div>
              </div>

              <div className="sv-cup-info">
                <strong>{kN}</strong>
                <span>estimated kcal per serving</span>
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
                  <div className="nt-food-top">
                    <span>{m.l}</span>
                    <b>{m.v} g</b>
                  </div>

                  <div className="nt-track">
                    <div
                      className="nt-fill"
                      style={{
                        width: `${Math.min(m.w, 100)}%`,
                        transitionDelay: "0ms",
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <p className="nt-note">
              Estimated nutrition values only. Actual calories and macros
              depend on ingredient brands, quantities and preparation.
            </p>
          </Reveal>
        </div>
      </Block>

      <Block title="KINETIX Signature Blends">
        <div className="nt-grid4">
          {SIGS.map((s, i) => {
            const m = sum([s.base, ...s.fruits, ...s.boosts]);

            const names = [s.base, ...s.fruits, ...s.boosts]
              .map((id) => byId(id).name)
              .join(", ");

            return (
              <Reveal key={s.name} delay={i * 90} variant="zoom">
                <article className="nt-card">
                  <span className="nt-chip">{s.tag}</span>

                  <h4>{s.name}</h4>

                  <p>{names}</p>

                  <div className="sv-sig-meta">
                    <span>{m.k} kcal approx.</span>
                    <span>{m.p} g protein approx.</span>
                  </div>

                  <button
                    type="button"
                    className="sv-try"
                    onClick={() => load(s)}
                  >
                    Try in builder
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Block>

      <Block title="How To Build Your Smoothie">
        <Steps items={STEPS} />
      </Block>

      <Block title="Make A Smarter Drink Choice">
        <TipList items={TIPS} />
      </Block>

      <Cta
        title="Make Your Next Blend Count"
        text="Explore your favourite ingredients and create a refreshing combination for your fitness routine."
        label="Build your smoothie"
      />
    </ServicePage>
  );
}
