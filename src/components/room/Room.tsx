import {lazy, Suspense} from "react";
import {useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {calculateDiscountedPrice} from "../../utils/calculateDiscountedPrice";
import {calculateNumberOfNights} from "../../utils/calculateNumberOfNights";
import {calculateTotalPrice} from "../../utils/calculateTotalPrice";
import {RoomType} from "../../utils/types";
import "./room.scss";

interface RoomProps {
  room: RoomType;
  price: number;
  isSelected: boolean;
  isAvailable: boolean;
  onSelect: (room: RoomType) => void;
}

const Room: React.FC<RoomProps> = ({price, room, isSelected, isAvailable, onSelect}) => {
  const handleClick = () => {
    onSelect(room);
  };

  const LazyImage = lazy(() => import("../lazyImage/LazyImage"));

  const startDate = useAppSelector((state: RootState) => state.form.form.formData.startDate);
  const endDate = useAppSelector((state: RootState) => state.form.form.formData.endDate);
  let discountedPrice = 0;
  // @ts-ignore
  const numberOfNights = calculateNumberOfNights(startDate, endDate);
  const totalPrice = calculateTotalPrice(numberOfNights, price);

  if (numberOfNights >= 3) {
    discountedPrice = calculateDiscountedPrice(numberOfNights, price);
  }

  return (
    <div className="room" onClick={handleClick}>
      <div className="details">
        <Suspense fallback={<div>Loading...</div>}>
          <LazyImage src={room.image} alt="room-image" />
        </Suspense>
        <p className="name">{room.name}</p>
        <p className="price">${price}/night</p>
        <p className="price">{totalPrice}</p>
        {discountedPrice !== 0 && <p className="price">discounted price - {discountedPrice}</p>}
        {isAvailable ? <p style={{color: "green"}}>its available</p> : <p style={{color: "red"}}>not avialable</p>}
      </div>
      <div className="checkbox-container">
        <input type="checkbox" checked={isSelected} readOnly />
      </div>
    </div>
  );
};

export default Room;
