
import { useEffect, useRef, useState } from "react";
import "./MembershipPlans.css";

function MembershipPlans() {
  const [billing, setBilling] = useState("monthly");
  const sectionRef = useRef(null);

  const plans = {
    monthly: [
      {
        name: "Basic Membership",
        price: "2500",
        equipment: [
          "Access to available cardio machines",
          "Treadmills and exercise bikes",
          "Basic strength training machines",
          "Free weights and dumbbells",
          "General workout area",
        ],
      },
      {
        name: "Premium Membership",
        price: "3500",
        equipment: [
          "All Basic membership facilities",
          "Access to available cable machines",
          "Smith machine and strength equipment",
          "Functional training area",
          "Expanded workout options",
          "Workout routine guidance",
        ],
      },
      {
        name: "VIP Membership",
        price: "5000",
        equipment: [
          "All Premium membership facilities",
          "Access to available advanced machines",
          "Olympic lifting equipment",
          "Advanced strength training options",
          "Functional training equipment",
          "Priority member assistance",
        ],
      },
    ],

    yearly: [
      {
        name: "Basic Membership",
        price: "25000",
        equipment: [
          "Access to available cardio machines",
          "Treadmills and exercise bikes",
          "Basic strength training machines",
          "Free weights and dumbbells",
          "General workout area",
        ],
      },
      {
        name: "Premium Membership",
        price: "35000",
        equipment: [
          "All Basic membership facilities",
          "Access to available cable machines",
          "Smith machine and strength equipment",
          "Functional training area",
          "Expanded workout options",
          "Workout routine guidance",
        ],
      },
      {
        name: "VIP Membership",
        price: "50000",
        equipment: [
          "All Premium membership facilities",
          "Access to available advanced machines",
          "Olympic lifting equipment",
          "Advanced strength training options",
          "Functional training equipment",
          "Priority member assistance",
        ],
      },
    ],
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("in-view");
        } else {
          section.classList.remove("in-view");
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="membership-wrapper" id="plans" ref={sectionRef}>
      <div className="membership-container">

        {/* HEADER */}
        <div className="membership-header">
          <p className="membership-eyebrow">KINETIX MEMBERSHIPS</p>

          <h2 className="membership-title">
            CHOOSE YOUR <span>FITNESS PLAN</span>
          </h2>

          <p className="membership-subtitle">
            Find a membership that matches your fitness goals, training
            routine, and lifestyle at KINETIX Fitness Club.
          </p>
        </div>

        {/* BILLING SWITCH */}
        <div className="membership-billing-switch">
          <button
            className={billing === "monthly" ? "active" : ""}
            onClick={() => setBilling("monthly")}
          >
            Monthly Billing
          </button>

          <button
            className={billing === "yearly" ? "active" : ""}
            onClick={() => setBilling("yearly")}
          >
            Yearly Billing
          </button>
        </div>

        {/* PLANS GRID */}
        <div className="membership-plans-grid">
          {plans[billing].map((plan, index) => {
            const isPopular = index === 1;

            return (
              <div
                className={`membership-plan-card ${
                  isPopular ? "popular" : ""
                }`}
                key={plan.name}
                style={{ "--delay": `${index * 0.15}s` }}
              >
                {isPopular && (
                  <span className="membership-popular-badge">
                    Most Popular
                  </span>
                )}

                <h3>{plan.name}</h3>

                <div className="membership-plan-price">
                  <span>PKR</span>
                  <strong>{plan.price}</strong>
                  <small>
                    / {billing === "monthly" ? "Month" : "Year"}
                  </small>
                </div>

                <button className="membership-plan-button">
                  Subscribe <span>→</span>
                </button>

                <ul>
                  {plan.equipment.map((item) => (
                    <li key={item}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default MembershipPlans;
