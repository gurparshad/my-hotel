import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../../components/button/Button";
import {BookingData} from "../../types";
import Summary from "../../components/summary/Summary";
import styles from "./success.module.scss";

const Success = () => {
  const [data, setData] = useState<BookingData>();

  useEffect(() => {
    const bookingData = localStorage.getItem("bookingData");
    if (bookingData) {
      const parsedFormData = JSON.parse(bookingData);
      setData(parsedFormData);
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div className={styles.success}>
      <h2>Booking successful</h2>
      {data ? <Summary data={data} /> : <h4>Your Booking is successfull</h4>}
      <div className={styles.buttonsContainer}>
        <Button onClick={() => navigate("/book-room")}>Book Another Room</Button>
        <Button onClick={() => navigate("/")}>Home</Button>
      </div>
    </div>
  );
};

export default Success;
