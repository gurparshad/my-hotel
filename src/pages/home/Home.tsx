import {useAppDispatch, useAppSelector} from "../../app/hooks";
import DateAndTime from "../../components/date-picker/DateAndTime";
import {setCurrentStep} from "../../features/form/formSlice";
import RoomList from "../../components/roomList/RoomList";
import ProductList from "../../components/productList/ProductList";
import CreateBooking from "../../components/createBooking/CreateBooking";
import {RootState} from "../../app/store";
import ProgressBar from "../../components/progressBar/ProgressBar";
import "./home.scss";

const Home = () => {
  const currentStep = useAppSelector((state: RootState) => state.form.form.currentStep);
  const dispatch = useAppDispatch();

  const handleNext = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  const handleBack = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  return (
    <div className="home">
      <ProgressBar currentStep={currentStep} totalSteps={5} />
      {currentStep === 1 && <DateAndTime onNext={handleNext} />}
      {currentStep === 2 && <RoomList onNext={handleNext} onBack={handleBack} />}
      {currentStep === 3 && <ProductList onNext={handleNext} onBack={handleBack} />}
      {currentStep === 4 && <CreateBooking onBack={handleBack} />}
    </div>
  );
};

export default Home;
