
import LoginForm from "../components/LoginForm";
import "./Login.css";

export default function Login() {
  return (
    <main className="login-page">
      <div className="login-background-glow"></div>

      <header className="login-brand">
        <a href="/" className="login-logo">
          KINETIX
          <span>FITNESS CLUB</span>
        </a>
      </header>

      <section className="login-layout">
        <div className="login-message">
          <p className="login-eyebrow">
            <span className="status-dot"></span>
            YOUR FITNESS JOURNEY STARTS HERE
          </p>

          <h1>
            BUILT BY
            <br />
            <span>DISCIPLINE.</span>
            <br />
            DEFINED BY
            <br />
            <span className="outline-text">STRENGTH.</span>
          </h1>

          <p className="login-description">
            Your goals are waiting. Sign in to continue your journey
            and become stronger than yesterday.
          </p>

          <div className="login-bottom-label">
            <span>01</span>
            <span className="label-line"></span>
            <span>UNLOCK YOUR POTENTIAL</span>
          </div>
        </div>

        <div className="login-card-wrap">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="orbit orbit-three"></div>

          <div className="login-card">
            <div className="login-card-heading">
              <span className="login-card-tag">WELCOME BACK</span>
              <h2>Login<span>.</span></h2>
              <p>Good to see you again. Let's get moving.</p>
            </div>

            <LoginForm />
          </div>
        </div>
      </section>

      <footer className="login-footer">
        <span>© {new Date().getFullYear()} KINETIX FITNESS CLUB</span>
        <span>TRAIN HARD. STAY FOCUSED.</span>
      </footer>
    </main>
  );
}
