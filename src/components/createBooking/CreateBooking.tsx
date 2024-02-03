import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {resetForm} from "../../features/form/formSlice";
import {SelectedProduct} from "../../utils/types";
import Button from "../button/Button";
interface CreateBookingProps {
  onBack: () => void;
}

const CreateBooking: React.FC<CreateBookingProps> = ({onBack}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = () => {
    // persistor.purge(["form"]);
    dispatch(resetForm());
    navigate("/success");
  };
  const formData = useAppSelector((state: RootState) => state.form.form.formData);
  const {startDate, endDate, room, products} = formData;
  console.log("room-->>", room);
  return (
    <div>
      <h2>Create Booking</h2>
      <p>Please check the details</p>
      <div>
        {/* @ts-ignore */}
        <p>Start Date: {startDate.toString()}</p>
      </div>
      <div>
        {/* @ts-ignore */}
        <p>End Date: {endDate.toString()}</p>
      </div>
      <div style={{border: "1px solid red"}}>
        <p>Room details</p>
        <div>
          <img src={room?.image} alt="room-image" />
          <p>Name:{room?.name}</p>
          <p>Price per night:{room?.pricePerNight}</p>
          <p>Number of nights: {room?.numberOfNights}</p>
          <p>Total Price: {room?.totalPrice}</p>
          {room?.discountedPrice !== 0 && <p>Discounted Price{room?.discountedPrice}</p>}
        </div>
      </div>
      <div>
        <p>Products</p>
        {products.map((item: SelectedProduct) => (
          <div style={{border: "1px solid green"}}>
            <p>{item.name}</p>
            <p>{item.totalPrice}</p>
          </div>
        ))}
      </div>
      <Button onClick={onBack}>Back</Button>
      <Button onClick={handleSubmit}>Create Booking</Button>
    </div>
  );
};

export default CreateBooking;
