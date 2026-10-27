import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("Member");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Google Button Click Handler (Practice/Demo ke liye)
  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      alert("Google Login Simulated successfully! (Real API integration needed)");
    }, 2000);
  };

  return (
    <div className="signup-page">
      {/* ================= LEFT SIDE (IMAGE & TEXT) ================= */}
      <div className="signup-left">
        <div className="left-overlay"></div>
        
        <div className="left-content">
          {/* Top Right Text */}
          <div className="left-top-text">
            STRONGER / HEALTHIER / BETTER YOU
          </div>

          {/* Bottom Text */}
          <div className="left-bottom-text">
            <h2>YOUR FITNESS</h2>
            <h2 className="highlight-text">JOURNEY STARTS HERE</h2>
            <p>TRAIN / IMPROVE / ACHIEVE</p>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE (FORM) ================= */}
      <div className="signup-right">
        <div className="signup-form-container">
          
          {/* Header */}
          <div className="form-header">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#4ade80" />
            </svg>
            <h2>CREATE <span className="text-green">YOUR ACCOUNT</span></h2>
          </div>
          <p className="form-subtitle">
            Join KINETIX and take the first step towards a healthier and stronger you.
          </p>

          {/* Form */}
          <form className="signup-form">
            
            {/* Full Name */}
            <div className="input-group">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </span>
              <input type="text" placeholder="Full Name" required />
            </div>

            {/* Email */}
            <div className="input-group">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </span>
              <input type="email" placeholder="Email Address" required />
            </div>

            {/* Phone */}
            <div className="input-group">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </span>
              <input type="tel" placeholder="Phone Number" required />
            </div>

            {/* Password */}
            <div className="input-group">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </span>
              <input type={showPassword ? "text" : "password"} placeholder="Password" required />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </span>
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" required />
              <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* Role Selection */}
            <div className="role-selection">
              <p>Select Your Role</p>
              <div className="role-options">
                <div className={`role-box ${role === "Member" ? "active" : ""}`} onClick={() => setRole("Member")}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <span>Member</span>
                </div>
                <div className={`role-box ${role === "Trainer" ? "active" : ""}`} onClick={() => setRole("Trainer")}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 5v14M18 5v14M3 8h3M3 16h3M18 8h3M18 16h3"></path></svg>
                  <span>Trainer</span>
                </div>
                <div className={`role-box ${role === "Admin" ? "active" : ""}`} onClick={() => setRole("Admin")}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  <span>Admin</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="signup-btn">
              SIGN UP <span>→</span>
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Google Button (Loading State ke saath) */}
          <button 
            type="button" 
            className={`google-btn ${isGoogleLoading ? "loading" : ""}`} 
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <>
                <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
                Connecting...
              </>
            ) : (
              <>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" height="20" />
                Continue with Google
              </>
            )}
          </button>

          {/* Login Link */}
          <p className="login-link">
            Already have an account? <Link to="/login">Log In</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;