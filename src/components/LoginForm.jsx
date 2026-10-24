
import { useState } from "react";
import "./LoginForm.css";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Connect your authentication API here.
    setError("Login form is ready. Connect your authentication API to sign in.");
  }

  return (
    <form className="kinetix-login-form" onSubmit={handleSubmit}>
      <label className="login-input-group">
        <span className="input-label">EMAIL ADDRESS</span>

        <span className="login-input-shell">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="m4 7 8 6 8-6" />
          </svg>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </span>
      </label>

      <label className="login-input-group">
        <span className="input-label">PASSWORD</span>

        <span className="login-input-shell">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="10" width="16" height="11" rx="3" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9 7 9 7a14 14 0 0 1-3.1 3.9M6.2 6.2C4.1 7.7 3 12 3 12s3.5 7 9 7a10 10 0 0 0 3-.5" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </span>
      </label>

      <div className="login-options">
        <label className="remember-option">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className="custom-checkbox"></span>
          Remember me
        </label>

        <a href="/forgot-password" className="forgot-link">
          Forgot password?
        </a>
      </div>

      {error && (
        <p className="login-feedback" role="status">
          {error}
        </p>
      )}

      <button type="submit" className="login-submit">
        <span>LOG IN</span>
        <span className="submit-arrow">↗</span>
      </button>

      <div className="login-divider">
        <span></span>
        <p>NEW TO KINETIX?</p>
        <span></span>
      </div>

      <p className="signup-prompt">
        Don't have an account?{" "}
        <a href="/signup">Create account <span>↗</span></a>
      </p>

      <p className="login-security-note">
        <span>✦</span> YOUR NEXT LEVEL STARTS HERE
      </p>
    </form>
  );
}
