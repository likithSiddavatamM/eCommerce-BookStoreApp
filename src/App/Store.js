import { configureStore } from "@reduxjs/toolkit";
import bookContainer from "./BookContainerSlice";
import authReducer from "./AuthSlice";
import searchReducer from "./SearchSlice";

const store = configureStore({
  reducer: {
    bookContainer,
    auth: authReducer,
    search: searchReducer, 
  },
});

export default store;
