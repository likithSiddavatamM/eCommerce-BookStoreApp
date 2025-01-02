import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  loginApiCall, 
  signupApiCall, 
  fetchUserDataApiCall, 
  fetchCustomerDetailsApiCall 
} from '../Api';

// Thunks for API calls
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await signupApiCall(userData);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApiCall(credentials);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserDataApiCall();
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCustomerDetails = createAsyncThunk(
  'user/fetchCustomerDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCustomerDetailsApiCall();
      return response.data; 
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
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userDetails = null;
      state.accessToken = null;
      state.customerDetails = [];
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
        state.accessToken = action.payload.token;
        localStorage.setItem('accessToken', action.payload.token);
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
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
