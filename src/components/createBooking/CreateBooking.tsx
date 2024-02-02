import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {persistor, RootState} from "../../app/store";
import {resetForm} from "../../features/form/formSlice";
import {ProductType} from "../../utils/types";
import Button from "../button/Button";
import Product from "../product/Product";
import Room from "../room/Room";

interface CreateBookingProps {
  onBack: () => void;
}

const CreateBooking: React.FC<CreateBookingProps> = ({onBack}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = () => {
    // persistor.purge(["form"]);
    dispatch(resetForm());
    navigate("/success");
  };
  const formData = useAppSelector((state: RootState) => state.form.form.formData);
  const {startDate, endDate, room, products} = formData;
  return (
    <div>
      <h2>Create Booking</h2>
      <p>Please check the details</p>
      <div>
        {/* @ts-ignore */}
        <p>Start Date: {startDate.toString()}</p>
      </div>
      <div>
        {/* @ts-ignore */}
        <p>End Date: {endDate.toString()}</p>
      </div>
      <div>
        <p>Room details</p>
        {/* <Room /> */}
      </div>
      <div>
        <p>Products</p>
        {/* {products.map((item: ProductType) => (
          <Product product={item} />
        ))} */}
      </div>
      <Button onClick={onBack}>Back</Button>
      <Button onClick={handleSubmit}>Create Booking</Button>
    </div>
  );
};

export default CreateBooking;
