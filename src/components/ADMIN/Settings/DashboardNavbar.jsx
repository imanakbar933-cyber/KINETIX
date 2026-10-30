import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { 
  Menu, Search, Bell, Mail, Maximize, Minimize, ChevronDown, 
  Settings, LogOut, User, Home, Camera 
} from "lucide-react";
import "./DashboardNavbar.css";

const DashboardNavbar = ({ toggleSidebar }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // 👇 Image Upload ke liye State aur Ref
  const [profilePic, setProfilePic] = useState("/images/user.jpg");
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  // 1. Fullscreen Toggle Logic
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

  // 2. Logout Logic
  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  // 3. Search Logic
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  // 4. Image Upload Logic
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl); // Nayi image set kar di
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click(); // Input field ko trigger kiya
  };

  return (
    <header className="dash-navbar">
      <div className="dash-nav-left">
        {/* Sidebar Toggle */}
        <button className="dash-icon-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>

        {/* BACK TO HOME ICON */}
        <Link to="/" className="dash-icon-btn home-btn" title="Back to Home">
          <Home size={22} />
        </Link>

        {/* Breadcrumb */}
        <div className="dash-breadcrumb">
          <Link to="/" className="home-text">Home</Link>
          <span className="separator">&gt;</span>
          <span className="current-text">Dashboard</span>
        </div>
      </div>

      <div className="dash-nav-right">
        {/* Search Bar */}
        <div className="dash-search">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search pages, members..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <span className="search-shortcut">⌘K</span>
        </div>

        {/* Action Buttons */}
        <div className="dash-actions">
          <button 
            className="dash-icon-btn tooltip" 
            data-tooltip="Fullscreen"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
          </button>
          
          <button 
            className="dash-icon-btn tooltip" 
            data-tooltip="Messages"
            onClick={() => alert("Messages panel opening...")}
          >
            <Mail size={22} />
          </button>
          
          <button 
            className="dash-icon-btn tooltip" 
            data-tooltip="Notifications"
            onClick={() => alert("You have 1 new notification!")}
          >
            <Bell size={22} />
            <span className="notification-dot"></span>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="dash-profile">
          <div 
            className="profile-trigger" 
            onClick={() => setProfileOpen(!profileOpen)}
          >
            {/* 👇 Profile Image with Hover Upload */}
            <div className="profile-image-wrapper">
              <img src={profilePic} alt="User" className="profile-pic" />
              
              {/* Hover par Camera icon show hoga */}
              <div className="image-upload-overlay" onClick={triggerFileInput}>
                <Camera size={16} />
              </div>
              
              {/* Hidden File Input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                style={{ display: "none" }} 
              />
            </div>

            <div className="profile-info">
              <h4>Nathan Reeves</h4>
              <p>Super Admin</p>
            </div>
            <ChevronDown size={18} className={`arrow ${profileOpen ? "open" : ""}`} />
          </div>

          {/* Dropdown Menu */}
          {profileOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <h4>Nathan Reeves</h4>
                <p>nathan@example.com</p>
              </div>
              <div className="dropdown-divider"></div>
              
              <Link to="/" className="dropdown-link">
                <Home size={18} /> Back to Home
              </Link>

              <button 
                className="dropdown-link"
                onClick={() => alert("Opening My Profile...")}
              >
                <User size={18} /> My Profile
              </button>
              
              <button 
                className="dropdown-link"
                onClick={() => alert("Opening Account Settings...")}
              >
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
    </header>
  );
};

export default DashboardNavbar;