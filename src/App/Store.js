import { configureStore } from "@reduxjs/toolkit";
import bookContainer from "./BookContainerSlice"
const store = configureStore({
    reducer:{
        bookContainer: bookContainer,
    }
})

export default store;