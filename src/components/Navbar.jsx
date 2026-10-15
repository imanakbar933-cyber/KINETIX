import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // HOME CLICK → CURTAIN ANIMATION EVERY TIME
  const handleHomeClick = () => {
    setHomeCurtain(false);

    setTimeout(() => {
      setHomeCurtain(true);
    }, 20);

    setTimeout(() => {
      setHomeCurtain(false);
    }, 1450);
  };

  return (
    <>
      {/* =========================================
          HOME CURTAIN ANIMATION
      ========================================= */}

      {homeCurtain && (
        <div className="home-curtain">

          <div className="curtain curtain-left"></div>

          <div className="curtain curtain-right"></div>

        </div>
      )}

      {/* =========================================
          NAVBAR
      ========================================= */}

      <header
        className={`navbar ${
          scrolled ? "navbar-scrolled" : ""
        }`}
      >
        <div className="navbar-container">

          {/* LOGO */}
          <Link
            to="/"
            className="navbar-logo"
            onClick={handleHomeClick}
          >
            <img
              src="/images/kinetix.svg"
              alt="Kinetix Fitness Club"
              className="kinetix-logo-image"
            />
          </Link>


          {/* NAVIGATION */}
          <nav
            className={`navbar-menu ${
              menuOpen ? "menu-open" : ""
            }`}
          >

            {/* HOME */}
            <Link
              to="/"
              className="nav-link"
              onClick={handleHomeClick}
            >
              Home
            </Link>


            {/* ABOUT */}
            <Link
              to="/about"
              className="nav-link"
            >
              About
            </Link>


            {/* SERVICES DROPDOWN */}
            <div className="nav-item-dropdown">

              <button
                className="nav-link dropdown-toggle"
                onClick={toggleDropdown}
              >
                Services{" "}
                <span className="dropdown-arrow">
                  ▼
                </span>
              </button>


              <div
                className={`dropdown-menu ${
                  dropdownOpen ? "show" : ""
                }`}
              ><Link to="/team" className="dropdown-item">Team</Link>
                  <a
                  href="#classroom"
                  className="dropdown-item"
                >
                  Classroom
                </a>

                <Link to="/schedules" className="dropdown-item">Schedules</Link>
                <a
                  href="#gallery"
                  className="dropdown-item"
                >
                  Gallery
                </a>

                <a
                  href="#faq"
                  className="dropdown-item"
                >
                  FAQ
                </a>

              </div>
            </div>


            {/* OTHER NAV LINKS */}
            <a
              href="#trainers"
              className="nav-link"
            >
              Trainers
            </a>

            <a
              href="#membership"
              className="nav-link"
            >
              Membership
            </a>

            <a
              href="#contact"
              className="nav-link"
            >
              Contact
            </a>


            {/* MOBILE JOIN BUTTON */}
            <a
              href="#membership"
              className="mobile-join"
            >
              Join Us
            </a>

          </nav>


          {/* RIGHT SIDE */}
          <div className="navbar-right">

            {/* JOIN BUTTON */}
            <a
              href="#membership"
              className="join-button"
            >
              <span>Join Us</span>

              <span className="join-arrow">
                ↗
              </span>
            </a>


            {/* MOBILE MENU TOGGLE */}
            <button
              className={`menu-toggle ${
                menuOpen ? "active" : ""
              }`}
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