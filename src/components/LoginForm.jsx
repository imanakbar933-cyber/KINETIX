
import { useState } from "react";
import "./LoginForm.css";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    // Connect your authentication API here.
    setMessage("Connect your authentication API to enable login.");
  }

  return (
    <form className="kinetix-form" onSubmit={handleSubmit}>
      <label className="kinetix-field">
        <span className="visually-hidden">Email address</span>

        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>

        <input
          type="email"
          placeholder="Email Address"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <label className="kinetix-field">
        <span className="visually-hidden">Password</span>

        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="10" width="16" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button
          className="password-eye"
          type="button"
          onClick={() => setShowPassword((previous) => !previous)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
              <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9 7 9 7s-1.2 2.4-3.5 4.2M6.2 6.2C4.1 7.7 3 12 3 12s3.5 7 9 7a10 10 0 0 0 3-.5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </label>

      <div className="form-options">
        <label className="remember-label">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <span className="remember-box">✓</span>
          Remember me
        </label>

        <a href="/forgot-password" className="forgot-password">
          Forgot Password?
        </a>
      </div>

      {message && (
        <p className="login-message" role="status">
          {message}
        </p>
      )}

      <button type="submit" className="kinetix-submit">
        <span>Log In</span>
        <span className="submit-arrow">→</span>
      </button>

      <div className="social-divider">
        <span />
        <p>OR</p>
        <span />
      </div>

      <div className="social-login" aria-label="Alternative login options">
        <button
          type="button"
          aria-label="Continue with Google"
          onClick={() => setMessage("Google sign-in is not connected yet.")}
        >
          <span className="google-letter">G</span>
        </button>

        <button
          type="button"
          aria-label="Continue with Apple"
          onClick={() => setMessage("Apple sign-in is not connected yet.")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M16.7 12.8c0-2.3 1.9-3.4 2-3.5a4.4 4.4 0 0 0-3.5-1.9c-1.5-.2-2.9.9-3.7.9s-2-.9-3.3-.9a4.9 4.9 0 0 0-4.1 2.5c-1.8 3-.5 7.4 1.3 9.8.9 1.2 1.9 2.5 3.2 2.4 1.3-.1 1.8-.8 3.3-.8s2 .8 3.3.8 2.2-1.2 3.1-2.4a10 10 0 0 0 1.4-2.8 4.1 4.1 0 0 1-3-4.1ZM14.3 5.8A4.2 4.2 0 0 0 15.3 2a4.5 4.5 0 0 0-3.1 1.6 4 4 0 0 0-1 3.6 3.8 3.8 0 0 0 3.1-1.4Z"
            />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Continue with Facebook"
          onClick={() => setMessage("Facebook sign-in is not connected yet.")}
        >
          <span className="facebook-letter">f</span>
        </button>
      </div>

      <p className="signup-text">
        Don't have an account?{" "}
        <a href="/signup">Create an Account</a>
      </p>
    </form>
  );
}
