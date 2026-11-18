
import React from "react";

const NewsletterSection = () => {

  // Prevent page reload (backend integration not connected yet)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your interest in KINETIX! Newsletter subscription will be available soon.");
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-content">

        <h2>STAY FIT AND INFORMED</h2>

        <p>
          Be part of the KINETIX fitness community! Get workout
          inspiration, practical fitness tips, healthy lifestyle
          updates, and the latest news from our fitness club.
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            required
            aria-label="Email Address"
          />

          <button type="submit" aria-label="Subscribe">

            {/* Green Paper Plane / Arrow SVG */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2L11 13"
                stroke="#00FF00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="#00FF00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

          </button>
        </form>
      </div>

      <div className="newsletter-image">
        <img
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop"
          alt="People training at a fitness club"
        />
      </div>
    </section>
  );
};

export default NewsletterSection;
