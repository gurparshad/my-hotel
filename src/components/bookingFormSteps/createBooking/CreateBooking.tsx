import React from "react";
import {useNavigate} from "react-router-dom";
import {MyHotelApi} from "../../../api";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {resetForm} from "../../../features/form/formSlice";
import {calculatePerNightPrice} from "../../../utils/calculatePerNightPrice";
import {formatDate} from "../../../utils/formatDate";
import {SelectedProduct} from "../../../types";
import Button from "../../button/Button";
import styles from "./createBooking.module.scss";

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
    const totalProductPrices = products.reduce((accumulator: number, product: SelectedProduct) => {
      return accumulator + product.totalPrice;
    }, 0);
    return Number((roomPrice + totalProductPrices).toFixed(2));
  };

  const handleSubmit = async () => {
    try {
      const data = {
        room: formData.room,
        products: formData.products,
        utcCheckInDateTime: formData.utcCheckInDateTime,
        utcCheckOutDateTime: formData.utcCheckOutDateTime,
      };
      const response = await myHotelApi.submitBooking(data);
      localStorage.setItem("bookingData", JSON.stringify(response));
      dispatch(resetForm());
      navigate("/success");
    } catch (error) {
      console.error("Error submitting booking:", error);
      throw error;
    }
  };

  return (
    <div className={styles.createBooking}>
      <h2 className={styles.heading}>Booking Details</h2>
      <p>Please check your booking details below</p>
      <div className={styles.bookingDetail}>
        <p className={styles.subHeading}>Check In: {formatDate(startDate)}</p>
        <p className={styles.subHeading}>Check Out: {formatDate(endDate)}</p>
      </div>
      <div className={styles.roomDetails}>
        <h3 className={styles.subHeading}>Room Details</h3>
        <p>Name: {room?.name}</p>
        <p>Price per night: {calculatePerNightPrice(room?.pricePerNight, room?.priceTaxPercentage)}</p>
        <p>Number of nights: {room?.numberOfNights}</p>
        <p>Total Price: {room?.totalPrice}</p>
        {room?.discountedPrice !== 0 && <p>Discounted Price: {room?.discountedPrice}</p>}
      </div>
      <div className={styles.productTable}>
        <h3 className={styles.subHeading}>Products</h3>
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
      <div className={styles.grandTotal}>
        <p>
          Grand Total: <span>${calculateGrandTotal()}</span>
        </p>
      </div>
      <div className={styles.buttons}>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={handleSubmit}>Create Booking</Button>
      </div>
    </div>
  );
};

export default CreateBooking;
