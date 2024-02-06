import DatePicker from "react-datepicker";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {
  updateProduct,
  setEndDate,
  setStartDate,
  updateRoom,
  setStartTime,
  setEndTime,
  addProduct,
  setUtcCheckInDateTime,
  setUtcCheckOutDateTime,
} from "../../../features/form/formSlice";
import {calculateDiscountedPrice} from "../../../utils/calculateDiscountedPrice";
import {calculateNumberOfNights} from "../../../utils/calculateNumberOfNights";
import {calculatePerNightPrice} from "../../../utils/calculatePerNightPrice";
import {calculateTotalPrice} from "../../../utils/calculateTotalPrice";
import {SelectedRoom} from "../../../types";
import Button from "../../button/Button";
import TimeDropdown from "../../timeDropdown/TimeDropdown";
import {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./dateAndTime.module.scss";
import {toUtcFormat} from "../../../utils/toUtcFormat";
import Error from "../../error/Error";
import data from "../../../data/data.json";

interface DateAndTimeProps {
  onNext: () => void;
}

const DateAndTime: React.FC<DateAndTimeProps> = ({onNext}) => {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<string[]>([]);
  const {startTimesLocal, endTimesLocal} = data.property;

  const formData = useAppSelector((state: RootState) => state.form.form.formData);
  const {room, startDate, endDate, startTime, endTime, products} = formData;
  const startDateFormatted = startDate ? (typeof startDate === "string" ? new Date(startDate) : startDate) : null;
  const endDateFormatted = endDate ? (typeof endDate === "string" ? new Date(endDate) : endDate) : null;
  const numberOfNights = calculateNumberOfNights(startDate, endDate);

  const breakfast = {
    id: 1,
    name: "Breakfast",
    priceNet: 6,
    priceTaxPercentage: 0.09,
    chargeMethod: "nightly",
    image: "https://via.placeholder.com/400x200.png?text=Breakfast",
    numberOfNights: numberOfNights,
    totalPrice: 0,
  };

  const isBreakfastSelected = products.some((product) => product.id === 1);

  if (!isBreakfastSelected && numberOfNights >= 28) {
    dispatch(addProduct(breakfast));
  }

  const handleStartTime = (selectedTime: string) => {
    dispatch(setStartTime(selectedTime));
  };

  const handleEndTime = (selectedTime: string) => {
    dispatch(setEndTime(selectedTime));
  };

  const handleStartDateChange = (date: Date) => {
    if (endDateFormatted && date > endDateFormatted) {
      dispatch(setEndDate(""));
    }
    dispatch(setStartDate(date.toISOString()));
  };

  const handleEndDateChange = (date: Date) => {
    dispatch(setEndDate(date.toISOString()));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: string[] = [];

    if (!startDate) newErrors.push("startDate");
    if (!endDate) newErrors.push("endDate");
    if (!startTime) newErrors.push("startTime");
    if (!endTime) newErrors.push("endTime");
    if (numberOfNights < 1) newErrors.push("minimumNights");
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    if (startDate && endDate && startTime && endTime) {
      const utcCheckInDate = toUtcFormat(startDate, startTime);
      const utcCheckOutDate = toUtcFormat(endDate, endTime);

      dispatch(setUtcCheckInDateTime(utcCheckInDate));
      dispatch(setUtcCheckOutDateTime(utcCheckOutDate));
    } else {
      console.error("CheckIn and CheckOut times must be provided.");
    }

    if (startDate && endDate) {
      if (room) {
        const updatedRoom: SelectedRoom = {
          ...room,
          discountedPrice: calculateDiscountedPrice(numberOfNights, room.pricePerNight, room?.priceTaxPercentage),
          numberOfNights: numberOfNights,
          totalPrice: calculateTotalPrice(numberOfNights, room?.pricePerNight, room?.priceTaxPercentage),
        };
        dispatch(updateRoom(updatedRoom));
      }

      for (const selectedProduct of products) {
        let updatedProduct;
        if (selectedProduct.id === 1 && numberOfNights >= 28) {
          updatedProduct = {
            ...selectedProduct,
            numberOfNights: numberOfNights,
            totalPrice: 0,
          };
        } else if (selectedProduct.id === 3) {
          updatedProduct = {
            ...selectedProduct,
            numberOfNights: numberOfNights,
            totalPrice: calculatePerNightPrice(selectedProduct.priceNet, selectedProduct.priceTaxPercentage),
          };
        } else {
          updatedProduct = {
            ...selectedProduct,
            numberOfNights: numberOfNights,
            totalPrice: calculateTotalPrice(
              numberOfNights,
              selectedProduct?.priceNet,
              selectedProduct?.priceTaxPercentage
            ),
          };
        }
        dispatch(updateProduct(updatedProduct));
      }

      onNext();
    }
  };

  return (
    <div className={styles.dateAndTime}>
      <h2>Select the Booking date and time</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.checkInContainer}>
          <label>Check In</label>
          <div className={styles.datePickerContainer}>
            <DatePicker
              selected={startDateFormatted}
              onChange={(date: Date) => handleStartDateChange(date)}
              selectsStart
              startDate={startDateFormatted}
              endDate={endDateFormatted}
              dateFormat="dd/MM/yyyy"
              className={styles.datePicker}
              placeholderText="Date"
            />
            {errors.includes("startDate") && <Error message="Please select a check-in date" />}
          </div>
          <div className={styles.timePickerContainer}>
            <TimeDropdown
              value={startTime ?? ""}
              times={startTimesLocal}
              onChange={(time: string) => handleStartTime(time)}
            />
            {errors.includes("startTime") && <Error message="Please select a check-in time" />}
          </div>
        </div>

        <div className={styles.checkOutContainer}>
          <label>Check Out</label>
          <div className={styles.datePickerContainer}>
            <DatePicker
              selected={endDateFormatted}
              onChange={(date: Date) => handleEndDateChange(date)}
              selectsEnd
              startDate={startDateFormatted}
              endDate={endDateFormatted}
              minDate={startDateFormatted}
              dateFormat="dd/MM/yyyy"
              className={styles.datePicker}
              placeholderText="Date"
            />
            {errors.includes("endDate") && <Error message="Please select an end date" />}
          </div>
          <div className={styles.timePickerContainer}>
            <TimeDropdown
              value={endTime ?? ""}
              times={endTimesLocal}
              onChange={(time: string) => handleEndTime(time)}
            />
            {errors.includes("endTime") && <Error message="Please select a checkout time" />}
          </div>
        </div>
        {errors.includes("minimumNights") && (
          <div className={styles.errorContainer}>
            <Error message="Booking is possible for minimum 1 night" />
          </div>
        )}
        <Button onClick={handleSubmit} type="submit" customClass={styles.button}>
          Next
        </Button>
      </form>
    </div>
  );
};

export default DateAndTime;
