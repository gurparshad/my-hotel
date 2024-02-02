import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType, RoomType } from '../../utils/types';

interface FormData {
  startDate: Date | null;
  endDate: Date | null;
  room: RoomType | null;
  products: ProductType[];
}

interface RootState {
  currentStep: number;
  formData: FormData;
}

const initialState: RootState = {
  currentStep: 1,
  formData: {
    startDate: null,
    endDate: null,
    room: null,
    products: [],
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setStartDate: (state, action) => {
      console.log("in slice -->", action.payload)
      console.log("in slicetype -->", typeof (action.payload))
      state.formData.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.formData.endDate = action.payload;
    },
    setRoom: (state, action) => {
      state.formData.room = action.payload;
    },
    addProduct: (state, action: PayloadAction<ProductType>) => {
      // @ts-ignore
      state.formData.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<ProductType>) => {
      // @ts-ignore
      state.formData.products = state.formData.products.filter(product => product.id !== action.payload.id);
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const { setCurrentStep, setStartDate, setEndDate, setRoom, addProduct, removeProduct, resetForm } = formSlice.actions;

export default formSlice.reducer;
