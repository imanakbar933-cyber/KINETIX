
import { useEffect, useState } from "react";
import { ServicePage, Block, Steps, TipList, Cta, Reveal, Icon, Check } from "./ServiceKit";

/* SAMPLE CONTENT: Actual facilities and cleaning timings should be confirmed. */

const MARQUEE = [
  "Fresh Start",
  "Clean Changing Areas",
  "Member Comfort",
  "Daily Hygiene",
  "Workout Essentials",
  "Stay Fresh"
];

const STATS = [
  { value: 3, suffix: "", label: "Gym bag essentials" },
  { value: 4, suffix: "", label: "Facility areas to explore" },
  { value: 5, suffix: " min", label: "Suggested cool-down" },
  { value: 100, suffix: "%", label: "Commitment to cleanliness" },
];

const AREAS = [
  {
    id: "lockers",
    label: "Lockers",
    icon: "lock",
    title: "Member Storage",
    text: "Keep your personal belongings organised while you focus on your workout. Ask the front desk about the available locker arrangements.",
    features: [
      "Storage for personal gym belongings",
      "Keep bags and shoes organised",
      "Ask staff about locker availability",
      "Take your valuables with you when leaving",
    ],
  },
  {
    id: "showers",
    label: "Showers",
    icon: "drop",
    title: "Freshen Up After Training",
    text: "A refreshing post-workout routine can help you feel comfortable before heading back to your daily activities.",
    features: [
      "Check shower availability with staff",
      "Bring your own towel and toiletries",
      "Keep the shower area clean after use",
      "Use personal shower sandals",
    ],
  },
  {
    id: "changing",
    label: "Changing Area",
    icon: "users",
    title: "Changing Areas",
    text: "Get ready before your session and change comfortably after training. Please follow the gym's arrangements for designated changing spaces.",
    features: [
      "Space to change workout clothes",
      "Keep personal belongings organised",
      "Respect other members' privacy",
      "Leave the area clean after use",
    ],
  },
  {
    id: "extras",
    label: "Extras",
    icon: "sparkle",
    title: "Workout Essentials",
    text: "A few simple essentials can make your gym visit more comfortable and help you stay prepared for every training session.",
    features: [
      "Bring your own water bottle",
      "Carry a clean workout towel",
      "Keep personal hygiene products handy",
      "Use a separate bag for used clothes",
    ],
  },
];

const BAG = [
  "Padlock",
  "Towel",
  "Change of clothes",
  "Shower sandals",
  "Toiletries",
  "Deodorant",
  "Water bottle",
  "Bag for wet clothes"
];

const STEPS = [
  {
    when: "Step 01",
    title: "Cool Down",
    text: "Spend five minutes walking slowly or doing light stretches after your workout.",
  },
  {
    when: "Step 02",
    title: "Freshen Up",
    text: "Change out of sweaty clothes and use the available facilities according to gym guidelines.",
  },
  {
    when: "Step 03",
    title: "Stay Clean",
    text: "Dry yourself properly, keep your personal items organised, and leave shared spaces clean.",
  },
  {
    when: "Step 04",
    title: "Rehydrate",
    text: "Drink water after training and enjoy a balanced meal or snack as part of your recovery routine.",
  },
];

const TIPS = [
  {
    title: "Keep Your Belongings Safe",
    text: "Use the available storage arrangements and avoid leaving valuables unattended.",
  },
  {
    title: "Bring Your Own Towel",
    text: "Carry a clean towel for your workout and personal use.",
  },
  {
    title: "Maintain Personal Hygiene",
    text: "Wear clean clothes and suitable footwear when using shared facilities.",
  },
  {
    title: "Respect Shared Spaces",
    text: "Keep changing areas tidy and inform staff if you notice any maintenance issue.",
  },
];

function CleanClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsed = now.getMinutes() * 60 + now.getSeconds();
  const left = 3600 - elapsed;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const C = 2 * Math.PI * 54;
  const last = new Date(now);
  last.setMinutes(0, 0, 0);

  return (
    <div className="sv-clock">
      <div className="sv-clock-ring">
        <svg viewBox="0 0 140 140" aria-hidden="true">
          <circle cx="70" cy="70" r="54" className="nt-ring-bg" />
          <circle
            cx="70"
            cy="70"
            r="54"
            className="sv-ring"
            strokeDasharray={`${C * (elapsed / 3600)} ${C}`}
          />
        </svg>
        <div className="sv-clock-mid">
          <strong>{mm}:{ss}</strong>
          <span>hour timer</span>
        </div>
      </div>
      <p className="sv-clock-note">
        This is an example timer, not a live gym cleaning schedule.
      </p>
    </div>
  );
}

export default function LockerRooms() {
  const [tab, setTab] = useState("lockers");
  const [packed, setPacked] = useState([]);

  const area = AREAS.find((a) => a.id === tab);

  const toggle = (item) =>
    setPacked((p) =>
      p.includes(item) ? p.filter((x) => x !== item) : [...p, item]
    );

  const done = packed.length === BAG.length;

  return (
    <ServicePage
      id="locker-rooms"
      marquee={MARQUEE}
      kicker="Your Comfort Matters"
      title="Stay Fresh Before And"
      accent="After Training"
      lead="A comfortable gym visit starts with good preparation. Explore changing-area guidance, useful workout essentials, and simple ways to maintain personal hygiene."
      stats={STATS}
    >
      <Block title="Explore The Facilities">
        <Reveal className="nt-tabs sv-scroll" delay={100}>
          {AREAS.map((a) => (
            <button
              key={a.id}
              type="button"
              className={tab === a.id ? "on" : ""}
              onClick={() => setTab(a.id)}
            >
              {a.label}
            </button>
          ))}
        </Reveal>

        <Reveal className="nt-panel sv-explore" key={tab} delay={0}>
          <div className="sv-explore-text">
            <h4>{area.title}</h4>
            <p>{area.text}</p>
            <ul className="sv-feats">
              {area.features.map((f, i) => (
                <li key={f} style={{ "--i": i }}>
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="sv-explore-icon" aria-hidden="true">
            <Icon name={area.icon} size={96} />
          </div>
        </Reveal>
      </Block>

      <Block title="Stay Prepared For Your Workout">
        <div className="nt-two">
          <Reveal className="nt-panel" variant="left">
            <h3 className="nt-h3 sm">Hourly Timer</h3>
            <CleanClock />
          </Reveal>

          <Reveal className="nt-panel" variant="right" delay={150}>
            <h3 className="nt-h3 sm">Pack Your Gym Bag</h3>
            <p className="nt-muted">Tap what you have already packed.</p>

            <div className="sv-chips">
              {BAG.map((b) => (
                <button
                  key={b}
                  type="button"
                  className={`sv-chip ${packed.includes(b) ? "on" : ""}`}
                  onClick={() => toggle(b)}
                >
                  <b>{b}</b>
                </button>
              ))}
            </div>

            <div className="nt-track big">
              <div
                className="nt-fill"
                style={{
                  width: `${(packed.length / BAG.length) * 100}%`,
                  transitionDelay: "0ms",
                }}
              />
            </div>

            <p className="nt-water-text">
              <b>{packed.length}</b> of {BAG.length} packed{" "}
              {done && <em>Bag ready</em>}
            </p>
          </Reveal>
        </div>
      </Block>

      <Block title="Your Post-Workout Routine">
        <Steps items={STEPS} />
      </Block>

      <Block title="Locker Room Tips">
        <TipList items={TIPS} />
      </Block>

      <Cta
        title="Train hard, stay fresh"
        text="Make every gym visit count with good preparation and healthy workout habits."
        label="Join the club"
      />
    </ServicePage>
  );
}
