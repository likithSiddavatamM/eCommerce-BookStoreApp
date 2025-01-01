import { configureStore } from "@reduxjs/toolkit";
import bookContainer from "./BookContainerSlice";
import authReducer from "./AuthSlice";
import cartReducer from "./CartSlice"; 
const store = configureStore({
  reducer: {
    bookContainer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;