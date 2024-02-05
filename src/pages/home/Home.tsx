import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import Button from "../../components/button/Button";
import styles from "./home.module.scss";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/book-room");
  };
  return (
    <div className={styles.home}>
      <h2>Welcome to my hotel</h2>
      <Button onClick={handleClick}>Book Now</Button>
    </div>
  );
};

export default Home;
