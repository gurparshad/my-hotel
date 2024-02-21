import DatePicker from 'react-datepicker';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
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
} from '../../../features/form/formSlice';
import { calculateDiscountedPrice } from '../../../utils/calculateDiscountedPrice';
import { calculateNumberOfNights } from '../../../utils/calculateNumberOfNights';
import { calculatePerNightPrice } from '../../../utils/calculatePerNightPrice';
import { calculateTotalPrice } from '../../../utils/calculateTotalPrice';
import { SelectedProduct, SelectedRoom } from '../../../types';
import Button from '../../button/Button';
import TimeDropdown from '../../timeDropdown/TimeDropdown';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './dateAndTime.module.scss';
import { toUtcFormat } from '../../../utils/toUtcFormat';
import Error from '../../error/Error';
import data from '../../../data/data.json';
import { checkRoomAvailability } from '../roomList/RoomList';

interface DateAndTimeProps {
  onNext: () => void;
}

const DateAndTime: React.FC<DateAndTimeProps> = ({ onNext }) => {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<string[]>([]);
  const { startTimesLocal, endTimesLocal } = data.property;

  const formData = useAppSelector(
    (state: RootState) => state.form.form.formData,
  );
  const { room, startDate, endDate, startTime, endTime, products } = formData;

  // TODO: earlier it was done because in the redux store we were storing the Date type value,
  // but that should not be done. it must contain the strong value. // so this code can be refactored as
  // from both session storage and redux store the value that will come will be the string

  // TODO: the endDateFormatted one can also be refactored.
  const startDateFormatted = startDate ? new Date(startDate) : null;
  const endDateFormatted = endDate
    ? typeof endDate === 'string'
      ? new Date(endDate)
      : endDate
    : null;
  const numberOfNights = calculateNumberOfNights(startDate, endDate);

  const breakfast = {
    id: 1,
    name: 'Breakfast',
    priceNet: 6,
    priceTaxPercentage: 0.09,
    chargeMethod: 'nightly',
    image: 'https://via.placeholder.com/400x200.png?text=Breakfast',
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
      dispatch(setEndDate(''));
    }
    dispatch(setStartDate(date.toISOString()));
  };

  const handleEndDateChange = (date: Date) => {
    dispatch(setEndDate(date.toISOString()));
  };

  const updateRoomChanges = (room: SelectedRoom) => {
    const isRoomAvailable = checkRoomAvailability(room.id, startDate, endDate);
    let updatedRoom: SelectedRoom;
    if (room && isRoomAvailable) {
      updatedRoom = {
        ...room,
        discountedPrice: calculateDiscountedPrice(
          numberOfNights,
          room.pricePerNight,
          room?.priceTaxPercentage,
        ),
        numberOfNights: numberOfNights,
        totalPrice: calculateTotalPrice(
          numberOfNights,
          room?.pricePerNight,
          room?.priceTaxPercentage,
        ),
      };
    } else {
      updatedRoom = {
        id: 0,
        image: '',
        name: '',
        pricePerNight: 0,
        priceTaxPercentage: 0,
        discountedPrice: 0,
        numberOfNights: 0,
        totalPrice: 0,
      };
    }
    dispatch(updateRoom(updatedRoom));
  };

  const updateProducts = (products: SelectedProduct[]) => {
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
          totalPrice: calculatePerNightPrice(
            selectedProduct.priceNet,
            selectedProduct.priceTaxPercentage,
          ),
        };
      } else {
        updatedProduct = {
          ...selectedProduct,
          numberOfNights: numberOfNights,
          totalPrice: calculateTotalPrice(
            numberOfNights,
            selectedProduct?.priceNet,
            selectedProduct?.priceTaxPercentage,
          ),
        };
      }
      dispatch(updateProduct(updatedProduct));
    }
  };

  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: string[] = [];

    if (!startDate) newErrors.push('startDate');
    if (!endDate) newErrors.push('endDate');
    if (!startTime) newErrors.push('startTime');
    if (!endTime) newErrors.push('endTime');
    if (numberOfNights < 1) newErrors.push('minimumNights');
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const utcCheckInDate = toUtcFormat(startDate, startTime);
    const utcCheckOutDate = toUtcFormat(endDate, endTime);
    dispatch(setUtcCheckInDateTime(utcCheckInDate));
    dispatch(setUtcCheckOutDateTime(utcCheckOutDate));

    updateRoomChanges(room);

    updateProducts(products);

    onNext();
  };

  return (
    <div className={styles.dateAndTime}>
      <h2>Select the Booking date and time</h2>
      <form onSubmit={handleNext}>
        <div className={styles.checkInContainer}>
          <div className={styles.labelContainer}>
            <label>Check In</label>
          </div>
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
            {errors.includes('startDate') && (
              <Error message="Please select a check-in date" />
            )}
          </div>
          <div className={styles.timePickerContainer}>
            <TimeDropdown
              value={startTime ?? ''}
              times={startTimesLocal}
              onChange={(time: string) => handleStartTime(time)}
            />
            {errors.includes('startTime') && (
              <Error message="Please select a check-in time" />
            )}
          </div>
        </div>

        <div className={styles.checkOutContainer}>
          <div className={styles.labelContainer}>
            <label>Check Out</label>
          </div>
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
            {errors.includes('endDate') && (
              <Error message="Please select an end date" />
            )}
          </div>
          <div className={styles.timePickerContainer}>
            <TimeDropdown
              value={endTime ?? ''}
              times={endTimesLocal}
              onChange={(time: string) => handleEndTime(time)}
            />
            {errors.includes('endTime') && (
              <Error message="Please select a checkout time" />
            )}
          </div>
        </div>
        {errors.includes('minimumNights') && (
          <div className={styles.errorContainer}>
            <Error message="Booking is possible for minimum 1 night" />
          </div>
        )}
        <Button type="submit" customClass={styles.button}>
          Next
        </Button>
      </form>
    </div>
  );
};

export default DateAndTime;
