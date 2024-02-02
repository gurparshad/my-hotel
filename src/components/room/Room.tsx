import {lazy, Suspense} from "react";
import {RoomType} from "../../utils/types";
import "./room.scss";

interface RoomProps {
  room: RoomType;
  price: number;
  isSelected: boolean;
  onSelect: (room: RoomType) => void;
}

const Room: React.FC<RoomProps> = ({price, room, isSelected, onSelect}) => {
  const handleClick = () => {
    onSelect(room);
  };

  const LazyImage = lazy(() => import("../lazyImage/LazyImage"));

  return (
    <div className="room" onClick={handleClick}>
      <div className="details">
        <Suspense fallback={<div>Loading...</div>}>
          <LazyImage src={room.image} alt="room-image" />
        </Suspense>
        <p className="name">{room.name}</p>
        <p className="price">{price}</p>
      </div>
      <div className="checkbox-container">
        <input type="checkbox" checked={isSelected} readOnly />
      </div>
    </div>
  );
};

export default Room;
