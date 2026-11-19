
import { useState } from "react";
import "./Membership.css";
import WorkoutAnimation from "./WorkoutAnimation";

function Membership() {
  const [billing, setBilling] = useState("monthly");
  const [currentIndex, setCurrentIndex] = useState(5);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // SAMPLE PRICES - Confirm actual membership fees before publishing.
  const monthlyPlans = [
    {
      name: "BASIC MEMBERSHIP",
      price: "PKR4000",
    },
    {
      name: "PREMIUM MEMBERSHIP",
      price: "PKR6000",
    },
    {
      name: "COUPLES MEMBERSHIP",
      price: "PKR7000",
    },
    {
      name: "FAMILY MEMBERSHIP",
      price: "PKR12000",
    },
    {
      name: "VIP MEMBERSHIP",
      price: "PKR10000",
    },
  ];

  const yearlyPlans = [
    {
      name: "BASIC MEMBERSHIP",
      price: "PKR40000",
    },
    {
      name: "PREMIUM MEMBERSHIP",
      price: "PKR60000",
    },
    {
      name: "COUPLES MEMBERSHIP",
      price: "PKR70000",
    },
    {
      name: "FAMILY MEMBERSHIP",
      price: "PKR120000",
    },
    {
      name: "VIP MEMBERSHIP",
      price: "PKR100000",
    },
  ];

  const plans =
    billing === "monthly"
      ? monthlyPlans
      : yearlyPlans;

  const features = [
    "ACCESS TO AVAILABLE GYM FACILITIES",
    "STRENGTH AND CARDIO TRAINING",
    "WORKOUT ROUTINE GUIDANCE",
    "MEMBERSHIP PROGRESS TRACKING",
    "MEMBER SUPPORT AND ASSISTANCE",
    "FLEXIBLE MEMBERSHIP OPTIONS",
  ];

  /*
    We make 3 copies for infinite carousel:

    COPY 1
    BASIC
    PREMIUM
    COUPLES
    FAMILY
    VIP

    COPY 2
    BASIC
    PREMIUM
    COUPLES
    FAMILY
    VIP

    COPY 3
    BASIC
    PREMIUM
    COUPLES
    FAMILY
    VIP
  */

  const loopPlans = [
    ...plans,
    ...plans,
    ...plans,
  ];

  /* =========================================
     NEXT SLIDE
  ========================================= */

  const nextSlide = () => {
    if (!transitionEnabled) return;

    setCurrentIndex((prev) => prev + 1);
  };

  /* =========================================
     PREVIOUS SLIDE
  ========================================= */

  const previousSlide = () => {
    if (!transitionEnabled) return;

    setCurrentIndex((prev) => prev - 1);
  };

  /* =========================================
     INFINITE LOOP
  ========================================= */

  const handleTransitionEnd = () => {
    if (currentIndex >= 10) {
      setTransitionEnabled(false);

      setCurrentIndex(5);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }

    if (currentIndex <= 4) {
      setTransitionEnabled(false);

      setCurrentIndex(9);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }
  };

  /* =========================================
     BILLING CHANGE
  ========================================= */

  const changeBilling = (type) => {
    setTransitionEnabled(false);

    setBilling(type);

    setCurrentIndex(5);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });
  };

  return (
    <div>
      <section className="membership-section">

        <div className="membership-container">

          {/* =====================================
              TOP CONTENT
          ===================================== */}

          <div className="membership-top">

            <div className="membership-header">
              <p className="membership-eyebrow">
                KINETIX MEMBERSHIPS
              </p>

              <h2 className="membership-title">
                CHOOSE YOUR PLAN
              </h2>

              <p className="membership-subtitle">
                Find a membership that matches your fitness
                goals, training routine, and lifestyle.
                Start building a stronger and healthier you
                with KINETIX.
              </p>
            </div>

            {/* =====================================
                CONTROLS
            ===================================== */}

            <div className="membership-controls">

              <div className="billing-buttons">

                <button
                  className={
                    billing === "monthly"
                      ? "active-billing"
                      : ""
                  }
                  onClick={() => changeBilling("monthly")}
                >
                  MONTHLY BILLING
                </button>

                <button
                  className={
                    billing === "yearly"
                      ? "active-billing"
                      : ""
                  }
                  onClick={() => changeBilling("yearly")}
                >
                  YEARLY BILLING
                </button>

              </div>

              {/* =====================================
                  ARROWS
              ===================================== */}

              <div className="carousel-arrows">

                <button
                  onClick={previousSlide}
                  aria-label="Previous membership"
                >
                  ←
                </button>

                <button
                  onClick={nextSlide}
                  aria-label="Next membership"
                >
                  →
                </button>

              </div>

            </div>

          </div>

          {/* =====================================
              CAROUSEL VIEWPORT
          ===================================== */}

          <div className="membership-viewport">

            <div
              className={`membership-track ${
                transitionEnabled
                  ? "carousel-transition"
                  : ""
              }`}
              style={{
                transform: `translateX(calc(-${currentIndex} * (40vw - 8px)))`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >

              {loopPlans.map((plan, index) => (

                <div
                  className="membership-card"
                  key={`${plan.name}-${index}`}
                >

                  {/* PLAN TITLE */}

                  <h3>
                    {plan.name}
                  </h3>

                  {/* PRICE */}

                  <div className="membership-price">

                    <strong>
                      {plan.price}
                    </strong>

                    <span>
                      / {billing === "monthly" ? "MONTH" : "YEAR"}
                    </span>

                  </div>

                  {/* SUBSCRIBE */}

                  <button className="subscribe-button">

                    <span>
                      SUBSCRIBE
                    </span>

                    <b>
                      →
                    </b>

                  </button>

                  {/* FEATURES */}

                  <div className="membership-features">

                    {features.map((feature, featureIndex) => (

                      <div
                        className="membership-feature"
                        key={featureIndex}
                      >

                        <span className="feature-check">
                          ✓
                        </span>

                        <span>
                          {feature}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      <WorkoutAnimation />
    </div>
  );
}

export default Membership;
