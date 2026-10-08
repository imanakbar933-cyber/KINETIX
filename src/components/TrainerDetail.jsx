import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import TrainerHero from "../components/TrainerHero";
import "./TrainerDetail.css";

/* =========================================================
   ✅ SAARE TRAINERS KA DATA
   ========================================================= */

const trainersData = [
  {
    id: 1,
    name: "HENRY STUART",
    image: "/images/trainer1.jpg",
    role: "Fitness Coach & Class Instructor",
    about:
      "Clip scrolling overflow prototype align auto. Create invite team bold rotate variant. Distribute image overflow pen re-sizing edit rotate outline create bricolage. Comment boolean font create connection selection strikethrough font auto.",
    skills: [
      { name: "High-Intensity Interval Training (HIIT)", percent: 96 },
      { name: "Circuit Training", percent: 80 },
      { name: "Boot Camp-style Workouts", percent: 90 },
    ],
    experience:
      "Henry Stuart brings over 10 years of fitness coaching experience to KINETIX. His journey started as a personal trainer, where he honed his skills in creating personalized workout plans tailored to individual goals.",
  },
  {
    id: 2,
    name: "JAMES CARTER",
    image: "/images/trainer2.jpg",
    role: "HIIT Specialist",
    about:
      "Certified HIIT trainer with 8 years of experience. Passionate about pushing limits and building endurance through intense interval training.",
    skills: [
      { name: "HIIT Protocols", percent: 95 },
      { name: "Endurance Training", percent: 88 },
      { name: "Strength Conditioning", percent: 82 },
    ],
    experience:
      "James Carter is a HIIT specialist with a decade of experience helping athletes and beginners achieve peak performance.",
  },
  {
    id: 3,
    name: "MIKE RODRIGUEZ",
    image: "/images/trainer3.jpg",
    role: "Bodybuilding Coach",
    about:
      "Bodybuilding coach focused on muscle building, nutrition, and competition preparation for athletes of all levels.",
    skills: [
      { name: "Muscle Building", percent: 94 },
      { name: "Nutrition Planning", percent: 90 },
      { name: "Competition Prep", percent: 87 },
    ],
    experience:
      "Mike Rodriguez has coached multiple championship-winning bodybuilders. His method combines science-backed training with nutrition precision.",
  },
  {
    id: 4,
    name: "DAVID KHAN",
    image: "/images/trainer4.jpg",
    role: "CrossFit Trainer",
    about:
      "CrossFit Level 2 trainer who loves functional fitness and community-driven workouts.",
    skills: [
      { name: "Olympic Lifting", percent: 92 },
      { name: "Functional Fitness", percent: 95 },
      { name: "Mobility", percent: 85 },
    ],
    experience:
      "David Khan has been involved in CrossFit for over 7 years, coaching athletes at every level from beginners to regional competitors.",
  },
  {
    id: 5,
    name: "ALEX BROWN",
    image: "/images/trainer5.jpg",
    role: "Yoga & Mobility",
    about:
      "Yoga and mobility coach helping clients improve flexibility, recovery, and mental focus.",
    skills: [
      { name: "Vinyasa Yoga", percent: 93 },
      { name: "Mobility Training", percent: 89 },
      { name: "Breathwork", percent: 86 },
    ],
    experience:
      "Alex Brown has been practicing yoga for over 12 years and teaching for 8. His classes focus on balance between strength and flexibility.",
  },
];

/* =========================================================
   TRAINER DETAIL PAGE
   ========================================================= */

function TrainerDetail() {
  const { id } = useParams();
  const trainer = trainersData.find((t) => t.id === Number(id));

  // Agar galat ID ho toh
  if (!trainer) {
    return (
      <div className="trainer-not-found">
        <h1>Trainer Not Found</h1>
        <Link to="/about">← Back to About</Link>
      </div>
    );
  }

  return (
    <div className="trainer-detail-page">

      {/* ===== HERO SECTION ===== */}
      <TrainerHero trainer={trainer} />

      {/* ===== DETAILS SECTION ===== */}
      <section className="trainer-detail">
        <div className="trainer-detail-container">

          {/* ===== LEFT SIDE — IMAGE ===== */}
          <motion.div
            className="trainer-detail-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="trainer-detail-image">
              <img src={trainer.image} alt={trainer.name} />
            </div>

            <div className="trainer-experience">
              <h3>EXPERIENCE</h3>
              <p>{trainer.experience}</p>
            </div>
          </motion.div>

          {/* ===== RIGHT SIDE — INFO ===== */}
          <motion.div
            className="trainer-detail-right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <h1 className="trainer-detail-name">{trainer.name}</h1>
            <p className="trainer-detail-role">{trainer.role}</p>
            <p className="trainer-detail-about">{trainer.about}</p>

            <h3 className="trainer-section-title">EXPERIENCE & EXPERTISE</h3>

            <div className="trainer-skills">
              {trainer.skills.map((skill, i) => (
                <div className="skill-row" key={i}>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percent">{skill.percent}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percent}%` }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.3 + i * 0.15,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="trainer-socials">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">◉</a>
              <a href="#" aria-label="Twitter">✕</a>
            </div>

            <h3 className="trainer-section-title">CONTACT ME</h3>

            <form className="trainer-contact-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Full name *" />
              <input type="email" placeholder="Email*" />
              <textarea rows="4" placeholder="Message *"></textarea>
              <button type="submit">Join Me Now</button>
            </form>

          </motion.div>

        </div>
      </section>
    </div>
  );
}

export default TrainerDetail;