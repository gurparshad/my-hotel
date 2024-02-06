import {BookingData, SelectedProduct} from "../../types";
import {calculatePerNightPrice} from "../../utils/calculatePerNightPrice";
import {formatDate} from "../../utils/formatDate";
import styles from "./summary.module.scss";

interface SummaryProps {
  data: BookingData;
}

const Summary: React.FC<SummaryProps> = ({data}) => {
  const {room, products, utcCheckInDateTime, utcCheckOutDateTime} = data;

  const calculateGrandTotal = () => {
    const roomPrice = room?.discountedPrice ?? room?.totalPrice;
    const totalProductPrices = products.reduce((accumulator: number, product: SelectedProduct) => {
      return accumulator + product.totalPrice;
    }, 0);
    return Number((roomPrice + totalProductPrices).toFixed(2));
  };

  return (
    <div className={styles.summary}>
      <p>Please check your booking details below</p>
      <table className={styles.detailsTable}>
        <tbody>
          <tr>
            <td className={styles.label}>Check In:</td>
            <td>{formatDate(utcCheckInDateTime)}</td>
          </tr>
          <tr>
            <td className={styles.label}>Check Out:</td>
            <td>{formatDate(utcCheckOutDateTime)}</td>
          </tr>
        </tbody>
      </table>
      <h3 className={styles.subHeading}>Room Details</h3>
      <table className={styles.detailsTable}>
        <tbody>
          <tr>
            <td className={styles.label}>Name:</td>
            <td>{room?.name}</td>
          </tr>
          <tr>
            <td className={styles.label}>Price per night:</td>
            <td>{calculatePerNightPrice(room?.pricePerNight, room?.priceTaxPercentage)}</td>
          </tr>
          <tr>
            <td className={styles.label}>Number of nights:</td>
            <td>{room?.numberOfNights}</td>
          </tr>
          <tr>
            <td className={styles.label}>Total Price:</td>
            <td>{room?.totalPrice}</td>
          </tr>
          {room?.discountedPrice !== 0 && (
            <tr>
              <td className={styles.label}>Discounted Price:</td>
              <td>{room?.discountedPrice}</td>
            </tr>
          )}
        </tbody>
      </table>
      {products.length > 0 && (
        <div className={styles.productTable}>
          <h3 className={styles.subHeading}>Products</h3>
          <table className={styles.detailsTable}>
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
      )}
      <p className={styles.taxDisclaimer}>*Tax is included in the prices mentioned.</p>
      <div className={styles.grandTotal}>
        <p>
          <span className={styles.bold}>Grand Total:</span> ${calculateGrandTotal()}
        </p>
      </div>
    </div>
  );
};

export default Summary;
