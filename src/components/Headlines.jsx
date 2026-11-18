
import "./Headlines.css";

const HeadlinesItems = () => (
  <>
    <span className="white-text">WELCOME TO KINETIX</span>

    <img
      src="/images/dumbbell.jpg"
      alt="Dumbbell"
      className="dumbbell-icon"
    />

    <span className="green-text">TRAIN WITH PURPOSE</span>

    <img
      src="/images/dumbbell.jpg"
      alt="Dumbbell"
      className="dumbbell-icon"
    />

    <span className="white-text">STRENGTH & CONDITIONING</span>

    <img
      src="/images/dumbbell.jpg"
      alt="Dumbbell"
      className="dumbbell-icon"
    />

    <span className="green-text">YOUR FITNESS JOURNEY</span>

    <img
      src="/images/dumbbell.jpg"
      alt="Dumbbell"
      className="dumbbell-icon"
    />

    <span className="white-text">MOVE BETTER, FEEL STRONGER</span>

    <img
      src="/images/dumbbell.jpg"
      alt="Dumbbell"
      className="dumbbell-icon"
    />

    <span className="green-text">PROGRESS STARTS HERE</span>

    <img
      src="/images/dumbbell.jpg"
      alt="Dumbbell"
      className="dumbbell-icon"
    />
  </>
);

function Headlines() {
  return (
    <section className="headlines-section">

      <div className="headlines-row row-one">
        <div className="headlines-track">
          <HeadlinesItems />
          <HeadlinesItems />
        </div>
      </div>

      <div className="headlines-row row-two">
        <div className="headlines-track">
          <HeadlinesItems />
          <HeadlinesItems />
        </div>
      </div>

    </section>
  );
}

export default Headlines;
