import React from 'react';
import './Footer1.css';

const Footer1 = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* --- Column 1: Brand & Contact --- */}
        <div className="footer-col brand-col">
          <div className="brand-logo">
            {/* Square 'K' Logo */}
            <div className="logo-square">
              <span className="logo-letter">K</span>
            </div>
            <h2 className="brand-name">KINETIX</h2>
          </div>
          <p className="brand-sub">FITNESS CLUB</p>

          <ul className="contact-info">
            <li>
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>PEOPLE CAlONY,GUJRANWALA<br />Z BLOCK</span>
            </li>
            <li>
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>ALI@Gmail.Com</span>
            </li>
            <li>
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>03067895432</span>
            </li>
          </ul>
        </div>

        {/* --- Column 2: Quick Links (Blog Removed) --- */}
        <div className="footer-col">
          <h3 className="col-title">QUICK LINKS</h3>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">License</a></li>
          </ul>
        </div>

        {/* --- Column 3: Opening Hours --- */}
        <div className="footer-col">
          <h3 className="col-title">OPENING HOURS</h3>
          <div className="hours-block">
            <h4 className="day-title">MONDAY TO FRIDAY</h4>
            <p className="time-text">10:00 AM To 12:00 PM</p>
          </div>
          <div className="hours-block">
            <h4 className="day-title">SATURDAY</h4>
            <p className="time-text">12:00 PM To 6:00 PM</p>
          </div>
        </div>

        {/* --- Column 4: Newsletter --- */}
        <div className="footer-col newsletter-col">
          <h3 className="col-title">NEWSLETTER</h3>
          <p className="newsletter-text">
            Stay In the Loop: Unlock Exclusive Offers, Culinary Insights, and More.
          </p>
          
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="example@gmail.com" />
            <button type="submit" className="newsletter-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>

          {/* Social Icons */}
          <div className="social-icons">
            <a href="#" className="social-box"></a>
            <a href="#" className="social-box"></a>
            <a href="#" className="social-box"></a>
            <a href="#" className="social-box"></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer1;