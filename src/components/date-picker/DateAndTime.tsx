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
  const startDate = useAppSelector((state: RootState) => state.form.form.formData.startDate);

  const startDateFormatted = startDate ? (typeof startDate === "string" ? new Date(startDate) : startDate) : null;

  const endDate = useAppSelector((state: RootState) => state.form.form.formData.endDate);

  const endDateFormatted = endDate ? (typeof endDate === "string" ? new Date(endDate) : endDate) : null;

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
