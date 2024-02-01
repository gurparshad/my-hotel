import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {setRoom} from "../../features/form/formSlice";
import {calculatePerNightPrice} from "../../utils/calculatePerNightPrice";
import {RoomType} from "../../utils/types";
import Button from "../button/Button";
import Room from "../room/Room";

// get the rooms from the json data file.
const rooms = [
  {
    id: 1,
    name: "Cheap room",
    pricePerNightNet: 56,
    priceTaxPercentage: 0.09,
    image: "https://via.placeholder.com/400x200.png?text=Cheap%20room",
  },
  {
    id: 2,
    name: "Cheap room",
    pricePerNightNet: 56,
    priceTaxPercentage: 0.09,
    image: "https://via.placeholder.com/400x200.png?text=Cheap%20room",
  },
  {
    id: 3,
    name: "Cheap room",
    pricePerNightNet: 56,
    priceTaxPercentage: 0.09,
    image: "https://via.placeholder.com/400x200.png?text=Cheap%20room",
  },
];

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
          // imageUrl={room.image}
          onSelect={handleRoomSelect}
          // @ts-ignore
          // isSelected={selectedRoom ? selectedRoom.id === room.id : false}
        />
      ))}
      <Button onClick={onBack}>Back</Button>
      <Button onClick={handleSubmit}>Next</Button>
    </div>
  );
};

export default RoomList;
