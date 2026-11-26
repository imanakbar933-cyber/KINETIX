import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  Dumbbell,
  Utensils,
  Calendar,
  UserCircle,
  FileText,
  BarChart2,
  Settings,
  Briefcase,
  BriefcaseBusiness,
  Camera,
  X,
  User,
  Trash2,
  LockKeyhole,
  Activity,
  ChevronDown,
  BookOpen,
  ClipboardList
} from "lucide-react";

import "./DashboardSidebar.css";

const DEFAULT_AVATAR = "/images/user.jpg";

const DashboardSidebar = ({
  isOpen,
  onResizeStart,
  onHeightResizeStart
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("userProfile");

      return saved
        ? JSON.parse(saved)
        : {
            name: "Nathan Reeves",
            email: "nathan@example.com",
            role: "Super Admin",
            photo: DEFAULT_AVATAR
          };
    } catch {
      return {
        name: "Nathan Reeves",
        email: "nathan@example.com",
        role: "Super Admin",
        photo: DEFAULT_AVATAR
      };
    }
  });

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [isExercisesOpen, setIsExercisesOpen] = useState(
    location.pathname.startsWith("/dashboard/exercises")
  );

  const isExerciseActive = location.pathname.startsWith(
    "/dashboard/exercises"
  );

  useEffect(() => {
    if (location.pathname.startsWith("/dashboard/exercises")) {
      setIsExercisesOpen(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const loadProfile = () => {
      try {
        const saved = localStorage.getItem("userProfile");

        if (saved) {
          setUser(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Unable to load user profile:", error);
      }
    };

    window.addEventListener("profileUpdated", loadProfile);

    return () => {
      window.removeEventListener("profileUpdated", loadProfile);
    };
  }, []);

  const isActive = (path) =>
    location.pathname === path
      ? "dash-menu-item active"
      : "dash-menu-item";

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const updated = {
        ...user,
        photo: reader.result
      };

      setUser(updated);

      localStorage.setItem(
        "userProfile",
        JSON.stringify(updated)
      );

      window.dispatchEvent(new Event("profileUpdated"));
    };

    reader.onerror = () => {
      alert("Unable to read this image.");
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleRemovePhoto = () => {
    const updated = {
      ...user,
      photo: DEFAULT_AVATAR
    };

    setUser(updated);

    localStorage.setItem(
      "userProfile",
      JSON.stringify(updated)
    );

    window.dispatchEvent(new Event("profileUpdated"));
  };

  const triggerFileInput = (e) => {
    if (e) e.stopPropagation();
    fileInputRef.current?.click();
  };

  const goToProfileSettings = () => {
    setIsImageModalOpen(false);
    navigate("/settings?tab=profile");
  };

  return (
    <>
      <aside className={`dash-sidebar ${isOpen ? "open" : ""}`}>

        {/* KINETIX SIDEBAR LOGO */}
        <div className="dash-sidebar-header">
          <Link to="/" className="sidebar-logo">
            <div className="sidebar-brand-icon" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="sidebar-brand-words">
              <strong>KINETIX</strong>
              <small>FITNESS CLUB</small>
            </div>
          </Link>
        </div>

        {/* SIDEBAR MENU */}
        <div className="dash-sidebar-menu">

          <Link to="/dashboard" className={isActive("/dashboard")}>
            <LayoutGrid size={20} />
            <span>Dashboard</span>
          </Link>

          <Link to="/members" className={isActive("/members")}>
            <Users size={20} />
            <span>Member</span>
          </Link>

          <Link to="/workouts" className={isActive("/workouts")}>
            <Dumbbell size={20} />
            <span>Workout Routine</span>
          </Link>

          {/* =========================================
              EXERCISES DROPDOWN
          ========================================= */}
          <div className="dash-exercises-dropdown">
            <button
              type="button"
              className={`dash-menu-item dash-exercises-toggle ${
                isExerciseActive ? "active" : ""
              }`}
              onClick={() => setIsExercisesOpen((prev) => !prev)}
              aria-expanded={isExercisesOpen}
            >
              <Activity size={20} />
              <span>Exercises</span>

              <ChevronDown
                size={17}
                className={`dash-dropdown-arrow ${
                  isExercisesOpen ? "open" : ""
                }`}
              />
            </button>

            {isExercisesOpen && (
              <div className="dash-exercises-submenu">

                {/* CHANGED: lowercase path */}
                <Link
                  to="/dashboard/exercises/library"
                  className={
                    location.pathname === "/dashboard/exercises/library"
                      ? "dash-exercise-sublink active"
                      : "dash-exercise-sublink"
                  }
                >
                  <BookOpen size={17} />
                  <span>Exercise Library</span>
                </Link>

                {/* CHANGED: lowercase path */}
                <Link
                  to="/dashboard/exercises/details"
                  className={
                    location.pathname === "/dashboard/exercises/details"
                      ? "dash-exercise-sublink active"
                      : "dash-exercise-sublink"
                  }
                >
                  <ClipboardList size={17} />
                  <span>Exercise Detail</span>
                </Link>

              </div>
            )}
          </div>

          <Link to="/diet" className={isActive("/diet")}>
            <Utensils size={20} />
            <span>Diet Chart</span>
          </Link>

          <Link to="/batch-schedule" className={isActive("/batch-schedule")}>
            <Calendar size={20} />
            <span>Batch Schedule</span>
          </Link>

          <Link
            to="/dashboard/trainers"
            className={isActive("/dashboard/trainers")}
          >
            <UserCircle size={20} />
            <span>Trainer List</span>
          </Link>

          <Link
            to="/dashboard/services"
            className={isActive("/dashboard/services")}
          >
            <BriefcaseBusiness size={20} />
            <span>Services</span>
          </Link>

          <Link
            to="/dashboard/staff"
            className={isActive("/dashboard/staff")}
          >
            <Briefcase size={20} />
            <span>Staff</span>
          </Link>

          <Link to="/billing" className={isActive("/billing")}>
            <FileText size={20} />
            <span>Point of Sale</span>
          </Link>

          <Link
            to="/locker-management"
            className={isActive("/locker-management")}
          >
            <LockKeyhole size={20} />
            <span>Locker Management</span>
          </Link>

          <Link to="/reports" className={isActive("/reports")}>
            <BarChart2 size={20} />
            <span>Report</span>
          </Link>

          <Link to="/settings" className={isActive("/settings")}>
            <Settings size={20} />
            <span>Settings</span>
          </Link>

        </div>

        {/* SIDEBAR PROFILE */}
        <div className="dash-sidebar-footer-wrap">
          <div
            className="dash-sidebar-footer"
            onClick={() => setIsImageModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsImageModalOpen(true);
              }
            }}
            title="View / edit profile"
          >
            <img
              src={user.photo || DEFAULT_AVATAR}
              alt={user.name}
              onError={(e) => {
                e.currentTarget.src = DEFAULT_AVATAR;
              }}
            />

            <div className="user-info">
              <h4>{user.name}</h4>
              <p>{user.role || "Super Admin"}</p>
            </div>
          </div>
        </div>

        {/* WIDTH RESIZE HANDLE */}
        {isOpen && (
          <div
            className="dash-sidebar-resize-handle"
            onMouseDown={onResizeStart}
            title="Drag to resize width"
          />
        )}

        {/* HEIGHT RESIZE HANDLE */}
        {isOpen && (
          <div
            className="dash-sidebar-height-handle"
            onMouseDown={onHeightResizeStart}
            title="Drag to resize height"
          />
        )}

      </aside>

      {/* PROFILE IMAGE MODAL */}
      {isImageModalOpen && (
        <div
          className="wa-image-modal-backdrop"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="wa-image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="wa-close-btn"
              onClick={() => setIsImageModalOpen(false)}
              aria-label="Close profile"
            >
              <X size={24} />
            </button>

            <div className="wa-large-image-wrapper">
              <img
                src={user.photo || DEFAULT_AVATAR}
                alt="Profile"
                className="wa-large-image"
              />
            </div>

            <div className="wa-image-actions">
              <div className="wa-user-details">
                <h2>{user.name}</h2>
                <p>
                  {user.role || "Super Admin"} · {user.email}
                </p>
              </div>

              <div className="wa-image-btn-row">
                <button
                  className="wa-upload-btn"
                  onClick={triggerFileInput}
                >
                  <Camera size={18} />
                  Change Photo
                </button>

                <button
                  className="wa-upload-btn"
                  onClick={goToProfileSettings}
                >
                  <User size={18} />
                  Edit Profile
                </button>

                <button
                  className="wa-remove-btn"
                  onClick={() => {
                    if (window.confirm("Remove profile photo?")) {
                      handleRemovePhoto();
                    }
                  }}
                >
                  <Trash2 size={18} />
                  Remove Photo
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