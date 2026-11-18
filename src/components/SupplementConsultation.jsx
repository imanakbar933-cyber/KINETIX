
import { useState } from "react";
import { ServicePage, Block, Steps, Faq, Cta, Reveal, Bar, Check } from "./ServiceKit";

const MARQUEE = [
  "Understand Supplements",
  "Food Comes First",
  "Read The Label",
  "Avoid Fitness Hype",
  "Know Your Options",
  "Train Consistently",
];

const STATS = [
  { value: 4, suffix: "", label: "Fitness goal categories" },
  { value: 3, suffix: "", label: "Diet preferences" },
  { value: 4, suffix: "", label: "Learning steps" },
  { value: 0, suffix: "", label: "Pressure to purchase" },
];

const GOALS = [
  { id: "muscle", label: "Muscle Gain", note: "Understand protein and strength support" },
  { id: "fat", label: "Weight Management", note: "Focus on sustainable habits" },
  { id: "endurance", label: "Endurance", note: "Learn about exercise fuel and hydration" },
  { id: "health", label: "General Fitness", note: "Understand everyday nutrition" },
];

const DIETS = [
  { id: "meat", label: "Mixed Diet" },
  { id: "veg", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
];

const ITEMS = {
  protein: {
    name: "Whey Protein",
    tag: "Protein Source",
    text: "A convenient dairy-based protein option. It may help people who find it difficult to meet their daily protein needs through meals.",
    dose: "Serving depends on product label and individual needs.",
  },

  plant: {
    name: "Plant Protein",
    tag: "Plant-Based Option",
    text: "Protein powders made from sources such as pea, soy or rice can be an alternative for people who avoid dairy or animal-based products.",
    dose: "Compare protein content and ingredients on the product label.",
  },

  creatine: {
    name: "Creatine Monohydrate",
    tag: "Strength & Performance",
    text: "One of the most researched sports supplements. It is commonly studied for its role in repeated high-intensity exercise and strength training.",
    dose: "Discuss suitability and use with a qualified professional.",
  },

  caffeine: {
    name: "Caffeine",
    tag: "Alertness & Energy",
    text: "A commonly used stimulant that may improve alertness. Sensitivity varies, and excessive intake can affect sleep, heart rate and wellbeing.",
    dose: "Consider total daily caffeine intake and individual sensitivity.",
  },

  omega: {
    name: "Omega-3",
    tag: "Essential Fatty Acids",
    text: "Omega-3 fats are found in foods such as fish. Fish oil products are one possible source for people whose diets provide limited omega-3.",
    dose: "Consider dietary intake and professional advice before supplementation.",
  },

  algae: {
    name: "Algae-Based Omega-3",
    tag: "Plant-Based Option",
    text: "An alternative source of certain omega-3 fats for people following vegetarian or vegan eating patterns.",
    dose: "Check the EPA and DHA content on the product label.",
  },

  vitd: {
    name: "Vitamin D",
    tag: "Bone Health",
    text: "Vitamin D supports normal bone and muscle function. Whether supplementation is needed depends on individual circumstances and vitamin D status.",
    dose: "Discuss testing and supplementation with a healthcare professional.",
  },

  mag: {
    name: "Magnesium",
    tag: "Essential Mineral",
    text: "Magnesium is involved in normal muscle and nerve function. Foods such as nuts, seeds, legumes and leafy vegetables provide magnesium.",
    dose: "Review dietary intake and professional advice before supplement use.",
  },

  electro: {
    name: "Electrolytes",
    tag: "Hydration Support",
    text: "Electrolytes such as sodium and potassium help regulate fluid balance. Their replacement may matter during prolonged exercise or heavy sweating.",
    dose: "Requirements vary with exercise duration, sweating and conditions.",
  },

  carbs: {
    name: "Carbohydrate Drinks",
    tag: "Exercise Fuel",
    text: "Carbohydrate drinks or gels can provide convenient fuel during prolonged endurance activities when ordinary meals are not practical.",
    dose: "Consider exercise duration and individual nutrition requirements.",
  },

  iron: {
    name: "Iron",
    tag: "Essential Mineral",
    text: "Iron supports normal oxygen transport in the body. Supplementation should not be started without assessing whether it is actually needed.",
    dose: "Use only with appropriate medical assessment and advice.",
  },

  b12: {
    name: "Vitamin B12",
    tag: "Nerve & Blood Health",
    text: "Vitamin B12 is found naturally in animal-based foods and fortified products. People following fully plant-based diets may need a reliable source.",
    dose: "Requirements depend on diet, health status and professional advice.",
  },
};

const STACK = {
  muscle: ["protein", "creatine"],
  fat: ["protein", "caffeine"],
  endurance: ["electro", "carbs"],
  health: ["vitd", "omega", "mag"],
};

const VEGAN_SWAP = {
  protein: "plant",
  omega: "algae",
};

const EVIDENCE = [
  { label: "Creatine for strength training", value: 95 },
  { label: "Protein supplementation when needed", value: 90 },
  { label: "Caffeine for exercise performance", value: 85 },
  { label: "Vitamin D when deficient", value: 80 },
  { label: "Omega-3 supplementation", value: 65 },
  { label: "BCAAs when protein intake is adequate", value: 25 },
  { label: "Commercial fat burners", value: 15 },
];

const SKIP = [
  {
    name: "Unverified Fat Burners",
    text: "Products with exaggerated weight-loss promises should be approached carefully. Sustainable eating habits and physical activity matter more.",
  },
  {
    name: "Unnecessary BCAA Products",
    text: "Extra BCAA products may offer limited additional value when overall dietary protein intake is already adequate.",
  },
  {
    name: "Detox Teas",
    text: "Detox and quick-cleanse claims are often misleading. The body already has organs that process and eliminate waste.",
  },
  {
    name: "Unverified Testosterone Boosters",
    text: "Products making hormonal claims may have limited evidence and potential safety concerns. Avoid self-prescribing them.",
  },
];

const STEPS = [
  {
    when: "Step 01",
    title: "Discuss Your Fitness Goals",
    text: "Share your training objectives, daily routine, food preferences and questions about supplements.",
  },
  {
    when: "Step 02",
    title: "Review Your Current Routine",
    text: "Understand your everyday meals, training schedule, existing supplement use and relevant considerations.",
  },
  {
    when: "Step 03",
    title: "Understand Your Options",
    text: "Explore common supplement categories, ingredients, product labels and potential considerations.",
  },
  {
    when: "Step 04",
    title: "Make Informed Decisions",
    text: "Use the information to discuss suitable choices with a qualified professional when needed. There is no requirement to purchase products.",
  },
];

const FAQ = [
  {
    q: "Do I need supplements to build muscle?",
    a: "No. Consistent training, balanced meals, adequate protein and proper recovery are the foundation. Supplements are optional and may offer convenience in some situations.",
  },
  {
    q: "Are all supplements safe?",
    a: "No supplement is suitable for everyone. Ingredients, quality, health conditions and medication interactions can all matter. Ask a qualified healthcare professional if you have concerns.",
  },
  {
    q: "Will I be encouraged to buy supplements?",
    a: "The purpose of this service is education. You can learn about common products and their uses without any obligation to purchase them.",
  },
  {
    q: "Can I use supplements without changing my diet?",
    a: "Supplements do not replace balanced meals. Everyday foods such as eggs, milk, yogurt, chicken, fish, daal, beans, fruits and vegetables remain important.",
  },
  {
    q: "Should I take supplements recommended online?",
    a: "Avoid following recommendations without considering your individual needs. Check product ingredients and consult a qualified professional before starting a supplement.",
  },
];

export default function SupplementConsultation() {
  const [goal, setGoal] = useState("muscle");
  const [diet, setDiet] = useState("meat");

  let ids = STACK[goal].map(
    (id) => (diet === "vegan" && VEGAN_SWAP[id]) || id
  );

  if (diet === "vegan" && !ids.includes("b12")) {
    ids = [...ids, "b12"];
  }

  const stack = ids.map((id) => ITEMS[id]);

  return (
    <ServicePage
      id="supplement-guide"
      marquee={MARQUEE}
      kicker="Understand Before You Choose"
      title="Supplements With"
      accent="Knowledge"
      lead="Explore common fitness supplements according to your training goals and dietary preferences. Learn what products are designed for, what to check and when professional advice matters."
      stats={STATS}
    >
      <Block title="Explore Your Supplement Guide">
        <div className="nt-calc">
          <Reveal className="nt-panel" variant="left" delay={100}>
            <div className="nt-field">
              <label>Your Fitness Goal</label>

              <div className="nt-opts sv-opts2">
                {GOALS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    className={goal === g.id ? "on" : ""}
                    onClick={() => setGoal(g.id)}
                  >
                    <b>{g.label}</b>
                    <small>{g.note}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="nt-field">
              <label>Your Dietary Preference</label>

              <div className="nt-seg">
                {DIETS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className={diet === d.id ? "on" : ""}
                    onClick={() => setDiet(d.id)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="nt-note">
              This interactive guide provides general educational information,
              not a personalized supplement prescription. Consult a qualified
              healthcare professional before starting supplements, especially
              if you take medication or have a health condition.
            </p>
          </Reveal>

          <Reveal className="nt-panel nt-result" variant="right" delay={200}>
            <h4 className="sv-sub">Your Supplement Learning Guide</h4>

            <ul className="sv-stack" key={goal + diet}>
              {stack.map((it, i) => (
                <li
                  className="sv-item"
                  key={it.name}
                  style={{ "--i": i }}
                >
                  <span className="sv-num">{i + 1}</span>

                  <div>
                    <div className="sv-item-top">
                      <h5>{it.name}</h5>
                      <span className="nt-chip">{it.tag}</span>
                    </div>

                    <p>{it.text}</p>

                    <div className="sv-dose">
                      <Check />
                      {it.dose}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Block>

      <Block title="Understanding Supplement Research">
        <div className="nt-two">
          <Reveal className="nt-panel" variant="left">
            <h3 className="nt-h3 sm">Evidence Overview</h3>

            {EVIDENCE.map((e, i) => (
              <Bar
                key={e.label}
                label={e.label}
                value={e.value}
                shown={e.value + " / 100"}
                delay={i * 80}
              />
            ))}

            <p className="nt-note">
              Illustrative educational ratings, not official clinical scores
              or a medical ranking. Evidence and suitability vary by outcome,
              individual and product.
            </p>
          </Reveal>

          <Reveal className="nt-panel" variant="right" delay={150}>
            <h3 className="nt-h3 sm">Products To Approach Carefully</h3>

            <ul className="sv-skip">
              {SKIP.map((s) => (
                <li key={s.name}>
                  <span className="sv-x" aria-hidden="true">
                    ✕
                  </span>

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

      <Block title="How Supplement Consultation Works">
        <Steps items={STEPS} />
      </Block>

      <Block title="Frequently Asked Questions">
        <Faq items={FAQ} />
      </Block>

      <Cta
        title="Make Informed Fitness Choices"
        text="Understand your options, focus on everyday nutrition and make supplement decisions responsibly."
        label="Explore Your Options"
      />
    </ServicePage>
  );
}
