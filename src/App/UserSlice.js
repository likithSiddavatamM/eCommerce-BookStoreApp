import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  loginApiCall, 
  signupApiCall, 
  fetchUserDataApiCall, 
  fetchCustomerDetailsApiCall,
  getOrderApiCall,
  placeOrderApi, 
} from '../Api';

// Thunks for API calls
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await signupApiCall(userData);
      return response.data; 
    }  catch (error) {
      if (error.response?.status === 409) {
        return rejectWithValue("Email already exists. Please use a different email.");
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApiCall(credentials);
      return response.data.data; 
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue("Invalid email or password.");
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserDataApiCall('users');
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCustomerDetails = createAsyncThunk(
  'user/fetchCustomerDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCustomerDetailsApiCall('customer');
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  'user/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrderApiCall('orders');
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response.data?.data || error.message);
    }
  }
);

export const placeOrder = createAsyncThunk(
  'user/placeOrder',
  async ({ cartItems, selectedAddress }, { rejectWithValue }) => {
    try {
      const response = await placeOrderApi({
        items: cartItems.map((item) => ({
          bookId: item.bookId,
          quantity: item.quantity,
        })),
        address: selectedAddress,
      });
      const response2 = await getOrderApiCall('orders');
      return response2.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetails: null,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    customerDetails: [],
    orders: [],
    status: 'idle',
    isAuthenticated: !!localStorage.getItem('accessToken'),
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userDetails = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.customerDetails = [];
      state.orders = [];       
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userDetails = action.payload.user;
        state.isAuthenticated = true; 
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Login User
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userDetails = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Fetch User Details
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Fetch Customer Details
      .addCase(fetchCustomerDetails.fulfilled, (state, action) => {
        state.customerDetails = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchCustomerDetails.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload; 
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orders=action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
