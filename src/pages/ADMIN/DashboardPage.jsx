import React, { useState, useEffect, useRef, useCallback } from "react";
import DashboardNavbar from "../../components/ADMIN/Settings/DashboardNavbar";
import DashboardSidebar from "../../components/ADMIN/DashboardSidebar";

// Pages
import SettingsPage from "../../components/ADMIN/Settings/SettingsPage";
import ReportsPage from "../../components/ADMIN/ReportsPage";
import MembersList from "../../components/ADMIN/MembersList";
import BatchSchedule from "../../components/ADMIN/BatchSchedule"; // ✅ IMPORT ADD KIYA

import "./DashboardPage.css";

import MembersList from "../../components/ADMIN/MembersList";


import WorkoutPlans from "../../components/Admin/WorkoutPlans"; 
import DietPlans from "../../components/Admin/DietPlans";


const DEFAULT_APPEARANCE = {
  theme: "dark",
  accent: "#03ea04",
  compact: false,
  animations: true,
};

const MIN_WIDTH = 220;
const MAX_WIDTH = 380;
const DEFAULT_WIDTH = 280;

const MIN_HEIGHT = 500;

const DashboardPage = ({ page }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = Number(localStorage.getItem("kinetix_sidebar_width"));
    return saved && saved >= MIN_WIDTH && saved <= MAX_WIDTH
      ? saved
      : DEFAULT_WIDTH;
  });

  const [sidebarHeight, setSidebarHeight] = useState(() => {
    const saved = Number(localStorage.getItem("kinetix_sidebar_height"));
    return saved && saved >= MIN_HEIGHT ? saved : window.innerHeight;
  });

  const isResizingWidth = useRef(false);
  const isResizingHeight = useRef(false);

  const [appearance, setAppearance] = useState(() => {
    const saved = localStorage.getItem("kinetix_appearance");
    return saved ? JSON.parse(saved) : { ...DEFAULT_APPEARANCE };
  });

  useEffect(() => {
    const loadAppearance = () => {
      const saved = localStorage.getItem("kinetix_appearance");
      setAppearance(saved ? JSON.parse(saved) : { ...DEFAULT_APPEARANCE });
    };
    window.addEventListener("appearanceUpdated", loadAppearance);
    return () => window.removeEventListener("appearanceUpdated", loadAppearance);
  }, []);

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizingWidth.current) {
        const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, e.clientX));
        setSidebarWidth(newWidth);
      }
      if (isResizingHeight.current) {
        const newHeight = Math.min(
          window.innerHeight,
          Math.max(MIN_HEIGHT, e.clientY)
        );
        setSidebarHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      if (isResizingWidth.current) {
        isResizingWidth.current = false;
        localStorage.setItem("kinetix_sidebar_width", String(sidebarWidth));
      }
      if (isResizingHeight.current) {
        isResizingHeight.current = false;
        localStorage.setItem("kinetix_sidebar_height", String(sidebarHeight));
      }
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [sidebarWidth, sidebarHeight]);

  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem("kinetix_sidebar_width", String(sidebarWidth));
    }, 300);
    return () => clearTimeout(t);
  }, [sidebarWidth]);

  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem("kinetix_sidebar_height", String(sidebarHeight));
    }, 300);
    return () => clearTimeout(t);
  }, [sidebarHeight]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const Placeholder = ({ title }) => (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>{title} Page</h1>
      <p style={{ color: "var(--dash-muted, #888)", marginBottom: "30px" }}>
        This page is under construction. 🚧
      </p>
    </div>
  );

  const renderContent = () => {
    switch (page) {
      case "dashboard":
        return (
          <div style={{ padding: "40px" }}>
            <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
              Dashboard Overview
            </h1>
            <p style={{ color: "var(--dash-muted, #888)", marginBottom: "30px" }}>
              Welcome to your dashboard.
            </p>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div style={{ background: "var(--dash-card-bg, #1a1a1a)", padding: "20px", borderRadius: "10px", flex: 1, minWidth: "200px", border: "1px solid var(--dash-border, transparent)" }}>
                <h3 style={{ color: "var(--dash-accent, #03ea04)" }}>Total Members</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>1,248</p>
              </div>
              <div style={{ background: "var(--dash-card-bg, #1a1a1a)", padding: "20px", borderRadius: "10px", flex: 1, minWidth: "200px", border: "1px solid var(--dash-border, transparent)" }}>
                <h3 style={{ color: "var(--dash-accent, #03ea04)" }}>Active Trainers</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>24</p>
              </div>
              <div style={{ background: "var(--dash-card-bg, #1a1a1a)", padding: "20px", borderRadius: "10px", flex: 1, minWidth: "200px", border: "1px solid var(--dash-border, transparent)" }}>
                <h3 style={{ color: "var(--dash-accent, #03ea04)" }}>Active Plans</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>320</p>
              </div>
            </div>
          </div>
        );
      case "members":
        return <MembersList />;
      case "batch-schedule":
        return <BatchSchedule />;   // ✅ Yahan BatchSchedule call kiya
      case "schedule":
        return <BatchSchedule />;   // ✅ Schedule pe bhi BatchSchedule khulega
      case "reports":
        return <ReportsPage />;     // ✅ Reports Page
      case "settings":
        return <SettingsPage />;
      case "billing":
        return <Placeholder title="Billing" />; // Abhi placeholder hai
      case "trainers":
        return <Placeholder title="Trainers" />;

      // 👇 2. YAHAN PLACEHOLDER KI JAGAH APNA COMPONENT CALL KAREIN
      case "workouts":
        return <WorkoutPlans />;  // ✅ Ab yeh aapka page render karega

      case "diet":
        return <Placeholder title="Diet" />;
      default:
        return <Placeholder title="Page Not Found" />;
    }
  };

  const themeClass =
    appearance.theme === "light" ? "dashboard-light" : "dashboard-dark";
  const compactClass = appearance.compact ? "dashboard-compact" : "";
  const animClass = appearance.animations ? "" : "dashboard-no-animations";

  return (
    <div
      className={`dashboard-layout ${themeClass} ${compactClass} ${animClass}`}
      style={{
        "--dash-accent": appearance.accent,
        "--dash-sidebar-width": `${sidebarWidth}px`,
        "--dash-sidebar-height": `${sidebarHeight}px`,
        "--dash-card-bg": appearance.theme === "light" ? "#ffffff" : "#1a1a1a",
        "--dash-muted": appearance.theme === "light" ? "#6b7280" : "#888",
        "--dash-border": appearance.theme === "light" ? "#e5e7eb" : "transparent",
      }}
    >
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onResizeStart={handleWidthMouseDown}
        onHeightResizeStart={handleHeightMouseDown}
      />
      <DashboardNavbar
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <main className={`dashboard-content ${isSidebarOpen ? "shifted" : ""}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardPage;