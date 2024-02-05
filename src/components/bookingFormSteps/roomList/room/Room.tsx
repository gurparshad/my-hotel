import {lazy, Suspense} from "react";
import {RoomType} from "../../../../utils/types";
import classnames from "classnames";
import styles from "./room.module.scss";

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
  const LazyImage = lazy(() => import("../../../lazyImage/LazyImage"));

  const totalPriceClass = classnames(styles.price, {
    [styles.strike]: discountedPrice !== 0,
  });

  const roomClasses = classnames(styles.room, {
    [styles.disabledRoom]: !isAvailable,
    [styles.selectedRoom]: isSelected,
  });

  const handleClick = () => {
    onSelect(room);
  };

  return (
    <div className={roomClasses} onClick={isAvailable ? handleClick : undefined}>
      <div className={styles.details}>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyImage src={room.image} alt="room-image" />
        </Suspense>
        <p className={styles.name}>{room.name}</p>
        <p className={styles.price}>${perNightPrice}/night</p>
        <p className={totalPriceClass}>${totalPrice}</p>
        {discountedPrice !== 0 && <p className={styles.price}>discounted price - ${discountedPrice}</p>}
        {!isAvailable && <p style={{color: "red"}}>Not avialable</p>}
      </div>
      {isAvailable && (
        <div className={styles.checkboxContainer}>
          <input type="checkbox" checked={isSelected} readOnly />
        </div>
      )}
    </div>
  );
};

export default Room;
