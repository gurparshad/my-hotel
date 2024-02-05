import {useAppDispatch, useAppSelector} from "../../app/hooks";
import DateAndTime from "../../components/bookingFormSteps/dateAndTime/DateAndTime";
import {setCurrentStep} from "../../features/form/formSlice";
import RoomList from "../../components/bookingFormSteps/roomList/RoomList";
import ProductList from "../../components/bookingFormSteps/productList/ProductList";
import CreateBooking from "../../components/bookingFormSteps/createBooking/CreateBooking";
import {RootState} from "../../app/store";
import ProgressBar from "../../components/progressBar/ProgressBar";
import styles from "./bookRoom.module.scss";

const BookRoom = () => {
  const currentStep: any = useAppSelector((state: RootState) => state.form.form.currentStep);
  const dispatch = useAppDispatch();

  const handleNext = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  const handleBack = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  return (
    <div className={styles.bookRoom}>
      <ProgressBar currentStep={currentStep} totalSteps={5} />
      {currentStep === 1 && <DateAndTime onNext={handleNext} />}
      {currentStep === 2 && <RoomList onNext={handleNext} onBack={handleBack} />}
      {currentStep === 3 && <ProductList onNext={handleNext} onBack={handleBack} />}
      {currentStep === 4 && <CreateBooking onBack={handleBack} />}
    </div>
  );
};

export default BookRoom;
