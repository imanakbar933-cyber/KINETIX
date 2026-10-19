import { useState } from "react";
import { ServicePage, Block, Steps, Faq, Cta, Reveal, Bar, Check } from "./ServiceKit";

/* NOTE: stats aur copy sample hain. Apne asal numbers / baatein yahan edit karein. */
const MARQUEE = ["Evidence First", "No Hype", "Right Dose", "Right Timing", "Food Before Pills", "Made For You"];

const STATS = [
  { value: 30, suffix: " min", label: "First consultation" },
  { value: 4, suffix: "", label: "Simple steps" },
  { value: 100, suffix: "%", label: "Personalised advice" },
  { value: 0, suffix: "", label: "Pressure to buy" },
];

const GOALS = [
  { id: "muscle", label: "Muscle Gain", note: "Build size and strength" },
  { id: "fat", label: "Fat Loss", note: "Stay full and strong" },
  { id: "endurance", label: "Endurance", note: "Run, ride, last longer" },
  { id: "health", label: "General Health", note: "Cover the basics" },
];
const DIETS = [
  { id: "meat", label: "Eats everything" },
  { id: "veg", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
];

const ITEMS = {
  protein: { name: "Whey Protein", tag: "Muscle repair", text: "A convenient way to reach your daily protein target and recover after training.", dose: "20–30 g after training or with a meal" },
  plant: { name: "Plant Protein Blend", tag: "Muscle repair", text: "Pea and rice protein together give a full amino acid profile without dairy.", dose: "25–35 g after training or with a meal" },
  creatine: { name: "Creatine Monohydrate", tag: "Strength and power", text: "The most researched supplement for strength, power and lean mass. Works by daily use, not timing.", dose: "3–5 g every day" },
  caffeine: { name: "Caffeine", tag: "Energy and focus", text: "Improves alertness and training output. Keep it earlier in the day so sleep stays good.", dose: "100–200 mg, 30–45 min before training" },
  omega: { name: "Omega-3 (fish oil)", tag: "Joints and heart", text: "Supports heart health and helps manage inflammation, mainly if you rarely eat oily fish.", dose: "1–2 g EPA + DHA with a meal" },
  algae: { name: "Algae Omega-3", tag: "Joints and heart", text: "Plant-based source of EPA and DHA, a good swap for fish oil.", dose: "1–2 g EPA + DHA with a meal" },
  vitd: { name: "Vitamin D3", tag: "Bones and immunity", text: "Useful if you get little sun. A blood test tells you if you actually need it.", dose: "1000–2000 IU daily with a meal" },
  mag: { name: "Magnesium", tag: "Sleep and recovery", text: "Can help muscle relaxation and sleep quality in people who eat little of it.", dose: "200–400 mg in the evening" },
  electro: { name: "Electrolytes", tag: "Hydration", text: "Replaces sodium lost in sweat. Most helpful in long or hot sessions.", dose: "During sessions over 75 min" },
  carbs: { name: "Carb Drink or Gel", tag: "Fuel", text: "Keeps energy steady during long efforts when food is hard to eat.", dose: "30–60 g carbs per hour of long exercise" },
  iron: { name: "Iron (only if low)", tag: "Energy", text: "Common low spot for endurance athletes, but too much is harmful. Test first.", dose: "Only after a blood test" },
  b12: { name: "Vitamin B12", tag: "Energy and nerves", text: "Hard to get without animal foods, so plant-based eaters often need it.", dose: "As per label or after a blood test" },
};

const STACK = {
  muscle: ["protein", "creatine", "vitd", "omega"],
  fat: ["protein", "creatine", "caffeine", "omega"],
  endurance: ["electro", "carbs", "caffeine", "iron"],
  health: ["vitd", "omega", "mag"],
};
const VEGAN_SWAP = { protein: "plant", omega: "algae" };

const EVIDENCE = [
  { label: "Creatine", value: 95 },
  { label: "Protein powder", value: 90 },
  { label: "Caffeine", value: 85 },
  { label: "Vitamin D (if low)", value: 80 },
  { label: "Omega-3", value: 65 },
  { label: "BCAAs (if protein is enough)", value: 25 },
  { label: "Fat burners", value: 15 },
];

const SKIP = [
  { name: "Fat burners", text: "Mostly caffeine with big promises. Diet and training do the real work." },
  { name: "Extra BCAAs", text: "Not needed if your daily protein is already on target." },
  { name: "Detox teas", text: "Your liver and kidneys already do this job." },
  { name: "Testosterone boosters", text: "Weak evidence and often poorly regulated." },
];

const STEPS = [
  { when: "Step 01", title: "Free chat", text: "Tell us your goal, training week and what you already take." },
  { when: "Step 02", title: "Assessment", text: "We review your food, sleep, health notes and budget." },
  { when: "Step 03", title: "Your short list", text: "A clear plan with the product type, dose and timing. Nothing extra." },
  { when: "Step 04", title: "Review", text: "We check progress after a month and adjust or remove items." },
];

const FAQ = [
  { q: "Do I need supplements to build muscle?", a: "No. Food, training and sleep come first. Supplements are small helpers that fill gaps or add convenience." },
  { q: "Are supplements safe?", a: "Most are safe at normal doses from reputable brands. Always check with a doctor if you are pregnant, on medication or have a health condition." },
  { q: "Will I be pushed to buy something?", a: "No. We explain what fits your goal and what to skip, and the decision is always yours." },
  { q: "How soon will I notice a difference?", a: "Creatine needs a few weeks of daily use. Protein and electrolytes help right away with convenience and recovery." },
];

export default function SupplementConsultation() {
  const [goal, setGoal] = useState("muscle");
  const [diet, setDiet] = useState("meat");

  let ids = STACK[goal].map((id) => (diet === "vegan" && VEGAN_SWAP[id]) || id);
  if (diet !== "meat" && !ids.includes("b12")) ids = [...ids, "b12"];
  const stack = ids.map((id) => ITEMS[id]);

  return (
    <ServicePage
      id="supplement-guide"
      marquee={MARQUEE}
      kicker="Know What To Take"
      title="Supplements That Actually"
      accent="Fit You"
      lead="Skip the hype and the crowded shelf. Tell us your goal and diet, and we help you pick only what is worth your money, with the right dose and timing."
      stats={STATS}
    >
      <Block title="Find Your Starter Stack">
        <div className="nt-calc">
          <Reveal className="nt-panel" variant="left" delay={100}>
            <div className="nt-field">
              <label>Your goal</label>
              <div className="nt-opts sv-opts2">
                {GOALS.map((g) => (
                  <button key={g.id} type="button" className={goal === g.id ? "on" : ""} onClick={() => setGoal(g.id)}>
                    <b>{g.label}</b>
                    <small>{g.note}</small>
                  </button>
                ))}
              </div>
            </div>
            <div className="nt-field">
              <label>Your diet</label>
              <div className="nt-seg">
                {DIETS.map((d) => (
                  <button key={d.id} type="button" className={diet === d.id ? "on" : ""} onClick={() => setDiet(d.id)}>
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="nt-note">
              General guidance only, not medical advice. Check with a doctor if you are pregnant, take medication or have a health condition.
            </p>
          </Reveal>

          <Reveal className="nt-panel nt-result" variant="right" delay={200}>
            <h4 className="sv-sub">Your starter stack</h4>
            <ul className="sv-stack" key={goal + diet}>
              {stack.map((it, i) => (
                <li className="sv-item" key={it.name} style={{ "--i": i }}>
                  <span className="sv-num">{i + 1}</span>
                  <div>
                    <div className="sv-item-top">
                      <h5>{it.name}</h5>
                      <span className="nt-chip">{it.tag}</span>
                    </div>
                    <p>{it.text}</p>
                    <div className="sv-dose"><Check />{it.dose}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Block>

      <Block title="What Is Worth Your Money">
        <div className="nt-two">
          <Reveal className="nt-panel" variant="left">
            <h3 className="nt-h3 sm">How Strong Is The Evidence?</h3>
            {EVIDENCE.map((e, i) => (
              <Bar key={e.label} label={e.label} value={e.value} shown={e.value + " / 100"} delay={i * 80} />
            ))}
            <p className="nt-note">Our own simple rating based on research, not a clinical score.</p>
          </Reveal>

          <Reveal className="nt-panel" variant="right" delay={150}>
            <h3 className="nt-h3 sm">Often Not Worth It</h3>
            <ul className="sv-skip">
              {SKIP.map((s) => (
                <li key={s.name}>
                  <span className="sv-x" aria-hidden="true">✕</span>
                  <div>
                    <h5>{s.name}</h5>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Block>

      <Block title="How A Consultation Works">
        <Steps items={STEPS} />
      </Block>

      <Block title="Common Questions">
        <Faq items={FAQ} />
      </Block>

      <Cta
        title="Get a supplement plan built around you"
        text="Book a 30-minute consultation and leave with a short, honest list."
        label="Book a consultation"
      />
    </ServicePage>
  );
}