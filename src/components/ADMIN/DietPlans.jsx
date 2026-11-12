
import { useState } from "react";
import {
  Activity,
  User,
  Scale,
  Ruler,
  Calendar,
  Flame,
  Beef,
  Wheat,
  Droplets,
  Target,
  Apple,
  Utensils,
  RotateCcw,
  Calculator,
  Clock,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

import "./DietPlans.css";

const activityLevels = [
  { label: "Sedentary (Little Exercise)", value: 1.2 },
  { label: "Lightly Active (1-3 Days)", value: 1.375 },
  { label: "Moderately Active (3-5 Days)", value: 1.55 },
  { label: "Very Active (6-7 Days)", value: 1.725 },
  { label: "Extra Active (Athlete)", value: 1.9 },
];

const goals = [
  { label: "Weight Loss", value: "loss" },
  { label: "Muscle Gain", value: "gain" },
  { label: "Maintain Weight", value: "maintain" },
  { label: "Stay Fit", value: "fitness" },
];

const mealPlans = {
  loss: [
    {
      name: "Breakfast",
      time: "07:00 AM",
      description:
        "Start your morning with boiled eggs, whole wheat toast and a fresh apple.",
      foods: ["2 Boiled Eggs", "1 Whole Wheat Toast", "1 Apple"],
      calories: 350,
      protein: 22,
      carbs: 35,
      fats: 13,
    },
    {
      name: "Lunch",
      time: "01:00 PM",
      description:
        "A balanced lunch with grilled chicken, brown rice and fresh vegetables.",
      foods: ["120g Grilled Chicken", "100g Brown Rice", "Mixed Salad"],
      calories: 450,
      protein: 38,
      carbs: 48,
      fats: 10,
    },
    {
      name: "Evening Snack",
      time: "04:30 PM",
      description:
        "A light protein-rich snack to keep your energy levels stable.",
      foods: ["Greek Yogurt", "10 Almonds", "Green Tea"],
      calories: 200,
      protein: 15,
      carbs: 15,
      fats: 9,
    },
    {
      name: "Dinner",
      time: "08:00 PM",
      description:
        "Enjoy grilled fish with steamed vegetables for a light dinner.",
      foods: ["120g Grilled Fish", "Steamed Vegetables", "Small Roti"],
      calories: 400,
      protein: 32,
      carbs: 35,
      fats: 12,
    },
  ],

  gain: [
    {
      name: "Breakfast",
      time: "07:00 AM",
      description:
        "A high-energy breakfast with eggs, oats, banana and peanut butter.",
      foods: ["3 Eggs", "80g Oats", "1 Banana", "Peanut Butter"],
      calories: 600,
      protein: 32,
      carbs: 65,
      fats: 22,
    },
    {
      name: "Lunch",
      time: "01:00 PM",
      description:
        "A protein-packed meal with chicken, rice and healthy fats.",
      foods: ["180g Chicken", "200g Rice", "Yogurt"],
      calories: 700,
      protein: 48,
      carbs: 75,
      fats: 18,
    },
    {
      name: "Evening Snack",
      time: "04:30 PM",
      description:
        "A nutritious smoothie with milk, banana and peanut butter.",
      foods: ["1 Glass Milk", "1 Banana", "Peanut Butter", "Almonds"],
      calories: 450,
      protein: 20,
      carbs: 50,
      fats: 20,
    },
    {
      name: "Dinner",
      time: "08:00 PM",
      description:
        "Complete your day with lean meat, potatoes and vegetables.",
      foods: ["180g Lean Beef", "250g Potatoes", "Vegetables"],
      calories: 650,
      protein: 42,
      carbs: 65,
      fats: 22,
    },
  ],

  maintain: [
    {
      name: "Breakfast",
      time: "07:00 AM",
      description:
        "A balanced breakfast with eggs, toast and seasonal fruit.",
      foods: ["2 Eggs", "2 Toast Slices", "1 Orange"],
      calories: 420,
      protein: 25,
      carbs: 45,
      fats: 15,
    },
    {
      name: "Lunch",
      time: "01:00 PM",
      description:
        "Lean chicken with rice and a colorful vegetable salad.",
      foods: ["150g Chicken", "150g Rice", "Fresh Salad"],
      calories: 550,
      protein: 40,
      carbs: 55,
      fats: 14,
    },
    {
      name: "Evening Snack",
      time: "04:30 PM",
      description:
        "A healthy snack to support recovery and daily energy.",
      foods: ["Greek Yogurt", "1 Apple", "Almonds"],
      calories: 250,
      protein: 15,
      carbs: 25,
      fats: 10,
    },
    {
      name: "Dinner",
      time: "08:00 PM",
      description:
        "A satisfying dinner with grilled fish and whole grains.",
      foods: ["150g Fish", "1 Whole Wheat Roti", "Vegetables"],
      calories: 480,
      protein: 35,
      carbs: 42,
      fats: 15,
    },
  ],

  fitness: [
    {
      name: "Breakfast",
      time: "07:00 AM",
      description:
        "Fuel your day with protein, complex carbs and fresh fruit.",
      foods: ["2 Eggs", "50g Oats", "1 Banana"],
      calories: 450,
      protein: 27,
      carbs: 52,
      fats: 14,
    },
    {
      name: "Lunch",
      time: "01:00 PM",
      description:
        "A complete meal with grilled chicken, rice and vegetables.",
      foods: ["150g Chicken", "150g Brown Rice", "Salad"],
      calories: 520,
      protein: 42,
      carbs: 55,
      fats: 12,
    },
    {
      name: "Evening Snack",
      time: "04:30 PM",
      description:
        "Keep your energy up with yogurt, fruit and nuts.",
      foods: ["Greek Yogurt", "1 Banana", "8 Almonds"],
      calories: 280,
      protein: 17,
      carbs: 32,
      fats: 10,
    },
    {
      name: "Dinner",
      time: "08:00 PM",
      description:
        "Finish with a nutritious protein-rich dinner.",
      foods: ["150g Grilled Fish", "Sweet Potato", "Vegetables"],
      calories: 480,
      protein: 36,
      carbs: 45,
      fats: 13,
    },
  ],
};

const proteinFoods = [
  { name: "Chicken Breast", protein: 31, category: "MEAT" },
  { name: "Salmon", protein: 20, category: "FISH" },
  { name: "Whole Eggs", protein: 13, category: "EGGS" },
  { name: "Greek Yogurt", protein: 10, category: "DAIRY" },
  { name: "Lentils", protein: 9, category: "PLANT" },
  { name: "Tofu", protein: 8, category: "PLANT" },
];

function DietPlan() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    activity: "1.55",
    goal: "maintain",
  });

  const [result, setResult] = useState(null);
  const [glasses, setGlasses] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateDiet = (e) => {
    e.preventDefault();

    const age = Number(formData.age);
    const weight = Number(formData.weight);
    const height = Number(formData.height);
    const activity = Number(formData.activity);

    if (!age || !weight || !height || age <= 0 || weight <= 0 || height <= 0) {
      return;
    }

    // Mifflin-St Jeor BMR calculation
    let bmr =
      10 * weight +
      6.25 * height -
      5 * age +
      (formData.gender === "male" ? 5 : -161);

    const tdee = bmr * activity;

    let calorieAdjustment = 0;
    let proteinMultiplier = 1.6;

    if (formData.goal === "loss") {
      calorieAdjustment = -300;
      proteinMultiplier = 1.8;
    } else if (formData.goal === "gain") {
      calorieAdjustment = 250;
      proteinMultiplier = 1.8;
    } else if (formData.goal === "fitness") {
      proteinMultiplier = 1.7;
    }

    const calories = Math.round(tdee + calorieAdjustment);
    const protein = Math.round(weight * proteinMultiplier);
    const fats = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories - protein * 4 - fats * 9) / 4);

    const bmi = weight / (height / 100) ** 2;
    const water = Math.round(weight * 0.035 * 10) / 10;

    setResult({
      calories,
      protein,
      fats,
      carbs,
      bmi: bmi.toFixed(1),
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      water,
    });
  };

  const resetForm = () => {
    setFormData({
      age: "",
      gender: "male",
      weight: "",
      height: "",
      activity: "1.55",
      goal: "maintain",
    });

    setResult(null);
    setGlasses(0);
  };

  const meals = result ? mealPlans[formData.goal] : [];

  const mealTotals = meals.reduce(
    (totals, meal) => ({
      calories: totals.calories + meal.calories,
      protein: totals.protein + meal.protein,
      carbs: totals.carbs + meal.carbs,
      fats: totals.fats + meal.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const waterTarget = result ? Math.ceil(result.water / 0.25) : 8;
  const waterProgress = Math.min((glasses / waterTarget) * 100, 100);

  return (
    <main className="dp-page">
      {/* HEADER */}
      <header className="dp-header">
        <span className="dp-eyebrow">
          <Apple size={16} />
          KINETIX NUTRITION CENTER
        </span>

        <h1>
          YOUR BODY.
          <span> YOUR FUEL.</span>
        </h1>

        <p>
          Build a smarter nutrition routine with personalized calorie goals,
          balanced meals and essential nutrients.
        </p>
      </header>

      {/* CALCULATOR AND INFORMATION */}
      <section className="dp-layout">
        <div className="dp-form-card">
          <div className="dp-card-heading">
            <div className="dp-heading-icon">
              <Calculator size={22} />
            </div>

            <div>
              <span>PERSONALIZED PLAN</span>
              <h2>Calculate Your Diet</h2>
            </div>
          </div>

          <form onSubmit={calculateDiet}>
            <div className="dp-input-grid">
              <div className="dp-field">
                <label>
                  <Calendar size={15} />
                  AGE
                </label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="dp-field">
                <label>
                  <User size={15} />
                  GENDER
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="dp-field">
                <label>
                  <Scale size={15} />
                  WEIGHT (KG)
                </label>
                <input
                  type="number"
                  name="weight"
                  placeholder="e.g. 70"
                  value={formData.weight}
                  onChange={handleChange}
                  min="1"
                  step="0.1"
                  required
                />
              </div>

              <div className="dp-field">
                <label>
                  <Ruler size={15} />
                  HEIGHT (CM)
                </label>
                <input
                  type="number"
                  name="height"
                  placeholder="e.g. 175"
                  value={formData.height}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="dp-field dp-full-field">
                <label>
                  <Activity size={15} />
                  ACTIVITY LEVEL
                </label>
                <select
                  name="activity"
                  value={formData.activity}
                  onChange={handleChange}
                >
                  {activityLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="dp-field dp-full-field">
                <label>
                  <Target size={15} />
                  FITNESS GOAL
                </label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                >
                  {goals.map((goal) => (
                    <option key={goal.value} value={goal.value}>
                      {goal.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="dp-form-actions">
              <button type="submit" className="dp-calculate-btn">
                <Calculator size={18} />
                GENERATE MY DIET PLAN
              </button>

              <button
                type="button"
                className="dp-reset-btn"
                onClick={resetForm}
              >
                <RotateCcw size={17} />
                RESET
              </button>
            </div>
          </form>
        </div>

        <aside className="dp-info-card">
          <div className="dp-info-icon">
            <Flame size={28} />
          </div>

          <span>YOUR FITNESS JOURNEY</span>
          <h2>Nutrition is the foundation of your progress.</h2>

          <p>
            The right balance of nutrients helps support muscle recovery,
            maintain energy and move you closer to your fitness goals.
          </p>

          <div className="dp-info-points">
            <div>
              <CheckCircle2 size={18} />
              <span>Personalized calorie targets</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Balanced daily meal suggestions</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Protein and hydration guidance</span>
            </div>
          </div>

          <div className="dp-info-bottom">
            <span>TRAIN SMARTER</span>
            <TrendingUp size={22} />
          </div>
        </aside>
      </section>

      {/* RESULTS */}
      {result && (
        <section className="dp-results">
          <div className="dp-section-heading">
            <span>YOUR PERSONAL REPORT</span>
            <h2>
              YOUR DAILY <strong>NUTRITION TARGETS</strong>
            </h2>
            <p>
              Your estimated daily nutrition requirements based on your
              selected fitness goal.
            </p>
          </div>

          {/* CALORIE TARGET */}
          <div className="dp-calorie-card">
            <div>
              <span>DAILY CALORIE TARGET</span>
              <h3>
                {result.calories.toLocaleString()}
                <small> kcal</small>
              </h3>
              <p>Estimated calories required per day</p>
            </div>

            <div className="dp-calorie-icon">
              <Flame size={42} />
            </div>
          </div>

          {/* MACROS */}
          <div className="dp-macro-grid">
            <div className="dp-macro-card protein">
              <div className="dp-macro-icon">
                <Beef size={23} />
              </div>
              <span>DAILY PROTEIN</span>
              <h3>{result.protein}g</h3>
              <p>Muscle growth & recovery</p>
            </div>

            <div className="dp-macro-card carbs">
              <div className="dp-macro-icon">
                <Wheat size={23} />
              </div>
              <span>DAILY CARBS</span>
              <h3>{result.carbs}g</h3>
              <p>Energy & performance</p>
            </div>

            <div className="dp-macro-card fats">
              <div className="dp-macro-icon">
                <Droplets size={23} />
              </div>
              <span>DAILY FATS</span>
              <h3>{result.fats}g</h3>
              <p>Hormonal health & energy</p>
            </div>

            <div className="dp-macro-card water">
              <div className="dp-macro-icon">
                <Droplets size={23} />
              </div>
              <span>DAILY WATER</span>
              <h3>{result.water}L</h3>
              <p>Hydration target</p>
            </div>
          </div>

          {/* BODY INFORMATION */}
          <div className="dp-body-info">
            <div>
              <span>YOUR BMI</span>
              <h3>{result.bmi}</h3>
            </div>

            <div>
              <span>BASAL METABOLIC RATE</span>
              <h3>{result.bmr} <small>kcal</small></h3>
            </div>

            <div>
              <span>MAINTENANCE CALORIES</span>
              <h3>{result.tdee} <small>kcal</small></h3>
            </div>
          </div>

          {/* MEAL PLAN */}
          <section className="dp-meal-section">
            <div className="dp-section-heading">
              <span>YOUR DAILY FOOD ROUTINE</span>
              <h2>
                YOUR <strong>MEAL PLAN</strong>
              </h2>
              <p>
                Each meal includes estimated calories, protein, carbohydrates
                and fats.
              </p>
            </div>

            <div className="dp-meal-grid">
              {meals.map((meal, index) => (
                <article className="dp-meal-card" key={meal.name}>
                  <div className="dp-meal-top">
                    <span className="dp-meal-number">
                      0{index + 1}
                    </span>

                    <span className="dp-meal-time">
                      <Clock size={14} />
                      {meal.time}
                    </span>
                  </div>

                  <span className="dp-meal-label">
                    MEAL {index + 1}
                  </span>

                  <h3>{meal.name}</h3>

                  <p className="dp-meal-description">
                    {meal.description}
                  </p>

                  <div className="dp-food-list">
                    <span>FOOD INCLUDED</span>

                    {meal.foods.map((food) => (
                      <div key={food}>
                        <CheckCircle2 size={15} />
                        {food}
                      </div>
                    ))}
                  </div>

                  <div className="dp-meal-divider" />

                  <div className="dp-meal-calories">
                    <Flame size={17} />
                    <strong>{meal.calories} kcal</strong>
                    <span>ESTIMATED ENERGY</span>
                  </div>

                  <div className="dp-meal-macros">
                    <div>
                      <span>PROTEIN</span>
                      <strong>{meal.protein}g</strong>
                    </div>

                    <div>
                      <span>CARBS</span>
                      <strong>{meal.carbs}g</strong>
                    </div>

                    <div>
                      <span>FATS</span>
                      <strong>{meal.fats}g</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* MEAL PLAN TOTALS */}
            <div className="dp-meal-total">
              <div>
                <span>YOUR SAMPLE MEAL PLAN TOTAL</span>
                <h3>{mealTotals.calories.toLocaleString()} kcal</h3>
              </div>

              <div className="dp-total-macros">
                <div>
                  <span>PROTEIN</span>
                  <strong>{mealTotals.protein}g</strong>
                </div>

                <div>
                  <span>CARBS</span>
                  <strong>{mealTotals.carbs}g</strong>
                </div>

                <div>
                  <span>FATS</span>
                  <strong>{mealTotals.fats}g</strong>
                </div>
              </div>
            </div>
          </section>

          {/* PROTEIN FOOD GUIDE */}
          <section className="dp-protein-section">
            <div className="dp-section-heading">
              <span>SMART FOOD CHOICES</span>
              <h2>
                PROTEIN <strong>FOOD GUIDE</strong>
              </h2>
              <p>
                Explore common foods and their approximate protein content
                per 100 grams.
              </p>
            </div>

            <div className="dp-protein-grid">
              {proteinFoods.map((food) => (
                <div className="dp-protein-card" key={food.name}>
                  <div className="dp-protein-card-top">
                    <Beef size={21} />
                    <span>{food.category}</span>
                  </div>

                  <h3>{food.name}</h3>

                  <div className="dp-protein-value">
                    <strong>{food.protein}g</strong>
                    <span>PROTEIN / 100G</span>
                  </div>

                  <div className="dp-protein-bar">
                    <div
                      style={{
                        width: `${(food.protein / 35) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WATER TRACKER */}
          <section className="dp-water-section">
            <div className="dp-water-content">
              <div className="dp-water-heading">
                <div className="dp-water-icon">
                  <Droplets size={27} />
                </div>

                <div>
                  <span>DAILY HYDRATION</span>
                  <h2>WATER INTAKE TRACKER</h2>
                  <p>
                    Track your water intake throughout the day.
                    One glass equals approximately 250ml.
                  </p>
                </div>
              </div>

              <div className="dp-water-progress">
                <div className="dp-water-progress-text">
                  <span>DAILY PROGRESS</span>
                  <strong>{Math.round(waterProgress)}%</strong>
                </div>

                <div className="dp-water-progress-track">
                  <div
                    style={{ width: `${waterProgress}%` }}
                  />
                </div>
              </div>

              <div className="dp-water-glasses">
                {Array.from({ length: waterTarget }, (_, index) => (
                  <button
                    type="button"
                    key={index}
                    className={
                      index < glasses
                        ? "dp-water-glass active"
                        : "dp-water-glass"
                    }
                    onClick={() =>
                      setGlasses(
                        glasses === index + 1
                          ? index
                          : index + 1
                      )
                    }
                    aria-label={`Water glass ${index + 1}`}
                  >
                    <Droplets size={22} />
                    <span>{index + 1}</span>
                  </button>
                ))}
              </div>

              <div className="dp-water-footer">
                <strong>{(glasses * 0.25).toFixed(2)} L</strong>
                <span>
                  OF {result.water.toFixed(1)} L DAILY TARGET
                </span>

                <button
                  type="button"
                  onClick={() => setGlasses(0)}
                >
                  <RotateCcw size={15} />
                  RESET
                </button>
              </div>
            </div>
          </section>
        </section>
      )}

      {/* DISCLAIMER */}
      <div className="dp-disclaimer">
        <Utensils size={18} />
        <p>
          Nutrition values in the sample meals and food guide are approximate.
          Actual values vary with portion sizes, ingredients and preparation.
          Calorie and hydration estimates are general guidance, not a medical
          prescription. Consult a qualified nutrition professional for
          individual dietary needs.
        </p>
      </div>
    </main>
  );
}

export default DietPlan;
