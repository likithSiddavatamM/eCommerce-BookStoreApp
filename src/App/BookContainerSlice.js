import { createSlice } from "@reduxjs/toolkit";

const BookContainerReducer = createSlice({
  name:'bookContainer',
  initialState:{
    page: parseInt(localStorage.getItem('page')) || 1,
    count: 0,
    sort: parseInt(localStorage.getItem('sort')) || 0,
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
        localStorage.setItem('page', action.payload)
    },
    setValue: (state, action) => {
      state.value=action.payload
    },
    setSort: (state, action) => {
        state.sort=action.payload
        localStorage.setItem('sort', action.payload)
    }
  },
})

export const {setBooks, setPage, setValue, setSort} = BookContainerReducer.actions;

export default BookContainerReducer.reducer;
