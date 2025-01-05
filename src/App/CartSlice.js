import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem('cart');
  return cartData
    ? JSON.parse(cartData)
    : { items: [], totalBookQuantity: {}, quantities: {} };
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(),
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
      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      if (state.quantities[action.payload]) {
        delete state.quantities[action.payload];
      }
      saveCartToLocalStorage(state);
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
      saveCartToLocalStorage(state);
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
      saveCartToLocalStorage(state);
    },
    setTotalBookQuantity: (state, action) => {
      if (typeof state.totalBookQuantity !== 'object') {
        state.totalBookQuantity = {};
      }
      state.totalBookQuantity[action.payload.bookId] = action.payload.quantity;
      saveCartToLocalStorage(state);
    },
    setCartData: (state, action) => {
      // Ensure we're getting complete book objects with all necessary fields
      state.items = (action.payload.data.books || []).map(book => ({
        ...book,
        quantity: action.payload.quantities?.[book._id] || book.quantity || 0
      }));
      
      state.totalBookQuantity = action.payload.totalBookQuantity || {};
      state.quantities = action.payload.quantities || {};
      
      // Clean up any invalid data
      state.items = state.items.filter(item => 
        item._id && 
        item.bookName && 
        typeof item.quantity === 'number'
      );
      
      saveCartToLocalStorage(state);
    },
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
} = cartSlice.actions;

export default cartSlice.reducer;

