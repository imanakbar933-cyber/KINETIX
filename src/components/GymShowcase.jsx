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
              MORE THAN A GYM
            </p>

            <h2>
              BUILD YOUR
              <br />
              <span>STRONGER</span> SELF.
            </h2>

            <p className="showcase-description">
              Everything you need to train harder,
              track your progress and become the
              strongest version of yourself.
            </p>

          </div>


          {/* RIGHT SIDE - IMAGES */}

          <div className="gym-images">

            <div className="gym-image image-one">

              <div className="image-label">
                <span>01</span>
                TRAIN HARD
              </div>

            </div>


            <div className="gym-image image-two">

              <div className="image-label">
                <span>02</span>
                STAY STRONG
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