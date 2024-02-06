import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType, SelectedProduct, SelectedRoom } from '../../types';

interface FormData {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  room: SelectedRoom;
  products: SelectedProduct[];
  utcCheckInDateTime: string;
  utcCheckOutDateTime: string;
}

interface FormState {
  currentStep: number;
  formData: FormData;
}

const initialState: FormState = {
  currentStep: 1,
  formData: {
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    utcCheckInDateTime: '',
    utcCheckOutDateTime: '',
    room: {
      id: 0,
      image: '',
      name: '',
      pricePerNight: 0,
      priceTaxPercentage: 0,
      discountedPrice: 0,
      numberOfNights: 0,
      totalPrice: 0,
    },
    products: [],
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentStep: (state: FormState, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    // TODO: The next 6 methods can be converted to 1 general method as they all accept a string, setField that will accept key and value payload
    setStartDate: (state: FormState, action: PayloadAction<string>) => {
      state.formData.startDate = action.payload;
    },
    setEndDate: (state: FormState, action: PayloadAction<string>) => {
      state.formData.endDate = action.payload;
    },
    setStartTime: (state: FormState, action: PayloadAction<string>) => {
      state.formData.startTime = action.payload;
    },
    setEndTime: (state: FormState, action: PayloadAction<string>) => {
      state.formData.endTime = action.payload;
    },
    setUtcCheckInDateTime: (
      state: FormState,
      action: PayloadAction<string>,
    ) => {
      state.formData.utcCheckInDateTime = action.payload;
    },
    setUtcCheckOutDateTime: (
      state: FormState,
      action: PayloadAction<string>,
    ) => {
      state.formData.utcCheckOutDateTime = action.payload;
    },
    setRoom: (state: FormState, action: PayloadAction<SelectedRoom>) => {
      state.formData.room = action.payload;
    },
    addProduct: (state: FormState, action: PayloadAction<SelectedProduct>) => {
      state.formData.products.push(action.payload);
    },
    removeProduct: (state: FormState, action: PayloadAction<ProductType>) => {
      state.formData.products = state.formData.products.filter(
        (product) => product.id !== action.payload.id,
      );
    },
    updateProduct: (
      state: FormState,
      action: PayloadAction<SelectedProduct>,
    ) => {
      const { id } = action.payload;
      const updatedProducts = state.formData.products.map(
        (product: SelectedProduct) => {
          if (product.id === id) {
            return {
              ...action.payload,
            };
          }
          return product;
        },
      );
      state.formData.products = updatedProducts;
    },
    updateRoom: (state: FormState, action: PayloadAction<SelectedRoom>) => {
      if (state.formData.room) {
        state.formData.room = { ...state.formData.room, ...action.payload };
      }
    },
    resetForm: () => {
      return initialState;
    },
  },
});

export const {
  setCurrentStep,
  setStartDate,
  setEndDate,
  setStartTime,
  setEndTime,
  setRoom,
  updateRoom,
  addProduct,
  removeProduct,
  updateProduct,
  setUtcCheckInDateTime,
  setUtcCheckOutDateTime,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
