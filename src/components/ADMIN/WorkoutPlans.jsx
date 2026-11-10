
import { useEffect, useState } from "react";
import "./WorkoutPlans.css";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const initialWorkouts = {
  Monday: [
    {
      id: "monday-default",
      focus: "Chest & Triceps",
      category: "STRENGTH",
      exercises: [
        { name: "Bench Press", sets: 4, reps: "12", rest: "90 sec" },
        { name: "Incline Dumbbell Press", sets: 3, reps: "12", rest: "60 sec" },
        { name: "Cable Fly", sets: 3, reps: "15", rest: "45 sec" },
        { name: "Tricep Pushdown", sets: 3, reps: "12", rest: "45 sec" },
        { name: "Overhead Tricep Extension", sets: 3, reps: "12", rest: "45 sec" },
      ],
    },
  ],

  Tuesday: [
    {
      id: "tuesday-default",
      focus: "Back & Biceps",
      category: "STRENGTH",
      exercises: [
        { name: "Lat Pulldown", sets: 4, reps: "12", rest: "60 sec" },
        { name: "Seated Cable Row", sets: 3, reps: "12", rest: "60 sec" },
        { name: "Barbell Row", sets: 3, reps: "10", rest: "90 sec" },
        { name: "Dumbbell Curl", sets: 3, reps: "12", rest: "45 sec" },
        { name: "Hammer Curl", sets: 3, reps: "12", rest: "45 sec" },
      ],
    },
  ],

  Wednesday: [
    {
      id: "wednesday-default",
      focus: "Legs & Glutes",
      category: "STRENGTH",
      exercises: [
        { name: "Barbell Squats", sets: 4, reps: "12", rest: "90 sec" },
        { name: "Leg Press", sets: 3, reps: "12", rest: "60 sec" },
        { name: "Leg Extension", sets: 3, reps: "15", rest: "45 sec" },
        { name: "Leg Curl", sets: 3, reps: "12", rest: "45 sec" },
        { name: "Calf Raises", sets: 4, reps: "15", rest: "45 sec" },
      ],
    },
  ],

  Thursday: [
    {
      id: "thursday-default",
      focus: "Shoulders & Abs",
      category: "STRENGTH",
      exercises: [
        { name: "Shoulder Press", sets: 4, reps: "12", rest: "60 sec" },
        { name: "Lateral Raises", sets: 3, reps: "15", rest: "45 sec" },
        { name: "Front Raises", sets: 3, reps: "12", rest: "45 sec" },
        { name: "Plank", sets: 3, reps: "45 sec", rest: "30 sec" },
        { name: "Crunches", sets: 3, reps: "20", rest: "30 sec" },
      ],
    },
  ],

  Friday: [
    {
      id: "friday-default",
      focus: "Full Body",
      category: "STRENGTH",
      exercises: [
        { name: "Deadlift", sets: 3, reps: "10", rest: "90 sec" },
        { name: "Push Ups", sets: 3, reps: "15", rest: "45 sec" },
        { name: "Goblet Squats", sets: 3, reps: "12", rest: "60 sec" },
        { name: "Dumbbell Rows", sets: 3, reps: "12", rest: "45 sec" },
        { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "30 sec" },
      ],
    },
  ],

  Saturday: [
    {
      id: "saturday-default",
      focus: "Cardio & Conditioning",
      category: "CARDIO",
      exercises: [
        { name: "Treadmill Running", sets: 1, reps: "15 min", rest: "2 min" },
        { name: "Cycling", sets: 1, reps: "10 min", rest: "2 min" },
        { name: "Jump Rope", sets: 3, reps: "2 min", rest: "45 sec" },
        { name: "Burpees", sets: 3, reps: "12", rest: "45 sec" },
        { name: "Stretching", sets: 1, reps: "10 min", rest: "—" },
      ],
    },
  ],

  Sunday: [
    {
      id: "sunday-default",
      focus: "Recovery & Rest",
      category: "RECOVERY",
      exercises: [],
    },
  ],
};

const initialMembers = [
  { id: 1, name: "Ahmed Khan", plan: "Beginner" },
  { id: 2, name: "Ali Hassan", plan: "Intermediate" },
  { id: 3, name: "Usman Malik", plan: "Advanced" },
  { id: 4, name: "Hamza Ahmed", plan: "Beginner" },
  { id: 5, name: "Bilal Shah", plan: "Intermediate" },
];

const loadFromStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const createEmptyExercise = () => ({
  name: "",
  sets: 3,
  reps: "12",
  rest: "60 sec",
});

function WorkoutPlan() {
  const [activeDay, setActiveDay] = useState("Monday");

  const [workouts, setWorkouts] = useState(() =>
    loadFromStorage("kinetix-workout-plans-v2", initialWorkouts)
  );

  const [assignments, setAssignments] = useState(() =>
    loadFromStorage("kinetix-workout-assignments-v2", [])
  );

  const [members] = useState(initialMembers);

  const [selectedPlanId, setSelectedPlanId] = useState("monday-default");

  const [selectedMember, setSelectedMember] = useState("");
  const [assignDay, setAssignDay] = useState("Monday");
  const [assignPlanId, setAssignPlanId] = useState("monday-default");

  const [search, setSearch] = useState("");
  const [showAssign, setShowAssign] = useState(false);
  const [showAddPlan, setShowAddPlan] = useState(false);

  const [newPlan, setNewPlan] = useState({
    day: "Monday",
    focus: "",
    category: "STRENGTH",
    exercises: [createEmptyExercise()],
  });

  // SAVE PLANS AND ASSIGNMENTS
  useEffect(() => {
    localStorage.setItem(
      "kinetix-workout-plans-v2",
      JSON.stringify(workouts)
    );
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem(
      "kinetix-workout-assignments-v2",
      JSON.stringify(assignments)
    );
  }, [assignments]);

  const currentDayPlans = workouts[activeDay] || [];

  const currentWorkout =
    currentDayPlans.find((plan) => plan.id === selectedPlanId) ||
    currentDayPlans[0];

  const dayAssignments = assignments.filter(
    (item) => item.day === activeDay
  );

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  const trainingDays = weekDays.filter((day) =>
    (workouts[day] || []).some((plan) => plan.exercises.length > 0)
  ).length;

  const totalPlans = weekDays.reduce(
    (total, day) => total + (workouts[day] || []).length,
    0
  );

  // CHANGE DAY
  const handleDayChange = (day) => {
    setActiveDay(day);
    setSelectedPlanId(workouts[day]?.[0]?.id || "");
  };

  // ASSIGNMENT MODAL
  const openAssignModal = () => {
    setAssignDay(activeDay);
    setAssignPlanId(currentWorkout?.id || "");
    setSelectedMember("");
    setSearch("");
    setShowAssign(true);
  };

  const closeAssignModal = () => {
    setShowAssign(false);
    setSelectedMember("");
    setSearch("");
  };

  const handleAssignDayChange = (day) => {
    setAssignDay(day);
    setAssignPlanId(workouts[day]?.[0]?.id || "");
    setSelectedMember("");
  };

  const handleAssign = () => {
    if (!selectedMember) {
      alert("Please select a member first.");
      return;
    }

    const member = members.find(
      (item) => item.id === Number(selectedMember)
    );

    const workout = (workouts[assignDay] || []).find(
      (plan) => plan.id === assignPlanId
    );

    if (!member || !workout) {
      alert("Please select a valid member and workout plan.");
      return;
    }

    const alreadyAssigned = assignments.some(
      (item) =>
        item.memberId === member.id &&
        item.day === assignDay
    );

    if (alreadyAssigned) {
      alert("This member already has a workout assigned for this day.");
      return;
    }

    setAssignments((prev) => [
      ...prev,
      {
        id: `${member.id}-${assignDay}-${Date.now()}`,
        memberId: member.id,
        memberName: member.name,
        day: assignDay,
        planId: workout.id,
        workout: workout.focus,
      },
    ]);

    closeAssignModal();
  };

  const removeAssignment = (memberId, day) => {
    setAssignments((prev) =>
      prev.filter(
        (item) => !(item.memberId === memberId && item.day === day)
      )
    );
  };

  // ADD NEW WORKOUT PLAN
  const openAddPlanModal = () => {
    setNewPlan({
      day: activeDay,
      focus: "",
      category: "STRENGTH",
      exercises: [createEmptyExercise()],
    });

    setShowAddPlan(true);
  };

  const closeAddPlanModal = () => {
    setShowAddPlan(false);
  };

  const updateExercise = (index, field, value) => {
    setNewPlan((prev) => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) =>
        i === index
          ? { ...exercise, [field]: value }
          : exercise
      ),
    }));
  };

  const addExerciseRow = () => {
    setNewPlan((prev) => ({
      ...prev,
      exercises: [...prev.exercises, createEmptyExercise()],
    }));
  };

  const removeExerciseRow = (index) => {
    setNewPlan((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }));
  };

  const handleCreatePlan = (e) => {
    e.preventDefault();

    const focus = newPlan.focus.trim();

    if (!focus) {
      alert("Please enter a workout plan name.");
      return;
    }

    const validExercises = newPlan.exercises
      .filter((exercise) => exercise.name.trim())
      .map((exercise) => ({
        ...exercise,
        name: exercise.name.trim(),
        sets: Number(exercise.sets) || 1,
        reps: String(exercise.reps).trim(),
        rest: String(exercise.rest).trim(),
      }));

    if (
      newPlan.category !== "RECOVERY" &&
      validExercises.length === 0
    ) {
      alert("Please add at least one exercise.");
      return;
    }

    const createdPlan = {
      id: `custom-${Date.now()}`,
      focus,
      category: newPlan.category,
      exercises: validExercises,
    };

    setWorkouts((prev) => ({
      ...prev,
      [newPlan.day]: [
        ...(prev[newPlan.day] || []),
        createdPlan,
      ],
    }));

    setActiveDay(newPlan.day);
    setSelectedPlanId(createdPlan.id);
    setShowAddPlan(false);
  };

  const isMemberAssigned = (memberId) =>
    assignments.some(
      (item) =>
        item.memberId === memberId &&
        item.day === assignDay
    );

  return (
    <div className="workout-page">
      {/* HEADER */}
      <div className="workout-header">
        <div>
          <span className="workout-eyebrow">
            KINETIX FITNESS CLUB / MANAGEMENT
          </span>

          <h1>
            WORKOUT <span>PLANS</span>
          </h1>

          <p>
            Create weekly training schedules and manage member workouts.
          </p>
        </div>

        <div className="workout-header-actions">
          <button
            className="add-plan-main-btn"
            onClick={openAddPlanModal}
          >
            + Create New Plan
          </button>

          <button
            className="assign-main-btn"
            onClick={openAssignModal}
          >
            + Assign Workout
          </button>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="workout-stats">
        <div className="workout-stat-card">
          <div className="stat-icon">▣</div>
          <div>
            <span>WEEKLY SCHEDULE</span>
            <h2>07 <small>Days</small></h2>
          </div>
        </div>

        <div className="workout-stat-card">
          <div className="stat-icon">♟</div>
          <div>
            <span>TOTAL MEMBERS</span>
            <h2>{members.length.toString().padStart(2, "0")}</h2>
          </div>
        </div>

        <div className="workout-stat-card">
          <div className="stat-icon">✓</div>
          <div>
            <span>ASSIGNMENTS</span>
            <h2>{assignments.length.toString().padStart(2, "0")}</h2>
          </div>
        </div>

        <div className="workout-stat-card">
          <div className="stat-icon">⚡</div>
          <div>
            <span>TRAINING DAYS</span>
            <h2>{String(trainingDays).padStart(2, "0")}</h2>
          </div>
        </div>
      </div>

      {/* WEEKLY SCHEDULE */}
      <div className="days-section">
        <div className="workout-section-heading">
          <div>
            <span>YOUR TRAINING SCHEDULE</span>
            <h2>
              Weekly <span>Workout Split</span>
            </h2>
          </div>

          <span className="week-label">
            {totalPlans} WORKOUT PLANS
          </span>
        </div>

        <div className="days-navigation">
          {weekDays.map((day, index) => (
            <button
              key={day}
              className={`day-tab ${
                activeDay === day ? "active" : ""
              }`}
              onClick={() => handleDayChange(day)}
            >
              <span className="day-number">
                DAY 0{index + 1}
              </span>

              <strong>{day.slice(0, 3).toUpperCase()}</strong>

              <span className="day-dot"></span>

              {(workouts[day] || []).length > 1 && (
                <span className="day-plan-count">
                  {(workouts[day] || []).length} PLANS
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* WORKOUT DETAILS */}
      <div className="workout-content">
        <div className="workout-content-header">
          <div>
            <span className="content-eyebrow">
              DAY {String(weekDays.indexOf(activeDay) + 1).padStart(2, "0")}
              {" / WEEKLY TRAINING"}
            </span>

            <h2>{currentWorkout?.focus || "No Workout Plan"}</h2>

            <p>
              Your scheduled training exercises for {activeDay}.
            </p>
          </div>

          {currentWorkout && (
            <span
              className={`category-badge ${currentWorkout.category.toLowerCase()}`}
            >
              {currentWorkout.category}
            </span>
          )}
        </div>

        {/* MULTIPLE PLANS SELECTOR */}
        {currentDayPlans.length > 1 && (
          <div className="day-plan-selector">
            <span className="plan-selector-label">
              SELECT WORKOUT PLAN
            </span>

            <div className="day-plan-buttons">
              {currentDayPlans.map((plan) => (
                <button
                  key={plan.id}
                  className={`day-plan-button ${
                    currentWorkout?.id === plan.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedPlanId(plan.id)}
                >
                  {plan.focus}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentWorkout ? (
          currentWorkout.exercises.length > 0 ? (
            <>
              <div className="exercise-table">
                <div className="exercise-table-header">
                  <span>EXERCISE NAME</span>
                  <span>SETS</span>
                  <span>REPS / DURATION</span>
                  <span>REST TIME</span>
                </div>

                {currentWorkout.exercises.map((exercise, index) => (
                  <div className="exercise-row" key={`${exercise.name}-${index}`}>
                    <div className="exercise-name">
                      <span className="exercise-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <strong>{exercise.name}</strong>
                    </div>

                    <span className="exercise-value">
                      {exercise.sets}
                    </span>

                    <span className="exercise-value">
                      {exercise.reps}
                    </span>

                    <span className="exercise-rest">
                      {exercise.rest}
                    </span>
                  </div>
                ))}
              </div>

              <div className="workout-footer">
                <div>
                  <span>TOTAL EXERCISES</span>
                  <strong>{currentWorkout.exercises.length}</strong>
                </div>

                <div>
                  <span>TRAINING FOCUS</span>
                  <strong>{currentWorkout.focus}</strong>
                </div>

                <button
                  className="footer-assign-btn"
                  onClick={openAssignModal}
                >
                  + Assign to Member
                </button>
              </div>
            </>
          ) : (
            <div className="rest-day-card">
              <div className="rest-icon">✦</div>

              <h2>REST & RECOVERY</h2>

              <p>
                Recovery is part of your progress. Give your muscles
                time to repair, hydrate and prepare for the next week.
              </p>

              <span>RECOVER • REBUILD • REPEAT</span>

              <button
                className="rest-assign-btn"
                onClick={openAssignModal}
              >
                + Assign Recovery Plan
              </button>
            </div>
          )
        ) : (
          <div className="no-day-plan">
            <h3>No workout plan for this day</h3>
            <p>Create a new plan to add training for {activeDay}.</p>
            <button onClick={openAddPlanModal}>
              + Create Workout Plan
            </button>
          </div>
        )}

        {/* MEMBERS ASSIGNED TO THIS DAY */}
        <div className="day-members-section">
          <div className="day-members-heading">
            <div>
              <span>DAILY MEMBER OVERVIEW</span>
              <h3>
                Members Assigned <span>Today</span>
              </h3>
            </div>

            <span className="day-members-count">
              {dayAssignments.length} ASSIGNED
            </span>
          </div>

          {dayAssignments.length > 0 ? (
            <div className="day-members-list">
              {dayAssignments.map((assignment) => (
                <div
                  className="day-member-card"
                  key={assignment.id || `${assignment.memberId}-${assignment.day}`}
                >
                  <div className="member-avatar">
                    {assignment.memberName.charAt(0)}
                  </div>

                  <div className="assignment-member">
                    <strong>{assignment.memberName}</strong>
                    <span>{assignment.workout}</span>
                  </div>

                  <span className="assigned-status">
                    ✓ ASSIGNED
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="day-members-empty">
              No members assigned to {activeDay} yet.
            </p>
          )}
        </div>
      </div>

      {/* ALL ASSIGNMENTS */}
      <div className="assignments-section">
        <div className="workout-section-heading">
          <div>
            <span>MEMBER MANAGEMENT</span>
            <h2>
              Assigned <span>Workouts</span>
            </h2>
          </div>

          <span className="week-label">
            {assignments.length} ASSIGNMENTS
          </span>
        </div>

        {assignments.length > 0 ? (
          <div className="assignment-list">
            {assignments.map((assignment) => (
              <div
                className="assignment-row"
                key={assignment.id || `${assignment.memberId}-${assignment.day}`}
              >
                <div className="member-avatar">
                  {assignment.memberName.charAt(0)}
                </div>

                <div className="assignment-member">
                  <strong>{assignment.memberName}</strong>
                  <span>{assignment.workout}</span>
                </div>

                <span className="assignment-day">
                  {assignment.day}
                </span>

                <span className="assigned-status">
                  ASSIGNED
                </span>

                <button
                  className="remove-assignment"
                  onClick={() =>
                    removeAssignment(
                      assignment.memberId,
                      assignment.day
                    )
                  }
                  title="Remove assignment"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-assignments">
            <span>◎</span>
            <h3>No Workout Assignments Yet</h3>
            <p>
              Assign a weekly workout to your gym members to get started.
            </p>
            <button onClick={openAssignModal}>
              + Assign First Workout
            </button>
          </div>
        )}
      </div>

      {/* ASSIGN MEMBER MODAL */}
      {showAssign && (
        <div
          className="workout-modal-overlay"
          onClick={closeAssignModal}
        >
          <div
            className="workout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-top-line"></div>

            <div className="modal-heading">
              <div>
                <span>KINETIX / MEMBER MANAGEMENT</span>
                <h2>
                  Assign <span>Workout</span>
                </h2>
                <p>
                  Assign a personalized workout to your gym member.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeAssignModal}
              >
                ✕
              </button>
            </div>

            <div className="modal-form">
              <div className="modal-field">
                <label>SELECT GYM MEMBER</label>

                <input
                  type="text"
                  placeholder="Search member by name..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedMember("");
                  }}
                />

                <div className="member-options">
                  {filteredMembers.map((member) => {
                    const assigned = isMemberAssigned(member.id);

                    return (
                      <button
                        type="button"
                        key={member.id}
                        disabled={assigned}
                        className={`member-option ${
                          selectedMember === String(member.id)
                            ? "selected"
                            : ""
                        } ${assigned ? "assigned" : ""}`}
                        onClick={() =>
                          setSelectedMember(String(member.id))
                        }
                      >
                        <div className="member-option-avatar">
                          {member.name.charAt(0)}
                        </div>

                        <div className="member-option-info">
                          <strong>{member.name}</strong>
                          <span>{member.plan} Member</span>
                        </div>

                        {assigned ? (
                          <span className="member-assigned-label">
                            ASSIGNED
                          </span>
                        ) : (
                          <span className="member-check">
                            {selectedMember === String(member.id) ? "✓" : "+"}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  {filteredMembers.length === 0 && (
                    <p className="no-members">
                      No members found.
                    </p>
                  )}
                </div>
              </div>

              <div className="modal-field">
                <label>SELECT WORKOUT DAY</label>

                <select
                  value={assignDay}
                  onChange={(e) => handleAssignDayChange(e.target.value)}
                >
                  {weekDays.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-field">
                <label>SELECT WORKOUT PLAN</label>

                <select
                  value={assignPlanId}
                  onChange={(e) => setAssignPlanId(e.target.value)}
                >
                  {(workouts[assignDay] || []).map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.focus}
                    </option>
                  ))}
                </select>

                {(workouts[assignDay] || []).length === 0 && (
                  <p className="no-members">
                    No workout plan available for this day.
                  </p>
                )}
              </div>

              {assignPlanId && (
                <div className="modal-workout-preview">
                  <span>SELECTED WORKOUT PLAN</span>

                  <h3>
                    {(workouts[assignDay] || []).find(
                      (plan) => plan.id === assignPlanId
                    )?.focus}
                  </h3>

                  <div className="modal-preview-bottom">
                    <span>
                      {(workouts[assignDay] || []).find(
                        (plan) => plan.id === assignPlanId
                      )?.exercises.length || 0} Exercises
                    </span>

                    <span>
                      {(workouts[assignDay] || []).find(
                        (plan) => plan.id === assignPlanId
                      )?.category}
                    </span>
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button
                  className="modal-cancel"
                  onClick={closeAssignModal}
                >
                  Cancel
                </button>

                <button
                  className="modal-confirm"
                  onClick={handleAssign}
                  disabled={
                    !selectedMember ||
                    !assignPlanId ||
                    isMemberAssigned(Number(selectedMember))
                  }
                >
                  ✓ Assign Workout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW WORKOUT PLAN MODAL */}
      {showAddPlan && (
        <div
          className="workout-modal-overlay"
          onClick={closeAddPlanModal}
        >
          <div
            className="workout-modal create-plan-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-top-line"></div>

            <div className="modal-heading">
              <div>
                <span>KINETIX / WORKOUT MANAGEMENT</span>
                <h2>
                  Create <span>New Plan</span>
                </h2>
                <p>
                  Build a workout plan and add exercises to your weekly schedule.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeAddPlanModal}
              >
                ✕
              </button>
            </div>

            <form className="modal-form" onSubmit={handleCreatePlan}>
              <div className="create-plan-grid">
                <div className="modal-field">
                  <label>WORKOUT DAY</label>
                  <select
                    value={newPlan.day}
                    onChange={(e) =>
                      setNewPlan((prev) => ({
                        ...prev,
                        day: e.target.value,
                      }))
                    }
                  >
                    {weekDays.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="modal-field">
                  <label>WORKOUT CATEGORY</label>
                  <select
                    value={newPlan.category}
                    onChange={(e) =>
                      setNewPlan((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                  >
                    <option value="STRENGTH">Strength</option>
                    <option value="CARDIO">Cardio</option>
                    <option value="RECOVERY">Recovery</option>
                    <option value="FLEXIBILITY">Flexibility</option>
                  </select>
                </div>
              </div>

              <div className="modal-field">
                <label>WORKOUT PLAN NAME / FOCUS</label>
                <input
                  type="text"
                  placeholder="e.g. Upper Body Strength"
                  value={newPlan.focus}
                  onChange={(e) =>
                    setNewPlan((prev) => ({
                      ...prev,
                      focus: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="exercise-builder-heading">
                <div>
                  <span>PLAN CONTENT</span>
                  <h3>Workout Exercises</h3>
                </div>

                <button
                  type="button"
                  className="add-exercise-btn"
                  onClick={addExerciseRow}
                  disabled={newPlan.category === "RECOVERY"}
                >
                  + Add Exercise
                </button>
              </div>

              {newPlan.category === "RECOVERY" ? (
                <div className="recovery-note">
                  <span>✦</span>
                  Recovery plans can be created without exercises.
                </div>
              ) : (
                <div className="exercise-builder-list">
                  {newPlan.exercises.map((exercise, index) => (
                    <div className="exercise-builder-row" key={index}>
                      <div className="builder-exercise-title">
                        <span>EXERCISE 0{index + 1}</span>

                        {newPlan.exercises.length > 1 && (
                          <button
                            type="button"
                            className="remove-exercise-btn"
                            onClick={() => removeExerciseRow(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="modal-field">
                        <label>EXERCISE NAME</label>
                        <input
                          type="text"
                          placeholder="e.g. Bench Press"
                          value={exercise.name}
                          onChange={(e) =>
                            updateExercise(index, "name", e.target.value)
                          }
                        />
                      </div>

                      <div className="exercise-builder-grid">
                        <div className="modal-field">
                          <label>SETS</label>
                          <input
                            type="number"
                            min="1"
                            value={exercise.sets}
                            onChange={(e) =>
                              updateExercise(index, "sets", e.target.value)
                            }
                          />
                        </div>

                        <div className="modal-field">
                          <label>REPS / TIME</label>
                          <input
                            type="text"
                            placeholder="12"
                            value={exercise.reps}
                            onChange={(e) =>
                              updateExercise(index, "reps", e.target.value)
                            }
                          />
                        </div>

                        <div className="modal-field">
                          <label>REST</label>
                          <input
                            type="text"
                            placeholder="60 sec"
                            value={exercise.rest}
                            onChange={(e) =>
                              updateExercise(index, "rest", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-cancel"
                  onClick={closeAddPlanModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-confirm"
                >
                  + Create Workout Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutPlan;
