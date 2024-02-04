import DatePicker from "react-datepicker";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {
  updateProduct,
  setEndDate,
  setStartDate,
  updateRoom,
  setStartTime,
  setEndTime,
} from "../../features/form/formSlice";
import {calculateDiscountedPrice} from "../../utils/calculateDiscountedPrice";
import {calculateNumberOfNights} from "../../utils/calculateNumberOfNights";
import {calculatePerNightPrice} from "../../utils/calculatePerNightPrice";
import {calculateTotalPrice} from "../../utils/calculateTotalPrice";
import {SelectedProduct, SelectedRoom} from "../../utils/types";
import Button from "../button/Button";
import TimeDropdown from "../timeDropdown/TimeDropdown";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";

interface DateAndTimeProps {
  onNext: () => void;
}

const DateAndTime: React.FC<DateAndTimeProps> = ({onNext}) => {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<string[]>([]);

  const startDate = useAppSelector((state: RootState) => state.form.form.formData.startDate);
  const endDate = useAppSelector((state: RootState) => state.form.form.formData.endDate);
  const startTime = useAppSelector((state: RootState) => state.form.form.formData.startTime);
  const endTime = useAppSelector((state: RootState) => state.form.form.formData.endTime);

  const selectedRoom: SelectedRoom | null = useAppSelector((state: RootState) => state.form.form.formData.room);

  const selectedProducts: SelectedProduct[] | [] = useAppSelector(
    (state: RootState) => state.form.form.formData.products
  );

  // put these methods as helper method for date formatting.
  const startDateFormatted = startDate ? (typeof startDate === "string" ? new Date(startDate) : startDate) : null;
  const endDateFormatted = endDate ? (typeof endDate === "string" ? new Date(endDate) : endDate) : null;

  // get these from teh json file.
  const startTimes = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
  const endTimes = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

  const handleStartTime = (selectedTime: string) => {
    dispatch(setStartTime(selectedTime));
  };

  const handleEndTime = (selectedTime: string) => {
    dispatch(setEndTime(selectedTime));
  };

  const handleStartDateChange = (date: Date) => {
    if (endDateFormatted && date > endDateFormatted) {
      dispatch(setEndDate(null));
    }
    dispatch(setStartDate(date));
  };

  const handleEndDateChange = (date: any) => {
    dispatch(setEndDate(date));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!startDate) newErrors.push("startDate");
    if (!endDate) newErrors.push("endDate");
    if (!startTime) newErrors.push("startTime");
    if (!endTime) newErrors.push("endTime");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    if (startDate && endDate) {
      const numberOfNights = calculateNumberOfNights(startDate, endDate);
      let updatedRoom;
      if (selectedRoom) {
        updatedRoom = {
          ...selectedRoom,
          discountedPrice: calculateDiscountedPrice(
            numberOfNights,
            // @ts-ignore
            selectedRoom.pricePerNight,
            // @ts-ignore
            selectedRoom?.priceTaxPercentage
          ),
          numberOfNights: numberOfNights,
          // @ts-ignore
          totalPrice: calculateTotalPrice(
            numberOfNights,
            selectedRoom?.pricePerNight,
            selectedRoom?.priceTaxPercentage
          ),
        };
      }

      // @ts-ignore
      dispatch(updateRoom(updatedRoom));

      for (const selectedProduct of selectedProducts) {
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
    } else {
      alert("Please select both start and end dates.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Select the Booking dates</h2>
        <div
          className="datePickerContainer"
          style={{display: "flex", justifyContent: "center", alignItems: "baseline"}}
        >
          <div className="startDateContainer">
            <label>Start Date</label>
            <DatePicker
              selected={startDateFormatted}
              onChange={(date: Date) => handleStartDateChange(date)}
              selectsStart
              startDate={startDateFormatted}
              endDate={endDateFormatted}
              dateFormat="MM/dd/yyyy"
              className="datePicker"
            />
            {errors.includes("startDate") && <p style={{color: "red"}}>Please select a start date.</p>}
          </div>
          <div>
            <p>Select checkin Time</p>
            <TimeDropdown
              value={startTime ?? ""}
              times={startTimes}
              onChange={(time: string) => handleStartTime(time)}
            />
            {errors.includes("startTime") && <p style={{color: "red"}}>Please select a check-in time.</p>}
          </div>
          <div className="endDateContainer">
            <label>End Date</label>
            <DatePicker
              selected={endDateFormatted}
              onChange={(date: any) => handleEndDateChange(date)}
              selectsEnd
              startDate={startDateFormatted}
              endDate={endDateFormatted}
              minDate={startDateFormatted}
              dateFormat="MM/dd/yyyy"
              className="datePicker"
            />
            {errors.includes("endDate") && <p style={{color: "red"}}>Please select an end date.</p>}
          </div>
          <div>
            <p>Select checkout Time</p>
            <TimeDropdown value={endTime ?? ""} times={endTimes} onChange={(time: string) => handleEndTime(time)} />
            {errors.includes("endTime") && <p style={{color: "red"}}>Please select a checkout time.</p>}
          </div>
        </div>
        <Button onClick={handleSubmit} type="submit">
          Next
        </Button>
      </form>
    </>
  );
};

export default DateAndTime;
