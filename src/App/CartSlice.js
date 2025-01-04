import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isCartOpen: false,
    totalBookQuantity: {}, // Tracks max quantity available for each book
    quantities: {},        // Tracks current quantity for each book
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      delete state.quantities[action.payload]; // Remove from quantities
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item._id === id);
      if (item) {
        item.quantity = quantity;
      }
      state.quantities[id] = quantity; // Update central quantity
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    clearCart: (state) => {
      state.items = [];
      state.quantities = {};
    },
    mergeCarts: (state, action) => {
      state.items = action.payload;
    },
    setTotalBookQuantity: (state, action) => {
      state.totalBookQuantity[action.payload.bookId] = action.payload.quantity;
    },
    setQuantity: (state, action) => {
      state.quantities[action.payload.bookId] = action.payload.quantity; // Update individual book quantity
    },
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  toggleCart,
  clearCart,
  mergeCarts,
  setTotalBookQuantity,
  setQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
