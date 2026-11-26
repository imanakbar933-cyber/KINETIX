import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import DashboardNavbar from "../../components/ADMIN/Settings/DashboardNavbar";
import DashboardSidebar from "../../components/ADMIN/DashboardSidebar";

// ADMIN PAGES
import SettingsPage from "../../components/ADMIN/Settings/SettingsPage";
import DashboardHome from "../../components/ADMIN/DashboardHome";
import ReportsPage from "../../components/ADMIN/ReportsPage";
import MembersList from "../../components/ADMIN/MembersList";
import BatchSchedule from "../../components/ADMIN/BatchSchedule";
import PointOfSale from "../../components/ADMIN/PointOfSale";
import TrainerManagement from "../../components/ADMIN/TrainerManagement";
import DashboardServices from "../../components/ADMIN/DashboardServices";
import Staff from "../../components/ADMIN/Staff";
import WorkoutPlans from "../../components/ADMIN/WorkoutPlans";
import DietPlans from "../../components/ADMIN/DietPlans";
import LockerManagement from "../../components/ADMIN/LockerManagement";

// ===== NEW ADDITIONS: EXERCISE COMPONENTS =====
import ExerciseLibrary from "../../components/ADMIN/ExerciseLibrary";
import ExerciseDetail from "../../components/ADMIN/ExerciseDetail";
// ==============================================

import "./DashboardPage.css";

// ======================================================
// DEFAULT APPEARANCE
// ======================================================

const DEFAULT_APPEARANCE = {
  theme: "dark",
  accent: "#03ea04",
  compact: false,
  animations: true,
};

// SIDEBAR LIMITS
const MIN_WIDTH = 220;
const MAX_WIDTH = 380;
const DEFAULT_WIDTH = 280;
const MIN_HEIGHT = 500;

// ======================================================
// DASHBOARD PAGE
// ======================================================

const DashboardPage = ({ page }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ====================================================
  // SIDEBAR WIDTH
  // ====================================================

  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = Number(
      localStorage.getItem("kinetix_sidebar_width")
    );

    return saved >= MIN_WIDTH && saved <= MAX_WIDTH
      ? saved
      : DEFAULT_WIDTH;
  });

  // ====================================================
  // SIDEBAR HEIGHT
  // ====================================================

  const [sidebarHeight, setSidebarHeight] = useState(() => {
    const saved = Number(
      localStorage.getItem("kinetix_sidebar_height")
    );

    return saved >= MIN_HEIGHT
      ? saved
      : window.innerHeight;
  });

  const isResizingWidth = useRef(false);
  const isResizingHeight = useRef(false);

  // ====================================================
  // APPEARANCE SETTINGS
  // ====================================================

  const [appearance, setAppearance] = useState(() => {
    try {
      const saved = localStorage.getItem("kinetix_appearance");

      return saved
        ? {
            ...DEFAULT_APPEARANCE,
            ...JSON.parse(saved),
          }
        : { ...DEFAULT_APPEARANCE };
    } catch {
      return { ...DEFAULT_APPEARANCE };
    }
  });

  // ====================================================
  // LOAD THEME SETTINGS
  // ====================================================

  useEffect(() => {
    const loadAppearance = () => {
      try {
        const saved = localStorage.getItem("kinetix_appearance");

        setAppearance(
          saved
            ? {
                ...DEFAULT_APPEARANCE,
                ...JSON.parse(saved),
              }
            : { ...DEFAULT_APPEARANCE }
        );
      } catch (error) {
        console.error("Appearance loading error:", error);
        setAppearance({ ...DEFAULT_APPEARANCE });
      }
    };

    window.addEventListener("appearanceUpdated", loadAppearance);
    window.addEventListener("storage", loadAppearance);

    return () => {
      window.removeEventListener(
        "appearanceUpdated",
        loadAppearance
      );

      window.removeEventListener("storage", loadAppearance);
    };
  }, []);

  // ====================================================
  // SIDEBAR RESIZE START
  // ====================================================

  const handleWidthMouseDown = useCallback(() => {
    isResizingWidth.current = true;

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  const handleHeightMouseDown = useCallback(() => {
    isResizingHeight.current = true;

    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
  }, []);

  // ====================================================
  // SIDEBAR RESIZE MOVEMENT
  // ====================================================

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isResizingWidth.current) {
        const newWidth = Math.min(
          MAX_WIDTH,
          Math.max(MIN_WIDTH, event.clientX)
        );

        setSidebarWidth(newWidth);
      }

      if (isResizingHeight.current) {
        const newHeight = Math.min(
          window.innerHeight,
          Math.max(MIN_HEIGHT, event.clientY)
        );

        setSidebarHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      if (isResizingWidth.current) {
        isResizingWidth.current = false;

        setSidebarWidth((currentWidth) => {
          localStorage.setItem(
            "kinetix_sidebar_width",
            String(currentWidth)
          );

          return currentWidth;
        });
      }

      if (isResizingHeight.current) {
        isResizingHeight.current = false;

        setSidebarHeight((currentHeight) => {
          localStorage.setItem(
            "kinetix_sidebar_height",
            String(currentHeight)
          );

          return currentHeight;
        });
      }

      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, []);

  // ====================================================
  // SAVE SIDEBAR WIDTH
  // ====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(
        "kinetix_sidebar_width",
        String(sidebarWidth)
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [sidebarWidth]);

  // ====================================================
  // SAVE SIDEBAR HEIGHT
  // ====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(
        "kinetix_sidebar_height",
        String(sidebarHeight)
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [sidebarHeight]);

  // ====================================================
  // SIDEBAR TOGGLE
  // ====================================================

  const toggleSidebar = () => {
    setIsSidebarOpen((previous) => !previous);
  };

  // ====================================================
  // PLACEHOLDER PAGE
  // ====================================================

  const Placeholder = ({ title }) => (
    <div className="dashboard-placeholder">
      <h1>{title}</h1>

      <p>This page is under construction. 🚧</p>
    </div>
  );

  // ====================================================
  // PAGE CONTENT
  // ====================================================

  const renderContent = () => {
    switch (page) {
      case "dashboard":
        return <DashboardHome />;

      case "members":
        return <MembersList />;

      case "batch-schedule":
      case "schedule":
        return <BatchSchedule />;

      case "reports":
        return <ReportsPage />;

      case "billing":
        return <PointOfSale />;

      case "settings":
        return <SettingsPage />;

      case "trainers":
        return <TrainerManagement />;

      case "workouts":
        return <WorkoutPlans />;

      case "diet":
        return <DietPlans />;

      case "services":
        return <DashboardServices />;

      case "staff":
        return <Staff />;

      case "locker-management":
        return <LockerManagement />;

      // ==========================================
      // EXERCISE LIBRARY (UPDATED)
      // ==========================================
      case "exercise-library":
        return <ExerciseLibrary />;

      // ==========================================
      // EXERCISE DETAIL (UPDATED)
      // ==========================================
      case "exercise-detail":
        return <ExerciseDetail />;

      default:
        return <Placeholder title="Page Not Found" />;
    }
  };

  // ====================================================
  // THEME CLASSES
  // ====================================================

  const isLight = appearance.theme === "light";

  const themeClass = isLight
    ? "dashboard-light"
    : "dashboard-dark";

  const compactClass = appearance.compact
    ? "dashboard-compact"
    : "";

  const animClass = appearance.animations
    ? ""
    : "dashboard-no-animations";

  const accentColor = appearance.accent || "#03ea04";

  // ====================================================
  // DYNAMIC THEME VARIABLES
  // ====================================================

  const themeVariables = {
    // ACCENT
    "--accent": accentColor,
    "--dash-accent": accentColor,

    // MAIN BACKGROUND
    "--bg-main": isLight ? "#f4f6f8" : "#050706",
    "--bg-card": isLight ? "#ffffff" : "#111412",

    // DASHBOARD BACKGROUNDS
    "--dash-bg": isLight ? "#f4f6f8" : "#050706",
    "--dash-card-bg": isLight ? "#ffffff" : "#1a1a1a",

    // SIDEBAR AND NAVBAR
    "--dash-sidebar-bg": isLight ? "#ffffff" : "#0a0d0b",
    "--dash-navbar-bg": isLight ? "#ffffff" : "#0a0d0b",

    // TEXT
    "--text-main": isLight ? "#111827" : "#ffffff",
    "--text-muted": isLight ? "#6b7280" : "#888888",

    "--dash-text": isLight ? "#111827" : "#ffffff",
    "--dash-text-muted": isLight
      ? "#6b7280"
      : "rgba(255,255,255,0.6)",

    "--dash-muted": isLight ? "#6b7280" : "#888888",

    // INPUT BACKGROUND
    "--dash-input-bg": isLight ? "#f3f4f6" : "#050706",

    // CONTROL BACKGROUND
    "--dash-control-bg": isLight
      ? "#ffffff"
      : "transparent",

    // SHORTCUT BACKGROUND
    "--dash-shortcut-bg": isLight
      ? "#ffffff"
      : "rgba(255,255,255,0.05)",

    // TOOLTIP
    "--dash-tooltip-bg": isLight ? "#111827" : "#111111",
    "--dash-tooltip-text": "#ffffff",

    // MODAL
    "--dash-modal-bg": isLight ? "#ffffff" : "#101410",

    // BORDERS
    "--border-color": isLight
      ? "#e5e7eb"
      : "rgba(255,255,255,0.08)",

    "--dash-border": isLight
      ? "#e5e7eb"
      : "rgba(255,255,255,0.08)",

    // SIDEBAR DIMENSIONS
    "--dash-sidebar-width": appearance.compact
      ? "240px"
      : `${sidebarWidth}px`,

    "--dash-sidebar-height": `${sidebarHeight}px`,
  };

  // ====================================================
  // DASHBOARD UI
  // ====================================================

  return (
    <div
      className={`dashboard-layout ${themeClass} ${compactClass} ${animClass}`}
      style={themeVariables}
    >
      {/* SIDEBAR */}

      <DashboardSidebar
        isOpen={isSidebarOpen}
        onResizeStart={handleWidthMouseDown}
        onHeightResizeStart={handleHeightMouseDown}
      />

      {/* NAVBAR */}

      <DashboardNavbar
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      {/* MAIN CONTENT */}

      <main
        className={`dashboard-content ${
          isSidebarOpen ? "shifted" : ""
        }`}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardPage;