import React, { useState } from "react";
import { Lock, Eye, EyeOff, Monitor, Smartphone, X, LogOut, LogOutIcon, CheckCircle } from "lucide-react";
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

  // Modals & Toast States
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Sessions Data State
  const [sessions, setSessions] = useState([
    { id: 1, device: "Chrome · Windows 11", location: "Austin, TX · 103.21.44.8", time: "Active now", icon: <Monitor size={20} />, isCurrent: true },
    { id: 2, device: "Safari · iPhone 15", location: "Austin, TX · 103.21.44.9", time: "2 hours ago", icon: <Smartphone size={20} />, isCurrent: false },
    { id: 3, device: "Firefox · macOS", location: "Los Angeles, IN · 49.36.12.77", time: "Yesterday", icon: <Monitor size={20} />, isCurrent: false },
  ]);

  // ✅ PASSWORD STRENGTH LOGIC
  const calculateStrength = (password) => {
    if (!password) return { score: 0, label: "", color: "transparent" };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++; // Uppercase
    if (/[0-9]/.test(password)) score++; // Number
    if (/[^A-Za-z0-9]/.test(password)) score++; // Symbol

    if (score <= 1) return { score: 1, label: "Weak", color: "#ef4444" }; // Red
    if (score === 2) return { score: 2, label: "Fair", color: "#f59e0b" }; // Orange
    if (score === 3) return { score: 3, label: "Good", color: "#3b82f6" }; // Blue
    return { score: 4, label: "Strong", color: "#4ade80" }; // Green
  };

  const strength = calculateStrength(newPassword);

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

    setPassSuccess("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPassSuccess(""), 3000);
  };

  // Handle Sign Out All
  const handleSignOutAll = () => {
    const remainingSessions = sessions.filter(session => session.isCurrent);
    setSessions(remainingSessions);
    setIsConfirmModalOpen(false);
    setIsManageModalOpen(false);
    setToastMessage("All other devices signed out successfully!");
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Handle Single Sign Out
  const handleSignOutSingle = (id) => {
    const remainingSessions = sessions.filter(session => session.id !== id);
    setSessions(remainingSessions);
    setToastMessage("Device signed out successfully!");
    setTimeout(() => setToastMessage(""), 3000);
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
              
              {/* ✅ Password Strength Indicator (Sirf tab dikhega jab type karenge) */}
              {newPassword && (
                <div className="strength-container">
                  <div className="strength-bars">
                    {[1, 2, 3, 4].map((level) => (
                      <div 
                        key={level} 
                        className={`strength-bar ${strength.score >= level ? 'active' : ''}`}
                        style={{ backgroundColor: strength.score >= level ? strength.color : '#1f2e24' }}
                      ></div>
                    ))}
                  </div>
                  <span className="strength-text" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
              )}
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

          {passError && <p className="error-msg">{passError}</p>}
          {passSuccess && <p className="success-msg">{passSuccess}</p>}
        </form>
      </div>

      {/* ================= SECURITY OPTIONS CARD ================= */}
      {/* ... (Security options ka code waisa hi rahega) ... */}
      <div className="security-card">
        <div className="card-header">
          <div className="title-bar"></div>
          <h2>Security Options</h2>
        </div>

        <div className="options-list">
          <div className="option-item">
            <div className="option-info">
              <h3>Two-Factor Authentication</h3>
              <p>Add an extra layer of security to your account</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={is2FAEnabled} onChange={() => setIs2FAEnabled(!is2FAEnabled)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-item">
            <div className="option-info">
              <h3>Login Alerts</h3>
              <p>Get notified of new sign-ins</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={isLoginAlertsEnabled} onChange={() => setIsLoginAlertsEnabled(!isLoginAlertsEnabled)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-item">
            <div className="option-info">
              <h3>Session Timeout</h3>
              <p>Automatically sign out after inactivity</p>
            </div>
            <select className="custom-select" value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)}>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          <div className="option-item">
            <div className="option-info">
              <h3>Active Sessions</h3>
              <p>{sessions.length} {sessions.length === 1 ? "device" : "devices"} currently signed in</p>
            </div>
            <div className="session-actions">
              <button className="btn-outline" onClick={() => setIsManageModalOpen(true)}>Manage</button>
              <button className="btn-danger" onClick={() => setIsConfirmModalOpen(true)}>Sign out all</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals code waisa hi rahega jo pehle tha */}
      {toastMessage && (
        <div className="toast-success">
          <CheckCircle size={20} />
          <span>{toastMessage}</span>
        </div>
      )}

      {isManageModalOpen && (
        <div className="modal-overlay" onClick={() => setIsManageModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Active Sessions</h2>
              <button className="modal-close-btn" onClick={() => setIsManageModalOpen(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              {sessions.map((session) => (
                <div className={`session-card ${session.isCurrent ? "active-session" : ""}`} key={session.id}>
                  <div className="session-icon">{session.icon}</div>
                  <div className="session-details">
                    <h4>{session.device} {session.isCurrent && <span className="badge-this-device">This device</span>}</h4>
                    <p>{session.location} · {session.time}</p>
                  </div>
                  {!session.isCurrent && (
                    <button className="btn-signout-single" onClick={() => handleSignOutSingle(session.id)}>Sign out</button>
                  )}
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn-close-modal" onClick={() => setIsManageModalOpen(false)}>Close</button>
              {sessions.length > 1 && (
                <button className="btn-signout-all" onClick={() => setIsConfirmModalOpen(true)}>
                  <LogOut size={16} /> Sign out all others
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {isConfirmModalOpen && (
        <div className="modal-overlay" onClick={() => setIsConfirmModalOpen(false)}>
          <div className="confirm-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-wrapper"><LogOutIcon size={28} className="confirm-icon" /></div>
            <h3 className="confirm-title">Sign Out Other Devices?</h3>
            <p className="confirm-text">Every device except this one will be signed out immediately.</p>
            <div className="device-list-box">
              {sessions.length - 1} {sessions.length - 1 === 1 ? "other device" : "other devices"}: {sessions.filter(s => !s.isCurrent).map(s => s.device).join(", ")}
            </div>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setIsConfirmModalOpen(false)}>Cancel</button>
              <button className="btn-gold" onClick={handleSignOutAll}>Sign out all</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SecuritySettings;