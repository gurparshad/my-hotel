import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RoomType } from '../../../types';
import { calculatePerNightPrice } from '../../../utils/calculatePerNightPrice';
import { calculateTotalPrice } from '../../../utils/calculateTotalPrice';
import { calculateDiscountedPrice } from '../../../utils/calculateDiscountedPrice';
import { calculateNumberOfNights } from '../../../utils/calculateNumberOfNights';
import { setRoom } from '../../../features/form/formSlice';
import { RootState } from '../../../app/store';
import Button from '../../button/Button';
import data from '../../../data/data.json';
import Room from './room/Room';
import { useState } from 'react';
import styles from './roomList.module.scss';
import Error from '../../error/Error';

const rooms = data.rooms.data;
const bookings = data.bookings.data;

interface RoomListProps {
  onNext: () => void;
  onBack: () => void;
}

const RoomList: React.FC<RoomListProps> = ({ onNext, onBack }) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<Boolean>(false);
  const { room, startDate, endDate, utcCheckInDateTime, utcCheckOutDateTime } =
    useAppSelector((state: RootState) => state.form.form.formData);

  let discountedPrice = 0;
  let totalPrice = 0;
  let numberOfNights = calculateNumberOfNights(startDate, endDate);

  const checkRoomAvailability = (roomId: number) => {
    for (const booking of bookings) {
      if (
        booking.roomId === roomId &&
        ((utcCheckInDateTime <= booking.endDateUtc &&
          utcCheckInDateTime >= booking.startDateUtc) ||
          (utcCheckOutDateTime <= booking.endDateUtc &&
            utcCheckOutDateTime >= booking.startDateUtc) ||
          (utcCheckInDateTime <= booking.startDateUtc &&
            utcCheckOutDateTime >= booking.endDateUtc))
      ) {
        return false;
      }
    }
    return true;
  };

  const handleDiscountedPrice = (room: RoomType) => {
    if (numberOfNights >= 3) {
      discountedPrice = calculateDiscountedPrice(
        numberOfNights,
        room.pricePerNightNet,
        room.priceTaxPercentage,
      );
      return discountedPrice;
    } else {
      return 0;
    }
  };

  const handleTotalPrice = (room: RoomType) => {
    totalPrice = calculateTotalPrice(
      numberOfNights,
      room.pricePerNightNet,
      room.priceTaxPercentage,
    );
    return totalPrice;
  };

  const handleRoomSelect = (room: RoomType) => {
    const roomData = {
      id: room.id,
      image: room.image,
      name: room.name,
      pricePerNight: room.pricePerNightNet,
      priceTaxPercentage: room.priceTaxPercentage,
      totalPrice: handleTotalPrice(room),
      discountedPrice: handleDiscountedPrice(room),
      numberOfNights: numberOfNights,
    };
    dispatch(setRoom(roomData));
  };

  const handleNext = () => {
    if (room.id > 0) {
      onNext();
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.roomList}>
      <h2>Select a Room</h2>
      <div className={styles.rooms}>
        {rooms.map((item: RoomType) => (
          <Room
            key={item.id}
            room={item}
            perNightPrice={calculatePerNightPrice(
              item.pricePerNightNet,
              item.priceTaxPercentage,
            )}
            onSelect={handleRoomSelect}
            isSelected={room ? room.id === item.id : false}
            isAvailable={checkRoomAvailability(room.id)}
            discountedPrice={handleDiscountedPrice(item)}
            totalPrice={handleTotalPrice(item)}
          />
        ))}

        {error && (
          <Error
            customClass={styles.roomError}
            message="Please select a room"
          />
        )}
      </div>
      <div className={styles.buttonsContainer}>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default RoomList;
