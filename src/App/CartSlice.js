import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalBookQuantity: {}, quantities: {}, orderSuccess: false },

  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        // Ensure we have all the book details
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1
        });
      }
      state.quantities[action.payload._id] =
        (state.quantities[action.payload._id] || 0) + (action.payload.quantity || 1);
      //saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.bookId !== action.payload);
      if (state.quantities[action.payload]) {
        delete state.quantities[action.payload];
      }
      //saveCartToLocalStorage(state);
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setQuantity: (state, action) => {
      state.quantities[action.payload.bookId] = action.payload.quantity;
      // Update the quantity in items array as well
      const item = state.items.find(item => item._id === action.payload.bookId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
     // saveCartToLocalStorage(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item._id === id);
      if (itemIndex !== -1) {
        if (quantity > 0) {
          state.items[itemIndex].quantity = quantity;
          state.quantities[id] = quantity;
        } else {
          state.items.splice(itemIndex, 1);
          delete state.quantities[id];
        }
      }
    },
    setTotalBookQuantity: (state, action) => {
      if (typeof state.totalBookQuantity !== 'object') {
        state.totalBookQuantity = {};
      }
      state.totalBookQuantity[action.payload.bookId] = action.payload.quantity;
    },
    setCartEmpty:  (state, action) => {
      state.items=action.payload;
    },
    setCartData: (state, action) => {
      console.log(action.payload.quantities,"action.payload.itemsaction.payload.itemsaction.payload.items")
      state.items = action.payload.items;
      state.totalBookQuantity = action.payload.totalBookQuantity || {};
      state.quantities = action.payload.quantities || {};
      console.log(state.items,"state.items")      
    },
    setOrderSuccessTrue: (state, action) => {
      state.orderSuccess = true
    },
    setOrderSuccessFalse: (state, action) => {
      state.orderSuccess = false
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  toggleCart,
  setQuantity,
  updateQuantity,
  setTotalBookQuantity,
  setCartData,
  setCartEmpty,
  setOrderSuccessTrue,
  setOrderSuccessFalse
} = cartSlice.actions;

export default cartSlice.reducer;

