import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  Maximize,
  Minimize,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Home,
  Camera,
  X,
  Trash2,
} from "lucide-react";

import "./DashboardNavbar.css";

const DEFAULT_AVATAR = "/images/user.jpg";

const DashboardNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const fileInputRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("userProfile");

      return saved
        ? JSON.parse(saved)
        : {
            name: "Nathan Reeves",
            email: "nathan@example.com",
            role: "Super Admin",
            photo: DEFAULT_AVATAR,
          };
    } catch {
      return {
        name: "Nathan Reeves",
        email: "nathan@example.com",
        role: "Super Admin",
        photo: DEFAULT_AVATAR,
      };
    }
  });

  // LOAD PROFILE UPDATES
  useEffect(() => {
    const loadProfile = () => {
      try {
        const saved = localStorage.getItem("userProfile");

        if (saved) {
          setUser(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Profile loading error:", error);
      }
    };

    window.addEventListener("profileUpdated", loadProfile);

    return () => {
      window.removeEventListener("profileUpdated", loadProfile);
    };
  }, []);

  // FULLSCREEN CHANGE DETECTION
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // SAVE PROFILE
  const saveUserProfile = (updated) => {
    setUser(updated);

    localStorage.setItem(
      "userProfile",
      JSON.stringify(updated)
    );

    window.dispatchEvent(new Event("profileUpdated"));
  };

  // FULLSCREEN
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    setProfileOpen(false);
    alert("Logged out successfully!");
    navigate("/login");
  };

  // SEARCH
  const handleSearch = (event) => {
    if (
      event.key === "Enter" &&
      searchQuery.trim() !== ""
    ) {
      alert(`Searching for: ${searchQuery.trim()}`);
    }
  };

  // CHANGE PROFILE PHOTO
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const updated = {
        ...user,
        photo: reader.result,
      };

      saveUserProfile(updated);
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  // REMOVE PROFILE PHOTO
  const handleRemovePhoto = () => {
    const updated = {
      ...user,
      photo: DEFAULT_AVATAR,
    };

    saveUserProfile(updated);
  };

  // OPEN FILE PICKER
  const triggerFileInput = (event) => {
    event?.stopPropagation();
    fileInputRef.current?.click();
  };

  // PROFILE SETTINGS
  const goToProfileSettings = () => {
    setProfileOpen(false);
    setIsImageModalOpen(false);
    navigate("/settings?tab=profile");
  };

  // BUSINESS SETTINGS
  const goToBusinessSettings = () => {
    setProfileOpen(false);
    navigate("/settings?tab=business");
  };

  return (
    <>
      <header
        className={`dash-navbar ${
          isSidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <div className="dash-nav-inner">

          {/* LEFT SIDE */}
          <div className="dash-nav-left">
            <button
              type="button"
              className="dash-icon-btn"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>

            <div className="dash-breadcrumb">
              <span className="current-text animated-gradient-text">
                Dashboard
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="dash-nav-right">

            {/* SEARCH */}
            <div className="dash-search">
              <input
                type="text"
                placeholder="Search pages, members..."
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                onKeyDown={handleSearch}
              />

              <span className="search-shortcut">Enter</span>
            </div>

            {/* ACTIONS */}
            <div className="dash-actions">
              <button
                type="button"
                className="dash-icon-btn tooltip"
                data-tooltip="Fullscreen"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize size={22} />
                ) : (
                  <Maximize size={22} />
                )}
              </button>

              <button
                type="button"
                className="dash-icon-btn tooltip"
                data-tooltip="Notifications"
                onClick={() =>
                  alert("You have 1 new notification!")
                }
              >
                <Bell size={22} />
              </button>
            </div>

            {/* PROFILE */}
            <div className="dash-profile" ref={profileRef}>
              <div
                className="profile-trigger"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div
                  className="profile-image-wrapper"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsImageModalOpen(true);
                  }}
                >
                  <img
                    src={user.photo || DEFAULT_AVATAR}
                    alt="User"
                    className="profile-pic"
                  />
                </div>

                <div className="profile-info">
                  <h4>{user.name}</h4>
                  <p>{user.role || "Super Admin"}</p>
                </div>

                <ChevronDown
                  size={18}
                  className={`arrow ${
                    profileOpen ? "open" : ""
                  }`}
                />
              </div>

              {/* PROFILE DROPDOWN */}
              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>

                  <div className="dropdown-divider" />

                  <Link
                    to="/"
                    className="dropdown-link"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Home size={18} />
                    Back to Home
                  </Link>

                  <button
                    type="button"
                    className="dropdown-link"
                    onClick={goToProfileSettings}
                  >
                    <User size={18} />
                    My Profile
                  </button>

                  <button
                    type="button"
                    className="dropdown-link"
                    onClick={goToBusinessSettings}
                  >
                    <Settings size={18} />
                    Account Settings
                  </button>

                  <div className="dropdown-divider" />

                  <button
                    type="button"
                    className="dropdown-link logout"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* PROFILE IMAGE MODAL */}
      {isImageModalOpen && (
        <div
          className="wa-image-modal-backdrop"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="wa-image-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="wa-close-btn"
              onClick={() => setIsImageModalOpen(false)}
              aria-label="Close image modal"
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
                  type="button"
                  className="wa-upload-btn"
                  onClick={triggerFileInput}
                >
                  <Camera size={18} />
                  Change Photo
                </button>

                <button
                  type="button"
                  className="wa-upload-btn"
                  onClick={goToProfileSettings}
                >
                  <User size={18} />
                  Edit Profile
                </button>

                <button
                  type="button"
                  className="wa-remove-btn"
                  onClick={() => {
                    if (
                      window.confirm("Remove profile photo?")
                    ) {
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

      {/* HIDDEN FILE INPUT */}
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

export default DashboardNavbar;