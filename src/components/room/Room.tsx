import {lazy, Suspense} from "react";
import {RoomType} from "../../utils/types";
import classnames from "classnames";
import "./room.scss";

interface RoomProps {
  room: RoomType;
  isSelected: boolean;
  isAvailable: boolean;
  discountedPrice: number;
  totalPrice: number;
  perNightPrice: number;
  onSelect: (room: RoomType) => void;
}

const Room: React.FC<RoomProps> = ({
  room,
  isSelected,
  isAvailable,
  discountedPrice,
  totalPrice,
  perNightPrice,
  onSelect,
}) => {
  const LazyImage = lazy(() => import("../lazyImage/LazyImage"));

  const totalPriceClass = classnames("price", {
    strike: discountedPrice !== 0,
  });

  const roomClasses = classnames("room", {
    "disabled-room": !isAvailable,
    "selected-room": isSelected,
  });

  const handleClick = () => {
    onSelect(room);
  };

  return (
    <div className={roomClasses} onClick={isAvailable ? handleClick : undefined}>
      <div className="details">
        <Suspense fallback={<div>Loading...</div>}>
          <LazyImage src={room.image} alt="room-image" />
        </Suspense>
        <p className="name">{room.name}</p>
        <p className="price">${perNightPrice}/night</p>
        <p className={totalPriceClass}>${totalPrice}</p>
        {discountedPrice !== 0 && <p className="price">discounted price - ${discountedPrice}</p>}
        {!isAvailable && <p style={{color: "red"}}>Not avialable</p>}
      </div>
      {isAvailable && (
        <div className="checkbox-container">
          <input type="checkbox" checked={isSelected} readOnly />
        </div>
      )}
    </div>
  );
};

export default Room;
