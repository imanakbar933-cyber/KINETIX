import { useEffect, useRef, useState } from "react";
import "./ContactInfo.css";

function ContactInfo() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // 👇 Scroll pe fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`contact-help ${visible ? "is-visible" : ""}`}
    >
      <div className="contact-help-container">

        {/* =========================================
            LEFT SIDE — INFO
        ========================================= */}
        <div className="contact-help-left">

          <h2 className="contact-help-title">
            HOW CAN I HELP YOU?
          </h2>

          <p className="contact-help-desc">
            Distribute horizontal group background shadow italic.
            Figma pencil edit rectangle figma link slice horizontal
            text follower.
          </p>

          {/* Info Items */}
          <div className="contact-help-list">

            <div className="contact-help-item">
              <div className="contact-help-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div className="contact-help-text">
                <h4>OFFICE:</h4>
                <p>930 Hilgard Ave, Los Angeles, CA 90024,<br />United States.</p>
              </div>
            </div>

            <div className="contact-help-item">
              <div className="contact-help-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
                </svg>
              </div>
              <div className="contact-help-text">
                <h4>CONTACT</h4>
                <p>+111 345 543 000</p>
              </div>
            </div>

            <div className="contact-help-item">
              <div className="contact-help-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </div>
              <div className="contact-help-text">
                <h4>EMAIL:</h4>
                <p>hello@yourdomain.com</p>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================
            RIGHT SIDE — FORM
        ========================================= */}
        <div className="contact-help-right">

          <h3 className="contact-form-title">GET IN TOUCH</h3>

          <p className="contact-form-desc">
            List team variant line style shadow bullet prototype
            image connection follower.
          </p>

          <form className="contact-help-form">

            {/* Row 1 */}
            <div className="contact-form-row">
              <div className="contact-form-group">
                <label>First Name</label>
                <input type="text" placeholder="First Name" />
              </div>
              <div className="contact-form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Last Name" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="contact-form-row">
              <div className="contact-form-group">
                <label>Email Address</label>
                <input type="email" placeholder="email" />
              </div>
              <div className="contact-form-group">
                <label>Company Name</label>
                <input type="text" placeholder="Company Name" />
              </div>
            </div>

            {/* Message */}
            <div className="contact-form-group">
              <label>Message</label>
              <textarea rows="6" placeholder="Message"></textarea>
            </div>

            <button type="submit" className="contact-form-btn">
              Send Message
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}

export default ContactInfo;