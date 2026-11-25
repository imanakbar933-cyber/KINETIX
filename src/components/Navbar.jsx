
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const defaultPalettes = {
  dark: {
    bgMain: "#050706",
    bgCard: "#111513",
    textMain: "#ffffff",
    textSecondary: "#d0d0d0",
    textMuted: "#a0a0a0",
    accent: "#03ea04",
  },
  light: {
    bgMain: "#f4f4f4",
    bgCard: "#ffffff",
    textMain: "#171717",
    textSecondary: "#555555",
    textMuted: "#999999",
    accent: "#16a326",
  },
  custom: {
    bgMain: "#050706",
    bgCard: "#111513",
    textMain: "#ffffff",
    textSecondary: "#d0d0d0",
    textMuted: "#a0a0a0",
    accent: "#03ea04",
  },
};

const colorLabels = [
  { key: "accent", label: "Accent Color" },
  { key: "bgMain", label: "Main Background" },
  { key: "bgCard", label: "Card Background" },
  { key: "textMain", label: "Primary Text" },
  { key: "textSecondary", label: "Secondary Text" },
  { key: "textMuted", label: "Muted Text" },
];

function getSavedSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem("themeSettings"));

    if (saved) {
      return {
        theme: saved.theme || localStorage.getItem("theme") || "dark",
        palettes: {
          dark: { ...defaultPalettes.dark, ...saved.palettes?.dark },
          light: { ...defaultPalettes.light, ...saved.palettes?.light },
          custom: { ...defaultPalettes.custom, ...saved.palettes?.custom },
        },
      };
    }

    // Support previously saved custom theme
    const oldCustom = JSON.parse(localStorage.getItem("customTheme") || "null");
    const oldLight = JSON.parse(localStorage.getItem("lightTextColors") || "null");

    return {
      theme: localStorage.getItem("theme") || "dark",
      palettes: {
        dark: { ...defaultPalettes.dark },
        light: {
          ...defaultPalettes.light,
          ...(oldLight || {}),
        },
        custom: {
          ...defaultPalettes.custom,
          ...(oldCustom || {}),
        },
      },
    };
  } catch {
    return {
      theme: "dark",
      palettes: defaultPalettes,
    };
  }
}

function Navbar() {
  const savedSettings = getSavedSettings();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // SAVED THEME SETTINGS
  const [theme, setTheme] = useState(savedSettings.theme);
  const [palettes, setPalettes] = useState(savedSettings.palettes);

  // THEME CUSTOMIZER
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [draftTheme, setDraftTheme] = useState(savedSettings.theme);
  const [draftColors, setDraftColors] = useState({
    ...savedSettings.palettes[savedSettings.theme],
  });

  // =========================================
  // APPLY THEME VARIABLES TO WHOLE WEBSITE
  // =========================================

  useEffect(() => {
    const root = document.documentElement;
    const colors = palettes[theme] || defaultPalettes.dark;

    root.setAttribute("data-theme", theme);

    const {
      bgMain,
      bgCard,
      textMain,
      textSecondary,
      textMuted,
      accent,
    } = colors;

    // MAIN THEME COLORS
    root.style.setProperty("--bg-main", bgMain);
    root.style.setProperty("--bg-card", bgCard);
    root.style.setProperty("--card-bg", bgCard);
    root.style.setProperty("--surface-bg", bgCard);
    root.style.setProperty("--hover-bg", bgCard);

    root.style.setProperty("--text-main", textMain);
    root.style.setProperty("--text-secondary", textSecondary);
    root.style.setProperty("--text-muted", textMuted);

    root.style.setProperty("--accent", accent);

    // ACCENT RGB VALUES
    const validHex = /^#[0-9A-Fa-f]{6}$/.test(accent)
      ? accent
      : "#03ea04";

    const r = parseInt(validHex.slice(1, 3), 16);
    const g = parseInt(validHex.slice(3, 5), 16);
    const b = parseInt(validHex.slice(5, 7), 16);

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

    // BORDER AND SHADOW VARIABLES
    root.style.setProperty(
      "--border-color",
      theme === "light"
        ? "rgba(0,0,0,0.10)"
        : "rgba(255,255,255,0.10)"
    );

    root.style.setProperty(
      "--border-strong",
      theme === "light"
        ? "rgba(0,0,0,0.20)"
        : "rgba(255,255,255,0.20)"
    );

    root.style.setProperty(
      "--shadow-color",
      theme === "light"
        ? "rgba(0,0,0,0.10)"
        : "rgba(0,0,0,0.50)"
    );

    // SAVE APPLIED SETTINGS
    localStorage.setItem("theme", theme);
    localStorage.setItem(
      "themeSettings",
      JSON.stringify({ theme, palettes })
    );
  }, [theme, palettes]);

  // =========================================
  // OPEN CUSTOMIZER
  // =========================================

  const openCustomizer = () => {
    setDraftTheme(theme);
    setDraftColors({ ...palettes[theme] });
    setCustomizerOpen(true);
  };

  // =========================================
  // SELECT DRAFT THEME
  // =========================================

  const selectDraftTheme = (selected) => {
    setDraftTheme(selected);
    setDraftColors({ ...palettes[selected] });
  };

  // =========================================
  // UPDATE DRAFT COLOR
  // =========================================

  const updateDraftColor = (key, value) => {
    setDraftColors((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // =========================================
  // APPLY CHANGES
  // =========================================

  const applyThemeChanges = () => {
    const updatedPalettes = {
      ...palettes,
      [draftTheme]: { ...draftColors },
    };

    setPalettes(updatedPalettes);
    setTheme(draftTheme);
    setCustomizerOpen(false);
  };

  // =========================================
  // RESET CURRENT DRAFT
  // =========================================

  const resetDraft = () => {
    setDraftColors({ ...defaultPalettes[draftTheme] });
  };

  // =========================================
  // CANCEL CUSTOMIZER
  // =========================================

  const cancelCustomizer = () => {
    setDraftTheme(theme);
    setDraftColors({ ...palettes[theme] });
    setCustomizerOpen(false);
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
  // COLOR PRESETS
  // =========================================

  const accentPresets = [
    "#03ea04",
    "#6957e8",
    "#159e9a",
    "#f59e0b",
    "#ed4264",
    "#2696ed",
  ];

  return (
    <>
      {/* NAVBAR */}
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">

          {/* LOGO */}
         {/* KINETIX TEXT LOGO */}
<div className="navbar-left">
  <Link
    to="/"
    className="navbar-logo"
    onClick={handleHomeClick}
    aria-label="KINETIX Fitness Club Home"
  >
    <div className="navbar-brand-icon" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>

    <div className="navbar-brand-words">
      <strong>KINETIX</strong>
      <small>FITNESS CLUB</small>
    </div>
  </Link>
</div>

          {/* NAVIGATION LINKS */}
          <nav className={`navbar-menu ${menuOpen ? "menu-open" : ""}`}>

            <Link to="/" className="nav-link" onClick={handleHomeClick}>
              Home
            </Link>

            <Link to="/about" className="nav-link" onClick={handleNavigation}>
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

              <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                <Link to="/team" className="dropdown-item" onClick={handleNavigation}>
                  Our Team
                </Link>

                <Link to="/ClassroomPage" className="dropdown-item" onClick={handleNavigation}>
                  Classes
                </Link>

                <Link to="/schedules" className="dropdown-item" onClick={handleNavigation}>
                  Schedules
                </Link>

                <Link to="/GalleryPage" className="dropdown-item" onClick={handleNavigation}>
                  Gallery
                </Link>

                <Link to="/faqpage" className="dropdown-item" onClick={handleNavigation}>
                  FAQs
                </Link>
              </div>
            </div>

            <Link to="/trainers" className="nav-link" onClick={handleNavigation}>
              Trainers
            </Link>

            <Link to="/dashboard" className="nav-link dashboard-link" onClick={handleNavigation}>
              Dashboard
            </Link>

            <Link to="/plans" className="nav-link" onClick={handleNavigation}>
              Membership
            </Link>

            <Link to="/contact" className="nav-link" onClick={handleNavigation}>
              Contact
            </Link>
          </nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="navbar-right">

            {/* THEME CUSTOMIZER BUTTON */}
            <button
              className="theme-toggle-btn"
              onClick={openCustomizer}
              aria-label="Open theme customizer"
              title="Customize appearance"
            >
              {theme === "light" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : theme === "custom" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20M2 12h20" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* LOGIN */}
            <Link to="/login" className="login-nav-button" onClick={handleNavigation}>
              Login
            </Link>

            {/* REGISTER */}
            <Link to="/signup" className="register-button" onClick={handleNavigation}>
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

      {/* =========================================
          PREMIUM THEME CUSTOMIZER MODAL
      ========================================= */}

      {customizerOpen && (
        <div
          className="theme-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) cancelCustomizer();
          }}
        >
          <div
            className="theme-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="theme-modal-title"
          >
            {/* MODAL HEADER */}
            <div className="theme-modal-header">
              <div>
                <span className="theme-modal-eyebrow">KINETIX APPEARANCE</span>
                <h2 id="theme-modal-title">Theme Customizer</h2>
                <p>Personalize your website experience</p>
              </div>

              <button
                className="theme-modal-close"
                onClick={cancelCustomizer}
                aria-label="Close customizer"
              >
                ×
              </button>
            </div>

            <div className="theme-modal-body">

              {/* THEME MODE */}
              <section className="theme-setting-section">
                <div className="theme-section-heading">
                  <span className="theme-section-number">01</span>
                  <div>
                    <h3>Theme Mode</h3>
                    <p>Choose your preferred appearance</p>
                  </div>
                </div>

                <div className="theme-mode-grid">
                  {[
                    { id: "light", label: "Light", icon: "sun" },
                    { id: "dark", label: "Dark", icon: "moon" },
                    { id: "custom", label: "Custom", icon: "palette" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      className={`theme-mode-card ${
                        draftTheme === item.id ? "selected" : ""
                      }`}
                      onClick={() => selectDraftTheme(item.id)}
                    >
                      {item.icon === "sun" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                        </svg>
                      )}

                      {item.icon === "moon" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.7 8.7 0 1 0 20.5 14.2z" />
                        </svg>
                      )}

                      {item.icon === "palette" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 1.4-3.4 1.7 1.7 0 0 1 1.2-2.9H18a3 3 0 0 0 3-3c0-4.8-4-8.7-9-8.7z" />
                          <circle cx="7.5" cy="11" r="1" />
                          <circle cx="10" cy="7.5" r="1" />
                          <circle cx="15" cy="8" r="1" />
                        </svg>
                      )}

                      <strong>{item.label}</strong>
                      <span className="theme-mode-check">✓</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* ACCENT COLOR */}
              <section className="theme-setting-section">
                <div className="theme-section-heading">
                  <span className="theme-section-number">02</span>
                  <div>
                    <h3>Accent Color</h3>
                    <p>Buttons, links, icons and highlights</p>
                  </div>
                </div>

                <div className="accent-presets">
                  {accentPresets.map((color) => (
                    <button
                      key={color}
                      className={`accent-swatch ${
                        draftColors.accent === color ? "selected" : ""
                      }`}
                      style={{ "--swatch-color": color }}
                      onClick={() => updateDraftColor("accent", color)}
                      aria-label={`Select accent ${color}`}
                    />
                  ))}

                  <label className="accent-custom-swatch" title="Choose custom accent">
                    <input
                      type="color"
                      value={draftColors.accent}
                      onChange={(e) => updateDraftColor("accent", e.target.value)}
                    />
                    <span>+</span>
                  </label>
                </div>
              </section>

              {/* BACKGROUND COLORS */}
              <section className="theme-setting-section">
                <div className="theme-section-heading">
                  <span className="theme-section-number">03</span>
                  <div>
                    <h3>Background Colors</h3>
                    <p>Control the website and card surfaces</p>
                  </div>
                </div>

                <div className="theme-color-grid">
                  {colorLabels
                    .filter((item) => ["bgMain", "bgCard"].includes(item.key))
                    .map((item) => (
                      <label className="theme-color-control" key={item.key}>
                        <span>{item.label}</span>
                        <div className="theme-color-input-wrap">
                          <input
                            type="color"
                            value={draftColors[item.key]}
                            onChange={(e) => updateDraftColor(item.key, e.target.value)}
                          />
                          <code>{draftColors[item.key].toUpperCase()}</code>
                        </div>
                      </label>
                    ))}
                </div>
              </section>

              {/* TEXT COLORS */}
              <section className="theme-setting-section">
                <div className="theme-section-heading">
                  <span className="theme-section-number">04</span>
                  <div>
                    <h3>Text Colors</h3>
                    <p>Customize text throughout the website</p>
                  </div>
                </div>

                <div className="theme-color-grid">
                  {colorLabels
                    .filter((item) =>
                      ["textMain", "textSecondary", "textMuted"].includes(item.key)
                    )
                    .map((item) => (
                      <label className="theme-color-control" key={item.key}>
                        <span>{item.label}</span>
                        <div className="theme-color-input-wrap">
                          <input
                            type="color"
                            value={draftColors[item.key]}
                            onChange={(e) => updateDraftColor(item.key, e.target.value)}
                          />
                          <code>{draftColors[item.key].toUpperCase()}</code>
                        </div>
                      </label>
                    ))}
                </div>
              </section>

              {/* PREVIEW */}
              <section className="theme-live-preview">
                <span className="theme-preview-label">COLOR PREVIEW</span>

                <div
                  className="theme-preview-card"
                  style={{
                    background: draftColors.bgMain,
                    borderColor: draftColors.accent,
                  }}
                >
                  <div
                    className="theme-preview-inner"
                    style={{ background: draftColors.bgCard }}
                  >
                    <strong style={{ color: draftColors.textMain }}>
                      KINETIX FITNESS CLUB
                    </strong>

                    <p style={{ color: draftColors.textSecondary }}>
                      Your fitness journey starts here.
                    </p>

                    <small style={{ color: draftColors.textMuted }}>
                      Preview of secondary information
                    </small>

                    <span
                      className="theme-preview-button"
                      style={{
                        background: draftColors.accent,
                        color: "#071007",
                      }}
                    >
                      GET STARTED
                    </span>
                  </div>
                </div>
              </section>
            </div>

            {/* MODAL FOOTER */}
            <div className="theme-modal-footer">
              <button className="theme-reset-btn" onClick={resetDraft}>
                <span>↺</span> Reset
              </button>

              <div className="theme-footer-actions">
                <button className="theme-cancel-btn" onClick={cancelCustomizer}>
                  Cancel
                </button>

                <button className="theme-apply-btn" onClick={applyThemeChanges}>
                  Apply Changes <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
