import React, { useEffect, useRef } from "react";
import "./InfoCards.css";

function InfoCards() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view"); // Har baar animate hone ke liye
          }
        });
      },
      { threshold: 0.1 } // Jab 15% section view mein aaye
    );

    const elements = sectionRef.current.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const cardsData = [
    {
      number: "01",
      title: "EMPOWERING\nHEALTHIER LIVES",
      image: "/images/card2.jpg",
      desc: "At KINETIX, we are dedicated to empowering individuals to lead healthier lives. We provide the tools, support, and guidance needed to achieve fitness goals, improve overall well-being, and foster a sustainable commitment to health.",
    },
    {
      number: "02",
      title: "BUILDING A SUPPORTIVE\nCOMMUNITY",
      image: "/images/card3.jpg",
      desc: "At KINETIX, we are dedicated to building a supportive community where every member feels valued. We provide the tools, support, and guidance needed to achieve fitness goals, improve overall well-being, and foster a sustainable commitment to health.",
    },
  ];

  return (
    <section className="info-cards" ref={sectionRef}>
      <div className="info-cards-grid">
        {cardsData.map((card, i) => (
          <div
            className="info-card reveal"
            key={i}
            style={{ transitionDelay: `${i * 0.25}s` }} // Card 2 thoda late aaye
          >
            <div className="info-card-image">
              <img src={card.image} alt={card.title} />

              {/* Hover effects */}
              <div className="glitch-layer"></div>
              <div className="scan-line"></div>
              <div className="cursor-glow"></div>
              <div className="ripple-ring"></div>
              <div className="info-card-overlay"></div>

              {/* Content */}
              <div className="info-card-content">
                <span className="info-card-number">{card.number}</span>

                <h3 className="info-card-title">
                  {card.title.split("\n").map((line, idx) => (
                    <span key={idx} className="line">
                      {line}
                    </span>
                  ))}
                </h3>
              </div>
            </div>

            <p className="info-card-desc">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InfoCards;