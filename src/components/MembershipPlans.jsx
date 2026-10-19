import { useEffect, useRef, useState } from 'react'

function MembershipPlans() {
  const [billing, setBilling] = useState('monthly')
  const sectionRef = useRef(null)

  const plans = {
    monthly: [
      {
        name: 'Basic Membership',
        price: '2500',
        equipment: [
          'Basic cardio machines',
          'Treadmills & exercise bikes',
          'Basic strength machines',
          'Free weights',
          'Basic workout area'
        ]
      },
      {
        name: 'Premium Membership',
        price: '3500',
        equipment: [
          'All Basic equipment',
          'Advanced cardio machines',
          'Cable machines',
          'Smith machine',
          'Functional training equipment',
          'Premium workout zones'
        ]
      },
      {
        name: 'VIP Membership',
        price: '5000',
        equipment: [
          'All Premium equipment',
          'High-performance machines',
          'Olympic lifting equipment',
          'Premium strength machines',
          'Advanced functional equipment',
          'VIP training area'
        ]
      }
    ],

    yearly: [
      {
        name: 'Basic Membership',
        price: '21000',
        equipment: [
          'Basic cardio machines',
          'Treadmills & exercise bikes',
          'Basic strength machines',
          'Free weights',
          'Basic workout area'
        ]
      },
      {
        name: 'Premium Membership',
        price: '33000',
        equipment: [
          'All Basic equipment',
          'Advanced cardio machines',
          'Cable machines',
          'Smith machine',
          'Functional training equipment',
          'Premium workout zones'
        ]
      },
      {
        name: 'VIP Membership',
        price: '55000',
        equipment: [
          'All Premium equipment',
          'High-performance machines',
          'Olympic lifting equipment',
          'Premium strength machines',
          'Advanced functional equipment',
          'VIP training area'
        ]
      }
    ]
  }

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('membership-show')
          observer.unobserve(section)
        }
      },
      {
        threshold: 0.15
      }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="membership section"
      id="plans"
      ref={sectionRef}
    >
      <div className="section-heading membership-heading">
        <p className="eyebrow">MEMBERSHIP</p>

        <h2 className="membership-title">
          Discover Your <span>Fitness Membership</span>
        </h2>

        <p>
          Choose from flexible membership options designed
          to fit your lifestyle.
        </p>
      </div>

      <div className="billing-switch">
        <button
          className={billing === 'monthly' ? 'active' : ''}
          onClick={() => setBilling('monthly')}
        >
          Monthly Billing
        </button>

        <button
          className={billing === 'yearly' ? 'active' : ''}
          onClick={() => setBilling('yearly')}
        >
          Yearly Billing
        </button>
      </div>

      <div className="plans-grid">
        {plans[billing].map((plan, index) => {
          const isPopular = index === 1

          return (
            <div
              className={`plan-card ${isPopular ? 'popular' : ''}`}
              key={plan.name}
              style={{
                '--delay': `${index * 0.15}s`
              }}
            >
              {isPopular && (
                <span className="popular-badge">
                  Most Popular
                </span>
              )}

              <h3>{plan.name}</h3>

              <div className="plan-price">
                <span>PKR</span>

                <strong>{plan.price}</strong>

                <small>
                  / {billing === 'monthly' ? 'Month' : 'Year'}
                </small>
              </div>

              <button className="plan-button">
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
          )
        })}
      </div>
    </section>
  )
}

export default MembershipPlans