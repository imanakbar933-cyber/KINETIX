import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import "./SecuritySettings.css";

const SecuritySettings = ({ activeTab }) => {
  // Default password state
  const [savedPassword, setSavedPassword] = useState("Password@123"); 

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");

  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [isLoginAlertsEnabled, setIsLoginAlertsEnabled] = useState(true);

  useEffect(() => {
    if (activeTab !== "Security") {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPassError("");
      setPassSuccess("");
      setShowCurrentPass(false);
      setShowNewPass(false);
      setShowConfirmPass(false);
    }
  }, [activeTab]);

  const calculateStrength = (password) => {
    if (!password) return { score: 0, label: "", color: "transparent" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { score: 1, label: "Weak", color: "#ef4444" };
    if (score === 2) return { score: 2, label: "Fair", color: "#f59e0b" };
    if (score === 3) return { score: 3, label: "Good", color: "#3b82f6" };
    return { score: 4, label: "Strong", color: "#4ade80" };
  };

  const strength = calculateStrength(newPassword);

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess("");

    // 1. Check karo current password sahi hai ya nahi
    if (currentPassword !== savedPassword) {
      setPassError("Current password is incorrect.");
      return;
    }

    // 2. Check karo fields khali na hon
    if (!newPassword || !confirmPassword) {
      setPassError("Please fill new password fields.");
      return;
    }

    // 3. Check karo dono match karte hain ya nahi
    if (newPassword !== confirmPassword) {
      setPassError("New password and confirm password do not match.");
      return;
    }

    // 4. Check karo lambai 8 se zyada hai ya nahi
    if (newPassword.length < 8) {
      setPassError("Password must be at least 8 characters long.");
      return;
    }

    // ✅ SAB SAHI HAI TOH NAYA PASSWORD SAVE KARO
    setSavedPassword(newPassword);
    
    // ✅ UPDATE KE BAAD CURRENT PASSWORD MEIN NAYA PASSWORD SHOW KARO
    setCurrentPassword(newPassword);
    
    // Success message dikhao
    setPassSuccess("Password updated successfully! Current password is now your new password.");
    
    // New aur Confirm fields clear karo
    setNewPassword("");
    setConfirmPassword("");
    
    setTimeout(() => setPassSuccess(""), 4000);
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
                type={showCurrentPass ? "text" : "password"} 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password" 
              />
              <button type="button" className="icon-btn" onClick={() => setShowCurrentPass(!showCurrentPass)}>
                {showCurrentPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-row">
            
            <div className="form-group">
              <label>New Password</label>
              <div className="input-wrapper">
                <input 
                  type={showNewPass ? "text" : "password"} 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••" 
                />
                <button type="button" className="icon-btn" onClick={() => setShowNewPass(!showNewPass)}>
                  {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
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
              <div className="input-wrapper">
                <input 
                  type={showConfirmPass ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••" 
                />
                <button type="button" className="icon-btn" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                  {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

          </div>

          <div className="form-footer">
            <p className="helper-text">Use 8+ characters with a number and a symbol</p>
            <button type="submit" className="btn-primary">
              <Lock size={16} /> Update Password
            </button>
          </div>

          {passError && <p className="error-msg">{passError}</p>}
          {passSuccess && (
            <div className="success-msg-box">
              <CheckCircle size={18} /> {passSuccess}
            </div>
          )}
        </form>
      </div>

      {/* ================= SECURITY OPTIONS CARD ================= */}
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
        </div>
      </div>

    </div>
  );
};

export default SecuritySettings;