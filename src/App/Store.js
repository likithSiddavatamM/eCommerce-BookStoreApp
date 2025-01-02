import { configureStore } from "@reduxjs/toolkit";
import bookContainer from "./BookContainerSlice";
import authReducer from "./AuthSlice";
import wishlistReducer from "./wishlistSlice";

const store = configureStore({
  reducer: {
    bookContainer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
});

export default store;