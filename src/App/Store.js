import { configureStore } from "@reduxjs/toolkit";
import bookContainer from "./BookContainerSlice";
import authReducer from "./AuthSlice";
import searchReducer from "./SearchSlice";
import orderReducer from "./OrderSlice";

const store = configureStore({
  reducer: {
    bookContainer,
    auth: authReducer,
    search: searchReducer, 
    orders: orderReducer
  },
});

export default store;
