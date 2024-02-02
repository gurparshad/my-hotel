import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {setRoom} from "../../features/form/formSlice";
import {calculatePerNightPrice} from "../../utils/calculatePerNightPrice";
import {RoomType} from "../../utils/types";
import Button from "../button/Button";
import Room from "../room/Room";

import data from "../../data/data.json";

const rooms = data.rooms.data;
const bookings = data.bookings.data;

interface RoomListProps {
  onNext: () => void;
  onBack: () => void;
}

const RoomList: React.FC<RoomListProps> = ({onNext, onBack}) => {
  const dispatch = useAppDispatch();

  const selectedRoom: RoomType | null = useAppSelector((state: RootState) => state.form.form.formData.room);

  const startDate = useAppSelector((state: RootState) => state.form.form.formData.startDate);

  const startDateFormatted = startDate ? (typeof startDate === "string" ? new Date(startDate) : startDate) : null;

  const endDate = useAppSelector((state: RootState) => state.form.form.formData.endDate);

  const endDateFormatted = endDate ? (typeof endDate === "string" ? new Date(endDate) : endDate) : null;

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

  const handleRoomSelect = (room: RoomType) => {
    // const roomData = {
    //   id: room.id,
    //   image: room.image,
    //   name: room.name,
    //   pricePerNight: room.pricePerNightNet,
    //   priceTaxPercentage: room.priceTaxPercentage,
    //   discountedPrice:
    // }
    dispatch(setRoom(room));
  };

  const handleSubmit = () => {
    if (selectedRoom) {
      onNext();
    } else {
      alert("Please select a room.");
    }
  };

  return (
    <div>
      {rooms.map((room: RoomType) => (
        <Room
          room={room}
          price={calculatePerNightPrice(room.pricePerNightNet, room.priceTaxPercentage)}
          onSelect={handleRoomSelect}
          // @ts-ignore
          isSelected={selectedRoom ? selectedRoom.id === room.id : false}
          isAvailable={checkRoomAvailability(room.id)}
        />
      ))}
      <Button onClick={onBack}>Back</Button>
      <Button onClick={handleSubmit}>Next</Button>
    </div>
  );
};

export default RoomList;
