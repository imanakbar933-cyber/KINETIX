
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // THEME STATES
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [customPanelOpen, setCustomPanelOpen] = useState(false);

  // CUSTOM COLORS
  const defaultColors = {
    bgMain: "#050706",
    bgCard: "#111513",
    textMain: "#ffffff",
    textMuted: "#a0a0a0",
    accent: "#03ea04",
  };

  const [customColors, setCustomColors] = useState(() => {
    try {
      const saved = localStorage.getItem("customTheme");

      return saved
        ? { ...defaultColors, ...JSON.parse(saved) }
        : defaultColors;
    } catch {
      return defaultColors;
    }
  });

  // =========================================
  // APPLY DARK / LIGHT / CUSTOM THEME
  // =========================================

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "custom") {
      root.setAttribute("data-theme", "custom");

      const {
        bgMain,
        bgCard,
        textMain,
        textMuted,
        accent,
      } = customColors;

      // MAIN COLORS
      root.style.setProperty("--bg-main", bgMain);
      root.style.setProperty("--bg-card", bgCard);
      root.style.setProperty("--text-main", textMain);
      root.style.setProperty("--text-muted", textMuted);
      root.style.setProperty("--accent", accent);

      // BACKGROUND ALIASES
      root.style.setProperty("--card-bg", bgCard);
      root.style.setProperty("--surface-bg", bgCard);
      root.style.setProperty("--hover-bg", bgCard);

      // ACCENT HEX TO RGB
      const hex = String(accent || "#03ea04").trim();

      const validHex = /^#[0-9A-Fa-f]{6}$/.test(hex)
        ? hex
        : "#03ea04";

      const r = parseInt(validHex.slice(1, 3), 16);
      const g = parseInt(validHex.slice(3, 5), 16);
      const b = parseInt(validHex.slice(5, 7), 16);

      // ACCENT VARIABLES
      root.style.setProperty("--accent-rgb", `${r}, ${g}, ${b}`);

      root.style.setProperty(
        "--accent-soft",
        `rgba(${r}, ${g}, ${b}, 0.15)`
      );

      root.style.setProperty(
        "--accent-glow",
        `rgba(${r}, ${g}, ${b}, 0.4)`
      );

      root.style.setProperty(
        "--accent-glow-strong",
        `rgba(${r}, ${g}, ${b}, 0.65)`
      );

      // SAVE CUSTOM COLORS
      localStorage.setItem(
        "customTheme",
        JSON.stringify(customColors)
      );

    } else {
      root.setAttribute("data-theme", theme);

      // REMOVE CUSTOM INLINE VARIABLES
      [
        "--bg-main",
        "--bg-card",
        "--card-bg",
        "--surface-bg",
        "--hover-bg",
        "--text-main",
        "--text-muted",
        "--accent",
        "--accent-rgb",
        "--accent-soft",
        "--accent-glow",
        "--accent-glow-strong",
      ].forEach((variable) => {
        root.style.removeProperty(variable);
      });
    }

    localStorage.setItem("theme", theme);

  }, [theme, customColors]);

  // =========================================
  // THEME MENU
  // =========================================

  const toggleTheme = () => {
    setThemeMenuOpen((prev) => !prev);
  };

  const selectTheme = (selected) => {
    setTheme(selected);
    setThemeMenuOpen(false);

    if (selected !== "custom") {
      setCustomPanelOpen(false);
    }
  };

  // =========================================
  // SCROLL
  // =========================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================================
  // HOME CURTAIN ANIMATION
  // =========================================

  const handleHomeClick = () => {
    window.dispatchEvent(new Event("triggerHomeAnimation"));

    setMenuOpen(false);
    setDropdownOpen(false);
  };

  // =========================================
  // NAVIGATION
  // =========================================

  const handleNavigation = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  // =========================================
  // UPDATE CUSTOM COLOR
  // =========================================

  const updateCustomColor = (key, value) => {
    setCustomColors((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      {/* NAVBAR */}
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">

          {/* LOGO */}
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

            <Link
              to="/dashboard"
              className="nav-link dashboard-link"
              onClick={handleNavigation}
            >
              Dashboard
            </Link>

            <Link
              to="/plans"
              className="nav-link"
              onClick={handleNavigation}
            >
              Membership
            </Link>

            <Link
              to="/contact"
              className="nav-link"
              onClick={handleNavigation}
            >
              Contact
            </Link>

          </nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="navbar-right">

            {/* THEME TOGGLE */}
            <div className="theme-toggle-wrapper">

              <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label="Change theme"
                aria-expanded={themeMenuOpen}
              >

                {theme === "dark" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="5"></circle>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                  </svg>
                )}

                {theme === "light" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}

                {theme === "custom" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="13.5" cy="6.5" r="2.5"></circle>
                    <circle cx="17.5" cy="14.5" r="2.5"></circle>
                    <circle cx="8.5" cy="7.5" r="2.5"></circle>
                    <circle cx="6.5" cy="16.5" r="2.5"></circle>
                    <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.4-.3-.4-.5-.9-.5-1.4 0-1.1.9-2 2-2h1.5c2.5 0 4.5-2 4.5-4.5C21 5.5 17 2 12 2z"></path>
                  </svg>
                )}

              </button>

              {/* THEME OPTIONS */}
              {themeMenuOpen && (
                <div className="theme-options-menu">

                  <button
                    className={`theme-option ${
                      theme === "dark" ? "active" : ""
                    }`}
                    onClick={() => selectTheme("dark")}
                  >
                    <span className="theme-dot dark-dot"></span>
                    Dark
                  </button>

                  <button
                    className={`theme-option ${
                      theme === "light" ? "active" : ""
                    }`}
                    onClick={() => selectTheme("light")}
                  >
                    <span className="theme-dot light-dot"></span>
                    Light
                  </button>

                  <button
                    className={`theme-option ${
                      theme === "custom" ? "active" : ""
                    }`}
                    onClick={() => {
                      selectTheme("custom");
                      setCustomPanelOpen(true);
                    }}
                  >
                    <span className="theme-dot custom-dot"></span>
                    Custom
                  </button>

                </div>
              )}

              {/* CUSTOM THEME PANEL */}
              {customPanelOpen && theme === "custom" && (
                <div className="custom-theme-panel">

                  <h4>Customize Theme</h4>

                  <label>
                    Background
                    <input
                      type="color"
                      value={customColors.bgMain}
                      onChange={(e) =>
                        updateCustomColor("bgMain", e.target.value)
                      }
                    />
                  </label>

                  <label>
                    Card BG
                    <input
                      type="color"
                      value={customColors.bgCard}
                      onChange={(e) =>
                        updateCustomColor("bgCard", e.target.value)
                      }
                    />
                  </label>

                  <label>
                    Text
                    <input
                      type="color"
                      value={customColors.textMain}
                      onChange={(e) =>
                        updateCustomColor("textMain", e.target.value)
                      }
                    />
                  </label>

                  <label>
                    Muted Text
                    <input
                      type="color"
                      value={customColors.textMuted}
                      onChange={(e) =>
                        updateCustomColor("textMuted", e.target.value)
                      }
                    />
                  </label>

                  <label>
                    Accent
                    <input
                      type="color"
                      value={customColors.accent}
                      onChange={(e) =>
                        updateCustomColor("accent", e.target.value)
                      }
                    />
                  </label>

                  <button
                    className="custom-theme-close"
                    onClick={() => setCustomPanelOpen(false)}
                  >
                    Done
                  </button>

                </div>
              )}

            </div>

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

            {/* MOBILE MENU */}
            <button
              className={`menu-toggle ${menuOpen ? "active" : ""}`}
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
