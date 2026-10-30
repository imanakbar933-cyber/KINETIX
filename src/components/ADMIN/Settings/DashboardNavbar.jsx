import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { 
  Menu, Search, Bell, Mail, Maximize, Minimize, ChevronDown, 
  Settings, LogOut, User, Home 
} from "lucide-react";
import "./DashboardNavbar.css";

const DashboardNavbar = ({ toggleSidebar }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
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
    // Yahan aap local storage clear ya API call laga sakti hain
    alert("Logged out successfully!");
    navigate("/login");
  };

  // 3. Search Logic
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      alert(`Searching for: ${searchQuery}`);
      // Yahan aap search page pe navigate kar sakti hain:
      // navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <header className="dash-navbar">
      <div className="dash-nav-left">
        {/* Sidebar Toggle */}
        <button className="dash-icon-btn" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>

        {/* BACK TO HOME ICON */}
        <Link to="/" className="dash-icon-btn home-btn" title="Back to Home">
          <Home size={18} />
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
          <Search size={16} className="search-icon" />
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
          {/* Fullscreen Button */}
          <button 
            className="dash-icon-btn tooltip" 
            data-tooltip="Fullscreen"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
          
          {/* Messages Button */}
          <button 
            className="dash-icon-btn tooltip" 
            data-tooltip="Messages"
            onClick={() => alert("Messages panel opening...")}
          >
            <Mail size={18} />
          </button>
          
          {/* Notifications Button */}
          <button 
            className="dash-icon-btn tooltip" 
            data-tooltip="Notifications"
            onClick={() => alert("You have 1 new notification!")}
          >
            <Bell size={18} />
            <span className="notification-dot"></span>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="dash-profile">
          <div 
            className="profile-trigger" 
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <img src="/images/user.jpg" alt="User" className="profile-pic" />
            <div className="profile-info">
              <h4>Nathan Reeves</h4>
              <p>Super Admin</p>
            </div>
            <ChevronDown size={16} className={`arrow ${profileOpen ? "open" : ""}`} />
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
                <Home size={16} /> Back to Home
              </Link>

              <button 
                className="dropdown-link"
                onClick={() => alert("Opening My Profile...")}
              >
                <User size={16} /> My Profile
              </button>
              
              <button 
                className="dropdown-link"
                onClick={() => alert("Opening Account Settings...")}
              >
                <Settings size={16} /> Account Settings
              </button>
              
              <div className="dropdown-divider"></div>
              
              {/* Logout Button */}
              <button className="dropdown-link logout" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;