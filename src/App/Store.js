import { configureStore } from "@reduxjs/toolkit";
import bookContainer from "./BookContainerSlice";
import authReducer from "./AuthSlice";

const store = configureStore({
  reducer: {
    bookContainer,
    auth: authReducer,
  },
});

export default store;