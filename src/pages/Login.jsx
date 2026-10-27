
import LoginForm from "../components/LoginForm";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main className="kinetix-login">
      <div className="login-bg-overlay" />

      <div className="login-top-brand">
        <div className="brand-icon" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="brand-words">
          <strong>KINETIX</strong>
          <small>FITNESS CLUB</small>
        </div>
      </div>

      <div className="login-main">
        <section className="login-hero">
          <p className="hero-eyebrow">
            <span />
            YOUR FITNESS. YOUR POWER.
          </p>

          <h1 className="hero-title">
            <span className="title-white">BETTER</span>
            <span className="title-green">STRONGER</span>
            <span className="title-white title-small">THAN</span>
            <span className="title-white">YESTERDAY.</span>
          </h1>

          <p className="hero-description">
            Push your limits. Build your strength.
            <br />
            Become the best version of yourself.
          </p>

          <div className="hero-benefits">
            <div className="benefit">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path d="M5 19v10M11 14v20M16 20h16M32 20h-1v8h1M37 14v20M43 19v10M11 24h26" />
              </svg>
              <span>STRONGER<br />BODY</span>
            </div>

            <div className="benefit">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path d="M24 8c-5-5-13 1-12 7-7 2-8 11-2 15-2 7 5 12 11 8l3-4V8ZM24 8c5-5 13 1 12 7 7 2 8 11 2 15 2 7-5 12-11 8l-3-4V8ZM16 18l5 4-5 4M32 18l-5 4 5 4M19 33l5-4 5 4M24 12v24" />
              </svg>
              <span>HEALTHIER<br />MIND</span>
            </div>

            <div className="benefit">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path d="m24 4 6 13 14 2-10 10 3 14-13-7-13 7 3-14L4 19l14-2 6-13Z" />
                <path d="m18 24 4 4 8-9" />
              </svg>
              <span>BETTER<br />YOU</span>
            </div>
          </div>
        </section>

        <section className="login-panel-wrap">
          <div className="neon-frame neon-frame-back" />
          <div className="neon-frame neon-frame-front" />

          <div className="login-panel">
            <div className="panel-brand">
              <div className="panel-brand-icon" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <strong>KINETIX</strong>
              <small>FITNESS CLUB</small>
            </div>

            <div className="panel-heading">
              <h2>
                Welcome <span>Back</span>
              </h2>
              <p>Log in to continue your fitness journey</p>
            </div>

            <LoginForm />
             <p className="login-switch" style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#a3a3a3" }}>
              Don't have an account?{" "}
              <Link to="/SignUp" style={{ color: "#4ade80", fontWeight: "600", textDecoration: "none" }}>
                SignUp
              </Link>
            </p>
          </div>
        </section>
      </div>

      <div className="login-bottom-glow" />
    </main>
  );
}
