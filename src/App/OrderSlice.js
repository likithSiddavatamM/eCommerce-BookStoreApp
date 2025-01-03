import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderApiCall as apiFetchUserOrders } from "../Api";

export const fetchUserOrders = createAsyncThunk(
  "orders/getOrderApiCall",
  async (_, thunkAPI) => {
    try {
      return await apiFetchUserOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectOrders = (state) => state.orders.orders;

export default orderSlice.reducer;
