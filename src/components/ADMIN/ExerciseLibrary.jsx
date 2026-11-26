import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExerciseLibrary.css";

// Dummy Data (Aap ise apne API ya data file se replace kar sakte hain)
const exercisesData = [
  { id: 1, name: "Barbell Bench Press", category: "Chest", equipment: "Barbell", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, name: "Incline Dumbbell Press", category: "Chest", equipment: "Dumbbell", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, name: "Push-Up", category: "Chest", equipment: "Bodyweight", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, name: "Cable Chest Fly", category: "Chest", equipment: "Machine", image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1000&auto=format&fit=crop" },
  { id: 5, name: "Conventional Deadlift", category: "Back", equipment: "Barbell", image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1000&auto=format&fit=crop" },
  { id: 6, name: "Pull-Up", category: "Back", equipment: "Bodyweight", image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=1000&auto=format&fit=crop" },
  { id: 7, name: "Barbell Squat", category: "Legs", equipment: "Barbell", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop" },
];

const ExerciseLibrary = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms"];

  const filteredExercises = exercisesData.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || ex.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="exlib-container">
      
      {/* HEADER */}
      <div className="exlib-header">
        <div>
          <h1>Exercise Library</h1>
          <p>Browse all available exercises for your routine.</p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="exlib-search-bar">
        <span>⌕</span>
        <input 
          type="text" 
          placeholder="Search exercises..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* CATEGORY TABS */}
      <div className="exlib-tabs">
        {categories.map((cat) => (
          <button 
            key={cat}
            className={activeCategory === cat ? "active" : ""}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="exlib-grid">
        {filteredExercises.map((exercise) => (
          <div 
            key={exercise.id} 
            className="exlib-card"
            onClick={() => navigate(`/dashboard/exercises/details/${exercise.id}`)}
          >
            <div className="exlib-image-wrapper">
              <img src={exercise.image} alt={exercise.name} />
              <span className="exlib-badge">{exercise.category}</span>
            </div>
            <div className="exlib-card-content">
              <h3>{exercise.name}</h3>
              <p>Equipment: {exercise.equipment}</p>
              <button className="exlib-view-btn">View Details →</button>
            </div>
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="exlib-empty">
          <p>No exercises found.</p>
        </div>
      )}

    </div>
  );
};

export default ExerciseLibrary;