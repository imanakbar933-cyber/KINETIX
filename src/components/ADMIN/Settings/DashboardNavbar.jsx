import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu, Search, Bell, Mail, Maximize, Minimize, ChevronDown,
  Settings, LogOut, User, Home, Camera, X, Trash2
} from "lucide-react";
import "./DashboardNavbar.css";

const DEFAULT_AVATAR = "/images/user.jpg";

const DashboardNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ WhatsApp-style Image Modal
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : {
      name: "Nathan Reeves",
      email: "nathan@example.com",
      role: "Super Admin",
      photo: DEFAULT_AVATAR
    };
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = () => {
      const saved = localStorage.getItem("userProfile");
      if (saved) setUser(JSON.parse(saved));
    };
    window.addEventListener("profileUpdated", loadProfile);
    return () => window.removeEventListener("profileUpdated", loadProfile);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  // ✅ Persist image (base64) → sync with Sidebar & Settings
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

  // ✅ Remove profile photo
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
    setProfileOpen(false);
    setIsImageModalOpen(false);
    navigate("/settings?tab=profile");
  };

  const goToBusinessSettings = () => {
    setProfileOpen(false);
    navigate("/settings?tab=business");
  };

  return (
    <>
      <header className={`dash-navbar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div className="dash-nav-inner">
          <div className="dash-nav-left">
            <button className="dash-icon-btn" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>

            <div className="dash-breadcrumb">
              <span className="current-text animated-gradient-text">
                Dashboard
              </span>
            </div>
          </div>

          <div className="dash-nav-right">
            <div className="dash-search">
              <input
                type="text"
                placeholder="Search pages, members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
              <span className="search-shortcut">⌘K</span>
            </div>

            <div className="dash-actions">
              <button className="dash-icon-btn tooltip" data-tooltip="Fullscreen" onClick={toggleFullscreen}>
                {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
              </button>

              <button className="dash-icon-btn tooltip" data-tooltip="Messages" onClick={() => alert("Messages panel opening...")}>
                <Mail size={22} />
              </button>

              <button className="dash-icon-btn tooltip" data-tooltip="Notifications" onClick={() => alert("You have 1 new notification!")}>
                <Bell size={22} />
              </button>
            </div>

            <div className="dash-profile">
              <div className="profile-trigger" onClick={() => setProfileOpen(!profileOpen)}>
                <div
                  className="profile-image-wrapper"
                  onClick={(e) => { e.stopPropagation(); setIsImageModalOpen(true); }}
                >
                  <img src={user.photo} alt="User" className="profile-pic" />
                </div>

                <div className="profile-info">
                  <h4>{user.name}</h4>
                  <p>{user.role || "Super Admin"}</p>
                </div>
                <ChevronDown size={18} className={`arrow ${profileOpen ? "open" : ""}`} />
              </div>

              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>
                  <div className="dropdown-divider"></div>

                  <Link to="/" className="dropdown-link">
                    <Home size={18} /> Back to Home
                  </Link>

                  <button className="dropdown-link" onClick={goToProfileSettings}>
                    <User size={18} /> My Profile
                  </button>

                  <button className="dropdown-link" onClick={goToBusinessSettings}>
                    <Settings size={18} /> Account Settings
                  </button>

                  <div className="dropdown-divider"></div>

                  <button className="dropdown-link logout" onClick={handleLogout}>
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ✅ WHATSAPP-STYLE IMAGE MODAL */}
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

export default DashboardNavbar;