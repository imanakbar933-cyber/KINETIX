import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, ShoppingCart, Box, DollarSign, FileText, 
  Tag, UserPlus, Users, Star, RefreshCw, LogIn, Ticket, 
  Calendar, MessageSquare, Activity, Users2, CalendarCheck, 
  Zap, Apple, Ruler, Package, Truck, Wrench, PieChart, 
  CreditCard, TrendingUp, UserCog, Lock, Building2, Settings, ChevronDown
} from 'lucide-react';
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [showTransition, setShowTransition] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

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

  // Page Load Transition
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowTransition(true);
      setTimeout(() => setShowTransition(false), 2000);
    }, 500);
    return () => clearTimeout(initialTimer);
  }, []);

  const handleHomeClick = () => {
    setShowTransition(true);
    setTimeout(() => setShowTransition(false), 2000);
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* =========================================
          3D WRAP TRANSITION ANIMATION
      ========================================= */}
      {showTransition && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            zIndex: 9999999, backgroundColor: '#050706', display: 'flex',
            justifyContent: 'center', alignItems: 'center', overflow: 'hidden', perspective: '1000px'
          }}
        >
          <img 
            src="/images/kinetix2.png" 
            alt="Kinetix Transition" 
            style={{
              width: '100vw', height: 'auto', objectFit: 'contain', display: 'block',
              animation: 'wrapReveal 2s cubic-bezier(0.22, 1, 0.36, 1) forwards'
            }} 
          />
        </div>
      )}

      {/* =========================================
          PROFESSIONAL DASHBOARD SIDEBAR
      ========================================= */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        
        {/* Sidebar Header with Logo */}
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" onClick={closeSidebar}>
            <img src="/images/kinetix.svg" alt="Kinetix" />
          </Link>
          <button className="close-btn" onClick={closeSidebar}>✕</button>
        </div>

        {/* Sidebar Menu Items */}
        <div className="sidebar-menu">
          
          <div className="sidebar-section">
            <span className="sidebar-section-title">OVERVIEW</span>
            <Link to="/dashboard" className="sidebar-item active" onClick={closeSidebar}>
              <LayoutGrid size={18} /> Dashboard
            </Link>
            <Link to="/pos" className="sidebar-item" onClick={closeSidebar}>
              <ShoppingCart size={18} /> Point of Sale <span className="sidebar-tag">POS</span>
            </Link>
          </div>

          <div className="sidebar-section">
            <span className="sidebar-section-title">APPLICATIONS</span>
            <Link to="/apps" className="sidebar-item" onClick={closeSidebar}>
              <Box size={18} /> Applications <ChevronDown size={14} className="arrow-icon" />
            </Link>
          </div>

          <div className="sidebar-section">
            <span className="sidebar-section-title">SALES</span>
            <Link to="/orders" className="sidebar-item" onClick={closeSidebar}>
              <DollarSign size={18} /> Orders
            </Link>
            <Link to="/payments" className="sidebar-item" onClick={closeSidebar}>
              <CreditCard size={18} /> Payments
            </Link>
            <Link to="/invoices" className="sidebar-item" onClick={closeSidebar}>
              <FileText size={18} /> Invoices
            </Link>
            <Link to="/offers" className="sidebar-item" onClick={closeSidebar}>
              <Tag size={18} /> Offers & Coupons
            </Link>
          </div>

          <div className="sidebar-section">
            <span className="sidebar-section-title">MEMBERS</span>
            <Link to="/leads" className="sidebar-item" onClick={closeSidebar}>
              <UserPlus size={18} /> Leads & Enquiries
            </Link>
            <Link to="/members" className="sidebar-item" onClick={closeSidebar}>
              <Users size={18} /> Members
            </Link>
            <Link to="/plans" className="sidebar-item" onClick={closeSidebar}>
              <Star size={18} /> Membership Plans
            </Link>
            <Link to="/renewals" className="sidebar-item" onClick={closeSidebar}>
              <RefreshCw size={18} /> Renewals
            </Link>
            <Link to="/checkin" className="sidebar-item" onClick={closeSidebar}>
              <LogIn size={18} /> Check-In
            </Link>
            <Link to="/passes" className="sidebar-item" onClick={closeSidebar}>
              <Ticket size={18} /> Day Passes
            </Link>
            <Link to="/attendance" className="sidebar-item" onClick={closeSidebar}>
              <CalendarCheck size={18} /> Attendance
            </Link>
            <Link to="/feedback" className="sidebar-item" onClick={closeSidebar}>
              <MessageSquare size={18} /> Feedback
            </Link>
          </div>

          <div className="sidebar-section">
            <span className="sidebar-section-title">FITNESS</span>
            <Link to="/classes" className="sidebar-item" onClick={closeSidebar}>
              <Activity size={18} /> Class Schedule
            </Link>
            <Link to="/trainers" className="sidebar-item" onClick={closeSidebar}>
              <Users2 size={18} /> Trainers
            </Link>
            <Link to="/pt-sessions" className="sidebar-item" onClick={closeSidebar}>
              <Calendar size={18} /> PT Sessions
            </Link>
            <Link to="/workouts" className="sidebar-item" onClick={closeSidebar}>
              <Zap size={18} /> Workout Plans
            </Link>
            <Link to="/diet" className="sidebar-item" onClick={closeSidebar}>
              <Apple size={18} /> Diet Plans
            </Link>
            <Link to="/measurements" className="sidebar-item" onClick={closeSidebar}>
              <Ruler size={18} /> Body Measurements
            </Link>
          </div>

          <div className="sidebar-section">
            <span className="sidebar-section-title">INVENTORY</span>
            <Link to="/products" className="sidebar-item" onClick={closeSidebar}>
              <Package size={18} /> Products
            </Link>
            <Link to="/inventory" className="sidebar-item" onClick={closeSidebar}>
              <Box size={18} /> Inventory
            </Link>
            <Link to="/suppliers" className="sidebar-item" onClick={closeSidebar}>
              <Truck size={18} /> Suppliers
            </Link>
            <Link to="/equipment" className="sidebar-item" onClick={closeSidebar}>
              <Wrench size={18} /> Equipment
            </Link>
          </div>

          <div className="sidebar-section">
            <span className="sidebar-section-title">FINANCE</span>
            <Link to="/expenses" className="sidebar-item" onClick={closeSidebar}>
              <TrendingUp size={18} /> Expenses
            </Link>
            <Link to="/payroll" className="sidebar-item" onClick={closeSidebar}>
              <CreditCard size={18} /> Payroll
            </Link>
            <Link to="/reports" className="sidebar-item" onClick={closeSidebar}>
              <FileText size={18} /> Reports
            </Link>
            <Link to="/analytics" className="sidebar-item" onClick={closeSidebar}>
              <PieChart size={18} /> Analytics
            </Link>
          </div>

          <div className="sidebar-section">
            <span className="sidebar-section-title">FACILITY</span>
            <Link to="/staff" className="sidebar-item" onClick={closeSidebar}>
              <UserCog size={18} /> Staff & Roster
            </Link>
            <Link to="/access" className="sidebar-item" onClick={closeSidebar}>
              <Lock size={18} /> Access Control
            </Link>
            <Link to="/branches" className="sidebar-item" onClick={closeSidebar}>
              <Building2 size={18} /> Branches
            </Link>
            <Link to="/settings" className="sidebar-item" onClick={closeSidebar}>
              <Settings size={18} /> Settings
            </Link>
          </div>

        </div>

        {/* Sidebar Footer (User Profile) */}
        <div className="sidebar-footer">
          <img src="/images/user.jpg" alt="Nathan Reeves" className="user-avatar" />
          <div className="user-info">
            <h4>Nathan Reeves</h4>
            <p>Super Admin</p>
          </div>
        </div>
      </div>

      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* =========================================
          MAIN NAVBAR
      ========================================= */}
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          <div className="navbar-left">
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
              <span></span><span></span><span></span>
            </button>
            <Link to="/" className="navbar-logo" onClick={handleHomeClick}>
              <img src="/images/kinetix.svg" alt="Kinetix" className="kinetix-logo-image" />
            </Link>
          </div>

          <nav className={`navbar-menu ${menuOpen ? "menu-open" : ""}`}>
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
            <a href="#membership" className="nav-link">Membership</a>
            <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>

          <div className="navbar-right">
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
            <Link to="/login" className="login-nav-button">Login</Link>
            <a href="#membership" className="register-button">
              <span>Register</span>
              <span className="join-arrow">↗</span>
            </a>
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