import React, {useState} from "react";
import "./timeDropdown.scss";

interface TimeDropdownProps {
  times: string[];
  onChange: (selectedTime: string) => void;
  value: string;
}

const TimeDropdown: React.FC<TimeDropdownProps> = ({times, onChange, value}) => {
  const [selectedTime, setSelectedTime] = useState<string>(value);

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
    onChange(event.target.value);
  };

  return (
    <select value={selectedTime} onChange={handleTimeChange}>
      <option value="">Select Time</option>
      {times.map((time, index) => (
        <option key={index} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

export default TimeDropdown;
