import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, Calendar, MessageSquare, Megaphone, 
  Settings, Box, Sparkles, FileText, Grid, PieChart, 
  User, Briefcase, Bell, Shield, CreditCard, Palette, 
  Key, Database
} from "lucide-react";
import "./SettingsPage.css";
import NotificationPreferences from "../NotificationPreferences";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("Business");
  
  // 👇 Buttons aur Form ki States
  const [gymName, setGymName] = useState("Dreams GYM");
  const [saveStatus, setSaveStatus] = useState("idle"); // idle, saving, saved

  // 👇 Button Functions
  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000); // 3 second baad wapas normal
    }, 1000);
  };

  const handleReset = () => {
    setGymName("Dreams GYM"); // Default value wapas
    alert("Form has been reset to default values!");
  };

  const handleExport = () => {
    alert("Data exported successfully! (Check your downloads)");
  };

  return (
    <div className="settings-layout">
      
      {/* =========================================
          DASHBOARD SIDEBAR
      ========================================= */}
      <aside className="dashboard-sidebar">
        <div className="dash-logo">
          <img src="/images/kinetix.svg" alt="Logo" />
        </div>

        <div className="dash-menu">
          <Link to="/dashboard" className="dash-item">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/calendar" className="dash-item">
            <Calendar size={18} /> Calendar
          </Link>
          <Link to="/chat" className="dash-item">
            <MessageSquare size={18} /> Chat
          </Link>
          <Link to="/announcements" className="dash-item">
            <Megaphone size={18} /> Announcements
          </Link>
          
          <div className="dash-section-title">UI COMPONENTS</div>
          <Link to="/ui" className="dash-item">
            <Box size={18} /> Base UI
          </Link>
          <Link to="/advanced" className="dash-item">
            <Sparkles size={18} /> Advanced UI
          </Link>
          <Link to="/forms" className="dash-item">
            <FileText size={18} /> Forms
          </Link>
          <Link to="/tables" className="dash-item">
            <Grid size={18} /> Tables
          </Link>
          <Link to="/charts" className="dash-item">
            <PieChart size={18} /> Charts
          </Link>

          <Link to="/settings" className="dash-item active">
            <Settings size={18} /> Settings
          </Link>
        </div>

        <div className="dash-footer">
          <img src="/images/user.jpg" alt="User" />
          <div className="user-text">
            <h4>Nathan Reeves</h4>
            <p>Super Admin</p>
          </div>
        </div>
      </aside>

      {/* =========================================
          MAIN SETTINGS CONTENT
      ========================================= */}
      <main className="settings-main">
        
        <header className="settings-header">
          <div>
            <h1>Settings</h1>
            <p>Manage your account, business & preferences</p>
          </div>
          <div className="header-actions">
            <button className="btn-outline" onClick={handleExport}>
              Export
            </button>
            <button className="btn-outline" onClick={handleReset}>
              Reset
            </button>
            <button className="btn-solid" onClick={handleSave}>
              {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "✓ Saved!" : "✓ Save Changes"}
            </button>
          </div>
        </header>

        <div className="settings-grid">
          
          {/* Left Navigation (Tabs) */}
          <div className="settings-tabs">
            <button className={`tab-btn ${activeTab === "Profile" ? "active" : ""}`} onClick={() => setActiveTab("Profile")}>
              <User size={18} /> Profile
            </button>
            <button className={`tab-btn ${activeTab === "Business" ? "active" : ""}`} onClick={() => setActiveTab("Business")}>
              <Briefcase size={18} /> Business
            </button>
            <button className={`tab-btn ${activeTab === "Notifications" ? "active" : ""}`} onClick={() => setActiveTab("Notifications")}>
              <Bell size={18} /> Notifications
            </button>
            <button className={`tab-btn ${activeTab === "Security" ? "active" : ""}`} onClick={() => setActiveTab("Security")}>
              <Shield size={18} /> Security
            </button>
            <button className={`tab-btn ${activeTab === "Billing" ? "active" : ""}`} onClick={() => setActiveTab("Billing")}>
              <CreditCard size={18} /> Billing
            </button>
            <button className={`tab-btn ${activeTab === "Appearance" ? "active" : ""}`} onClick={() => setActiveTab("Appearance")}>
              <Palette size={18} /> Appearance
            </button>
           
          </div>

          {/* Right Content Area */}
          <div className="settings-content">
            
            {/* 👇 PROFILE TAB */}
            {activeTab === "Profile" && (
              <>
                <h2 className="content-title">Profile Information</h2>
                <div className="profile-top">
                  <div className="avatar-circle">NR</div>
                  <div className="profile-info">
                    <h3>Nathan Reeves</h3>
                    <p>Super Admin · nathan@example.com</p>
                    <button className="btn-outline">↑ Change Photo</button>
                  </div>
                </div>
                <form className="settings-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" defaultValue="Nathan Reeves" />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" defaultValue="nathan@example.com" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="text" defaultValue="(512) 555-0118" />
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                      <input type="text" defaultValue="Super Admin" readOnly />
                      <span className="helper-text">Roles are managed by your organisation owner</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea rows="3" defaultValue="Gym owner & fitness enthusiast running Dreams GYM across 6 branches."></textarea>
                  </div>
                </form>
              </>
            )}

            {/* 👇 BUSINESS TAB */}
            {activeTab === "Business" && (
              <>
                <h2 className="content-title">Business Details</h2>
                <form className="settings-form">
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Gym Name</label>
                      <input 
                        type="text" 
                        value={gymName} 
                        onChange={(e) => setGymName(e.target.value)} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Tax ID (EIN)</label>
                      <input type="text" defaultValue="47-1234567" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Contact Email</label>
                      <input type="email" defaultValue="hello@example.com" />
                    </div>
                    <div className="form-group">
                      <label>Support Phone</label>
                      <input type="text" defaultValue="1-800-555-0199" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Currency</label>
                      <select defaultValue="USD">
                        <option value="USD">$ USD — US Dollar</option>
                        <option value="PKR">Rs PKR — Pakistani Rupee</option>
                        <option value="EUR">€ EUR — Euro</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Timezone</label>
                      <select defaultValue="ET">
                        <option value="ET">ET (GMT-5:00)</option>
                        <option value="PT">PT (GMT-8:00)</option>
                        <option value="PKT">PKT (GMT+5:00)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Registered Address</label>
                    <input type="text" defaultValue="400 Congress Ave, Austin, TX 78701" />
                  </div>

                </form>
              </>
            )}

            {/* 👇 OTHER TABS (Placeholder) */}
             {/* ✅ NOTIFICATIONS TAB (Yahan component call hua hai) */}
            {activeTab === "Notifications" && (
              <div className="notifications-tab-wrapper">
                <h2 className="content-title" style={{ marginBottom: '20px' }}>Notifications</h2>
                <NotificationPreferences />
              </div>
            )}
  
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;