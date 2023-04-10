import './Hero.css';

export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-img">
        <span style={{ position: 'absolute', zIndex: 30, color:'white' }}>hi there</span>
      </div>
      <div className="hero-background" />
    </div>
  );
}
