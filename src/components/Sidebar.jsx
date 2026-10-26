import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  CalendarDays,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
} from "lucide-react";

import "./Sidebar.css";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Members", icon: Users },
  { name: "Workouts", icon: Dumbbell },
  { name: "Schedule", icon: CalendarDays },
  { name: "Membership", icon: CreditCard },
  { name: "Analytics", icon: BarChart3 },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        {open ? <X /> : <Menu />}
      </button>

      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`kinetix-sidebar ${
          open ? "sidebar-open" : ""
        }`}
      >
        <div className="sidebar-brand">
          <div className="brand-mark">
            <Dumbbell size={27} />
          </div>

          <div>
            <h2>KINETIX</h2>
            <span>FITNESS CLUB</span>
          </div>
        </div>

        <div className="sidebar-section-label">
          MAIN MENU
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`sidebar-link ${
                  active === item.name ? "active" : ""
                }`}
                onClick={() => {
                  setActive(item.name);
                  setOpen(false);
                }}
              >
                <Icon size={20} />
                <span>{item.name}</span>

                {active === item.name && (
                  <span className="active-indicator" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-upgrade">
            <Zap size={24} />
            <h3>STAY STRONG</h3>
            <p>Push your limits. Reach your goals.</p>
          </div>

          <button
            className="sidebar-link"
            onClick={() => setActive("Settings")}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>

          <button
            className="sidebar-link logout-link"
            onClick={() => console.log("Logout clicked")}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>

          <div className="sidebar-profile">
            <div className="profile-avatar">K</div>
            <div className="profile-info">
              <strong>Admin User</strong>
              <span>Gym Administrator</span>
            </div>
            <span className="profile-status" />
          </div>
        </div>
      </aside>
    </>
  );
}
