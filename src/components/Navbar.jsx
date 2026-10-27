import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Sidebar & Theme
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const navigate = useNavigate();

  // Theme Change Effect
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // ==========================================
  // NAYA TAREEQA: Image Transition State
  // ==========================================
  const [showTransition, setShowTransition] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Jab Home par click ho
  const handleHomeClick = () => {
    // 1. Transition screen show karein
    setShowTransition(true);
    setIsRevealed(false); // Image ke upar black overlay rakhein

    // 2. Thodi der baad overlay hata kar image reveal karein
    setTimeout(() => {
      setIsRevealed(true);
    }, 100);

    // 3. Total 2 second baad transition khatam karein
    setTimeout(() => {
      setShowTransition(false);
    }, 2000);
  };

  return (
    <>
      {/* =========================================
          NEW IMAGE TRANSITION SCREEN
      ========================================= */}
      {showTransition && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999999,
            backgroundColor: '#000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Aapki Image */}
          <img 
            src="/images/kinetix.svg" 
            alt="Kinetix Transition" 
            style={{
              width: '100vw',
              height: '50vh',
              objectFit: 'cover',
              display: 'block',
              // Image halki si zoom in hoke aayegi
              transform: isRevealed ? 'scale(1)' : 'scale(1.1)',
              opacity: isRevealed ? 1 : 0,
              transition: 'transform 1.5s ease-out, opacity 1s ease-out'
            }} 
            onLoad={() => console.log("✅ Image Loaded!")}
            onError={() => console.log("❌ Image Not Found! Path check karein.")}
          />
          
          {/* Image ke upar ka black fade overlay (taake image smooth gaib ho) */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#000',
              opacity: isRevealed ? 0 : 1,
              transition: 'opacity 1s ease-in-out',
              pointerEvents: 'none'
            }}
          ></div>
        </div>
      )}

      {/* 👇 SIDEBAR (Dashboard waghera) */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>DASHBOARD</h3>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>
        <ul className="sidebar-links">
          <li><Link to="/dashboard" onClick={() => setSidebarOpen(false)}>My Profile</Link></li>
          <li><Link to="/dashboard" onClick={() => setSidebarOpen(false)}>Workout Plans</Link></li>
          <li><Link to="/dashboard" onClick={() => setSidebarOpen(false)}>Diet Plans</Link></li>
          <li><Link to="/dashboard" onClick={() => setSidebarOpen(false)}>Settings</Link></li>
        </ul>
      </div>

      {/* Overlay jab sidebar open ho */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">

          {/* 👇 LEFT SIDE: Hamburger + Logo */}
          <div className="navbar-left">
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
              <span></span><span></span><span></span>
            </button>

            <Link to="/" className="navbar-logo" onClick={handleHomeClick}>
              <img src="/images/kinetix.svg" alt="Kinetix Fitness Club" className="kinetix-logo-image" />
            </Link>
          </div>

          {/* NAVIGATION */}
          <nav className={`navbar-menu ${menuOpen ? "menu-open" : ""}`}>
            <Link to="/" className="nav-link" onClick={handleHomeClick}>Home</Link>
            <Link to="/about" className="nav-link">About</Link>

            <div className="nav-item-dropdown">
              <button className="nav-link dropdown-toggle" onClick={toggleDropdown}>
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

            <a href="#membership" className="mobile-join" style={{ color: '#050706', textDecoration: 'none' }}>
              Register
            </a>
          </nav>

          {/* RIGHT SIDE */}
          <div className="navbar-right">
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
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