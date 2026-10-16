// src/components/NewsletterSection.jsx
import React from 'react';

const NewsletterSection = () => {
  // Prevent page reload on form submit (since we don't have a backend)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <h2>STAY FIT AND INFORMED</h2>
        <p>
          Feel free to place this title above the subscription form to encourage visitors to subscribe to your newsletter.
        </p>
        
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="hello@yourdomain.com" 
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
          alt="People working out in a gym" 
        />
      </div>
    </section>
  );
};

export default NewsletterSection;