
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
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const cardsData = [
    {
      number: "01",
      title: "YOUR FITNESS\nYOUR JOURNEY",
      image: "/images/card2.jpg",
      desc: "Every fitness journey is different. At KINETIX, our focus is to help members build healthy habits, improve their strength, and work towards personal fitness goals through consistent training and proper guidance.",
    },
    {
      number: "02",
      title: "STRONGER\nTOGETHER",
      image: "/images/card3.jpg",
      desc: "Fitness becomes more enjoyable when you are part of a supportive environment. KINETIX brings people together through shared motivation, training experiences, and a commitment to becoming stronger and healthier every day.",
    },
  ];

  return (
    <section className="info-cards" ref={sectionRef}>
      <div className="info-cards-grid">
        {cardsData.map((card, i) => (
          <div
            className="info-card reveal"
            key={i}
            style={{ transitionDelay: `${i * 0.25}s` }}
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
