import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./SignUp.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("Member");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      alert("Google Login Simulated successfully! (Real API integration needed)");
    }, 2000);
  };

  // ============================================
  // ANIMATION VARIANTS
  // ============================================
  // Form ke andar ke elements ek ke baad ek aayenge
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="signup-page">
      {/* ================= LEFT SIDE ================= */}
      <div className="signup-left">
        <div className="left-overlay"></div>
        
        <div className="left-content">
          <div className="left-top-text">
            STRONGER / HEALTHIER / BETTER YOU
          </div>

          <div className="left-bottom-text">
            <h2>YOUR FITNESS</h2>
            <h2 className="highlight-text">JOURNEY STARTS HERE</h2>
            <p>TRAIN / IMPROVE / ACHIEVE</p>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE (FORM) ================= */}
      <div className="signup-right">
        
        {/* ✅ Form Container with Slide-up Animation */}
        <motion.div 
          className="signup-form-container"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          
          {/* Header */}
          <div className="form-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#4ade80" />
            </svg>
            <h2>CREATE <span className="text-green">YOUR ACCOUNT</span></h2>
          </div>
          <p className="form-subtitle">
            Join KINETIX and take the first step towards a healthier and stronger you.
          </p>

          {/* Form with Staggered Animation */}
          <motion.form 
            className="signup-form compact-form"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Full Name */}
            <motion.div className="input-group" variants={itemVariants}>
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </span>
              <input type="text" placeholder="Full Name" required />
            </motion.div>

            {/* Email */}
            <motion.div className="input-group" variants={itemVariants}>
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </span>
              <input type="email" placeholder="Email Address" required />
            </motion.div>

            {/* Phone */}
            <motion.div className="input-group" variants={itemVariants}>
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </span>
              <input type="tel" placeholder="Phone Number" required />
            </motion.div>

            {/* Password */}
            <motion.div className="input-group" variants={itemVariants}>
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </span>
              <input type={showPassword ? "text" : "password"} placeholder="Password" required />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </motion.div>

            {/* Confirm Password */}
            <motion.div className="input-group" variants={itemVariants}>
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </span>
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" required />
              <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </motion.div>

            {/* Role Selection */}
            <motion.div className="role-selection" variants={itemVariants}>
              <p>Select Your Role</p>
              <div className="role-options">
                {["Member", "Trainer", "Admin"].map((r) => (
                  <motion.div 
                    key={r}
                    className={`role-box ${role === r ? "active" : ""}`} 
                    onClick={() => setRole(r)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>{r}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button 
              type="submit" 
              className="signup-btn"
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: "0px 0px 15px rgba(74, 222, 128, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              SIGN UP <span>→</span>
            </motion.button>
          </motion.form>

          {/* Divider */}
          <motion.div 
            className="divider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span>OR</span>
          </motion.div>

          {/* Google Button */}
          <motion.button 
            type="button" 
            className={`google-btn ${isGoogleLoading ? "loading" : ""}`} 
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isGoogleLoading ? (
              <><span className="spinner"></span> Connecting...</>
            ) : (
              <>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="18" height="18" />
                Continue with Google
              </>
            )}
          </motion.button>

          {/* Login Link */}
          <motion.p 
            className="login-link"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            Already have an account? <Link to="/login">Log In</Link>
          </motion.p>

        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;