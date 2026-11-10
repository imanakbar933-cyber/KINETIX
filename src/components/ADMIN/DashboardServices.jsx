
import { useEffect, useMemo, useState } from "react";
import "./DashboardServices.css";

const initialData = [
  // SERVICES
  { id: 1, name: "Personal Training", category: "Services", icon: "🏋️", price: 5000, duration: "Monthly", description: "One-to-one coaching with customized workout sessions.", age: "19-30", status: "Active" },
  { id: 2, name: "Weight Loss Program", category: "Services", icon: "🔥", price: 4000, duration: "Monthly", description: "Cardio and strength training for sustainable fitness goals.", age: "19-45", status: "Active" },
  { id: 3, name: "Muscle Building", category: "Services", icon: "💪", price: 4500, duration: "Monthly", description: "Progressive resistance training and muscle development.", age: "19-35", status: "Active" },
  { id: 4, name: "Yoga & Flexibility", category: "Services", icon: "🧘", price: 3000, duration: "Monthly", description: "Flexibility, balance and mobility training.", age: "All Ages", status: "Active" },
  { id: 13, name: "HIIT Training", category: "Services", icon: "🔥", price: 4000, duration: "Monthly", description: "High intensity interval training with structured work and recovery periods.", age: "19-35", status: "Active" },
  { id: 14, name: "Group Fitness Classes", category: "Services", icon: "👥", price: 3000, duration: "Monthly", description: "Instructor-led group fitness and workout sessions.", age: "19-45", status: "Active" },
  { id: 15, name: "Zumba Classes", category: "Services", icon: "💃", price: 2500, duration: "Monthly", description: "Dance-based cardio and enjoyable fitness sessions.", age: "19-45", status: "Active" },
  { id: 16, name: "Cardio Training", category: "Services", icon: "🏃", price: 3000, duration: "Monthly", description: "Structured cardiovascular endurance training.", age: "19-60+", status: "Active" },
  { id: 17, name: "Fitness Assessment", category: "Services", icon: "📊", price: 1000, duration: "One Time", description: "Fitness evaluation, progress measurements and goal setting.", age: "All Ages", status: "Active" },
  { id: 18, name: "Functional Training", category: "Services", icon: "⚡", price: 3500, duration: "Monthly", description: "Movement patterns that support everyday physical activities.", age: "19-45", status: "Active" },
  { id: 19, name: "Beginner Fitness Program", category: "Services", icon: "🌱", price: 2500, duration: "Monthly", description: "Beginner-friendly supervised fitness sessions.", age: "19-45", status: "Active" },
  { id: 20, name: "Senior Fitness Program", category: "Services", icon: "🌿", price: 3000, duration: "Monthly", description: "Low-impact mobility, balance and strength sessions.", age: "46-60+", status: "Active" },
  { id: 21, name: "Fitness Consultation", category: "Services", icon: "📝", price: 1500, duration: "One Time", description: "Individual fitness goals and training consultation.", age: "All Ages", status: "Active" },
  { id: 37, name: "Body Transformation", category: "Services", icon: "✨", price: 6000, duration: "Monthly", description: "A structured fitness program with progress monitoring.", age: "19-45", status: "Active" },
  { id: 38, name: "Strength & Conditioning", category: "Services", icon: "🏆", price: 4500, duration: "Monthly", description: "Strength, endurance and conditioning sessions.", age: "19-45", status: "Active" },
  { id: 39, name: "Core Fitness Program", category: "Services", icon: "🎯", price: 2500, duration: "Monthly", description: "Core stability and controlled abdominal training.", age: "19-45", status: "Active" },

  // PRODUCTS
  { id: 5, name: "Whey Protein", category: "Products", icon: "🥤", price: 8500, duration: "Per Pack", description: "Protein supplement to support daily protein intake.", age: "19-45", status: "Active" },
  { id: 6, name: "Creatine Monohydrate", category: "Products", icon: "⚡", price: 4500, duration: "Per Pack", description: "Sports supplement used to support strength and performance.", age: "19-45", status: "Active" },
  { id: 7, name: "Protein Energy Bar", category: "Products", icon: "🍫", price: 450, duration: "Per Piece", description: "Convenient protein snack for active lifestyles.", age: "All Ages", status: "Active" },
  { id: 8, name: "Gym Accessories Kit", category: "Products", icon: "🎒", price: 2500, duration: "Per Kit", description: "Gym gloves, shaker bottle and resistance bands.", age: "All Ages", status: "Active" },
  { id: 40, name: "Protein Shaker", category: "Products", icon: "🥛", price: 800, duration: "Per Piece", description: "Reusable shaker bottle for mixing drinks.", age: "All Ages", status: "Active" },
  { id: 41, name: "Gym Gloves", category: "Products", icon: "🧤", price: 1200, duration: "Per Pair", description: "Workout gloves for grip and hand comfort.", age: "All Ages", status: "Active" },
  { id: 42, name: "Resistance Bands", category: "Products", icon: "➰", price: 1500, duration: "Per Set", description: "Resistance bands for mobility and strength exercises.", age: "All Ages", status: "Active" },
  { id: 43, name: "Yoga Mat", category: "Products", icon: "🧘", price: 1800, duration: "Per Piece", description: "Exercise mat for stretching and floor workouts.", age: "All Ages", status: "Active" },
  { id: 44, name: "Skipping Rope", category: "Products", icon: "🪢", price: 500, duration: "Per Piece", description: "Rope for cardiovascular and coordination training.", age: "All Ages", status: "Active" },
  { id: 45, name: "Gym Belt", category: "Products", icon: "🏋️", price: 2200, duration: "Per Piece", description: "Weightlifting accessory for selected strength exercises.", age: "19-45", status: "Active" },

  // NUTRITION
  { id: 9, name: "Muscle Gain Nutrition", category: "Nutrition", icon: "🥗", price: 2000, duration: "Monthly", description: "Balanced meal planning with adequate protein and energy.", age: "19-35", status: "Active" },
  { id: 10, name: "Fat Loss Nutrition", category: "Nutrition", icon: "🥑", price: 2000, duration: "Monthly", description: "Personalized calorie-aware and balanced meal planning.", age: "19-45", status: "Active" },
  { id: 46, name: "Balanced Diet Plan", category: "Nutrition", icon: "🍎", price: 1800, duration: "Monthly", description: "Balanced meals with different essential nutrients.", age: "All Ages", status: "Active" },
  { id: 47, name: "High Protein Diet", category: "Nutrition", icon: "🥚", price: 2000, duration: "Monthly", description: "Meal planning focused on adequate dietary protein.", age: "19-45", status: "Active" },
  { id: 48, name: "Hydration Guidance", category: "Nutrition", icon: "💧", price: 1000, duration: "Monthly", description: "Personal hydration habits and exercise fluid guidance.", age: "All Ages", status: "Active" },

  // EXERCISES
  { id: 11, name: "Strength Training", category: "Exercises", icon: "🏆", price: 3500, duration: "Monthly", description: "Resistance exercises and progressive strength development.", age: "19-45", status: "Active" },
  { id: 12, name: "Low Impact Fitness", category: "Exercises", icon: "🚶", price: 2500, duration: "Monthly", description: "Gentle movement, balance and mobility exercises.", age: "46-60+", status: "Active" },
  { id: 22, name: "Chest Workout", category: "Exercises", icon: "🏋️", price: 2000, duration: "Monthly", description: "Bench press, chest fly and push-up training.", age: "19-45", status: "Active" },
  { id: 23, name: "Back Workout", category: "Exercises", icon: "💪", price: 2000, duration: "Monthly", description: "Lat pulldowns, rows and back strengthening exercises.", age: "19-45", status: "Active" },
  { id: 24, name: "Shoulder Workout", category: "Exercises", icon: "🏋️", price: 2000, duration: "Monthly", description: "Shoulder press, lateral raises and rear delt exercises.", age: "19-45", status: "Active" },
  { id: 25, name: "Biceps Workout", category: "Exercises", icon: "💪", price: 1800, duration: "Monthly", description: "Dumbbell curls, hammer curls and cable curls.", age: "19-45", status: "Active" },
  { id: 26, name: "Triceps Workout", category: "Exercises", icon: "🏋️", price: 1800, duration: "Monthly", description: "Triceps pushdowns, extensions and close grip exercises.", age: "19-45", status: "Active" },
  { id: 27, name: "Leg Workout", category: "Exercises", icon: "🦵", price: 2200, duration: "Monthly", description: "Squats, lunges, leg press and hamstring exercises.", age: "19-45", status: "Active" },
  { id: 28, name: "Abs & Core Workout", category: "Exercises", icon: "🔥", price: 1800, duration: "Monthly", description: "Planks, crunches and controlled core exercises.", age: "19-45", status: "Active" },
  { id: 29, name: "Treadmill Cardio", category: "Exercises", icon: "🏃", price: 1500, duration: "Monthly", description: "Walking, jogging and running workouts.", age: "All Ages", status: "Active" },
  { id: 30, name: "Cycling Workout", category: "Exercises", icon: "🚴", price: 1800, duration: "Monthly", description: "Indoor cycling for cardiovascular fitness.", age: "19-60+", status: "Active" },
  { id: 31, name: "Full Body Workout", category: "Exercises", icon: "⚡", price: 2500, duration: "Monthly", description: "A balanced routine targeting major muscle groups.", age: "19-45", status: "Active" },
  { id: 32, name: "Stretching & Mobility", category: "Exercises", icon: "🧘", price: 1500, duration: "Monthly", description: "Mobility drills and flexibility exercises.", age: "All Ages", status: "Active" },
  { id: 33, name: "Glutes Workout", category: "Exercises", icon: "🏋️", price: 1800, duration: "Monthly", description: "Hip thrusts, glute bridges and controlled leg exercises.", age: "19-45", status: "Active" },
  { id: 34, name: "Calf Workout", category: "Exercises", icon: "🦵", price: 1500, duration: "Monthly", description: "Standing and seated calf raise exercises.", age: "19-45", status: "Active" },
  { id: 35, name: "Balance Training", category: "Exercises", icon: "⚖️", price: 1500, duration: "Monthly", description: "Controlled balance and stability exercises.", age: "46-60+", status: "Active" },
  { id: 36, name: "Bodyweight Training", category: "Exercises", icon: "🤸", price: 1800, duration: "Monthly", description: "Push-ups, squats, lunges and bodyweight movements.", age: "All Ages", status: "Active" },
  { id: 49, name: "Deadlift Training", category: "Exercises", icon: "🏋️", price: 2000, duration: "Monthly", description: "Supervised hip hinge and deadlift technique practice.", age: "19-45", status: "Active" },
  { id: 50, name: "Lunges Training", category: "Exercises", icon: "🦵", price: 1500, duration: "Monthly", description: "Forward, reverse and controlled walking lunges.", age: "19-45", status: "Active" },
  { id: 51, name: "Pull-up Training", category: "Exercises", icon: "💪", price: 1800, duration: "Monthly", description: "Assisted and bodyweight pull-up progressions.", age: "19-45", status: "Active" },
  { id: 52, name: "Incline Walking", category: "Exercises", icon: "🚶", price: 1500, duration: "Monthly", description: "Controlled incline treadmill walking.", age: "19-60+", status: "Active" },
  { id: 53, name: "Pilates Training", category: "Exercises", icon: "🧘", price: 2500, duration: "Monthly", description: "Controlled movement, core stability and flexibility.", age: "19-60+", status: "Active" },
  { id: 54, name: "Kettlebell Workout", category: "Exercises", icon: "🏋️", price: 2000, duration: "Monthly", description: "Supervised kettlebell strength and conditioning exercises.", age: "19-45", status: "Active" },
];

const agePrograms = [
  {
    age: "15–18",
    title: "Teen Fitness",
    icon: "🌱",
    desc: "Supervised fitness, healthy movement and age-appropriate exercise.",
    exercises: ["Bodyweight Squats", "Walking", "Light Mobility", "Basic Stretching"],
    nutrition: "Balanced meals, fruits, vegetables, protein and hydration.",
  },
  {
    age: "19–30",
    title: "Performance Training",
    icon: "🔥",
    desc: "Strength, endurance and overall fitness development.",
    exercises: ["Squats", "Push-ups", "Dumbbell Rows", "Cardio"],
    nutrition: "Adequate protein, carbohydrates, healthy fats and whole foods.",
  },
  {
    age: "31–45",
    title: "Active Lifestyle",
    icon: "💪",
    desc: "Strength maintenance, flexibility and sustainable fitness.",
    exercises: ["Resistance Training", "Walking", "Core Training", "Cycling"],
    nutrition: "Protein-rich meals, vegetables, fiber and healthy fats.",
  },
  {
    age: "46–60",
    title: "Healthy Aging",
    icon: "⚡",
    desc: "Focus on mobility, strength, balance and cardiovascular fitness.",
    exercises: ["Light Resistance", "Walking", "Balance Exercises", "Cycling"],
    nutrition: "Balanced meals with adequate protein, calcium and hydration.",
  },
  {
    age: "60+",
    title: "Active Senior",
    icon: "🌿",
    desc: "Gentle physical activity and functional movement.",
    exercises: ["Chair Exercises", "Gentle Walking", "Balance Training", "Stretching"],
    nutrition: "Nutrient-dense meals, adequate protein and fluids.",
  },
];

const nutritionDetails = [
  {
    title: "Protein",
    icon: "🥩",
    subtitle: "Muscle repair & recovery",
    description: "Protein supplies amino acids that the body uses to build and repair tissues.",
    foods: ["Eggs", "Chicken", "Fish", "Milk", "Yogurt", "Lentils", "Beans"],
    benefits: ["Supports muscle repair", "Helps maintain muscle", "Supports normal body functions"],
    nutrients: ["Essential amino acids", "Leucine", "Vitamin B12 (some animal sources)", "Iron (varies by food)"],
    gym: "Useful as part of a balanced diet, especially when combined with appropriate resistance training.",
  },
  {
    title: "Carbohydrates",
    icon: "🍚",
    subtitle: "Energy for workouts",
    description: "Carbohydrates are an important energy source for the brain and working muscles.",
    foods: ["Brown Rice", "Oats", "Whole Wheat Roti", "Potatoes", "Bananas", "Fruits"],
    benefits: ["Provides workout energy", "Supports glycogen stores", "Helps fuel daily activities"],
    nutrients: ["Glucose", "Dietary Fiber", "B Vitamins (depending on source)", "Potassium (some foods)"],
    gym: "Can support training energy and recovery when included in suitable portions.",
  },
  {
    title: "Healthy Fats",
    icon: "🥑",
    subtitle: "Essential body functions",
    description: "Dietary fats help the body absorb fat-soluble vitamins and support normal functions.",
    foods: ["Almonds", "Walnuts", "Olive Oil", "Avocado", "Peanuts", "Seeds"],
    benefits: ["Supports nutrient absorption", "Provides concentrated energy", "Supports normal hormone functions"],
    nutrients: ["Unsaturated Fatty Acids", "Omega-3 (some sources)", "Vitamin E (some sources)"],
    gym: "Include moderate portions of healthy fats in meals for a balanced nutrition pattern.",
  },
  {
    title: "Vitamins & Minerals",
    icon: "🥦",
    subtitle: "Health & body functions",
    description: "Micronutrients support immunity, bone health, energy metabolism and other body processes.",
    foods: ["Spinach", "Broccoli", "Milk", "Oranges", "Carrots", "Yogurt"],
    benefits: ["Supports normal metabolism", "Supports bone health", "Helps maintain normal body functions"],
    nutrients: ["Calcium", "Iron", "Vitamin C", "Vitamin D", "Potassium"],
    gym: "A varied diet with fruits, vegetables and other nutrient-rich foods helps support general health.",
  },
  {
    title: "Hydration",
    icon: "💧",
    subtitle: "Fluid balance & exercise",
    description: "Water helps regulate body temperature and maintain normal physical performance.",
    foods: ["Water", "Watermelon", "Cucumber", "Oranges", "Soups", "Milk"],
    benefits: ["Maintains fluid balance", "Supports temperature regulation", "Replaces fluid lost through sweat"],
    nutrients: ["Water", "Sodium", "Potassium"],
    gym: "Drink fluids regularly and adjust intake according to activity, heat and individual sweat losses.",
  },
  {
    title: "Fiber & Digestion",
    icon: "🌾",
    subtitle: "Digestive health",
    description: "Dietary fiber supports digestive health and helps maintain normal bowel function.",
    foods: ["Oats", "Apples", "Beans", "Lentils", "Vegetables", "Whole Grains"],
    benefits: ["Supports digestion", "Helps with fullness", "Supports healthy gut function"],
    nutrients: ["Soluble Fiber", "Insoluble Fiber", "Prebiotic Carbohydrates"],
    gym: "Include fiber-rich foods regularly and increase fiber gradually with adequate fluids.",
  },
  {
    title: "Supplements",
    icon: "🥤",
    subtitle: "Optional sports nutrition",
    description: "Some supplements can help address specific dietary or performance needs, but they are not essential for everyone.",
    foods: ["Whey Protein", "Creatine Monohydrate", "Fortified Products"],
    benefits: ["May help meet specific nutrition goals", "Convenient protein option", "Some products have evidence for selected performance uses"],
    nutrients: ["Protein", "Creatine", "Product-specific ingredients"],
    gym: "Check product quality, ingredients, suitability and professional advice. Supplements are not a substitute for balanced meals.",
  },
  {
    title: "Muscle Gain Nutrition",
    icon: "🍗",
    subtitle: "Energy & muscle development",
    description: "A muscle-building nutrition approach combines adequate energy, protein and progressive resistance training.",
    foods: ["Eggs", "Chicken", "Milk", "Rice", "Oats", "Beans", "Yogurt"],
    benefits: ["Supports training recovery", "Helps meet energy needs", "Supports muscle development with resistance training"],
    nutrients: ["Protein", "Carbohydrates", "Healthy Fats", "Micronutrients"],
    gym: "Meal portions and protein targets should be adjusted to body size, activity and individual requirements.",
  },
  {
    title: "Weight Management",
    icon: "🥗",
    subtitle: "Balanced eating habits",
    description: "Sustainable weight management focuses on balanced meals, activity, sleep and consistent habits.",
    foods: ["Vegetables", "Fruits", "Lean Protein", "Whole Grains", "Lentils"],
    benefits: ["Supports balanced eating", "Provides dietary variety", "Helps build sustainable habits"],
    nutrients: ["Protein", "Fiber", "Complex Carbohydrates", "Vitamins"],
    gym: "Avoid extreme restrictions. A qualified nutrition professional can help set an appropriate personal plan.",
  },
];

const categories = ["All", "Services", "Products", "Nutrition", "Exercises"];

const emptyForm = {
  name: "",
  category: "Services",
  icon: "💪",
  price: "",
  duration: "Monthly",
  description: "",
  age: "All Ages",
  status: "Active",
};

function loadInitialItems() {
  try {
    const saved = JSON.parse(localStorage.getItem("kinetix_services") || "[]");
    if (!Array.isArray(saved)) return initialData;

    const savedMap = new Map(saved.map((item) => [item.id, item]));

    const merged = initialData.map((item) =>
      savedMap.has(item.id) ? { ...item, ...savedMap.get(item.id) } : item
    );

    const customItems = saved.filter(
      (item) => !initialData.some((base) => base.id === item.id)
    );

    return [...merged, ...customItems];
  } catch {
    return initialData;
  }
}

function DashboardServices() {
  const [items, setItems] = useState(loadInitialItems);
  const [activeTab, setActiveTab] = useState("catalog");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("All");
  const [selectedAge, setSelectedAge] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [selectedDetail, setSelectedDetail] = useState(null);
  const [selectedNutrition, setSelectedNutrition] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem("kinetix_services", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchesAge = ageFilter === "All" || item.age === ageFilter;

      return matchesCategory && matchesSearch && matchesAge;
    });
  }, [items, category, search, ageFilter]);

  const activeCount = items.filter((item) => item.status === "Active").length;
  const totalProducts = items.filter((item) => item.category === "Products").length;
  const totalServices = items.filter((item) => item.category === "Services").length;

  const notify = (message) => setToast(message);

  const formatPrice = (price) =>
    `Rs. ${Number(price).toLocaleString("en-PK")}`;

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setForm({ ...item });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.description.trim() || form.price === "") {
      notify("Please fill all required fields.");
      return;
    }

    if (Number(form.price) < 0 || !Number.isFinite(Number(form.price))) {
      notify("Please enter a valid price.");
      return;
    }

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...form, price: Number(form.price), id: editingId }
            : item
        )
      );
      notify("Item updated successfully!");
    } else {
      setItems((prev) => [
        { ...form, price: Number(form.price), id: Date.now() },
        ...prev,
      ]);
      notify("New item added successfully!");
    }

    setShowModal(false);
    setForm(emptyForm);
  };

  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setSelectedDetail(null);
      notify("Item deleted successfully!");
    }
  };

  const toggleStatus = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
    notify("Status updated!");
  };

  return (
    <div className="ds-page">

      {/* HEADER */}
      <div className="ds-header">
        <div>
          
          <h1>Services <span>& Products</span></h1>
          <p>Manage your gym services, products and fitness programs.</p>
        </div>

        <button className="ds-add-btn" onClick={openAddModal}>
          <span>＋</span> Add New Item
        </button>
      </div>

      {/* STATISTICS */}
      <div className="ds-stats">
        <div className="ds-stat-card">
          <div className="ds-stat-icon">▣</div>
          <div>
            <p>Total Items</p>
            <h2>{items.length}</h2>
            <small>Services & Products</small>
          </div>
        </div>

        <div className="ds-stat-card">
          <div className="ds-stat-icon">🏋️</div>
          <div>
            <p>Gym Services</p>
            <h2>{totalServices}</h2>
            <small>Available services</small>
          </div>
        </div>

        <div className="ds-stat-card">
          <div className="ds-stat-icon">🛍️</div>
          <div>
            <p>Gym Products</p>
            <h2>{totalProducts}</h2>
            <small>Available products</small>
          </div>
        </div>

        <div className="ds-stat-card">
          <div className="ds-stat-icon">✦</div>
          <div>
            <p>Active Items</p>
            <h2>{activeCount}</h2>
            <small>Currently available</small>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="ds-tabs">
        <button
          className={activeTab === "catalog" ? "active" : ""}
          onClick={() => setActiveTab("catalog")}
        >
          ◈ Service Catalog
        </button>

        <button
          className={activeTab === "age" ? "active" : ""}
          onClick={() => setActiveTab("age")}
        >
          ◉ Age-Based Programs
        </button>

        <button
          className={activeTab === "nutrition" ? "active" : ""}
          onClick={() => setActiveTab("nutrition")}
        >
          ♧ Nutrition Guide
        </button>
      </div>

      {/* CATALOG */}
      {activeTab === "catalog" && (
        <>
          <div className="ds-section-heading">
            <div>
              <h2>Explore Gym Catalog</h2>
              <p>All your gym offerings in one place.</p>
            </div>
            <span className="ds-count">{filteredItems.length} ITEMS</span>
          </div>

          <div className="ds-filter-panel">
            <div className="ds-search">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search services, products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
              <option value="All">All Age Groups</option>
              <option value="All Ages">All Ages</option>
              <option value="19-30">19–30 Years</option>
              <option value="19-35">19–35 Years</option>
              <option value="19-45">19–45 Years</option>
              <option value="46-60+">46–60+ Years</option>
            </select>
          </div>

          <div className="ds-category-list">
            {categories.map((cat) => (
              <button
                key={cat}
                className={category === cat ? "selected" : ""}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="ds-products-grid">
            {filteredItems.map((item) => (
              <div
                className="ds-item-card"
                key={item.id}
                onClick={() => setSelectedDetail(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setSelectedDetail(item);
                }}
              >
                <div className="ds-item-top">
                  <div className="ds-item-icon">{item.icon}</div>
                  <span className={`ds-status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </div>

                <span className="ds-item-category">{item.category}</span>
                <h3>{item.name}</h3>
                <p className="ds-item-description">{item.description}</p>

                <div className="ds-item-details">
                  <div>
                    <small>PRICE</small>
                    <strong>{formatPrice(item.price)}</strong>
                  </div>
                  <div>
                    <small>DURATION</small>
                    <strong>{item.duration}</strong>
                  </div>
                </div>

                <div className="ds-item-age">
                  <span>♧ Age Group</span>
                  <strong>{item.age}</strong>
                </div>

                <div className="ds-view-detail">View Full Details ↗</div>

                <div className="ds-item-actions">
                  <button onClick={(e) => { e.stopPropagation(); openEditModal(item); }}>
                    ✎ Edit
                  </button>
                  <button
                    className="ds-status-btn"
                    onClick={(e) => { e.stopPropagation(); toggleStatus(item.id); }}
                  >
                    {item.status === "Active" ? "Disable" : "Activate"}
                  </button>
                  <button
                    className="ds-delete-btn"
                    onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                    title="Delete item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="ds-empty">
                <span>🔍</span>
                <h3>No items found</h3>
                <p>Try another search or category.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* AGE PROGRAMS */}
      {activeTab === "age" && (
        <div className="ds-age-section">
          <div className="ds-section-heading">
            <div>
              <h2>Fitness By Age</h2>
              <p>Explore age-appropriate fitness programs.</p>
            </div>
          </div>

          <div className="ds-age-grid">
            {agePrograms.map((program, index) => (
              <button
                className={`ds-age-card ${selectedAge === index ? "active" : ""}`}
                key={program.age}
                onClick={() => setSelectedAge(index)}
              >
                <span>{program.icon}</span>
                <h3>{program.age}</h3>
                <p>{program.title}</p>
                <small>View Program ↗</small>
              </button>
            ))}
          </div>

          <div className="ds-program-detail">
            <div className="ds-program-title">
              <span>{agePrograms[selectedAge].icon}</span>
              <div>
                <small>SELECTED FITNESS PROGRAM</small>
                <h2>{agePrograms[selectedAge].title}</h2>
                <p>{agePrograms[selectedAge].age} Years</p>
              </div>
            </div>

            <p className="ds-program-description">
              {agePrograms[selectedAge].desc}
            </p>

            <div className="ds-program-columns">
              <div>
                <h3>✦ Recommended Exercises</h3>
                {agePrograms[selectedAge].exercises.map((exercise) => (
                  <div className="ds-guide-row" key={exercise}>
                    <span>✓</span> {exercise}
                  </div>
                ))}
              </div>

              <div>
                <h3>♧ Nutrition Guidance</h3>
                <p>{agePrograms[selectedAge].nutrition}</p>
                <small>
                  Individual requirements should be assessed by a qualified
                  nutrition professional.
                </small>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NUTRITION GUIDE */}
      {activeTab === "nutrition" && (
        <div className="ds-nutrition-section">
          <div className="ds-section-heading">
            <div>
              <h2>Nutrition & Supplements</h2>
              <p>Explore nutrition categories and click to discover full details.</p>
            </div>
            <span className="ds-count">{nutritionDetails.length} CATEGORIES</span>
          </div>

          <div className="ds-nutrition-grid">
            {nutritionDetails.map((item, index) => (
              <button
                className="ds-nutrition-card"
                key={item.title}
                onClick={() => setSelectedNutrition(index)}
              >
                <span>{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small>{item.subtitle}</small>
                <div className="ds-nutrition-view">Explore Details ↗</div>
              </button>
            ))}
          </div>

          <div className="ds-nutrition-note">
            <span>ⓘ</span>
            <p>
              Nutrition information is educational. Individual meal plans,
              supplements and dietary requirements should be reviewed by a
              qualified nutrition professional.
            </p>
          </div>
        </div>
      )}

      {/* ITEM DETAIL MODAL */}
      {selectedDetail && (
        <div className="ds-modal-overlay" onClick={() => setSelectedDetail(null)}>
          <div className="ds-modal ds-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ds-modal-header">
              <div>
                <small>ITEM INFORMATION</small>
                <h2>{selectedDetail.name}</h2>
              </div>
              <button onClick={() => setSelectedDetail(null)}>✕</button>
            </div>

            <div className="ds-detail-hero">
              <span>{selectedDetail.icon}</span>
              <div>
                <strong>{selectedDetail.category}</strong>
                <p>{selectedDetail.status}</p>
              </div>
            </div>

            <p className="ds-detail-description">{selectedDetail.description}</p>

            <div className="ds-detail-info-grid">
              <div><small>PRICE</small><strong>{formatPrice(selectedDetail.price)}</strong></div>
              <div><small>DURATION</small><strong>{selectedDetail.duration}</strong></div>
              <div><small>AGE GROUP</small><strong>{selectedDetail.age}</strong></div>
              <div><small>STATUS</small><strong>{selectedDetail.status}</strong></div>
            </div>

            <div className="ds-detail-actions">
              <button onClick={() => { openEditModal(selectedDetail); setSelectedDetail(null); }}>✎ Edit Item</button>
              <button onClick={() => toggleStatus(selectedDetail.id)}>
                {selectedDetail.status === "Active" ? "Disable Item" : "Activate Item"}
              </button>
              <button className="ds-detail-close" onClick={() => setSelectedDetail(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* NUTRITION DETAILS MODAL */}
      {selectedNutrition !== null && (
        <div className="ds-modal-overlay" onClick={() => setSelectedNutrition(null)}>
          <div
            className="ds-modal ds-nutrition-detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const item = nutritionDetails[selectedNutrition];
              return (
                <>
                  <div className="ds-modal-header">
                    <div>
                      <small>KINETIX NUTRITION CENTER</small>
                      <h2>{item.icon} {item.title}</h2>
                    </div>
                    <button onClick={() => setSelectedNutrition(null)}>✕</button>
                  </div>

                  <p className="ds-nutrition-subtitle">{item.subtitle}</p>
                  <p className="ds-detail-description">{item.description}</p>

                  <div className="ds-nutrition-detail-block">
                    <h3>🥗 Recommended Food Sources</h3>
                    <div className="ds-food-tags">
                      {item.foods.map((food) => <span key={food}>{food}</span>)}
                    </div>
                  </div>

                  <div className="ds-nutrition-detail-block">
                    <h3>✦ Health Benefits</h3>
                    {item.benefits.map((benefit) => (
                      <div className="ds-guide-row" key={benefit}>
                        <span>✓</span> {benefit}
                      </div>
                    ))}
                  </div>

                  <div className="ds-nutrition-detail-block">
                    <h3>⚡ Important Nutrients</h3>
                    <div className="ds-food-tags">
                      {item.nutrients.map((nutrient) => (
                        <span key={nutrient}>{nutrient}</span>
                      ))}
                    </div>
                  </div>

                  <div className="ds-nutrition-gym-box">
                    <h3>🏋️ Gym & Fitness Connection</h3>
                    <p>{item.gym}</p>
                  </div>

                  <div className="ds-nutrition-modal-footer">
                    <p>Nutrition needs vary by age, activity and individual health.</p>
                    <button onClick={() => setSelectedNutrition(null)}>Got It ✓</button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="ds-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="ds-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ds-modal-header">
              <div>
                <small>KINETIX MANAGEMENT</small>
                <h2>{editingId ? "Edit Item" : "Add New Item"}</h2>
              </div>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="ds-form-grid">
                <label>
                  Item Name *
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter item name"
                  />
                </label>

                <label>
                  Category *
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    {categories.filter((c) => c !== "All").map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Price (PKR) *
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="Enter price"
                  />
                </label>

                <label>
                  Duration
                  <select
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  >
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Daily</option>
                    <option>Per Pack</option>
                    <option>Per Piece</option>
                    <option>Per Pair</option>
                    <option>Per Set</option>
                    <option>Per Kit</option>
                    <option>One Time</option>
                  </select>
                </label>

                <label>
                  Icon / Emoji
                  <input
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    placeholder="💪"
                  />
                </label>

                <label>
                  Age Group
                  <select
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                  >
                    <option>All Ages</option>
                    <option>15-18</option>
                    <option>19-30</option>
                    <option>19-35</option>
                    <option>19-45</option>
                    <option>46-60+</option>
                    <option>60+</option>
                  </select>
                </label>

                <label>
                  Status
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </label>

                <label className="ds-full-field">
                  Description *
                  <textarea
                    required
                    rows="4"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe this service or product..."
                  />
                </label>
              </div>

              <div className="ds-modal-actions">
                <button type="button" className="ds-cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="ds-save-btn">
                  {editingId ? "Save Changes" : "＋ Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <div className="ds-toast">✓ {toast}</div>}
    </div>
  );
}

export default DashboardServices;
