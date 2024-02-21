import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MyHotelApi } from '../../../api';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { resetForm } from '../../../features/form/formSlice';
import Button from '../../button/Button';
import styles from './createBooking.module.scss';
import Summary from '../../summary/Summary';

interface CreateBookingProps {
  onBack: () => void;
}

const CreateBooking: React.FC<CreateBookingProps> = ({ onBack }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const myHotelApi = new MyHotelApi();

  const formData = useAppSelector(
    (state: RootState) => state.form.form.formData,
  );
  const data = {
    room: formData.room,
    products: formData.products,
    utcCheckInDateTime: formData.utcCheckInDateTime,
    utcCheckOutDateTime: formData.utcCheckOutDateTime,
  };

  const handleSubmit = async () => {
    try {
      const response = await myHotelApi.submitBooking(data);
      // but in ideal scenerio. this data should not be stored in the local or session storage, due to security reasons.
      // there are few options.
      // 1. dont send the detials directly send the email to the user.
      // 2. return the booking ID that can be stored and used to get the booking details. // can be stored in teh cookies.
      localStorage.setItem('bookingData', JSON.stringify(response));
      dispatch(resetForm());
      navigate('/success');
    } catch (error) {
      console.error('Error submitting booking:', error);
      throw error;
    }
  };

  return (
    <div className={styles.createBooking}>
      <h2>Check Details</h2>
      <Summary data={data} />
      <div className={styles.buttonsContainer}>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={handleSubmit}>Create Booking</Button>
      </div>
    </div>
  );
};

export default CreateBooking;
