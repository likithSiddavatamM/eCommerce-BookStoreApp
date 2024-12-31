import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchBooks } from "../Api";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const results = await searchBooks(query, page);
      return results;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectSearchResults = (state) => state.search.results;
export const selectSearchStatus = (state) => state.search.status;

export default searchSlice.reducer;
