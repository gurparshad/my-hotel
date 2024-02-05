import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../../components/button/Button";
import {calculatePerNightPrice} from "../../utils/calculatePerNightPrice";
import {formatDate} from "../../utils/formatDate";
import {BookingData, SelectedProduct} from "../../types";

const Success = () => {
  const [data, setData] = useState<BookingData>();

  useEffect(() => {
    const bookingData = localStorage.getItem("bookingData");
    if (bookingData) {
      const parsedFormData = JSON.parse(bookingData);
      setData(parsedFormData);
    }
  }, []);

  const startDate = data?.utcCheckInDateTime;
  const endDate = data?.utcCheckOutDateTime;
  const room = data?.room;
  const products = data?.products;
  const navigate = useNavigate();

  const calculateGrandTotal = () => {
    const roomPrice = room?.discountedPrice ?? room?.totalPrice;
    const totalProductPrices = products?.reduce((accumulator: any, product: SelectedProduct) => {
      return accumulator + product.totalPrice;
    }, 0);
    return Number((roomPrice + totalProductPrices).toFixed(2));
  };

  return (
    <div>
      <h2>Booking successfull</h2>
      <h3>Summary of your order</h3>
      <div className="booking-detail">
        <p className="sub-heading">Check In: {formatDate(startDate ?? "")}</p>
        <p className="sub-heading">Check Out: {formatDate(endDate ?? "")}</p>
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
            {products?.map((item: SelectedProduct) => (
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
        <Button onClick={() => navigate("/")}>Home</Button>
        <Button onClick={() => navigate("/book-room")}>Book Another Room</Button>
      </div>
    </div>
  );
};

export default Success;
