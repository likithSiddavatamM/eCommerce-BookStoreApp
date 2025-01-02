import { configureStore } from "@reduxjs/toolkit";
import bookContainer from "./BookContainerSlice";
import authReducer from "./AuthSlice";
import orderReducer from "./OrderSlice";
import userReducer from "./UserSlice"; 

const store = configureStore({
  reducer: {
    bookContainer,
    auth: authReducer,
    orders: orderReducer,
    user: userReducer, 
  },
});

export default store;
