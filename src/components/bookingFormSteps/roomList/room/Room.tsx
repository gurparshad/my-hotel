import { RoomType } from '../../../../types';
import classnames from 'classnames';
import styles from './room.module.scss';

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
    <div
      className={roomClasses}
      onClick={isAvailable ? handleClick : undefined}
    >
      <div className={styles.details}>
        <img src={room.image} alt="room" />
        <p className={styles.name}>{room.name}</p>
        <p className={styles.price}>${perNightPrice}/night</p>
        <div className={styles.totalPrice}>
          <p className={totalPriceClass}>${totalPrice}</p>
          {discountedPrice !== 0 && (
            <p className={styles.price}>${discountedPrice}</p>
          )}
          <p>Total</p>
        </div>
        {!isAvailable && <p style={{ color: 'red' }}>Not Available</p>}
      </div>
    </div>
  );
};

export default Room;
