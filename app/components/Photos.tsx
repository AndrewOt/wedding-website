import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const handleDragStart = (e: React.DragEvent<HTMLImageElement>) =>
  e.preventDefault();

const items = [
  <img
    key="engagement1.jpg"
    src="engagement1.jpg"
    alt="Andrew proposes to Lydia!"
    className="engagement-picture"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    src="engagement_shoot1.jpg"
    key="engagement_shoot1.jpg"
    alt="Andrew and Lydia"
    className="engagement-picture"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    src="engagement2.jpg"
    key="engagement2.jpg"
    alt="Andrew and Lydia"
    className="engagement-picture"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    src="engagement_shoot2.jpg"
    key="engagement_shoot2.jpg"
    alt="Andrew and Lydia"
    className="engagement-picture"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    src="engagement4.jpg"
    key="engagement4.jpg"
    alt="Andrew and Lydia"
    className="engagement-picture"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    key="engagement_shoot3.jpg"
    src="engagement_shoot3.jpg"
    alt="Andrew and Lydia"
    className="engagement-picture"
    onDragStart={handleDragStart}
    role="presentation"
  />,
];

const responsive = { 0: { items: 1 } };

export const Photos = () => (
  <div>
    <h1>Photos</h1>
    <AliceCarousel
      mouseTracking
      touchTracking
      items={items}
      responsive={responsive}
    />
  </div>
);
