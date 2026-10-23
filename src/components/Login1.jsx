import { useState } from "react";
import "./Login1.css";

function Login1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Login successful!");
    }
  };

  return (
    <div className="login-container">

      <div className="login-left">
        <div className="login-content">
          <h1>Welcome!</h1>
          <p>
            Login to your account and continue your fitness journey.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">

          <h2>Login</h2>

          <p className="login-subtitle">
            Enter your details to access your account
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {errors.email && (
                <p className="error-message">{errors.email}</p>
              )}
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>

            <div className="login-options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

          </form>

          <p className="signup-text">
            Don't have an account? <a href="#">Sign Up</a>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login1;