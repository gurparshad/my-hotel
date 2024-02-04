import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {resetForm} from "../../features/form/formSlice";
import {calculatePerNightPrice} from "../../utils/calculatePerNightPrice";
import {formatDate} from "../../utils/formatDate";
import {SelectedProduct} from "../../utils/types";
import Button from "../button/Button";
import "./createBooking.scss";

interface CreateBookingProps {
  onBack: () => void;
}

const CreateBooking: React.FC<CreateBookingProps> = ({onBack}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formData = useAppSelector((state: RootState) => state.form.form.formData);
  const {startDate, endDate, room, products} = formData;

  const calculateGrandTotal = () => {
    const roomPrice = formData.room?.discountedPrice ?? formData.room?.totalPrice;
    const totalProductPrices = products.reduce((accumulator, product) => {
      return accumulator + product.totalPrice;
    }, 0);
    // @ts-ignore
    return roomPrice + totalProductPrices;
  };

  const handleSubmit = () => {
    dispatch(resetForm());
    navigate("/success");
  };

  return (
    <div>
      <h2>Booking Details</h2>
      <p>Please check your booking details below</p>
      <div>
        {/* @ts-ignore */}
        <p>Check In: {formatDate(startDate)}</p>
      </div>
      <div>
        {/* @ts-ignore */}
        <p>Check Out: {formatDate(endDate)}</p>
      </div>
      <div style={{border: "1px solid red"}}>
        <p>Room details</p>
        <div>
          <p>Name:{room?.name}</p>
          {/* @ts-ignore */}
          <p>Price per night:{calculatePerNightPrice(room?.pricePerNight, room?.priceTaxPercentage)}</p>
          <p>Number of nights: {room?.numberOfNights}</p>
          <p>Total Price: {room?.totalPrice}</p>
          {room?.discountedPrice !== 0 && <p>Discounted Price{room?.discountedPrice}</p>}
        </div>
      </div>
      <div>
        <p>Products</p>
        {products.map((item: SelectedProduct) => (
          <div>
            <p>Name: {item.name}</p>
            <p>Price per Night: {calculatePerNightPrice(item.priceNet, item.priceTaxPercentage)}</p>
            <p>Total Price:{item.totalPrice}</p>
          </div>
        ))}
      </div>

      <div>
        <p>
          Grand Total: <span>{calculateGrandTotal()}</span>
        </p>
      </div>
      <Button onClick={onBack}>Back</Button>
      <Button onClick={handleSubmit}>Create Booking</Button>
    </div>
  );
};

export default CreateBooking;
