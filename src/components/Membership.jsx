import { useState } from "react";
import "./Membership.css";
import WorkoutAnimation from "./WorkoutAnimation";
function Membership() {
  const [billing, setBilling] = useState("monthly");
  const [currentIndex, setCurrentIndex] = useState(5);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const monthlyPlans = [
    {
      name: "BASIC MEMBERSHIP",
      price: "PKR4500",
    },
    {
      name: "PREMIUM MEMBERSHIP",
      price: "PKR8500",
    },
    {
      name: "COUPLES MEMBERSHIP",
      price: "PKR11000",
    },
    {
      name: "FAMILY MEMBERSHIP",
      price: "PKR22000",
    },
    {
      name: "VIP MEMBERSHIP",
      price: "PKR28000",
    },
  ];

  const yearlyPlans = [
    {
      name: "BASIC MEMBERSHIP",
      price: "PKR4500",
    },
    {
      name: "PREMIUM MEMBERSHIP",
      price: "PKR8500",
    },
    {
      name: "COUPLES MEMBERSHIP",
      price: "PKR11000",
    },
    {
      name: "FAMILY MEMBERSHIP",
      price: "PKR22000",
    },
    {
      name: "VIP MEMBERSHIP",
      price: "PKR28000",
    },
  ];

  const plans =
    billing === "monthly"
      ? monthlyPlans
      : yearlyPlans;

  const features = [
    "FULL ACCESS TO CARDIO",
    "ACCESS TO GROUP FITNESS CLASSES",
    "USE OF LOCKER ROOMS AND SHOWERS",
    "COMPLIMENTARY TOWEL SERVICE",
    "VIRTUAL WORKOUT ACCESS INCLUDED",
    "NO SIGN-UP FEES",
  ];

  /*
    We make 3 copies:

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
    /*
      Forward:

      5 = BASIC
      6 = PREMIUM
      7 = COUPLES
      8 = FAMILY
      9 = VIP
      10 = BASIC CLONE

      When 10 is reached,
      silently go back to 5.
    */

    if (currentIndex >= 10) {
      setTransitionEnabled(false);

      setCurrentIndex(5);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }

    /*
      Backward:

      5 = BASIC
      4 = VIP CLONE

      When 4 is reached,
      silently go to 9.
    */

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

          <div className="membership-intro">

            <h1>
              DISCOVER YOUR
              <br />
              FITNESS MEMBERSHIP
            </h1>

            <p>
              Choose from a variety of membership options designed to fit
              your lifestyle, whether you prefer a month-to-month plan or
              a yearly commitment. We offer flexible packages for
              individuals, couples, and families.
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