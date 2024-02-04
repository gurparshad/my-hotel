import {Link} from "react-router-dom";
import Button from "../../components/button/Button";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to my hotel</h2>
      <Link to="/book-room">Book Now</Link>
    </div>
  );
};

export default Home;
