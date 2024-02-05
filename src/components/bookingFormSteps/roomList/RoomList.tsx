import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {RoomType, SelectedRoom} from "../../../types";
import {calculatePerNightPrice} from "../../../utils/calculatePerNightPrice";
import {calculateTotalPrice} from "../../../utils/calculateTotalPrice";
import {calculateDiscountedPrice} from "../../../utils/calculateDiscountedPrice";
import {calculateNumberOfNights} from "../../../utils/calculateNumberOfNights";
import {setRoom} from "../../../features/form/formSlice";
import {RootState} from "../../../app/store";
import Button from "../../button/Button";
import data from "../../../data/data.json";
import Room from "./room/Room";
import {useState} from "react";
import styles from "./roomList.module.scss";
import Error from "../../error/Error";

const rooms = data.rooms.data;
const bookings = data.bookings.data;

interface RoomListProps {
  onNext: () => void;
  onBack: () => void;
}

const RoomList: React.FC<RoomListProps> = ({onNext, onBack}) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<Boolean>(false);
  const selectedRoom: SelectedRoom | null = useAppSelector((state: RootState) => state.form.form.formData.room);
  const startDate = useAppSelector((state: RootState) => state.form.form.formData.startDate);
  const endDate = useAppSelector((state: RootState) => state.form.form.formData.endDate);

  const utcCheckInDate = useAppSelector((state: RootState) => state.form.form.formData.utcCheckInDateTime);
  const utcCheckOutDate = useAppSelector((state: RootState) => state.form.form.formData.utcCheckOutDateTime);

  let discountedPrice = 0;
  let totalPrice = 0;
  let numberOfNights = calculateNumberOfNights(startDate, endDate);

  const checkRoomAvailability = (roomId: number) => {
    for (const booking of bookings) {
      if (
        booking.roomId === roomId &&
        ((utcCheckInDate <= booking.endDateUtc && utcCheckInDate >= booking.startDateUtc) ||
          (utcCheckOutDate <= booking.endDateUtc && utcCheckOutDate >= booking.startDateUtc) ||
          (utcCheckInDate <= booking.startDateUtc && utcCheckOutDate >= booking.endDateUtc))
      ) {
        return false;
      }
    }
    return true;
  };

  const handleDiscountedPrice = (room: RoomType) => {
    if (numberOfNights >= 3) {
      discountedPrice = calculateDiscountedPrice(numberOfNights, room.pricePerNightNet, room.priceTaxPercentage);
      return discountedPrice;
    } else {
      return 0;
    }
  };

  const handleTotalPrice = (room: RoomType) => {
    totalPrice = calculateTotalPrice(numberOfNights, room.pricePerNightNet, room.priceTaxPercentage);
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

  const handleSubmit = () => {
    if (selectedRoom) {
      onNext();
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.roomList}>
      <div className={styles.rooms}>
        {rooms.map((room: RoomType) => (
          <Room
            key={room.id}
            room={room}
            perNightPrice={calculatePerNightPrice(room.pricePerNightNet, room.priceTaxPercentage)}
            onSelect={handleRoomSelect}
            isSelected={selectedRoom ? selectedRoom.id === room.id : false}
            isAvailable={checkRoomAvailability(room.id)}
            discountedPrice={handleDiscountedPrice(room)}
            totalPrice={handleTotalPrice(room)}
          />
        ))}

        {error && <Error customClass={styles.roomError} message="Please select a room" />}
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={handleSubmit}>Next</Button>
      </div>
    </div>
  );
};

export default RoomList;
