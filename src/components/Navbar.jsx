import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'; // 👈 useLocation import kiya
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  
  const location = useLocation(); // 👈 Location check karne ke liye

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 NAYA: Home Click Handler (Jo Hero ko signal bhejega)
  const handleHomeClick = () => {
    if (location.pathname === "/") {
      // Agar pehle se Home page par hain, toh direct animation trigger karein
      window.dispatchEvent(new Event("triggerHomeAnimation"));
    }
    // Agar kisi aur page par hain, toh Link "/" par le jayega, 
    // aur Hero load hote hi apni animation chala dega.
  };

  return (
    <>
      {/* NAVBAR */}
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          
          {/* LEFT SIDE (Sirf Logo) */}
          <div className="navbar-left">
            {/* 👇 Logo par click karne par animation trigger hogi */}
            <Link to="/" className="navbar-logo" onClick={handleHomeClick}>
              <img src="/images/kinetix.svg" alt="Kinetix" className="kinetix-logo-image" />
            </Link>
          </div>

          {/* MENU LINKS */}
          <nav className={`navbar-menu ${menuOpen ? "menu-open" : ""}`}>
            {/* 👇 Home Link par click karne par animation trigger hogi */}
            <Link to="/" className="nav-link" onClick={handleHomeClick}>Home</Link>
            
            <Link to="/about" className="nav-link">About</Link>
            
            <div className="nav-item-dropdown">
              <button className="nav-link dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                Services <span className="dropdown-arrow">▼</span>
              </button>
              <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                <Link to="/team" className="dropdown-item">Team</Link>
                <Link to="/ClassroomPage" className="dropdown-item">ClassRoom</Link>
                <Link to="/schedules" className="dropdown-item">Schedules</Link>
                <Link to="/GalleryPage" className="dropdown-item">Gallery</Link>
                <Link to="/faqpage" className="dropdown-item">FAQ</Link>
              </div>
            </div>

            <Link to="/trainers" className="nav-link">Trainers</Link>
            <Link to="/dashboard" className="nav-link dashboard-link">Dashboard</Link>
            <a href="#membership" className="nav-link">Membership</a>
            <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>

          {/* RIGHT SIDE (Theme, Login, Register) */}
          <div className="navbar-right">
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
            <Link to="/login" className="login-nav-button">Login</Link>
            <Link to="/signup" className="register-button">
              <span>Register</span>
              <span className="join-arrow">↗</span>
            </Link>
            <button className={`menu-toggle ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
              <span></span><span></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;