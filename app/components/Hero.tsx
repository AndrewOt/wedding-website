export const Hero = () => {
  const ONE_DAY = 24 * 60 * 60 * 1000;

  const currentDate = new Date();
  const weddingDate = new Date(2023, 7, 26);
  const diff = Math.round((weddingDate.getTime() - currentDate.getTime()) / ONE_DAY);

  let daysToGoText = '';

  if (diff > 0) {
    daysToGoText = `(${diff} days to go!!)`;
  }

  return (
    <div className="hero-image">
      <div className="hero-image-text-container">
        <span className="headline-text">Andrew Ottaviano and Lydia Helt</span>
        <span className="sub-text">August 26th @ 1:30 pm {daysToGoText} - Topeka KS</span>
      </div>
      <div>
        <svg
          fill="#fff"
          version="1.1"
          viewBox="0 0 330 330"
          className="hero-arrow"
          onClick={() => { window.scroll({ top: window.innerHeight - 50, left: 0, behavior: 'smooth' }); }}
        >
          <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
        </svg>
      </div>
    </div>
  );
};
