import "./Headlines.css";

const HeadlinesItems = () => (
  <>
    <span className="white-text">FITNESS ESSENTIALS</span>

    <img
      src="/images/dumbbell.jpg"
      alt="Dumbbell"
      className="dumbbell-icon"
    />

    <span className="green-text">WORKOUT CENTRAL</span>

    <img
      src="/images/dumbbell.jpg"
      alt="Dumbbell"
      className="dumbbell-icon"
    />

    <span className="white-text">FIT ZONE HIGHLIGHTS</span>

    <img
      src="/images/dumbbell.jpg"
      alt="Dumbbell"
      className="dumbbell-icon"
    />

    <span className="green-text">TRAINING HUB</span>

    <img
      src="/images/dumbbell.jpg"
      alt="Dumbbell"
      className="dumbbell-icon"
    />

    <span className="white-text">FITNESS HEADQUARTERS</span>

    <img
      src="/images/dumbbell.jpg"
      alt="Dumbbell"
      className="dumbbell-icon"
    />

    <span className="green-text">GEAR UP</span>

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