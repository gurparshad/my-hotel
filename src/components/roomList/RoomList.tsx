import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RoomType, SelectedRoom} from "../../utils/types";
import {calculatePerNightPrice} from "../../utils/calculatePerNightPrice";
import {calculateTotalPrice} from "../../utils/calculateTotalPrice";
import {calculateDiscountedPrice} from "../../utils/calculateDiscountedPrice";
import {calculateNumberOfNights} from "../../utils/calculateNumberOfNights";
import {setRoom} from "../../features/form/formSlice";
import {RootState} from "../../app/store";
import Button from "../button/Button";
import data from "../../data/data.json";
import Room from "../room/Room";

import "./roomList.scss";
import {useState} from "react";

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

  const startDateFormatted = startDate ? (typeof startDate === "string" ? new Date(startDate) : startDate) : null;
  const endDateFormatted = endDate ? (typeof endDate === "string" ? new Date(endDate) : endDate) : null;

  let discountedPrice = 0;
  let totalPrice = 0;
  // @ts-ignore
  let numberOfNights = calculateNumberOfNights(startDate, endDate);

  const checkRoomAvailability = (roomId: number) => {
    const selectedStartUtc = startDateFormatted?.toISOString();
    const selectedEndUtc = endDateFormatted?.toISOString();

    for (const booking of bookings) {
      const bookingStartDate = new Date(booking.startDateUtc);
      const bookingEndDate = new Date(booking.endDateUtc);

      if (
        booking.roomId === roomId &&
        // @ts-ignore
        ((selectedStartUtc < bookingEndDate.toISOString() && selectedStartUtc > bookingStartDate.toISOString()) ||
          // @ts-ignore
          (selectedEndUtc < bookingEndDate.toISOString() && selectedEndUtc > bookingStartDate.toISOString()))
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
    <div className="roomList">
      <div className="rooms">
        {rooms.map((room: RoomType) => (
          <Room
            room={room}
            perNightPrice={calculatePerNightPrice(room.pricePerNightNet, room.priceTaxPercentage)}
            onSelect={handleRoomSelect}
            // @ts-ignore
            isSelected={selectedRoom ? selectedRoom.id === room.id : false}
            isAvailable={checkRoomAvailability(room.id)}
            discountedPrice={handleDiscountedPrice(room)}
            totalPrice={handleTotalPrice(room)}
          />
        ))}
      </div>
      {error && <p style={{color: "red"}}>Please select a room</p>}
      <div>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={handleSubmit}>Next</Button>
      </div>
    </div>
  );
};

export default RoomList;
