import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // useLocation import kiya
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation(); // Current URL check karne ke liye

  // HOME CURTAIN ANIMATION
  const [homeCurtain, setHomeCurtain] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Dropdown toggle karne ka function
  const toggleDropdown = (e) => {
    e.preventDefault(); // Page refresh rokne ke liye
    setDropdownOpen(!dropdownOpen);
  };

  // HOME CLICK → CURTAIN ANIMATION EVERY TIME
  const handleHomeClick = () => {
    setHomeCurtain(false);
    setTimeout(() => { setHomeCurtain(true); }, 20);
    setTimeout(() => { setHomeCurtain(false); }, 1450);
    
    // Dropdown band kar dein
    setDropdownOpen(false); 
    setMenuOpen(false);
  };

  return (
    <>
      {/* HOME CURTAIN ANIMATION */}
      {homeCurtain && (
        <div className="home-curtain">
          <div className="curtain curtain-left"></div>
          <div className="curtain curtain-right"></div>
        </div>
      )}

      {/* NAVBAR */}
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">

          {/* LOGO */}
          <Link to="/" className="navbar-logo" onClick={handleHomeClick}>
            <img
              src="/images/kinetix.svg"
              alt="Kinetix Fitness Club"
              className="kinetix-logo-image"
            />
          </Link>

          {/* NAVIGATION */}
          <nav className={`navbar-menu ${menuOpen ? "menu-open" : ""}`}>

            {/* HOME */}
            <Link to="/" className="nav-link" onClick={handleHomeClick}>
              Home
            </Link>

            {/* ABOUT */}
            <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
              About
            </Link>

            {/* SERVICES DROPDOWN */}
            <div className="nav-item-dropdown">
              {/* Click karne par /services page par jayega aur dropdown khulega */}
              <Link 
                to="/services" 
                className="nav-link dropdown-toggle" 
                onClick={(e) => {
                  setMenuOpen(false);
                  toggleDropdown(e); 
                }}
              >
                Services <span className="dropdown-arrow">▼</span>
              </Link>

              <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                {/* Dropdown items ab Link hain jo /services page ke sections par scroll karenge */}
                <Link to="/services#team" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Team</Link>
                <Link to="/services#classroom" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Classroom</Link>
                <Link to="/services#schedules" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Schedules</Link>
                <Link to="/services#gallery" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Gallery</Link>
                <Link to="/services#faq" className="dropdown-item" onClick={() => setDropdownOpen(false)}>FAQ</Link>
              </div>
            </div>

            <Link to="/trainers" className="nav-link" onClick={() => setMenuOpen(false)}>Trainers</Link>

            <a href="#membership" className="nav-link">Membership</a>

            <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>

            {/* MOBILE JOIN BUTTON */}
            <a href="#membership" className="mobile-join">Join Us</a>

          </nav>

          {/* RIGHT SIDE */}
          <div className="navbar-right">
            <a href="#membership" className="join-button">
              <span>Join Us</span>
              <span className="join-arrow">↗</span>
            </a>

            {/* MOBILE MENU TOGGLE */}
            <button
              className={`menu-toggle ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
            </button>
          </div>

        </div>
      </header>
    </>
  );
}

export default Navbar;