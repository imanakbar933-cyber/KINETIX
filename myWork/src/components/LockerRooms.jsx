import { useEffect, useState } from "react";
import { ServicePage, Block, Steps, TipList, Cta, Reveal, Icon, Check } from "./ServiceKit";

/* NOTE: stats, features aur cleaning cycle sample hain. Apne gym ke asal facts yahan likhein. */
const MARQUEE = ["Fresh Start", "Hot Showers", "Secure Lockers", "Spotless Daily", "Towel Ready", "Hygiene First"];

const STATS = [
  { value: 120, suffix: "+", label: "Lockers" },
  { value: 12, suffix: "", label: "Shower stalls" },
  { value: 60, suffix: " min", label: "Cleaning cycle" },
  { value: 2, suffix: "", label: "Separate changing zones" },
];

const AREAS = [
  {
    id: "lockers", label: "Lockers", icon: "lock", title: "Secure lockers",
    text: "Leave your bag, shoes and valuables safely while you train, right next to the gym floor.",
    features: ["Spacious lockers for bag, shoes and clothes", "Simple, reliable locking", "Close to the training floor", "Cleaned and aired regularly"],
  },
  {
    id: "showers", label: "Showers", icon: "drop", title: "Hot showers",
    text: "Clean, private stalls with steady hot water, so you can leave feeling fresh.",
    features: ["Hot water all day", "Private shower stalls", "Non-slip floors", "Modern, spotless fixtures"],
  },
  {
    id: "changing", label: "Changing Area", icon: "users", title: "Changing zones",
    text: "Roomy, well-lit areas with benches and hooks, separated for comfort and privacy.",
    features: ["Separate areas for men and women", "Benches and hooks", "Good lighting and mirrors", "Space even at busy hours"],
  },
  {
    id: "extras", label: "Extras", icon: "sparkle", title: "Little extras",
    text: "Small things that make the post-workout routine easier.",
    features: ["Hair-dryer stations", "Water refill points", "Vanity counters", "Towel service (ask the front desk)"],
  },
];

const BAG = ["Padlock", "Towel", "Change of clothes", "Shower sandals", "Toiletries", "Deodorant", "Water bottle", "Bag for wet clothes"];

const STEPS = [
  { when: "Step 01", title: "Cool down", text: "Walk or stretch for five minutes so your heart rate settles before the shower." },
  { when: "Step 02", title: "Shower", text: "Wash off sweat promptly. Warm water feels good, but finish with a cooler rinse." },
  { when: "Step 03", title: "Dry fully", text: "Dry well between your toes and in skin folds to avoid fungal infections." },
  { when: "Step 04", title: "Rehydrate", text: "Drink water and have a snack or smoothie within an hour." },
];
const TIPS = [
  { title: "Lock up your valuables", text: "Phone, wallet and keys belong in the locker, not on a bench." },
  { title: "Keep wet items bagged", text: "A plastic bag keeps your gym bag fresh and your clothes dry." },
  { title: "Wear shower sandals", text: "They protect your feet in any shared wet area." },
  { title: "Tell staff about problems", text: "A leak, a broken lock or a spill gets fixed faster when we know." },
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
          <circle cx="70" cy="70" r="54" className="sv-ring" strokeDasharray={`${C * (elapsed / 3600)} ${C}`} />
        </svg>
        <div className="sv-clock-mid">
          <strong>{mm}:{ss}</strong>
          <span>until next clean</span>
        </div>
      </div>
      <p className="sv-clock-note">
        Last cleaned at <b>{last.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</b>. We clean and restock every hour.
      </p>
    </div>
  );
}

export default function LockerRooms() {
  const [tab, setTab] = useState("lockers");
  const [packed, setPacked] = useState([]);
  const area = AREAS.find((a) => a.id === tab);
  const toggle = (item) => setPacked((p) => (p.includes(item) ? p.filter((x) => x !== item) : [...p, item]));
  const done = packed.length === BAG.length;

  return (
    <ServicePage
      id="locker-rooms"
      marquee={MARQUEE}
      kicker="Walk In Sweaty, Walk Out Fresh"
      title="Clean, Modern Locker Rooms And"
      accent="Showers"
      lead="Your workout does not end at the last rep. Explore our changing areas, see when we clean next, and pack your bag like a pro."
      stats={STATS}
    >
      <Block title="Explore The Facilities">
        <Reveal className="nt-tabs sv-scroll" delay={100}>
          {AREAS.map((a) => (
            <button key={a.id} type="button" className={tab === a.id ? "on" : ""} onClick={() => setTab(a.id)}>
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
                <li key={f} style={{ "--i": i }}><Check />{f}</li>
              ))}
            </ul>
          </div>
          <div className="sv-explore-icon" aria-hidden="true">
            <Icon name={area.icon} size={96} />
          </div>
        </Reveal>
      </Block>

      <Block title="Hourly Cleaning And Your Gym Bag">
        <div className="nt-two">
          <Reveal className="nt-panel" variant="left">
            <h3 className="nt-h3 sm">Cleaning Cycle</h3>
            <CleanClock />
          </Reveal>

          <Reveal className="nt-panel" variant="right" delay={150}>
            <h3 className="nt-h3 sm">Pack Your Gym Bag</h3>
            <p className="nt-muted">Tap what you have already packed.</p>
            <div className="sv-chips">
              {BAG.map((b) => (
                <button key={b} type="button" className={`sv-chip ${packed.includes(b) ? "on" : ""}`} onClick={() => toggle(b)}>
                  <b>{b}</b>
                </button>
              ))}
            </div>
            <div className="nt-track big"><div className="nt-fill" style={{ width: `${(packed.length / BAG.length) * 100}%`, transitionDelay: "0ms" }} /></div>
            <p className="nt-water-text">
              <b>{packed.length}</b> of {BAG.length} packed {done && <em>Bag ready</em>}
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
        title="Train hard, leave fresh"
        text="Visit us and see the changing rooms for yourself."
        label="Join the club"
      />
    </ServicePage>
  );
}