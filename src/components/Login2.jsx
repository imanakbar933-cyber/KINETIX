import { useState } from "react";
import "./Login2.css";

function Login2() {
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
    <div className="login2-container">

      <div className="login2-overlay"></div>

      <div className="login2-card">

        <div className="login2-logo">
          GYM<span>FREAK</span>
        </div>

        <h1>Welcome </h1>

        <p className="login2-subtitle">
          Sign in to continue your fitness journey
        </p>

        <form onSubmit={handleSubmit}>

          <div className="login2-input">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
            />

            {errors.email && (
              <p className="login2-error">{errors.email}</p>
            )}
          </div>

          <div className="login2-input">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
            />

            {errors.password && (
              <p className="login2-error">{errors.password}</p>
            )}
          </div>

          <div className="login2-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login2-button">
            LOGIN
          </button>

        </form>

        <div className="login2-divider">
          <span>OR</span>
        </div>

        <p className="login2-signup">
          Don't have an account?
          <a href="#"> Create Account</a>
        </p>

      </div>

    </div>
  );
}

export default Login2;