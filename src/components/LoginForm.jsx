
import { useState } from 'react'
import './LoginForm.css'

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Login form submitted! Connect your backend to authenticate users.')
  }

  return (
    <div className="login-card">
      <div className="login-logo">
        <div className="logo-icon">✣</div>
        <h1>KINETIX</h1>
        <span>FITNESS CLUB</span>
      </div>

      <div className="login-heading">
        <h2>
          Welcome <span>Back</span>
        </h2>
        <p>Log in to continue your fitness journey</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="input-box">
          <span className="input-icon">✉</span>
          <input
            type="email"
            placeholder="Email Address"
            aria-label="Email address"
            required
          />
        </label>

        <label className="input-box">
          <span className="input-icon">♙</span>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            aria-label="Password"
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </label>

        <div className="login-options">
          <label className="remember-option">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember me</span>
          </label>

          <a href="#forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" className="login-button">
          Log In <span>→</span>
        </button>
      </form>

      <div className="login-divider">
        <span></span>
        OR
        <span></span>
      </div>

      <p className="signup-text">
        Don't have an account? <a href="#signup">Create an Account</a>
      </p>
    </div>
  )
}

export default LoginForm
