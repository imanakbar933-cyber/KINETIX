import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid, Users, Dumbbell, Utensils, Calendar,
  UserCircle, FileText, BarChart2, Settings, Briefcase,
  BriefcaseBusiness, Camera, X, User, Trash2
} from "lucide-react";
import "./DashboardSidebar.css";

const DEFAULT_AVATAR = "/images/user.jpg";

const DashboardSidebar = ({ isOpen, onResizeStart, onHeightResizeStart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved
      ? JSON.parse(saved)
      : { name: "Nathan Reeves", email: "nathan@example.com", role: "Super Admin", photo: DEFAULT_AVATAR };
  });

  // ✅ Same WhatsApp-style image modal as Navbar
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const loadProfile = () => {
      const saved = localStorage.getItem("userProfile");
      if (saved) setUser(JSON.parse(saved));
    };
    window.addEventListener("profileUpdated", loadProfile);
    return () => window.removeEventListener("profileUpdated", loadProfile);
  }, []);

  const isActive = (path) =>
    location.pathname === path ? "dash-menu-item active" : "dash-menu-item";

  // ✅ Persist image (base64) → sync with Navbar & Settings
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const updated = { ...user, photo: reader.result };
      setUser(updated);
      localStorage.setItem("userProfile", JSON.stringify(updated));
      window.dispatchEvent(new Event("profileUpdated"));
    };
    reader.readAsDataURL(file);
  };

  // ✅ Remove profile photo (reset to default avatar)
  const handleRemovePhoto = () => {
    const updated = { ...user, photo: DEFAULT_AVATAR };
    setUser(updated);
    localStorage.setItem("userProfile", JSON.stringify(updated));
    window.dispatchEvent(new Event("profileUpdated"));
  };

  const triggerFileInput = (e) => {
    if (e) e.stopPropagation();
    fileInputRef.current.click();
  };

  const goToProfileSettings = () => {
    setIsImageModalOpen(false);
    navigate("/settings?tab=profile");
  };

  return (
    <>
      <aside className={`dash-sidebar ${isOpen ? "open" : ""}`}>
        <div className="dash-sidebar-header">
          <Link to="/" className="sidebar-logo">
            <img src="/images/kinetix.svg" alt="Kinetix" />
          </Link>
        </div>

        <div className="dash-sidebar-menu">
          <Link to="/dashboard" className={isActive("/dashboard")}><LayoutGrid size={20} /> Dashboard</Link>
          <Link to="/members" className={isActive("/members")}><Users size={20} /> Member</Link>
          <Link to="/workouts" className={isActive("/workouts")}><Dumbbell size={20} /> Workout Routine</Link>
          <Link to="/diet" className={isActive("/diet")}><Utensils size={20} /> Diet Chart</Link>
          <Link to="/batch-schedule" className={isActive("/batch-schedule")}><Calendar size={20} /> Batch Schedule</Link>

          <Link to="/dashboard/trainers" className={isActive("/dashboard/trainers")}>
            <UserCircle size={20} /> Trainer List
          </Link>
          <Link to="/dashboard/services" className={isActive("/dashboard/services")}>
            <BriefcaseBusiness size={20} />
            Services
          </Link>
          <Link to="/dashboard/staff" className={isActive("/dashboard/staff")}>
            <Briefcase size={20} /> Staff
          </Link>
          <Link to="/billing" className={isActive("/billing")}><FileText size={20} /> Point of Sale</Link>
          <Link to="/reports" className={isActive("/reports")}><BarChart2 size={20} /> Report</Link>

          <Link to="/settings" className={isActive("/settings")}><Settings size={20} /> Settings</Link>
        </div>

        {/* ✅ Sidebar footer profile — clickable to open same modal */}
        <div className="dash-sidebar-footer-wrap">
          <div
            className="dash-sidebar-footer"
            onClick={() => setIsImageModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setIsImageModalOpen(true); }}
            title="View / edit profile"
          >
            <img src={user.photo} alt={user.name} style={{ objectFit: "cover" }} />
            <div className="user-info">
              <h4>{user.name}</h4>
              <p>{user.role || "Super Admin"}</p>
            </div>
          </div>
        </div>

        {isOpen && (
          <div
            className="dash-sidebar-resize-handle"
            onMouseDown={onResizeStart}
            title="Drag to resize width"
          ></div>
        )}

        {isOpen && (
          <div
            className="dash-sidebar-height-handle"
            onMouseDown={onHeightResizeStart}
            title="Drag to resize height"
          ></div>
        )}
      </aside>

      {/* ✅ WhatsApp-style image modal — SAME as Navbar */}
      {isImageModalOpen && (
        <div className="wa-image-modal-backdrop" onClick={() => setIsImageModalOpen(false)}>
          <div className="wa-image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="wa-close-btn" onClick={() => setIsImageModalOpen(false)}>
              <X size={24} />
            </button>

            <div className="wa-large-image-wrapper">
              <img src={user.photo} alt="Profile" className="wa-large-image" />
            </div>

            <div className="wa-image-actions">
              <div className="wa-user-details">
                <h2>{user.name}</h2>
                <p>{user.role || "Super Admin"} · {user.email}</p>
              </div>

              <div className="wa-image-btn-row">
                <button className="wa-upload-btn" onClick={triggerFileInput}>
                  <Camera size={18} /> Change Photo
                </button>
                <button className="wa-upload-btn" onClick={goToProfileSettings}>
                  <User size={18} /> Edit Profile
                </button>
                <button
                  className="wa-remove-btn"
                  onClick={() => {
                    if (window.confirm("Remove profile photo?")) {
                      handleRemovePhoto();
                    }
                  }}
                >
                  <Trash2 size={18} /> Remove Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: "none" }}
      />
    </>
  );
};

export default DashboardSidebar;