
import { useState } from "react";
import {
  ServicePage,
  Block,
  CardGrid,
  Steps,
  Faq,
  Cta,
  Reveal,
  Check,
} from "./ServiceKit";

/* Sample content: confirm actual gym services and packages before publishing. */

const MARQUEE = [
  "Personal Training",
  "Your Fitness Goals",
  "Correct Form",
  "Workout Planning",
  "Track Your Progress",
  "Train Consistently",
];

const STATS = [
  { value: 60, suffix: " min", label: "Suggested session" },
  { value: 12, suffix: " wk", label: "Example program cycle" },
  { value: 4, suffix: "", label: "Fitness goals" },
  { value: 3, suffix: "", label: "Sample packages" },
];

const GOALS = [
  {
    id: "fat",
    label: "Fat Loss",
    note: "Improve fitness and manage weight",
    rule: "Combine strength training, suitable cardio and a balanced routine. Exercise intensity should match your fitness level.",
  },
  {
    id: "muscle",
    label: "Muscle Gain",
    note: "Build muscle and strength",
    rule: "Focus on controlled resistance exercises, suitable training volume and gradual progression with enough recovery.",
  },
  {
    id: "strength",
    label: "Strength",
    note: "Improve lifting performance",
    rule: "Prioritise correct technique, manageable weights, sufficient rest and gradual increases in training load.",
  },
  {
    id: "fit",
    label: "General Fitness",
    note: "Stay active and feel stronger",
    rule: "Build a balanced weekly routine with strength exercises, cardio and mobility work.",
  },
];

const MOVES = {
  Push: ["Bench press", "Shoulder press", "Triceps pushdown"],
  Pull: ["Barbell row", "Lat pulldown", "Biceps curl"],
  Legs: ["Squats", "Lunges", "Hamstring curl"],
  Upper: ["Incline press", "Seated row", "Lateral raise"],
  Lower: ["Squats", "Romanian deadlift", "Calf raise"],
  "Full Body": ["Squats", "Chest press", "Rows and core"],
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
  {
    tag: "Body",
    name: "Body Measurements",
    text: "Track weight and selected body measurements over time to understand changes.",
    note: "Example: every 4 weeks",
  },
  {
    tag: "Performance",
    name: "Strength Log",
    text: "Record exercises, weights and repetitions to monitor training performance.",
    note: "Updated during training",
  },
  {
    tag: "Technique",
    name: "Exercise Form",
    text: "Review exercise technique, movement control and mobility as training progresses.",
    note: "Reviewed during sessions",
  },
  {
    tag: "Lifestyle",
    name: "Healthy Habits",
    text: "Discuss sleep, daily activity and balanced eating habits that support fitness.",
    note: "Discussed during check-ins",
  },
];

const PLANS = [
  {
    name: "Starter",
    sessions: "4 sessions / month",
    perks: [
      "Initial fitness discussion",
      "Basic workout plan",
      "Exercise form guidance",
    ],
    pop: false,
  },
  {
    name: "Standard",
    sessions: "8 sessions / month",
    perks: [
      "Starter package features",
      "Progress review",
      "Workout plan adjustments",
    ],
    pop: true,
  },
  {
    name: "Intensive",
    sessions: "12 sessions / month",
    perks: [
      "Standard package features",
      "More frequent coaching sessions",
      "Regular training plan reviews",
    ],
    pop: false,
  },
];

const STEPS = [
  {
    when: "Step 01",
    title: "Initial Assessment",
    text: "Discuss your fitness goals, current activity level, training experience and any relevant limitations.",
  },
  {
    when: "Step 02",
    title: "Your Workout Plan",
    text: "Prepare a suitable workout routine based on your goals, available time and fitness level.",
  },
  {
    when: "Step 03",
    title: "Training Sessions",
    text: "Practise exercises with guidance on technique, movement control and appropriate training intensity.",
  },
  {
    when: "Step 04",
    title: "Progress Review",
    text: "Review your training consistency and performance, then adjust your routine where needed.",
  },
];

const FAQ = [
  {
    q: "Do I need experience to start personal training?",
    a: "No. Beginners can start with basic exercises and gradually learn correct technique at a suitable pace.",
  },
  {
    q: "How many sessions per week should I take?",
    a: "It depends on your fitness level, schedule and recovery. Many people start with 2 to 3 sessions per week and adjust their routine over time.",
  },
  {
    q: "What if I have an injury or health condition?",
    a: "Inform the trainer before starting. You may need medical advice or clearance before doing certain exercises. Training should be adjusted to your circumstances.",
  },
  {
    q: "How long does it take to see progress?",
    a: "Progress varies from person to person. Training consistency, nutrition, sleep, starting fitness level and recovery all play a role. There is no guaranteed timeline.",
  },
  {
    q: "Can I choose my own training days?",
    a: "Your weekly routine can be planned around your availability, recovery needs and the gym's actual trainer schedule.",
  },
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
      kicker="PERSONAL TRAINING AT KINETIX"
      title="Training Designed Around"
      accent="Your Goals"
      lead="Everyone has a different fitness journey. Choose your goal and weekly training availability to explore a sample workout routine. Your trainer can help adjust it according to your fitness level and progress."
      stats={STATS}
    >
      <Block title="Build Your Weekly Workout">
        <div className="nt-calc">
          <Reveal className="nt-panel" variant="left" delay={100}>
            <div className="nt-field">
              <label>Your Fitness Goal</label>

              <div className="nt-opts sv-opts2">
                {GOALS.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    className={goal === x.id ? "on" : ""}
                    onClick={() => setGoal(x.id)}
                  >
                    <b>{x.label}</b>
                    <small>{x.note}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="nt-field">
              <label>
                Training Days Per Week <b>{days} days</b>
              </label>

              <div className="nt-seg">
                {[2, 3, 4, 5, 6].map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={days === d ? "on" : ""}
                    onClick={() => setDays(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="nt-panel nt-result" variant="right" delay={200}>
            <h4 className="sv-sub">Your Weekly Plan</h4>

            <ul className="sv-glance">
              <li>
                <span>Training Sessions</span>
                <b>{days}</b>
              </li>
              <li>
                <span>Non-Training Days</span>
                <b>{7 - days}</b>
              </li>
              <li>
                <span>Suggested Session Length</span>
                <b>~60 min</b>
              </li>
            </ul>

            <div className="sv-rule" key={goal}>
              <strong>{g.label} Focus</strong>
              <p>{g.rule}</p>
            </div>

            <p className="nt-note">
              {days >= 5
                ? "A higher training frequency needs suitable recovery and should match your experience level."
                : "A manageable weekly routine can help you build consistency while allowing time for recovery."}
            </p>
          </Reveal>
        </div>

        <div className="sv-week" key={days}>
          {WEEK.map((d, i) => {
            const at = sessionAt(i);
            const name = at >= 0 ? split.names[at] : null;

            return (
              <div
                className={`sv-day ${name ? "train" : "rest"}`}
                key={d}
                style={{ "--i": i }}
              >
                <span className="sv-day-name">{d}</span>

                {name ? (
                  <>
                    <strong>{name}</strong>
                    <ul>
                      {MOVES[name].map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <em>Rest and recover</em>
                )}
              </div>
            );
          })}
        </div>
      </Block>

      <Block title="How We Track Your Progress">
        <CardGrid items={TRACK} />
      </Block>

      <Block title="Personal Training Packages">
        <div className="nt-grid4 sv-plans">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 120} variant="zoom">
              <article className={`nt-card sv-plan ${p.pop ? "popular" : ""}`}>
                {p.pop && <span className="sv-ribbon">Popular Option</span>}

                <h4>{p.name}</h4>

                <p className="sv-sessions">{p.sessions}</p>

                <ul className="sv-perks">
                  {p.perks.map((x) => (
                    <li key={x}>
                      <Check />
                      {x}
                    </li>
                  ))}
                </ul>

                <a href="/contact" className="sv-plan-btn">
                  Ask for Pricing
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block title="How Personal Training Works">
        <Steps items={STEPS} />
      </Block>

      <Block title="Frequently Asked Questions">
        <Faq items={FAQ} />
      </Block>

      <Cta
        title="Take the First Step"
        text="Discuss your fitness goals with the KINETIX team and explore a training routine that suits your schedule."
        label="Contact KINETIX"
      />
    </ServicePage>
  );
}
