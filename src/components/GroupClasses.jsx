import { useState } from "react";
import { ServicePage, Block, Steps, TipList, Cta, Reveal } from "./ServiceKit";

/* NOTE: timetable, spots aur stats SAMPLE hain. Apna asal schedule yahan edit karein. */
const MARQUEE = [
  "Train Together",
  "Yoga Sessions",
  "Zumba Fitness",
  "HIIT Training",
  "All Fitness Levels",
  "Stronger Every Day"
];

const STATS = [
  { value: 20, suffix: "", label: "Scheduled classes per week" },
  { value: 3, suffix: "", label: "Group class styles" },
  { value: 45, suffix: "–60 min", label: "Average class duration" },
  { value: 7, suffix: "", label: "Days with scheduled classes" },
];
const TYPES = ["All", "Yoga", "Zumba", "HIIT"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const c = (id, time, name, type, level, mins, int, spots) => ({ id, time, name, type, level, mins, int, spots });
const SCHEDULE = [
  // MONDAY
  [
    c("m1", "7:00 AM", "Morning Yoga Flow", "Yoga", "Beginner", 60, 1, 12),
    c("m2", "5:30 PM", "Zumba Fitness", "Zumba", "All levels", 45, 3, 10),
    c("m3", "7:00 PM", "HIIT Conditioning", "HIIT", "Intermediate", 45, 4, 8),
  ],

  // TUESDAY
  [
    c("t1", "7:00 AM", "HIIT Express", "HIIT", "Beginner", 45, 3, 12),
    c("t2", "5:30 PM", "Evening Yoga", "Yoga", "All levels", 60, 2, 10),
    c("t3", "7:00 PM", "Zumba Toning", "Zumba", "All levels", 45, 3, 11),
  ],

  // WEDNESDAY
  [
    c("w1", "7:00 AM", "Gentle Yoga", "Yoga", "Beginner", 45, 1, 14),
    c("w2", "5:30 PM", "HIIT Circuit", "HIIT", "Intermediate", 45, 4, 8),
    c("w3", "7:00 PM", "Zumba Dance Fitness", "Zumba", "All levels", 45, 3, 12),
  ],

  // THURSDAY
  [
    c("h1", "7:00 AM", "Morning HIIT", "HIIT", "All levels", 45, 3, 10),
    c("h2", "5:30 PM", "Power Yoga", "Yoga", "Intermediate", 60, 3, 9),
    c("h3", "7:00 PM", "Zumba Cardio", "Zumba", "All levels", 45, 3, 12),
  ],

  // FRIDAY
  [
    c("f1", "5:00 PM", "Evening HIIT", "HIIT", "Intermediate", 45, 4, 8),
    c("f2", "6:15 PM", "Friday Zumba", "Zumba", "All levels", 45, 3, 12),
    c("f3", "7:15 PM", "Relaxing Yoga", "Yoga", "Beginner", 60, 1, 14),
  ],

  // SATURDAY
  [
    c("s1", "8:00 AM", "Weekend Yoga Flow", "Yoga", "All levels", 60, 2, 14),
    c("s2", "9:30 AM", "Zumba Weekend Session", "Zumba", "All levels", 45, 3, 12),
    c("s3", "11:00 AM", "Weekend HIIT Challenge", "HIIT", "Advanced", 45, 5, 8),
  ],

  // SUNDAY
  [
    c("u1", "9:00 AM", "Beginner Yoga", "Yoga", "Beginner", 60, 1, 15),
    c("u2", "10:30 AM", "Beginner HIIT", "HIIT", "Beginner", 45, 2, 12),
  ],
];
const STYLES = [
  {
    name: "Yoga",
    tag: "Flexibility & Balance",
    text: "Improve flexibility, balance, breathing, and core strength through guided yoga movements. Suitable for members who prefer a controlled and focused workout.",
    burn: "Low to moderate intensity",
    int: 2,
  },
  {
    name: "Zumba",
    tag: "Dance-Based Cardio",
    text: "Enjoy energetic dance-based workouts that combine music, movement, and cardio exercise. A fun way to stay active while improving stamina and coordination.",
    burn: "Moderate to high intensity",
    int: 4,
  },
  {
    name: "HIIT",
    tag: "High-Intensity Training",
    text: "Combine short periods of challenging exercise with recovery breaks. HIIT sessions can improve cardiovascular fitness and overall conditioning.",
    burn: "High intensity",
    int: 5,
  },
];

const STEPS = [
  {
    when: "10 min",
    title: "Warm-Up",
    text: "Start with light movements and mobility exercises to prepare your body for the session.",
  },
  {
    when: "30–40 min",
    title: "Main Workout",
    text: "Follow the instructor through the planned exercises, with easier and more challenging variations where needed.",
  },
  {
    when: "5–10 min",
    title: "Cool-Down",
    text: "Finish with gentle movements, stretching, and controlled breathing.",
  },
  {
    when: "After Class",
    title: "Recovery",
    text: "Drink water, allow your body to recover, and follow your usual balanced nutrition routine.",
  },
];
const TIPS = [
  {
    title: "Arrive 10 minutes early",
    text: "Get familiar with the class area and speak with the instructor if you are new.",
  },
  {
    title: "Bring a water bottle and towel",
    text: "Stay hydrated and keep a towel with you during your workout.",
  },
  {
    title: "Wear comfortable workout clothes",
    text: "Choose suitable sportswear and footwear that allow you to move comfortably.",
  },
  {
    title: "Start at your own fitness level",
    text: "Do not rush into difficult movements. Follow the beginner variations and gradually improve.",
  },
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
      kicker="Group Fitness at KINETIX"
title="Train Together and Keep"
accent="Getting Stronger"
lead="Join guided Yoga, Zumba, and HIIT sessions at KINETIX. Explore the weekly timetable, choose a workout style, and find a class that matches your fitness level."
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
  title="Ready for your first group class?"
  text="Choose a session, bring your workout essentials, and take the next step in your fitness journey."
  label="Join a class"
/>
    </ServicePage>
  );
}