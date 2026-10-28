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
      alert("Google Login Simulated successfully!");
    }, 2000);
  };

  const textReveal = {
    hidden: { opacity: 0, rotateX: 90, y: 50 },
    visible: (i) => ({
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15, delay: i * 0.2 }
    })
  };

  return (
    <div className="signup-page">
      {/* ================= LEFT SIDE ================= */}
      <div className="signup-left">
        <motion.div 
          className="left-bg-image"
        
        />
        <div className="left-overlay"></div>
        
        <div className="left-content">
          <motion.div 
            className="left-top-text"
            initial={{ opacity: 0, letterSpacing: "20px" }}
            animate={{ opacity: 1, letterSpacing: "5px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            STRONGER / HEALTHIER / BETTER YOU
          </motion.div>

          {/* ✅ Text Overlap Fixed - 3 Separate Lines */}
          <div className="left-bottom-text">
            <motion.h2 custom={0} variants={textReveal} initial="hidden" animate="visible" style={{ transformOrigin: "bottom" }}>
              YOUR FITNESS
            </motion.h2>
            <motion.h2 className="highlight-text" custom={1} variants={textReveal} initial="hidden" animate="visible" style={{ transformOrigin: "bottom" }}>
              JOURNEY
            </motion.h2>
            <motion.h2 className="highlight-text" custom={2} variants={textReveal} initial="hidden" animate="visible" style={{ transformOrigin: "bottom" }}>
              STARTS HERE
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}>
              TRAIN / IMPROVE / ACHIEVE
            </motion.p>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="signup-right">
        
        <motion.div 
          className="signup-form-container cyber-glass"
          initial={{ opacity: 0, y: 100, rotateX: -20 }}
          animate={{ 
            opacity: 1, 
            y: [0, -5, 0], 
            rotateX: 0 
          }}
          transition={{ 
            opacity: { duration: 0.8 },
            rotateX: { duration: 0.8, type: "spring" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        >
          <motion.div 
            className="cyber-grid"
            animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <motion.div 
            className="pulse-glow"
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="form-header">
            <motion.svg 
              width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              animate={{ scale: [1, 1.2, 1], filter: ["drop-shadow(0 0 2px #4ade80)", "drop-shadow(0 0 15px #4ade80)", "drop-shadow(0 0 2px #4ade80)"] }} 
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#4ade80" />
            </motion.svg>
            <h2>CREATE <span className="text-green">YOUR ACCOUNT</span></h2>
          </div>
          <p className="form-subtitle">
            Join KINETIX and take the first step towards a healthier and stronger you.
          </p>

          <motion.form 
            className="signup-form compact-form"
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } } }}
          >
            {/* Inputs */}
            <motion.div className="input-group" variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
              <span className="input-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
              <input type="text" placeholder="Full Name" required />
              <div className="laser-line"></div>
            </motion.div>

            <motion.div className="input-group" variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
              <span className="input-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></span>
              <input type="email" placeholder="Email Address" required />
              <div className="laser-line"></div>
            </motion.div>

            <motion.div className="input-group" variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
              <span className="input-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></span>
              <input type="tel" placeholder="Phone Number" required />
              <div className="laser-line"></div>
            </motion.div>

            <motion.div className="input-group" variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
              <span className="input-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span>
              <input type={showPassword ? "text" : "password"} placeholder="Password" required />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "🙈" : "👁️"}</span>
              <div className="laser-line"></div>
            </motion.div>

            <motion.div className="input-group" variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
              <span className="input-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span>
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" required />
              <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "🙈" : "👁️"}</span>
              <div className="laser-line"></div>
            </motion.div>

            {/* Role Selection */}
            <motion.div className="role-selection" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <p>Select Your Role</p>
              <div className="role-options">
                {["Member", "Trainer", "Admin"].map((r) => (
                  <motion.div 
                    key={r}
                    className={`role-box ${role === r ? "active" : ""}`} 
                    onClick={() => setRole(r)}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(74,222,128,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{r}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.button 
              type="submit" 
              className="signup-btn electric-btn"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>SIGN UP</span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
            </motion.button>
          </motion.form>

          <motion.div className="divider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            <span>OR</span>
          </motion.div>

          <motion.button 
            type="button" 
            className={`google-btn ${isGoogleLoading ? "loading" : ""}`} 
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
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

          <motion.p className="login-link" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
            Already have an account? <Link to="/login">Log In</Link>
          </motion.p>

        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;