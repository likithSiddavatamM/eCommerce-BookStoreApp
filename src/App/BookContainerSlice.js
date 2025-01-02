import { createSlice } from "@reduxjs/toolkit";

const BookContainerReducer = createSlice({
    name:'bookContainer',
    initialState:{
        page: 1,
        count: 0,
        books: [],
        value: '',
    },
    reducers: {
        setBooks: (state, action) => {
          state.books=action.payload.data;
          state.count=action.payload.count;
        },
        setPage: (state, action) => {
            state.page=action.payload
        },
        setValue: (state, action) => {
          state.value=action.payload
      }
      },
})

export const {setBooks, setPage, setValue} = BookContainerReducer.actions;

export default BookContainerReducer.reducer;
