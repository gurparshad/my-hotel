import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../../utils/types';

const initialState = {
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
  },
});

export const { setCurrentStep, setStartDate, setEndDate, setRoom, addProduct, removeProduct } = formSlice.actions;

export default formSlice.reducer;
