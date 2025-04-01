import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer, // Assign cartReducer to manage the cart slice
  },
});

export default store;
