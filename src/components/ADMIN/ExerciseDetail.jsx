import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ExerciseDetail.css";

// Same Data (ID matching ke liye)
const exercisesData = [
  {
    id: 1,
    name: "Barbell Bench Press",
    category: "Chest",
    equipment: "Barbell",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
    description: "The bench press is a compound exercise that targets the chest, shoulders, and triceps.",
    instructions: [
      "Lie flat on the bench with your feet planted on the floor.",
      "Grip the barbell slightly wider than shoulder-width.",
      "Lower the bar to your mid-chest, keeping elbows at a 45-degree angle.",
      "Push the bar back up until your arms are fully extended."
    ],
    muscles: ["Pectoralis Major", "Triceps", "Anterior Deltoid"]
  },
  {
    id: 2,
    name: "Incline Dumbbell Press",
    category: "Chest",
    equipment: "Dumbbell",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop",
    description: "Targets the upper chest and helps build overall chest mass.",
    instructions: [
      "Set the bench to a 30-45 degree incline.",
      "Hold dumbbells at shoulder level.",
      "Press the weights up until your arms are straight.",
      "Slowly lower them back to the starting position."
    ],
    muscles: ["Upper Pectoralis", "Triceps"]
  },
  {
    id: 3,
    name: "Push-Up",
    category: "Chest",
    equipment: "Bodyweight",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1000&auto=format&fit=crop",
    description: "A classic bodyweight exercise for chest, core, and triceps.",
    instructions: [
      "Start in a high plank position.",
      "Lower your body until your chest nearly touches the floor.",
      "Push back up to the starting position.",
      "Keep your core tight throughout the movement."
    ],
    muscles: ["Pectoralis Major", "Core", "Triceps"]
  },
  // Add more matching IDs from Library page
];

const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Agar ID hai toh usko dhoondein, warna pehli exercise show karein
  const exercise = id
    ? exercisesData.find((ex) => ex.id === parseInt(id))
    : exercisesData[0];

  // ✅ FIX: Correct route for back button
  const handleBack = () => {
    navigate("/dashboard/exercises/library");
  };

  if (!exercise) {
    return (
      <div className="exdet-container">
        <h2>Exercise not found</h2>
        <button onClick={handleBack}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="exdet-container">
      {/* BACK BUTTON - ✅ FIXED PATH */}
      <button className="exdet-back-btn" onClick={handleBack}>
        ← Back to Library
      </button>

      <div className="exdet-layout">
        {/* LEFT: IMAGE & INFO */}
        <div className="exdet-left">
          <img src={exercise.image} alt={exercise.name} className="exdet-image" />

          <div className="exdet-tags">
            <span className="exdet-tag">{exercise.category}</span>
            <span className="exdet-tag outline">{exercise.equipment}</span>
          </div>

          <h1>{exercise.name}</h1>
          <p className="exdet-desc">{exercise.description}</p>

          <div className="exdet-muscles">
            <h3>Target Muscles</h3>
            <div className="exdet-muscle-list">
              {exercise.muscles.map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: INSTRUCTIONS */}
        <div className="exdet-right">
          <h2>How to Perform</h2>
          <div className="exdet-steps">
            {exercise.instructions.map((step, index) => (
              <div className="exdet-step" key={index}>
                <span className="exdet-step-num">{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;