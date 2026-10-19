import { useEffect, useRef } from 'react'

function Facilities() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('in-view')
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

  const facilities = [
    {
      title: 'Workout Central',
      description:
        'A complete space equipped for strength, cardio and functional training.',
      image:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85'
    },
    {
      title: 'Fit Zone Highlights',
      description:
        'Dedicated zones designed to keep every workout challenging and effective.',
      image:
        'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85'
    },
    {
      title: 'Our Gym Gear',
      description:
        'Modern equipment selected to support beginners and experienced athletes.',
      image:
        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=85'
    },
    {
      title: 'Training Hub',
      description:
        'A focused environment where you can follow your training program.',
      image:
        'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=85'
    },
    {
      title: 'Professional Trainer',
      description:
        'Get personal guidance from experienced fitness professionals.',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=85'
    },
    {
      title: 'Night Shift',
      description:
        'Train on your schedule with flexible access throughout the day.',
      image:
        'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=85'
    },
    {
      title: 'Protein Shakes',
      description:
        'Refuel after training with nutritious post-workout drinks.',
      image:
        'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=85'
    }
  ]

  return (
    <section
      className="facilities section"
      id="facilities"
      ref={sectionRef}
    >
      <div className="section-heading facilities-heading">
        <p className="eyebrow">KINETIX FITNESS CLUB</p>

        <h2>OUR FACILITIES</h2>

        <p>
          Everything you need to train harder,
          recover better and stay motivated.
        </p>
      </div>

      <div className="facilities-showcase">
        {facilities.map((facility, index) => (
          <article
            className="facility-panel"
            key={facility.title}
            style={{
              '--facility-image': `url("${facility.image}")`,
              '--delay': `${index * 0.08}s`
            }}
          >
            <div className="facility-image" />

            <div className="facility-overlay" />

            {/* Outline-only vertical text */}
            <div className="facility-vertical-title">
              <span>{facility.title}</span>
            </div>

            {/* Content appears when hovering */}
            <div className="facility-content">
              <h3>{facility.title}</h3>

              <p>{facility.description}</p>

              {/* <a href="#plans">
                Explore
                <span>↗</span>
              </a> */}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Facilities