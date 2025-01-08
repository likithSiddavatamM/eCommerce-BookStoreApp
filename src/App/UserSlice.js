import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  loginApiCall, 
  signupApiCall, 
  fetchUserDataApiCall, 
  fetchCustomerDetailsApiCall,
  getOrderApiCall,
  createUserAddressApiCall, 
  updateUserAddressApiCall
} from '../Api';

// Thunks for API calls
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await signupApiCall(userData);
      return response.data; 
    } catch (error) {
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
      const response = await fetchCustomerDetailsApiCall("customer");
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createAddress = createAsyncThunk(
  "user/createAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await createUserAddressApiCall(addressData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "user/updateAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await updateUserAddressApiCall(addressData);
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
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetails: null,
    accessToken: null,
    customerDetails: [],
    orders: [],
    addresses: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userDetails = null;
      state.accessToken = null;
      state.customerDetails = [];
      state.addresses = [];
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userDetails = action.payload.user; 
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Login User
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userDetails = action.payload.user;
        state.accessToken = action.payload.accessToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Fetch User Details
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.error = null;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Fetch Customer Details
      .addCase(fetchCustomerDetails.fulfilled, (state, action) => {
        state.customerDetails = action.payload;
        state.error = null;
      })
      .addCase(fetchCustomerDetails.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Create Address
      .addCase(createAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
        state.error = null;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update Address
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(
          (addr) => addr._id === action.payload._id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
