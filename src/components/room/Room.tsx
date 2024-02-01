import {RoomType} from "../../utils/types";
import "./room.scss";
import classNames from "classnames";
import {RootState} from "../../app/store";
import {useAppSelector} from "../../app/hooks";

interface RoomProps {
  room: RoomType;
  price: number;
  onSelect: (room: RoomType) => void;
}

const Room: React.FC<RoomProps> = ({price, room, onSelect}) => {
  const selectedRoom: RoomType | null = useAppSelector((state: RootState) => state.form.formData.room);
  const handleClick = () => {
    onSelect(room);
  };

  const roomClasses = classNames("room");
  return (
    <div className={roomClasses} onClick={handleClick}>
      <img src={room.image} alt="room-image" />
      <p>{room.name}</p>
      <p>{price}</p>
    </div>
  );
};

export default Room;
