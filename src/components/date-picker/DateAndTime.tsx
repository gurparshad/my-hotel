import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {updateProduct, setEndDate, setStartDate, updateRoom} from "../../features/form/formSlice";
import {calculateDiscountedPrice} from "../../utils/calculateDiscountedPrice";
import {calculateNumberOfNights} from "../../utils/calculateNumberOfNights";
import {calculatePerNightPrice} from "../../utils/calculatePerNightPrice";
import {calculateTotalPrice} from "../../utils/calculateTotalPrice";
import {SelectedProduct, SelectedRoom} from "../../utils/types";
import Button from "../button/Button";
import "./dateAndTime.scss";

interface DateAndTimeProps {
  onNext: () => void;
}

const DateAndTime: React.FC<DateAndTimeProps> = ({onNext}) => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector((state: RootState) => state.form.form.formData.startDate);

  const startDateFormatted = startDate ? (typeof startDate === "string" ? new Date(startDate) : startDate) : null;

  const endDate = useAppSelector((state: RootState) => state.form.form.formData.endDate);

  const endDateFormatted = endDate ? (typeof endDate === "string" ? new Date(endDate) : endDate) : null;

  // TODO: We have to handle time as well.
  // const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");

  const productData = {
    id: 1,
    name: "Breakfast",
    priceNet: 6,
    priceTaxPercentage: 0.09,
    chargeMethod: "nightly",
    image: "https://via.placeholder.com/400x200.png?text=Breakfast",
    totalPrice: 0,
  };

  const selectedRoom: SelectedRoom | null = useAppSelector((state: RootState) => state.form.form.formData.room);

  const selectedProducts: SelectedProduct[] | [] = useAppSelector(
    (state: RootState) => state.form.form.formData.products
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
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

      // update products
      // get selected products loop through it and add the updated data.

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

      // breakfast updated.
      // if (numberOfNights >= 28) {
      //   dispatch(addProduct(productData));
      // }
      onNext();
    } else {
      alert("Please select both start and end dates.");
    }
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Select the Booking dates</h2>
        <div className="datePickerContainer">
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
