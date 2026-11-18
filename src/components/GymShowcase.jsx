
import "./GymShowcase.css";

function GymShowcase() {
  return (
    <div>
      <section className="gym-showcase">

        {/* ================= TOP SECTION ================= */}

        <div className="showcase-top">

          {/* LEFT SIDE */}

          <div className="showcase-heading">

            <p className="showcase-small">
              WELCOME TO KINETIX FITNESS CLUB
            </p>

            <h2>
              BUILD YOUR
              <br />
              <span>STRONGER</span> SELF.
            </h2>

            <p className="showcase-description">
              Train with purpose, stay consistent, and work
              towards your fitness goals with the right
              environment and guidance at KINETIX.
            </p>

          </div>

          {/* RIGHT SIDE - IMAGES */}

          <div className="gym-images">

            <div className="gym-image image-one">

              <div className="image-label">
                <span>01</span>
                TRAIN WITH PURPOSE
              </div>

            </div>

            <div className="gym-image image-two">

              <div className="image-label">
                <span>02</span>
                PROGRESS EVERY DAY
              </div>

            </div>

            {/* MOVING CIRCLE */}

            <div className="moving-circle">

              <span>SCROLL</span>

              <strong>↓</strong>

            </div>

          </div>

        </div>

      </section>

      {/* ================= WORKOUT ANIMATION ================= */}

    </div>
  );
}

export default GymShowcase;
