import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {setRoom} from "../../features/form/formSlice";
import {calculatePerNightPrice} from "../../utils/calculatePerNightPrice";
import {RoomType} from "../../utils/types";
import Button from "../button/Button";
import Room from "../room/Room";

import data from "../../data/data.json";

const rooms = data.rooms.data;

interface RoomListProps {
  onNext: () => void;
  onBack: () => void;
}

const RoomList: React.FC<RoomListProps> = ({onNext, onBack}) => {
  const dispatch = useAppDispatch();

  const selectedRoom: RoomType | null = useAppSelector((state: RootState) => state.form.formData.room);

  const handleRoomSelect = (room: RoomType) => {
    console.log("in parent room", room);
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
        />
      ))}
      <Button onClick={onBack}>Back</Button>
      <Button onClick={handleSubmit}>Next</Button>
    </div>
  );
};

export default RoomList;
