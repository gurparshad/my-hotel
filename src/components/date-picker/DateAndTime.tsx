import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {setEndDate, setStartDate} from "../../features/form/formSlice";
import Button from "../button/Button";
import "./dateAndTime.scss";

interface DateAndTimeProps {
  onNext: () => void;
}

const DateAndTime: React.FC<DateAndTimeProps> = ({onNext}) => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector((state: RootState) => state.form.formData.startDate);
  const endDate = useAppSelector((state: RootState) => state.form.formData.endDate);

  // TODO: We have to handle time as well.
  // const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (startDate && endDate) {
      onNext();
    } else {
      alert("Please select both start and end dates.");
    }
  };

  const handleStartDateChange = (date: Date) => {
    // Check if the new start date is after the current end date
    if (endDate && date > endDate) {
      // If so, reset the end date to null
      dispatch(setEndDate(null));
    }
    // Update the start date
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
              selected={startDate}
              onChange={(date: any) => handleStartDateChange(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="MM/dd/yyyy"
              className="datePicker"
              // placeholderText="Check in"
            />
          </div>
          <div className="endDateContainer">
            <label>End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date: any) => handleEndDateChange(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="MM/dd/yyyy"
              className="datePicker"
              // placeholderText="Check out"
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
