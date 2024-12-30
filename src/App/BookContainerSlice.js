import { createSlice } from "@reduxjs/toolkit";

const BookContainerReducer = createSlice({
    name:'bookContainer',
    initialState:{
        page: 1,
        count: 0,
        books: []
    },
    reducers: {
        setBooks: (state, action) => {
          state.books=action.payload.data;
          state.count=action.payload.count;
        },
        setPage: (state, action) => {
            state.page=action.payload
        }
      },
})

export const {setBooks, setPage} = BookContainerReducer.actions;

export default BookContainerReducer.reducer;
