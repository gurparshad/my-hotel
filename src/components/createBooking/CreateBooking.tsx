import React from "react";
import {useNavigate} from "react-router-dom";
import {MyHotelApi} from "../../api";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {resetForm} from "../../features/form/formSlice";
import {calculatePerNightPrice} from "../../utils/calculatePerNightPrice";
import {formatDate} from "../../utils/formatDate";
import {SelectedProduct, SelectedRoom} from "../../utils/types";
import Button from "../button/Button";
import "./createBooking.scss";

interface CreateBookingProps {
  onBack: () => void;
}

const CreateBooking: React.FC<CreateBookingProps> = ({onBack}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const myHotelApi = new MyHotelApi();

  const formData = useAppSelector((state: RootState) => state.form.form.formData);
  const {startDate, endDate, room, products} = formData;

  const calculateGrandTotal = () => {
    const roomPrice = room?.discountedPrice ?? room?.totalPrice;
    const totalProductPrices = products.reduce((accumulator: any, product: any) => {
      return accumulator + product.totalPrice;
    }, 0);
    // @ts-ignore
    return Number((roomPrice + totalProductPrices).toFixed(2));
  };

  const handleSubmit = async () => {
    const response = await myHotelApi.submitBooking(formData);
    console.log("response-->>", response);
    localStorage.setItem("bookingData", JSON.stringify(response));
    dispatch(resetForm());
    navigate("/success");
  };

  return (
    <div className="create-booking">
      <h2 className="heading">Booking Details</h2>
      <p>Please check your booking details below</p>
      <div className="booking-detail">
        {/* @ts-ignore */}
        <p className="sub-heading">Check In: {formatDate(startDate)}</p>
        {/* @ts-ignore */}
        <p className="sub-heading">Check Out: {formatDate(endDate)}</p>
      </div>
      <div className="room-details">
        <h3 className="sub-heading">Room Details</h3>
        <p>Name: {room?.name}</p>
        {/* @ts-ignore */}

        <p>Price per night: {calculatePerNightPrice(room?.pricePerNight, room?.priceTaxPercentage)}</p>
        <p>Number of nights: {room?.numberOfNights}</p>
        <p>Total Price: {room?.totalPrice}</p>
        {room?.discountedPrice !== 0 && <p>Discounted Price: {room?.discountedPrice}</p>}
      </div>
      <div className="product-table">
        <h3 className="sub-heading">Products</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price per Night</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item: SelectedProduct) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{calculatePerNightPrice(item.priceNet, item.priceTaxPercentage)}</td>
                <td>{item.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grand-total">
        <p>
          Grand Total: <span>${calculateGrandTotal()}</span>
        </p>
      </div>
      <div className="buttons">
        <Button onClick={onBack}>Back</Button>
        <Button onClick={handleSubmit}>Create Booking</Button>
      </div>
    </div>
  );
};

export default CreateBooking;
