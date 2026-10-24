
import LoginForm from '../components/LoginForm';
import './Login.css';

function Login() {
  return (
    <main className="login-page">
      <div className="gym-overlay"></div>

      <section className="login-layout">
        <div className="login-message">
          <p className="eyebrow">YOUR FITNESS. YOUR POWER.</p>

          <h2>
            BETTER
            <br />
            STRONGER
            <br />
            THAN
            <br />
            <span>YESTERDAY.</span>
          </h2>

          <p className="message-description">
            Push your limits. Build your strength.
            Become the best version of yourself.
          </p>
        </div>

        <LoginForm />
      </section>

      <div className="login-footer">
        <span>© KINETIX FITNESS CLUB</span>
        <span>TRAIN HARD. STAY STRONG.</span>
      </div>
    </main>
  );
}

export default Login;
