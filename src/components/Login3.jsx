import { useState } from "react";
import "./Login3.css";

function Login3() {
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
    <div className="login3-container">

      <div className="login3-card">

        {/* Left Section */}
        <div className="login3-left">

          <div className="login3-brand">
            <span>GYM</span>FREAK
          </div>

          <div className="login3-left-content">
            <p className="login3-small-title">
              YOUR FITNESS. YOUR JOURNEY.
            </p>

            <h1>
              BUILD
              <br />
              YOUR
              <br />
              <span>LEGACY.</span>
            </h1>

            <p className="login3-description">
              Track your workouts, monitor your progress,
              and stay consistent with your fitness goals.
            </p>
          </div>

          <div className="login3-line"></div>

          <p className="login3-footer-text">
            TRAIN HARD • STAY CONSISTENT • GET STRONGER
          </p>

        </div>

        {/* Right Section */}
        <div className="login3-right">

          <div className="login3-form-container">

            <p className="login3-welcome">
              WELCOME 
            </p>

            <h2>Sign in</h2>

            <p className="login3-subtitle">
              Enter your account details below.
            </p>

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="login3-field">

                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({
                      ...errors,
                      email: ""
                    });
                  }}
                />

                {errors.email && (
                  <span className="login3-error">
                    {errors.email}
                  </span>
                )}

              </div>

              {/* Password */}
              <div className="login3-field">

                <div className="password-label">
                  <label>Password</label>

                  <a href="#">
                    Forgot?
                  </a>
                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({
                      ...errors,
                      password: ""
                    });
                  }}
                />

                {errors.password && (
                  <span className="login3-error">
                    {errors.password}
                  </span>
                )}

              </div>

              {/* Remember */}
              <label className="login3-remember">
                <input type="checkbox" />
                <span>Keep me signed in</span>
              </label>

              {/* Button */}
              <button
                type="submit"
                className="login3-button"
              >
                SIGN IN
                <span>→</span>
              </button>

            </form>

            <div className="login3-divider">
              <span>OR</span>
            </div>

            <p className="login3-create">
              New to GymFreak?
              <a href="#"> Create an account</a>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login3;