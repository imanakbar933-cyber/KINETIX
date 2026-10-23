import { useState } from "react";
import "./Login4.css";

function login4() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    setMouse({ x, y });
  };

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
      newErrors.password = "Minimum 6 characters required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Welcome back!");
    }
  };

  return (
    <div
      className="login4-page"
      onMouseMove={handleMouseMove}
      style={{
        "--mouse-x": `${mouse.x}%`,
        "--mouse-y": `${mouse.y}%`,
      }}
    >

      {/* Animated background */}

      <div className="login4-background">

        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>

        <div className="grid"></div>

        <div className="light-beam"></div>

      </div>

      {/* Navigation */}

      <nav className="login4-nav">

        <div className="logo">
          <span>G</span>
          GYMFLOW
        </div>

        <div className="nav-links">
          <a href="#">HOME</a>
          <a href="#">ABOUT</a>
          <a href="#">PROGRAMS</a>
        </div>

        <div className="nav-status">
          <span></span>
          SYSTEM ONLINE
        </div>

      </nav>

      {/* Main */}

      <main className="login4-main">

        {/* Left content */}

        <section className="login4-intro">

          <p className="eyebrow">
            PERFORMANCE • DISCIPLINE • RESULTS
          </p>

          <h1>
            YOUR
            <br />
            <span>STRONGER</span>
            <br />
            SELF.
          </h1>

          <p className="intro-text">
            Your fitness journey starts here.
            Track your progress, follow your plans,
            and become the strongest version of yourself.
          </p>

          <div className="stats">

            <div>
              <strong>24/7</strong>
              <span>ACCESS</span>
            </div>

            <div>
              <strong>100+</strong>
              <span>WORKOUTS</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>POTENTIAL</span>
            </div>

          </div>

        </section>

        {/* Login */}

        <section className="login4-card">

          <div className="card-glow"></div>

          <div className="card-content">

            <div className="login4-top">

              <div className="avatar">
                G
              </div>

              <div>
                <p>MEMBER PORTAL</p>
                <span>SECURE LOGIN</span>
              </div>

            </div>

            <h2>
              Welcome
              <span>Back</span>
            </h2>

            <p className="login4-subtitle">
              Enter your credentials to continue.
            </p>

            <form onSubmit={handleSubmit}>

              {/* Email */}

              <div className="field">

                <label>EMAIL ADDRESS</label>

                <div
                  className={`input-box ${
                    errors.email ? "input-error" : ""
                  }`}
                >

                  <span className="input-icon">
                    ✉
                  </span>

                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);

                      setErrors({
                        ...errors,
                        email: "",
                      });
                    }}
                  />

                </div>

                {errors.email && (
                  <small>{errors.email}</small>
                )}

              </div>

              {/* Password */}

              <div className="field">

                <label>PASSWORD</label>

                <div
                  className={`input-box ${
                    errors.password ? "input-error" : ""
                  }`}
                >

                  <span className="input-icon">
                    ◈
                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);

                      setErrors({
                        ...errors,
                        password: "",
                      });
                    }}
                  />

                  <button
                    type="button"
                    className="eye"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>

                </div>

                {errors.password && (
                  <small>{errors.password}</small>
                )}

              </div>

              {/* Options */}

              <div className="options">

                <label>
                  <input type="checkbox" />
                  Remember me
                </label>

                <a href="#">
                  Forgot password?
                </a>

              </div>

              {/* Button */}

              <button
                type="submit"
                className="login4-button"
              >

                <span>
                  ENTER GYMFLOW
                </span>

                <b>↗</b>

              </button>

            </form>

            {/* Divider */}

            <div className="divider">
              <span>OR CONTINUE WITH</span>
            </div>

            <div className="social-buttons">

              <button>G</button>
              <button>f</button>
              <button></button>

            </div>

            <p className="register">
              Don't have an account?
              <a href="#"> Create one</a>
            </p>

          </div>

        </section>

      </main>

      {/* Bottom */}

      <footer className="login4-footer">

        <span>GYMFLOW © 2026</span>

        <div>
          <span className="pulse"></span>
          ALL SYSTEMS OPERATIONAL
        </div>

      </footer>

    </div>
  );
}

export default login4;

