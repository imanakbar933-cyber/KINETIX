
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import TrainerHero from "../components/TrainerHero";
import "./TrainerDetail.css";

/* =========================================================
   KINETIX TRAINERS DATA
   Sample Pakistani trainer profiles
   ========================================================= */

const trainersData = [
  {
    id: 1,
    name: "AHMED RAZA",
    image: "/images/trainer1.jpg",
    role: "Fitness Coach & Class Instructor",
    about:
      "Ahmed Raza focuses on helping members build strength, improve fitness and develop consistent workout habits. He works with beginners and regular gym members, adapting training sessions according to their fitness levels and personal goals.",
    skills: [
      { name: "Strength Training", percent: 92 },
      { name: "HIIT Workouts", percent: 86 },
      { name: "Fitness Conditioning", percent: 90 },
    ],
    experience:
      "Ahmed focuses on structured workout routines, proper exercise form and gradual fitness progression. His coaching approach encourages members to stay consistent while working towards realistic fitness goals.",
  },
  {
    id: 2,
    name: "BILAL KHAN",
    image: "/images/trainer2.jpg",
    role: "Strength & Conditioning Coach",
    about:
      "Bilal Khan has a strong interest in strength development and resistance training. His sessions focus on improving exercise technique, building strength and helping members follow a balanced training routine.",
    skills: [
      { name: "Weight Training", percent: 94 },
      { name: "Strength Conditioning", percent: 90 },
      { name: "Muscle Development", percent: 88 },
    ],
    experience:
      "Bilal emphasizes correct lifting techniques, suitable exercise selection and progressive training. He aims to make strength training approachable for members with different fitness backgrounds.",
  },
  {
    id: 3,
    name: "FATIMA ALI",
    image: "/images/trainer3.jpg",
    role: "Group Fitness Instructor",
    about:
      "Fatima Ali is interested in group fitness, mobility and beginner-friendly exercise sessions. She encourages members to stay active, improve flexibility and build a regular fitness routine in a supportive environment.",
    skills: [
      { name: "Group Fitness", percent: 91 },
      { name: "Mobility Training", percent: 88 },
      { name: "Flexibility Exercises", percent: 93 },
    ],
    experience:
      "Fatima focuses on accessible movement sessions and structured group workouts. Her approach emphasizes participation, controlled movements and adapting exercises to different ability levels.",
  },
  {
    id: 4,
    name: "USMAN TARIQ",
    image: "/images/trainer4.jpg",
    role: "Functional Fitness Coach",
    about:
      "Usman Tariq focuses on functional exercises that support everyday movement, balance and overall physical conditioning. His training approach combines bodyweight exercises, controlled movements and strength-based activities.",
    skills: [
      { name: "Functional Training", percent: 91 },
      { name: "Bodyweight Exercises", percent: 89 },
      { name: "Movement Conditioning", percent: 86 },
    ],
    experience:
      "Usman emphasizes practical movement patterns, exercise control and balanced conditioning. His sessions are designed around the member's current ability and training objectives.",
  },
  {
    id: 5,
    name: "HAMZA SHEIKH",
    image: "/images/trainer5.jpg",
    role: "Muscle Building Coach",
    about:
      "Hamza Sheikh focuses on resistance training and muscle development. He helps members understand workout structure, exercise selection and the importance of consistency in strength-focused fitness routines.",
    skills: [
      { name: "Muscle Building", percent: 93 },
      { name: "Resistance Training", percent: 95 },
      { name: "Workout Planning", percent: 88 },
    ],
    experience:
      "Hamza's coaching approach focuses on structured resistance workouts, proper exercise form and gradual progression. He encourages members to combine regular training with balanced nutrition and adequate recovery.",
  },
];

/* =========================================================
   TRAINER DETAIL PAGE
   ========================================================= */

function TrainerDetail() {
  const { id } = useParams();

  const trainer = trainersData.find(
    (t) => t.id === Number(id)
  );

  // Trainer not found
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

      {/* HERO SECTION */}
      <TrainerHero trainer={trainer} />

      {/* TRAINER DETAILS */}
      <section className="trainer-detail">
        <div className="trainer-detail-container">

          {/* LEFT SIDE - IMAGE & EXPERIENCE */}
          <motion.div
            className="trainer-detail-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="trainer-detail-image">
              <img
                src={trainer.image}
                alt={trainer.name}
              />
            </div>

            <div className="trainer-experience">
              <h3>TRAINING APPROACH</h3>
              <p>{trainer.experience}</p>
            </div>
          </motion.div>

          {/* RIGHT SIDE - TRAINER INFORMATION */}
          <motion.div
            className="trainer-detail-right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
          >
            <h1 className="trainer-detail-name">
              {trainer.name}
            </h1>

            <p className="trainer-detail-role">
              {trainer.role}
            </p>

            <p className="trainer-detail-about">
              {trainer.about}
            </p>

            <h3 className="trainer-section-title">
              TRAINING SKILLS
            </h3>

            {/* SKILL BARS */}
            <div className="trainer-skills">
              {trainer.skills.map((skill, i) => (
                <div className="skill-row" key={i}>

                  <div className="skill-info">
                    <span className="skill-name">
                      {skill.name}
                    </span>

                    <span className="skill-percent">
                      {skill.percent}%
                    </span>
                  </div>

                  <div className="skill-bar">
                    <motion.div
                      className="skill-fill"
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${skill.percent}%`,
                      }}
                      viewport={{
                        once: false,
                        amount: 0.3,
                      }}
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

            {/* SOCIAL LINKS */}
            <div className="trainer-socials">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">◉</a>
              <a href="#" aria-label="Twitter">✕</a>
            </div>

            {/* CONTACT FORM */}
            <h3 className="trainer-section-title">
              CONTACT ME
            </h3>

            <form
              className="trainer-contact-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Full name *"
                required
              />

              <input
                type="email"
                placeholder="Email address *"
                required
              />

              <textarea
                rows="4"
                placeholder="Write your message *"
                required
              ></textarea>

              <button type="submit">
                Join Me Now
              </button>
            </form>

          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default TrainerDetail;
