
import React from "react";
import "./Hero.css";

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

// =========================================
// GET EXACT SAVED NAVBAR THEME SETTINGS
// =========================================

function getIntroTheme() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("themeSettings")
    );

    if (saved) {
      const theme = saved.theme || "dark";

      const palettes = {
        dark: {
          ...defaultPalettes.dark,
          ...saved.palettes?.dark,
        },

        light: {
          ...defaultPalettes.light,
          ...saved.palettes?.light,
        },

        custom: {
          ...defaultPalettes.custom,
          ...saved.palettes?.custom,
        },
      };

      return {
        theme,
        colors: palettes[theme] || palettes.dark,
      };
    }

    // Support old saved themes
    const oldCustom = JSON.parse(
      localStorage.getItem("customTheme") || "null"
    );

    const oldLight = JSON.parse(
      localStorage.getItem("lightTextColors") || "null"
    );

    const theme = localStorage.getItem("theme") || "dark";

    const palettes = {
      dark: { ...defaultPalettes.dark },

      light: {
        ...defaultPalettes.light,
        ...(oldLight || {}),
      },

      custom: {
        ...defaultPalettes.custom,
        ...(oldCustom || {}),
      },
    };

    return {
      theme,
      colors: palettes[theme] || palettes.dark,
    };
  } catch (error) {
    return {
      theme: "dark",
      colors: defaultPalettes.dark,
    };
  }
}

// =========================================
// KINETIX INTRO COMPONENT
// =========================================

function KinetixIntro() {
  const letters = "KINETIX".split("");

  // Get currently saved theme
  const { theme, colors } = getIntroTheme();

  // Validate accent color
  const validHex = /^#[0-9A-Fa-f]{6}$/.test(colors.accent)
    ? colors.accent
    : "#03ea04";

  // Convert accent HEX into RGB
  const r = parseInt(validHex.slice(1, 3), 16);
  const g = parseInt(validHex.slice(3, 5), 16);
  const b = parseInt(validHex.slice(5, 7), 16);

  // Apply exact Navbar theme variables to intro
  const introThemeStyles = {
    "--bg-main": colors.bgMain,
    "--bg-card": colors.bgCard,

    "--text-main": colors.textMain,
    "--text-secondary": colors.textSecondary,
    "--text-muted": colors.textMuted,

    "--accent": validHex,
    "--accent-rgb": `${r}, ${g}, ${b}`,

    "--accent-soft": `rgba(${r}, ${g}, ${b}, 0.15)`,
    "--accent-glow": `rgba(${r}, ${g}, ${b}, 0.4)`,
    "--accent-glow-strong": `rgba(${r}, ${g}, ${b}, 0.65)`,
  };

  return (
    <div
      className="kinetix-intro"
      data-theme={theme}
      style={introThemeStyles}
    >
      {/* BACKGROUND GRID */}
      <div className="intro-grid"></div>

      {/* AMBIENT GLOW */}
      <div className="intro-glow intro-glow-one"></div>
      <div className="intro-glow intro-glow-two"></div>

      {/* MAIN INTRO CONTENT */}
      <div className="intro-content">

        {/* KINETIX LOGO */}
        <div className="intro-logo">
          <svg viewBox="0 0 120 120" className="intro-logo-svg">

            <path
              d="M28 17 H48 V49 L78 17 H105 L66 59 L107 103 H79 L48 70 V103 H28 Z"
              fill="currentColor"
              className="logo-main-shape"
            />

            <path
              d="M15 8 H105 V112 H15 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="logo-frame"
            />

            <path
              d="M15 29 V8 H37"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="logo-corner"
            />

            <path
              d="M83 112 H105 V90"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="logo-corner"
            />

          </svg>
        </div>

        {/* BRAND LABEL */}
        <div className="intro-brand-label">
          EST. FOR STRENGTH
        </div>

        {/* ANIMATED KINETIX WORD */}
        <div className="intro-word">
          {letters.map((letter, index) => (
            <span
              className="intro-letter"
              key={`${letter}-${index}`}
              style={{
                animationDelay: `${0.35 + index * 0.18}s`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* ANIMATED LINE */}
        <div className="intro-line"></div>

        {/* TAGLINE */}
        <p className="intro-tagline">
          FITNESS <span>•</span> STRENGTH <span>•</span> PERFORMANCE
        </p>

      </div>

      {/* BOTTOM BRAND */}
      <div className="intro-bottom">
        <span>WELCOME TO</span>

        <span className="intro-bottom-brand">
          KINETIX FITNESS CLUB
        </span>
      </div>

    </div>
  );
}

export default KinetixIntro;
