import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  DollarSign,
  Star,
  Search,
  LayoutGrid,
  List,
  MessageCircle,
  MoreVertical,
  UserPlus,
  X,
  Edit,
  Trash2,
  Eye,
  Send,
  Plus,
  Clock,
  Award
} from "lucide-react";

import "./TrainerManagement.css";

// INITIAL TRAINERS
const initialTrainers = [
  { id: 1, name: "Daniel Foster", specialization: "Strength & Conditioning", sessions: 48, members: 32, rating: 4.9, commission: 4800, initials: "DF", color: "gold", badge: "Senior", online: true },
  { id: 2, name: "Rachel Morgan", specialization: "Yoga & Mindfulness", sessions: 41, members: 28, rating: 4.8, commission: 4100, initials: "RM", color: "purple", badge: "Certified", online: true },
  { id: 3, name: "Andre Jackson", specialization: "Cardio & HIIT", sessions: 37, members: 24, rating: 4.7, commission: 3700, initials: "AJ", color: "orange", badge: "Expert", online: true },
  { id: 4, name: "Hannah Pierce", specialization: "Pilates & Core", sessions: 34, members: 22, rating: 4.8, commission: 3400, initials: "HP", color: "pink", badge: "Certified", online: true },
  { id: 5, name: "Cameron Boyd", specialization: "CrossFit & Functional", sessions: 31, members: 21, rating: 4.5, commission: 3100, initials: "CB", color: "green", badge: "Trainer", online: true },
  { id: 6, name: "Lauren Hayes", specialization: "Zumba & Dance Fitness", sessions: 29, members: 19, rating: 4.6, commission: 2900, initials: "LH", color: "cyan", badge: "Expert", online: false },
  { id: 7, name: "Shawn Nolan", specialization: "Boxing & MMA", sessions: 27, members: 15, rating: 4.6, commission: 2700, initials: "SN", color: "yellow", badge: "Expert", online: true },
  { id: 8, name: "Isabella Romano", specialization: "Aerobics & Stretching", sessions: 20, members: 12, rating: 4.5, commission: 2000, initials: "IR", color: "blue", badge: "Junior", online: false }
];

const emptyForm = {
  name: "",
  specialization: "",
  badge: "Trainer",
  sessions: 0,
  members: 0,
  commission: 0
};

const colors = ["gold", "purple", "orange", "pink", "green", "cyan", "yellow", "blue"];

const TrainerManagement = () => {

  // LOAD TRAINERS FROM LOCAL STORAGE
  const [trainers, setTrainers] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("kinetix_trainers"));
      if (Array.isArray(saved) && saved.length > 0) {
        return saved;
      }
      return initialTrainers;
    } catch {
      return initialTrainers;
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [filterSpecialization, setFilterSpecialization] = useState("All");
  const [sortBy, setSortBy] = useState("Sessions");

  const [modal, setModal] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const [messageText, setMessageText] = useState("");

  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("kinetix_trainer_messages")) || [];
    } catch {
      return [];
    }
  });

  // SAVE TRAINERS
  useEffect(() => {
    localStorage.setItem("kinetix_trainers", JSON.stringify(trainers));
  }, [trainers]);

  // SAVE MESSAGES
  useEffect(() => {
    localStorage.setItem("kinetix_trainer_messages", JSON.stringify(messages));
  }, [messages]);

  // CALCULATE STATS
  const totalSessions = trainers.reduce(
    (total, trainer) => total + Number(trainer.sessions), 0
  );

  const totalCommission = trainers.reduce(
    (total, trainer) => total + Number(trainer.commission), 0
  );

  const averageRating = trainers.length
    ? (
        trainers.reduce((total, trainer) => total + Number(trainer.rating), 0) /
        trainers.length
      ).toFixed(1)
    : "0.0";

  // SEARCH + FILTER + SORT
  const filteredTrainers = trainers
    .filter((trainer) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        trainer.name.toLowerCase().includes(search) ||
        trainer.specialization.toLowerCase().includes(search);
      const matchesFilter =
        filterSpecialization === "All" ||
        trainer.specialization.toLowerCase().includes(
          filterSpecialization.toLowerCase()
        );
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "Sessions") return b.sessions - a.sessions;
      if (sortBy === "Commission") return b.commission - a.commission;
      if (sortBy === "Rating") return b.rating - a.rating;
      return 0;
    });

  // CLOSE MODAL
  const closeModal = () => {
    setModal("");
    setSelectedTrainer(null);
    setEditingId(null);
    setOpenMenu(null);
  };

  // ADD TRAINER
  const openAddModal = () => {
    setForm(emptyForm);
    setEditingId(null);
    setModal("add");
  };

  // EDIT TRAINER
  const openEditModal = (trainer) => {
    setForm({
      name: trainer.name,
      specialization: trainer.specialization,
      badge: trainer.badge,
      sessions: trainer.sessions,
      members: trainer.members,
      commission: trainer.commission
    });
    setEditingId(trainer.id);
    setSelectedTrainer(null);
    setOpenMenu(null);
    setModal("edit");
  };

  // ADD / UPDATE TRAINER
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.specialization.trim()) {
      alert("Please enter trainer name and specialization.");
      return;
    }

    if (editingId !== null) {
      setTrainers((previous) =>
        previous.map((trainer) =>
          trainer.id === editingId
            ? {
                ...trainer,
                ...form,
                name: form.name.trim(),
                sessions: Number(form.sessions),
                members: Number(form.members),
                commission: Number(form.commission),
                initials: form.name
                  .trim()
                  .split(/\s+/)
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              }
            : trainer
        )
      );
      alert("Trainer updated successfully!");
    } else {
      const newTrainer = {
        id: Date.now(),
        ...form,
        name: form.name.trim(),
        specialization: form.specialization.trim(),
        sessions: Number(form.sessions),
        members: Number(form.members),
        commission: Number(form.commission),
        rating: 5.0,
        initials: form.name
          .trim()
          .split(/\s+/)
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        color: colors[trainers.length % colors.length],
        online: true
      };
      setTrainers((previous) => [...previous, newTrainer]);
      alert("New trainer added successfully!");
    }
    closeModal();
    setForm(emptyForm);
  };

  // DELETE TRAINER
  const deleteTrainer = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trainer?"
    );
    if (confirmDelete) {
      setTrainers((previous) =>
        previous.filter((trainer) => trainer.id !== id)
      );
      closeModal();
      alert("Trainer deleted successfully!");
    }
  };

  // VIEW DETAILS
  const viewTrainer = (trainer) => {
    setSelectedTrainer(trainer);
    setOpenMenu(null);
    setModal("view");
  };

  // SCHEDULE
  const viewSchedule = (trainer) => {
    setSelectedTrainer(trainer);
    setModal("schedule");
  };

  // MESSAGE
  const openMessage = (trainer) => {
    setSelectedTrainer(trainer);
    setMessageText("");
    setModal("message");
  };

  // SEND MESSAGE
  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      trainerId: selectedTrainer.id,
      trainer: selectedTrainer.name,
      message: messageText.trim(),
      date: new Date().toLocaleString()
    };

    setMessages((previous) => [...previous, newMessage]);
    alert("Message saved successfully!");
    setMessageText("");
    closeModal();
  };

  // MESSAGE HISTORY
  const trainerMessages = messages.filter(
    (message) => message.trainerId === selectedTrainer?.id
  );

  return (
    <div className="trainer-management">
      {/* HEADER */}
      <div className="trainer-header">
        <div>
          <h1>Trainer Management</h1>
          <p>
            {trainers.length} active trainers · $
            {(totalCommission / 1000).toFixed(1)}K total commissions this month
          </p>
        </div>

        <div className="trainer-header-actions">
          <div className="view-toggle">
            <button
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid size={16} /> Grid
            </button>

            <button
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
            >
              <List size={16} /> List
            </button>
          </div>

          <button className="btn-primary" onClick={openAddModal}>
            <UserPlus size={17} /> Add Trainer
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="trainer-stats">
        <div className="t-stat-card">
          <div className="t-stat-icon"><Users size={24} /></div>
          <div className="t-stat-content">
            <p>ACTIVE TRAINERS</p>
            <h2>{trainers.length}</h2>
          </div>
        </div>

        <div className="t-stat-card">
          <div className="t-stat-icon"><Calendar size={24} /></div>
          <div className="t-stat-content">
            <p>SESSIONS THIS MONTH</p>
            <h2>{totalSessions}</h2>
          </div>
        </div>

        <div className="t-stat-card">
          <div className="t-stat-icon"><DollarSign size={24} /></div>
          <div className="t-stat-content">
            <p>TOTAL COMMISSIONS</p>
            <h2>${(totalCommission / 1000).toFixed(1)}K</h2>
          </div>
        </div>

        <div className="t-stat-card">
          <div className="t-stat-icon"><Star size={24} /></div>
          <div className="t-stat-content">
            <p>AVG RATING</p>
            <h2>{averageRating}</h2>
          </div>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="trainer-filters">
        <div className="t-search">
          <Search size={18} className="t-search-icon" />
          <input
            type="text"
            placeholder="Search trainers by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="t-select"
          value={filterSpecialization}
          onChange={(e) => setFilterSpecialization(e.target.value)}
        >
          <option value="All">All Specializations</option>
          <option value="Strength">Strength & Conditioning</option>
          <option value="Yoga">Yoga & Mindfulness</option>
          <option value="Cardio">Cardio & HIIT</option>
          <option value="Pilates">Pilates & Core</option>
          <option value="CrossFit">CrossFit & Functional</option>
          <option value="Zumba">Zumba & Dance Fitness</option>
          <option value="Boxing">Boxing & MMA</option>
          <option value="Aerobics">Aerobics & Stretching</option>
        </select>

        <select
          className="t-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Sessions">Sort: Sessions</option>
          <option value="Commission">Sort: Commission</option>
          <option value="Rating">Sort: Rating</option>
        </select>
      </div>

      {/* TRAINER CARDS */}
      <div className={`trainer-grid ${viewMode}`}>
        {filteredTrainers.map((trainer) => (
          <div className={`trainer-card theme-${trainer.color}`} key={trainer.id}>
            <div className="tc-top">
              <div className="tc-avatar-wrapper">
                <div className={`tc-avatar bg-${trainer.color}`}>
                  {trainer.initials}
                </div>
                <div className={`tc-status-dot ${trainer.online ? "online" : "offline"}`} />
              </div>

              <div className="tc-top-right">
                <span className="tc-badge">{trainer.badge}</span>
                <div className="tc-rating">
                  <Star size={12} fill="currentColor" />
                  {trainer.rating}
                </div>
              </div>
            </div>

            <div className="tc-info">
              <h3>{trainer.name}</h3>
              <p>{trainer.specialization}</p>
            </div>

            <div className="tc-stats-mini">
              <div>
                <span>Sessions</span>
                <strong>{trainer.sessions}</strong>
              </div>
              <div>
                <span>Members</span>
                <strong>{trainer.members}</strong>
              </div>
              <div>
                <span>Rating</span>
                <strong>{trainer.rating}</strong>
              </div>
            </div>

            <div className="tc-commission">
              <div className="tc-comm-header">
                <span>Monthly Commission</span>
                <strong>${Number(trainer.commission).toLocaleString()}</strong>
              </div>
              <div className="tc-progress-bar">
                <div
                  className={`tc-progress-fill bg-${trainer.color}`}
                  style={{
                    width: `${Math.min((trainer.commission / 5000) * 100, 100)}%`
                  }}
                />
              </div>
            </div>

            <div className="tc-actions">
              <button
                className="tc-btn schedule"
                onClick={() => viewSchedule(trainer)}
              >
                <Calendar size={16} /> Schedule
              </button>

              <button
                className="tc-btn icon-only"
                title="Message"
                onClick={() => openMessage(trainer)}
              >
                <MessageCircle size={16} />
              </button>

              <div className="tc-menu-wrapper">
                <button
                  className="tc-btn icon-only"
                  title="More Options"
                  onClick={() =>
                    setOpenMenu(openMenu === trainer.id ? null : trainer.id)
                  }
                >
                  <MoreVertical size={16} />
                </button>

                {openMenu === trainer.id && (
                  <div className="trainer-dropdown">
                    <button onClick={() => viewTrainer(trainer)}>
                      <Eye size={15} /> View Details
                    </button>
                    <button onClick={() => openEditModal(trainer)}>
                      <Edit size={15} /> Edit Trainer
                    </button>
                    <button
                      className="delete-option"
                      onClick={() => deleteTrainer(trainer.id)}
                    >
                      <Trash2 size={15} /> Delete Trainer
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredTrainers.length === 0 && (
          <div className="no-trainers">
            <Users size={35} />
            <h3>No Trainers Found</h3>
            <p>Try another search or add a new trainer.</p>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {(modal === "add" || modal === "edit") && (
        <div className="trainer-modal-overlay" onClick={closeModal}>
          <div className="trainer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-heading">
              <div>
                <h2>{modal === "add" ? "Add New Trainer" : "Edit Trainer"}</h2>
                <p>Enter trainer information below.</p>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>Trainer Name</label>
              <input
                type="text"
                placeholder="Enter trainer name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <label>Specialization</label>
              <input
                type="text"
                placeholder="e.g. Strength & Conditioning"
                value={form.specialization}
                onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                required
              />

              <label>Trainer Badge</label>
              <select
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
              >
                <option value="Trainer">Trainer</option>
                <option value="Senior">Senior</option>
                <option value="Certified">Certified</option>
                <option value="Expert">Expert</option>
                <option value="Junior">Junior</option>
              </select>

              <div className="form-two-columns">
                <div>
                  <label>Sessions</label>
                  <input
                    type="number"
                    min="0"
                    value={form.sessions}
                    onChange={(e) => setForm({ ...form, sessions: e.target.value })}
                  />
                </div>
                <div>
                  <label>Members</label>
                  <input
                    type="number"
                    min="0"
                    value={form.members}
                    onChange={(e) => setForm({ ...form, members: e.target.value })}
                  />
                </div>
              </div>

              <label>Monthly Commission ($)</label>
              <input
                type="number"
                min="0"
                value={form.commission}
                onChange={(e) => setForm({ ...form, commission: e.target.value })}
              />

              <button type="submit" className="modal-submit">
                {modal === "add" ? <Plus size={17} /> : <Edit size={17} />}
                {modal === "add" ? "Add Trainer" : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIEW DETAILS */}
      {modal === "view" && selectedTrainer && (
        <div className="trainer-modal-overlay" onClick={closeModal}>
          <div className="trainer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-heading">
              <h2>Trainer Details</h2>
              <button className="modal-close" onClick={closeModal}>
                <X />
              </button>
            </div>

            <div className="trainer-detail-avatar">
              {selectedTrainer.initials}
            </div>

            <h2 className="detail-name">{selectedTrainer.name}</h2>
            <p className="detail-specialization">
              {selectedTrainer.specialization}
            </p>

            <div className="trainer-detail-info">
              <p><span><Award size={16} /> Badge</span><strong>{selectedTrainer.badge}</strong></p>
              <p><span><Calendar size={16} /> Sessions</span><strong>{selectedTrainer.sessions}</strong></p>
              <p><span><Users size={16} /> Members</span><strong>{selectedTrainer.members}</strong></p>
              <p><span><Star size={16} /> Rating</span><strong>{selectedTrainer.rating} / 5</strong></p>
              <p><span><DollarSign size={16} /> Commission</span><strong>${selectedTrainer.commission}</strong></p>
              <p><span>Status</span><strong>{selectedTrainer.online ? "Online" : "Offline"}</strong></p>
            </div>

            <button
              className="modal-submit"
              onClick={() => openEditModal(selectedTrainer)}
            >
              <Edit size={16} /> Edit Trainer
            </button>
          </div>
        </div>
      )}

      {/* SCHEDULE MODAL */}
      {modal === "schedule" && selectedTrainer && (
        <div className="trainer-modal-overlay" onClick={closeModal}>
          <div className="trainer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-heading">
              <div>
                <h2>Trainer Schedule</h2>
                <p>{selectedTrainer.name}</p>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <X />
              </button>
            </div>

            <div className="trainer-schedule-info">
              {[
                ["Monday", "06:00 AM - 10:00 AM"],
                ["Tuesday", "04:00 PM - 08:00 PM"],
                ["Wednesday", "06:00 AM - 10:00 AM"],
                ["Thursday", "04:00 PM - 08:00 PM"],
                ["Friday", "06:00 AM - 10:00 AM"],
                ["Saturday", "09:00 AM - 01:00 PM"],
                ["Sunday", "Off Day"]
              ].map(([day, time]) => (
                <div key={day}>
                  <strong>{day}</strong>
                  <span>
                    <Clock size={14} /> {time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MESSAGE MODAL */}
      {modal === "message" && selectedTrainer && (
        <div className="trainer-modal-overlay" onClick={closeModal}>
          <div className="trainer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-heading">
              <div>
                <h2>Message Trainer</h2>
                <p>To: {selectedTrainer.name}</p>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <X />
              </button>
            </div>

            <form onSubmit={sendMessage}>
              <label>Write Message</label>
              <textarea
                placeholder="Write your message here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                required
              />
              <button className="modal-submit" type="submit">
                <Send size={16} /> Send Message
              </button>
            </form>

            <div className="message-history">
              <h3>Message History</h3>
              {trainerMessages.length === 0 ? (
                <p>No messages sent yet.</p>
              ) : (
                trainerMessages.map((message) => (
                  <div className="message-item" key={message.id}>
                    <p>{message.message}</p>
                    <small>{message.date}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerManagement;