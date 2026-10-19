import { useState } from "react";
import { ServicePage, Block, Steps, TipList, Cta, Reveal } from "./ServiceKit";

/* NOTE: timetable, spots aur stats SAMPLE hain. Apna asal schedule yahan edit karein. */
const MARQUEE = ["Sweat Together", "Yoga", "Zumba", "HIIT", "All Levels Welcome", "Good Vibes Only"];

const STATS = [
  { value: 20, suffix: "+", label: "Classes every week" },
  { value: 3, suffix: "", label: "Class styles" },
  { value: 45, suffix: "–60 min", label: "Class length" },
  { value: 100, suffix: "%", label: "Beginner friendly options" },
];

const TYPES = ["All", "Yoga", "Zumba", "HIIT"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const c = (id, time, name, type, level, mins, int, spots) => ({ id, time, name, type, level, mins, int, spots });
const SCHEDULE = [
  [c("m1", "7:00 AM", "Morning Flow", "Yoga", "All levels", 60, 1, 12), c("m2", "6:00 PM", "Zumba Party", "Zumba", "All levels", 60, 3, 9), c("m3", "7:30 PM", "HIIT Burn", "HIIT", "Intermediate", 45, 5, 6)],
  [c("t1", "6:30 AM", "HIIT Express", "HIIT", "All levels", 45, 4, 10), c("t2", "5:30 PM", "Vinyasa Yoga", "Yoga", "Intermediate", 60, 2, 8), c("t3", "7:00 PM", "Zumba Toning", "Zumba", "All levels", 60, 3, 11)],
  [c("w1", "7:00 AM", "Gentle Yoga", "Yoga", "Beginner", 60, 1, 14), c("w2", "6:00 PM", "HIIT Circuit", "HIIT", "All levels", 45, 4, 7), c("w3", "7:30 PM", "Zumba Dance", "Zumba", "All levels", 60, 3, 12)],
  [c("h1", "6:30 AM", "Zumba Wake-Up", "Zumba", "All levels", 45, 3, 10), c("h2", "5:30 PM", "Power Yoga", "Yoga", "Intermediate", 60, 3, 8), c("h3", "7:00 PM", "HIIT Strength", "HIIT", "Intermediate", 45, 5, 5)],
  [c("f1", "7:00 AM", "HIIT Burn", "HIIT", "All levels", 45, 4, 9), c("f2", "6:00 PM", "Zumba Fiesta", "Zumba", "All levels", 60, 4, 13), c("f3", "7:30 PM", "Yin Yoga", "Yoga", "Beginner", 60, 1, 15)],
  [c("s1", "9:00 AM", "Yoga Flow", "Yoga", "All levels", 60, 2, 14), c("s2", "10:30 AM", "Zumba Cardio", "Zumba", "All levels", 60, 4, 12), c("s3", "12:00 PM", "HIIT Challenge", "HIIT", "Advanced", 45, 5, 8)],
  [c("u1", "9:00 AM", "Restorative Yoga", "Yoga", "Beginner", 60, 1, 15), c("u2", "10:30 AM", "Beginner HIIT", "HIIT", "Beginner", 45, 3, 12)],
];

const STYLES = [
  { name: "Yoga", tag: "Flexibility and calm", text: "Build mobility, balance and core strength while lowering stress. Gentle or powerful, you choose.", burn: "About 180–300 kcal per hour", int: 2 },
  { name: "Zumba", tag: "Dance cardio", text: "Latin-inspired dance workouts that feel like a party and quietly burn a lot of energy.", burn: "About 400–550 kcal per hour", int: 4 },
  { name: "HIIT", tag: "Fast and intense", text: "Short, hard intervals with rests. Great for fitness and fat loss when time is tight.", burn: "About 450–700 kcal per hour", int: 5 },
];

const STEPS = [
  { when: "10 min", title: "Warm-up", text: "Raise your heart rate and open up the joints you are about to use." },
  { when: "30–40 min", title: "Main session", text: "The class itself, with options to make every move easier or harder." },
  { when: "10 min", title: "Cool-down", text: "Stretch and slow your breathing so recovery starts straight away." },
  { when: "After", title: "Refuel", text: "Water, a snack or a smoothie to finish the job." },
];
const TIPS = [
  { title: "Arrive 10 minutes early", text: "Time to find a spot, meet your coach and mention any injuries." },
  { title: "Bring water and a towel", text: "Even a gentle class can leave you sweating." },
  { title: "Scale the moves", text: "Coaches show easier and harder versions. Pick the one that feels right today." },
  { title: "Try every style once", text: "You might love the class you expected to dislike." },
];

const Meter = ({ n }) => (
  <span className="sv-meter" aria-label={`Intensity ${n} of 5`}>
    {Array.from({ length: 5 }).map((_, i) => <i key={i} className={i < n ? "on" : ""} />)}
  </span>
);

export default function GroupClasses() {
  const [day, setDay] = useState(0);
  const [type, setType] = useState("All");
  const [reserved, setReserved] = useState([]);

  const list = SCHEDULE[day].filter((x) => type === "All" || x.type === type);
  const toggle = (id) => setReserved((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]));

  return (
    <ServicePage
      id="group-classes"
      marquee={MARQUEE}
      kicker="Train Together"
      title="Group Classes That Keep You"
      accent="Showing Up"
      lead="Yoga, Zumba and HIIT led by coaches who keep the energy high. Browse the week, filter by style and reserve your spot."
      stats={STATS}
    >
      <Block title="Weekly Timetable">
        <Reveal className="nt-tabs sv-scroll" delay={100}>
          {DAYS.map((d, i) => (
            <button key={d} type="button" className={day === i ? "on" : ""} onClick={() => setDay(i)}>{d}</button>
          ))}
        </Reveal>

        <Reveal className="nt-seg sv-filter" delay={150}>
          {TYPES.map((t) => (
            <button key={t} type="button" className={type === t ? "on" : ""} onClick={() => setType(t)}>{t}</button>
          ))}
        </Reveal>

        <div className="sv-classes" key={day + type}>
          {list.length === 0 && <p className="nt-muted">No {type} classes on this day. Try another day or style.</p>}
          {list.map((x, i) => {
            const isRes = reserved.includes(x.id);
            return (
              <article className={`sv-class ${isRes ? "reserved" : ""}`} key={x.id} style={{ "--i": i }}>
                <div className="sv-class-time">
                  <strong>{x.time}</strong>
                  <span>{x.mins} min</span>
                </div>
                <div className="sv-class-body">
                  <div className="sv-class-top">
                    <h4>{x.name}</h4>
                    <span className="nt-chip">{x.type}</span>
                  </div>
                  <div className="sv-class-meta">
                    <span>{x.level}</span>
                    <Meter n={x.int} />
                    <span>{x.spots - (isRes ? 1 : 0)} spots left</span>
                  </div>
                </div>
                <button type="button" className="sv-reserve" onClick={() => toggle(x.id)}>
                  {isRes ? "Reserved" : "Reserve"}
                </button>
              </article>
            );
          })}
        </div>
      </Block>

      <Block title="Pick Your Style">
        <div className="nt-grid4">
          {STYLES.map((s, i) => (
            <Reveal key={s.name} delay={i * 110} variant="zoom">
              <article className="nt-card">
                <span className="nt-chip">{s.tag}</span>
                <h4>{s.name}</h4>
                <p>{s.text}</p>
                <div className="sv-style-foot">
                  <span>Intensity <Meter n={s.int} /></span>
                  <small>{s.burn}</small>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="nt-note">Calorie figures are rough estimates and vary by person.</p>
      </Block>

      <Block title="What Happens In A Class">
        <Steps items={STEPS} />
      </Block>

      <Block title="First-Class Tips">
        <TipList items={TIPS} />
      </Block>

      <Cta
        title="Your first class is waiting"
        text="Pick a class, bring a friend and see why people keep coming back."
        label="Join a class"
      />
    </ServicePage>
  );
}