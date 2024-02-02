import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import formReducer from '../features/form/formSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['form'],
};

const rootReducer = combineReducers({
  form: formReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: {
    form: persistedReducer,
  },
})

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>