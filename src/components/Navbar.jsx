
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "dark" ? "light" : "dark"
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // HOME CURTAIN ANIMATION
  const handleHomeClick = () => {
    window.dispatchEvent(new Event("triggerHomeAnimation"));
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  // CLOSE MOBILE MENU AFTER NAVIGATION
  const handleNavigation = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">

          {/* LEFT SIDE - LOGO */}
          <div className="navbar-left">
            <Link
              to="/"
              className="navbar-logo"
              onClick={handleHomeClick}
            >
              <img
                src="/images/kinetix.svg"
                alt="KINETIX Fitness Club"
                className="kinetix-logo-image"
              />
            </Link>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className={`navbar-menu ${menuOpen ? "menu-open" : ""}`}>

            <Link
              to="/"
              className="nav-link"
              onClick={handleHomeClick}
            >
              Home
            </Link>

            <Link
              to="/about"
              className="nav-link"
              onClick={handleNavigation}
            >
              About
            </Link>

            {/* SERVICES DROPDOWN */}
            <div className="nav-item-dropdown">
              <button
                className="nav-link dropdown-toggle"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
              >
                Services <span className="dropdown-arrow">▼</span>
              </button>

              <div
                className={`dropdown-menu ${
                  dropdownOpen ? "show" : ""
                }`}
              >
                <Link
                  to="/team"
                  className="dropdown-item"
                  onClick={handleNavigation}
                >
                  Our Team
                </Link>

                <Link
                  to="/ClassroomPage"
                  className="dropdown-item"
                  onClick={handleNavigation}
                >
                  Classes
                </Link>

                <Link
                  to="/schedules"
                  className="dropdown-item"
                  onClick={handleNavigation}
                >
                  Schedules
                </Link>

                <Link
                  to="/GalleryPage"
                  className="dropdown-item"
                  onClick={handleNavigation}
                >
                  Gallery
                </Link>

                <Link
                  to="/faqpage"
                  className="dropdown-item"
                  onClick={handleNavigation}
                >
                  FAQs
                </Link>
              </div>
            </div>

            <Link
              to="/trainers"
              className="nav-link"
              onClick={handleNavigation}
            >
              Trainers
            </Link>

            {/* DASHBOARD */}
            <Link
              to="/dashboard"
              className="nav-link dashboard-link"
              onClick={handleNavigation}
            >
              Dashboard
            </Link>

            {/* MEMBERSHIP */}
            <Link
              to="/plans"
              className="nav-link"
              onClick={handleNavigation}
            >
              Membership
            </Link>

            {/* CONTACT */}
            <Link
              to="/contact"
              className="nav-link"
              onClick={handleNavigation}
            >
              Contact
            </Link>

          </nav>

          {/* RIGHT SIDE - ACTIONS */}
          <div className="navbar-right">

            {/* THEME TOGGLE */}
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } theme`}
            >
              {theme === "dark" ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            {/* LOGIN */}
            <Link
              to="/login"
              className="login-nav-button"
              onClick={handleNavigation}
            >
              Login
            </Link>

            {/* REGISTER */}
            <Link
              to="/signup"
              className="register-button"
              onClick={handleNavigation}
            >
              <span>Register</span>
              <span className="join-arrow">↗</span>
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              className={`menu-toggle ${
                menuOpen ? "active" : ""
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
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
