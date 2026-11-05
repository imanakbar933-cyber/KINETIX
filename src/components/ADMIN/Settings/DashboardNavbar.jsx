import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { 
  Menu, Search, Bell, Mail, Maximize, Minimize, ChevronDown, 
  Settings, LogOut, User, Home, Camera 
} from "lucide-react";
import "./DashboardNavbar.css";

const DashboardNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : {
      name: "Nathan Reeves",
      email: "nathan@example.com",
      photo: "/images/user.jpg"
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, photo: imageUrl });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <header className={`dash-navbar ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="dash-nav-inner">
        
        <div className="dash-nav-left">
          <button className="dash-icon-btn" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>

          {/* ✅ Breadcrumb with Animated Text */}
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
              <div className="profile-image-wrapper">
                <img src={user.photo} alt="User" className="profile-pic" />
                <div className="image-upload-overlay" onClick={triggerFileInput}>
                  <Camera size={16} />
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ display: "none" }} />
              </div>

              <div className="profile-info">
                <h4>{user.name}</h4>
                <p>Super Admin</p>
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

                <button className="dropdown-link" onClick={() => alert("Opening My Profile...")}>
                  <User size={18} /> My Profile
                </button>
                
                <button className="dropdown-link" onClick={() => navigate("/settings")}>
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
  );
};

export default DashboardNavbar;