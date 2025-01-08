import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (_, { getState }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('Not authenticated');

  const response = await fetch('http://localhost:7000/api/v1/wishlist', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch wishlist');
  }

  const data = await response.json();
  return data.data.books;
});

export const removeWishlistItem = createAsyncThunk('wishlist/removeWishlistItem', async (BookId, { getState }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('Not authenticated');

  const response = await fetch(`http://localhost:7000/api/v1/wishlist/${BookId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to remove item');
  }

  return BookId;
});

export const addWishlistItem = createAsyncThunk('wishlist/addWishlistItem', async (bookId, { getState }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('Not authenticated');

  const response = await fetch(`http://localhost:7000/api/v1/wishlist/${bookId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to add item');
  }

  const data = await response.json();
  return data.data.book;
});


const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload || [];
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
     
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default wishlistSlice.reducer;
