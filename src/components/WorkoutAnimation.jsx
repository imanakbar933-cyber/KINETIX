import { useEffect, useRef } from "react";
import "./WorkoutAnimation.css";

function WorkoutAnimation() {

  const animationRef = useRef(null);

  useEffect(() => {

    const section = animationRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            // Animation reset
            section.classList.remove("play-animation");

            // Browser ko reset process complete karne ka time
            void section.offsetWidth;

            // Animation dobara start
            section.classList.add("play-animation");

          } else {

            // Section screen se bahar ho to class remove
            section.classList.remove("play-animation");

          }

        });

      },
      {
        threshold: 0.35
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };

  }, []);


  return (

    <section
      ref={animationRef}
      className="workout-animation"
    >

      {/* =================================================
          BACKGROUND TEXT
      ================================================= */}

      <div className="workout-bg-text">
        KINETIX
      </div>


      {/* =================================================
          FALLING DUMBBELLS
      ================================================= */}

      <div className="falling-dumbbells">

        <span className="falling-dumbbell dumbbell-1">
          🏋️
        </span>

        <span className="falling-dumbbell dumbbell-2">
          🏋️
        </span>

        <span className="falling-dumbbell dumbbell-3">
          🏋️
        </span>

        <span className="falling-dumbbell dumbbell-4">
          🏋️
        </span>

        <span className="falling-dumbbell dumbbell-5">
          🏋️
        </span>

        <span className="falling-dumbbell dumbbell-6">
          🏋️
        </span>

        <span className="falling-dumbbell dumbbell-7">
          🏋️
        </span>

        <span className="falling-dumbbell dumbbell-8">
          🏋️
        </span>

      </div>


      {/* =================================================
          CARTOON FITNESS CHARACTER
      ================================================= */}

      <div className="fitness-character">

        <div className="character-head">

          <div className="eye eye-left"></div>

          <div className="eye eye-right"></div>

          <div className="character-mouth"></div>

        </div>


        <div className="character-body"></div>


        <div className="character-arm arm-left">

          <div className="character-hand"></div>

        </div>


        <div className="character-arm arm-right">

          <div className="character-hand"></div>

        </div>


        <div className="character-leg leg-left"></div>

        <div className="character-leg leg-right"></div>


        <div className="character-dumbbell dumbbell-left"></div>

        <div className="character-dumbbell dumbbell-right"></div>

      </div>


      {/* =================================================
          GROUND
      ================================================= */}

      <div className="workout-ground"></div>


      {/* =================================================
          CAPTION
      ================================================= */}

      <div className="workout-caption">

        <span>
          TRAIN HARD
        </span>

        <h3>
          BUILD YOUR
          <br />
          <strong>POWER.</strong>
        </h3>

      </div>

    </section>

  );

}

export default WorkoutAnimation;