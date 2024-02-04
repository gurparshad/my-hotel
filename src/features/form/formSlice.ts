import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType, SelectedProduct, SelectedRoom } from '../../utils/types';

interface FormData {
  startDate: Date | null;
  endDate: Date | null;
  startTime: string | null;
  endTime: string | null;
  room: SelectedRoom | null;
  products: SelectedProduct[];
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
    startTime: null,
    endTime: null,
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
    setStartTime: (state, action) => {
      state.formData.startTime = action.payload;
    },
    setEndTime: (state, action) => {
      state.formData.endTime = action.payload;
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
    updateProduct: (state, action: PayloadAction<SelectedProduct>) => {
      const { id } = action.payload;
      const updatedProducts = state.formData.products.map(product => {
        if (product.id === id) {
          return {
            ...action.payload
          };
        }
        return product;
      });
      state.formData.products = updatedProducts;
    },
    updateRoom: (state, action: PayloadAction<SelectedRoom>) => {
      if (state.formData.room) {
        state.formData.room = { ...state.formData.room, ...action.payload };
      }
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const { setCurrentStep, setStartDate, setEndDate, setStartTime, setEndTime, setRoom, updateRoom, addProduct, removeProduct, updateProduct, resetForm } = formSlice.actions;

export default formSlice.reducer;
