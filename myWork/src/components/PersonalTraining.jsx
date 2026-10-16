import { useState } from "react";
import { ServicePage, Block, CardGrid, Steps, Faq, Cta, Reveal, Check } from "./serviceKit";

/* NOTE: stats aur packages sample hain. Apni asal details / pricing yahan edit karein. */
const MARQUEE = ["One-On-One", "Your Goals", "Form First", "Progress Tracked", "Real Results", "Certified Coaches"];

const STATS = [
  { value: 60, suffix: " min", label: "Per session" },
  { value: 12, suffix: " wk", label: "Program cycle" },
  { value: 4, suffix: "", label: "Progress check-ins" },
  { value: 100, suffix: "%", label: "Custom programs" },
];

const GOALS = [
  { id: "fat", label: "Fat Loss", note: "Burn more, keep muscle", rule: "10–15 reps, short rests, plus a 10–15 min interval finisher." },
  { id: "muscle", label: "Muscle Gain", note: "Build size", rule: "8–12 reps per set, 60–90 seconds rest, steady progression." },
  { id: "strength", label: "Strength", note: "Lift heavier", rule: "3–6 reps on big compound lifts, 2–3 minutes rest." },
  { id: "fit", label: "General Fitness", note: "Move and feel good", rule: "A mix of strength, cardio and mobility in every week." },
];

const MOVES = {
  Push: ["Bench press", "Overhead press", "Triceps pushdown"],
  Pull: ["Barbell row", "Lat pulldown", "Biceps curl"],
  Legs: ["Squat", "Lunges", "Hamstring curl"],
  Upper: ["Incline press", "Seated row", "Lateral raise"],
  Lower: ["Squat", "Romanian deadlift", "Calf raise"],
  "Full Body": ["Squat", "Press", "Row + core"],
};
const SPLITS = {
  2: { days: [1, 4], names: ["Full Body", "Full Body"] },
  3: { days: [0, 2, 4], names: ["Full Body", "Full Body", "Full Body"] },
  4: { days: [0, 1, 3, 4], names: ["Upper", "Lower", "Upper", "Lower"] },
  5: { days: [0, 1, 2, 4, 5], names: ["Push", "Pull", "Legs", "Upper", "Lower"] },
  6: { days: [0, 1, 2, 3, 4, 5], names: ["Push", "Pull", "Legs", "Push", "Pull", "Legs"] },
};
const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TRACK = [
  { tag: "Body", name: "Measurements", text: "Weight, waist and body-fat estimates to see change the scale misses.", note: "Reviewed every 4 weeks" },
  { tag: "Performance", name: "Strength log", text: "Every lift is written down so progress is visible and planned.", note: "Updated every session" },
  { tag: "Quality", name: "Movement check", text: "Your coach rechecks form, mobility and balance as the weights go up.", note: "Checked every session" },
  { tag: "Lifestyle", name: "Habits", text: "Sleep, steps and nutrition habits that support the results.", note: "Discussed at check-ins" },
];

const PLANS = [
  { name: "Starter", sessions: "4 sessions / month", perks: ["Goal and movement assessment", "Personal workout plan", "Form coaching"], pop: false },
  { name: "Standard", sessions: "8 sessions / month", perks: ["Everything in Starter", "Monthly progress review", "Nutrition guidance"], pop: true },
  { name: "Intensive", sessions: "12 sessions / month", perks: ["Everything in Standard", "Priority booking", "Weekly plan adjustments"], pop: false },
];

const STEPS = [
  { when: "Step 01", title: "Assessment", text: "Goals, health history, movement screen and a starting fitness check." },
  { when: "Step 02", title: "Your plan", text: "A program built around your schedule, level and equipment." },
  { when: "Step 03", title: "Train", text: "One-on-one sessions with live coaching, corrections and encouragement." },
  { when: "Step 04", title: "Review", text: "Every few weeks we measure progress and reset the targets." },
];

const FAQ = [
  { q: "Do I need experience to start?", a: "No. Your trainer starts exactly where you are and teaches the basics before adding load." },
  { q: "How many sessions a week is right?", a: "Most people do well with 2 to 4 sessions per week. Beginners often start with 3 and build up." },
  { q: "What if I have an injury or health condition?", a: "Tell us in the assessment. We adapt exercises, and we recommend checking with your doctor first when needed." },
  { q: "How soon will I see results?", a: "Strength and energy often improve within weeks. Visible body changes usually take 8 to 12 weeks of steady work." },
];

export default function PersonalTraining() {
  const [goal, setGoal] = useState("muscle");
  const [days, setDays] = useState(4);

  const g = GOALS.find((x) => x.id === goal);
  const split = SPLITS[days];
  const sessionAt = (i) => split.days.indexOf(i);

  return (
    <ServicePage
      id="personal-training"
      marquee={MARQUEE}
      kicker="A Program Built Around You"
      title="One-On-One Coaching For"
      accent="Real Results"
      lead="Choose your goal and how often you can train, and see what a week with a personal trainer could look like. Your coach then fine-tunes it to you."
      stats={STATS}
    >
      <Block title="Build Your Week">
        <div className="nt-calc">
          <Reveal className="nt-panel" variant="left" delay={100}>
            <div className="nt-field">
              <label>Your goal</label>
              <div className="nt-opts sv-opts2">
                {GOALS.map((x) => (
                  <button key={x.id} type="button" className={goal === x.id ? "on" : ""} onClick={() => setGoal(x.id)}>
                    <b>{x.label}</b>
                    <small>{x.note}</small>
                  </button>
                ))}
              </div>
            </div>
            <div className="nt-field">
              <label>Training days per week <b>{days} days</b></label>
              <div className="nt-seg">
                {[2, 3, 4, 5, 6].map((d) => (
                  <button key={d} type="button" className={days === d ? "on" : ""} onClick={() => setDays(d)}>{d}</button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="nt-panel nt-result" variant="right" delay={200}>
            <h4 className="sv-sub">Your plan at a glance</h4>
            <ul className="sv-glance">
              <li><span>Sessions per week</span><b>{days}</b></li>
              <li><span>Rest days</span><b>{7 - days}</b></li>
              <li><span>Session length</span><b>~60 min</b></li>
            </ul>
            <div className="sv-rule" key={goal}>
              <strong>{g.label} focus</strong>
              <p>{g.rule}</p>
            </div>
            <p className="nt-note">
              {days >= 5 ? "High frequency works best once you have a solid training base." : "A great, sustainable frequency for most people."}
            </p>
          </Reveal>
        </div>

        <div className="sv-week" key={days}>
          {WEEK.map((d, i) => {
            const at = sessionAt(i);
            const name = at >= 0 ? split.names[at] : null;
            return (
              <div className={`sv-day ${name ? "train" : "rest"}`} key={d} style={{ "--i": i }}>
                <span className="sv-day-name">{d}</span>
                {name ? (
                  <>
                    <strong>{name}</strong>
                    <ul>{MOVES[name].map((m) => <li key={m}>{m}</li>)}</ul>
                  </>
                ) : (
                  <em>Rest and recover</em>
                )}
              </div>
            );
          })}
        </div>
      </Block>

      <Block title="How We Track Progress">
        <CardGrid items={TRACK} />
      </Block>

      <Block title="Training Packages">
        <div className="nt-grid4 sv-plans">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 120} variant="zoom">
              <article className={`nt-card sv-plan ${p.pop ? "popular" : ""}`}>
                {p.pop && <span className="sv-ribbon">Most popular</span>}
                <h4>{p.name}</h4>
                <p className="sv-sessions">{p.sessions}</p>
                <ul className="sv-perks">
                  {p.perks.map((x) => <li key={x}><Check />{x}</li>)}
                </ul>
                <a href="/contact" className="sv-plan-btn">Ask for pricing</a>
              </article>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block title="How Training Works">
        <Steps items={STEPS} />
      </Block>

      <Block title="Common Questions">
        <Faq items={FAQ} />
      </Block>

      <Cta
        title="Start your first session"
        text="Meet a certified trainer and get a plan designed around your goals."
        label="Book a session"
      />
    </ServicePage>
  );
}