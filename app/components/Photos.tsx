import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css'

const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => e.preventDefault();

const items = [
  <img src="engagement1.jpg" onDragStart={handleDragStart} role="presentation" />,
  <img src="engagement2.jpg" onDragStart={handleDragStart} role="presentation" />,
  <img src="engagement3.jpg" onDragStart={handleDragStart} role="presentation" />,
];

export const Photos = () => (
  <div>
    <h1>Photos!</h1>
    <AliceCarousel
      mouseTracking
      touchTracking
      items={items}
    />
  </div>
);
