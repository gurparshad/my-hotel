import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {setEndDate, setStartDate} from "../../features/form/formSlice";
import Button from "../button/Button";

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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Select the Booking dates</h2>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date: any) => dispatch(setStartDate(date))}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date: any) => dispatch(setEndDate(date))}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <Button onClick={handleSubmit} type="submit">
          Next
        </Button>
      </form>
    </>
  );
};

export default DateAndTime;
