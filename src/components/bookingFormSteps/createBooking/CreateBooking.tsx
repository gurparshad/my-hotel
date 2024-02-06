import React from "react";
import {useNavigate} from "react-router-dom";
import {MyHotelApi} from "../../../api";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {resetForm} from "../../../features/form/formSlice";
import Button from "../../button/Button";
import styles from "./createBooking.module.scss";
import Summary from "../../summary/Summary";

interface CreateBookingProps {
  onBack: () => void;
}

const CreateBooking: React.FC<CreateBookingProps> = ({onBack}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const myHotelApi = new MyHotelApi();

  const formData = useAppSelector((state: RootState) => state.form.form.formData);
  const data = {
    room: formData.room,
    products: formData.products,
    utcCheckInDateTime: formData.utcCheckInDateTime,
    utcCheckOutDateTime: formData.utcCheckOutDateTime,
  };

  const handleSubmit = async () => {
    try {
      const response = await myHotelApi.submitBooking(data);
      localStorage.setItem("bookingData", JSON.stringify(response));
      dispatch(resetForm());
      navigate("/success");
    } catch (error) {
      console.error("Error submitting booking:", error);
      throw error;
    }
  };

  return (
    <div className={styles.createBooking}>
      <Summary data={data} />
      <div className={styles.buttonsContainer}>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={handleSubmit}>Create Booking</Button>
      </div>
    </div>
  );
};

export default CreateBooking;
