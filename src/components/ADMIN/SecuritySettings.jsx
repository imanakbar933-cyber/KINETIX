import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import "./SecuritySettings.css";

const SecuritySettings = () => {
  // Password States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");

  // Security Options States
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [isLoginAlertsEnabled, setIsLoginAlertsEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  // Handle Password Update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPassError("Please fill all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setPassError("Password must be at least 8 characters long.");
      return;
    }

    // Simulate API call
    setPassSuccess("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    
    setTimeout(() => setPassSuccess(""), 3000);
  };

  return (
    <div className="security-wrapper">
      
      {/* ================= CHANGE PASSWORD CARD ================= */}
      <div className="security-card">
        <div className="card-header">
          <div className="title-bar"></div>
          <h2>Change Password</h2>
        </div>

        <form onSubmit={handlePasswordUpdate} className="password-form">
          <div className="form-group full-width">
            <label>Current Password</label>
            <div className="input-wrapper">
              <input 
                type={showPass ? "text" : "password"} 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••" 
              />
              <button type="button" className="icon-btn" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>New Password</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••" 
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••" 
              />
            </div>
          </div>

          <div className="form-footer">
            <p className="helper-text">Use 8+ characters with a number and a symbol</p>
            <button type="submit" className="btn-primary">
              <Lock size={16} /> Update Password
            </button>
          </div>

          {/* Error / Success Messages */}
          {passError && <p className="error-msg">{passError}</p>}
          {passSuccess && <p className="success-msg">{passSuccess}</p>}
        </form>
      </div>

      {/* ================= SECURITY OPTIONS CARD ================= */}
      <div className="security-card">
        <div className="card-header">
          <div className="title-bar"></div>
          <h2>Security Options</h2>
        </div>

        <div className="options-list">
          
          {/* 2FA Option */}
          <div className="option-item">
            <div className="option-info">
              <h3>Two-Factor Authentication</h3>
              <p>Add an extra layer of security to your account</p>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={is2FAEnabled} 
                onChange={() => setIs2FAEnabled(!is2FAEnabled)} 
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Login Alerts Option */}
          <div className="option-item">
            <div className="option-info">
              <h3>Login Alerts</h3>
              <p>Get notified of new sign-ins</p>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={isLoginAlertsEnabled} 
                onChange={() => setIsLoginAlertsEnabled(!isLoginAlertsEnabled)} 
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Session Timeout */}
          <div className="option-item">
            <div className="option-info">
              <h3>Session Timeout</h3>
              <p>Automatically sign out after inactivity</p>
            </div>
            <select 
              className="custom-select"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          {/* Active Sessions */}
          <div className="option-item">
            <div className="option-info">
              <h3>Active Sessions</h3>
              <p>3 devices currently signed in</p>
            </div>
            <div className="session-actions">
              <button 
                className="btn-outline" 
                onClick={() => alert("Manage sessions modal would open here.")}
              >
                Manage
              </button>
              <button 
                className="btn-danger" 
                onClick={() => alert("Signed out of all devices!")}
              >
                Sign out all
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SecuritySettings;