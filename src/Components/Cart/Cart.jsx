import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapPin, ChevronDown, ShoppingBag } from 'lucide-react';
import { removeFromCart, updateQuantity, setCartData } from '../../App/CartSlice';
import { useNavigate } from 'react-router-dom';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import './Cart.scss';
import LoginSignup from '../LoginSignup/LoginSignup';
import {
  getCartItemsApi,
  addToCartApi,
  removeFromCartApi,
  updateCartQuantityApi
} from '../../Api';

export default function Cart() {
  const [showAddress, setShowAddress] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showLoginSignup, setShowLoginSignup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state selectors
  const cartItems = useSelector((state) => state.cart.items);
  const totalBookQuantity = useSelector((state) => state.cart.totalBookQuantity);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Sync cart data with backend after login
  useEffect(() => {
    const syncCart = async () => {
      if (isAuthenticated) {
        try {
          console.log("Syncing cart...");
  
          // Fetch backend cart after login
          const backendCart = await getCartItemsApi();
          const backendItems = backendCart.data.books || [];
          console.log("Backend cart items:", backendItems);
  
          // Get the local cart (from localStorage)
          const localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
          console.log("Local cart items:", localCart.items);
  
          // Sync the cart items from the frontend (local cart) to the backend
          for (const localItem of localCart.items) {
            const backendItem = backendItems.find(item => item._id === localItem._id);
  
            if (backendItem) {
              // If the book is already in the backend and the frontend, do nothing and keep frontend quantity
              console.log(`Keeping frontend quantity for ${localItem.bookName}`);
            } else {
              // If the item is not in the backend, add it to the backend
              console.log(`Adding ${localItem.bookName} to the backend`);
              await addToCartApi(localItem._id);
            }
          }
  
          // After syncing the local cart to the backend, fetch the updated backend cart
          const updatedBackendCart = await getCartItemsApi();
          console.log("Updated backend cart:", updatedBackendCart);
  
          // Update Redux store with the updated backend cart and keep the frontend quantity intact
          dispatch(
            setCartData({
              items: updatedBackendCart.data.books || [],
              totalBookQuantity: updatedBackendCart.totalBookQuantity || 0,
            })
          );
  
          console.log("Cart sync complete.");
        } catch (error) {
          console.error("Error syncing cart:", error);
        }
      }
    };
  
    syncCart();
  }, [isAuthenticated, dispatch]);
  

  // Handle quantity change
  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity >= 1) {
      // Update Redux state first
      dispatch(updateQuantity({ id, quantity: newQuantity }));

      // Then update the quantity in the backend
      try {
        await updateCartQuantityApi(id, newQuantity);
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    }
  };

  // Handle item removal
  const handleRemoveItem = async (id) => {
    try {
      if (isAuthenticated) {
        await removeFromCartApi(id);
      }
      dispatch(removeFromCart(id));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Render empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <ShoppingBag size={64} className="cart-empty-icon" />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any books to your cart yet</p>
        <button className="browse-books-btn" onClick={() => navigate('/')}>
          Browse Books
        </button>
      </div>
    );
  }

  // Main cart component
  return (
    <div className="cart-page">
      {/* Header Section */}
      <div className="cart-header">
        <h1>My cart ({cartItems.length})</h1>
        <div className="location-selector">
          <MapPin className="location-icon" size={16} />
          <select defaultValue="current">
            <option value="current">Use current location</option>
            <option value="other">Other Location</option>
          </select>
          <ChevronDown className="dropdown-icon" size={16} />
        </div>
      </div>

      {/* Cart Items */}
      <div className="cart-content">
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <div className="item-image">
              <img src={item.bookImage} alt={item.bookName} />
            </div>
            <div className="item-details">
              <h2>{item.bookName}</h2>
              <p className="author">{item.author}</p>
              <div className="price-section">
                <span className="price">Rs. {item.discountPrice}</span>
              </div>
              <div className="item-actions">
                <QuantitySelector
                  id={item._id}
                  small
                  handleQuantityChange={handleQuantityChange}
                />
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Place Order Button */}
        <button
          className="place-order-btn"
          onClick={() => setShowLoginSignup(true)}
        >
          PLACE ORDER
        </button>
        {showLoginSignup && <LoginSignup onClose={() => setShowLoginSignup(false)} />}

        {/* Additional Sections: Address and Summary */}
        <div className="cart-sections">
          <div
            className={`section-header ${showAddress ? 'active' : ''}`}
            onClick={() => setShowAddress(!showAddress)}
          >
            <h2>Address Details</h2>
            <ChevronDown className="section-icon" size={16} />
          </div>
          {showAddress && <div className="section-content">{/* Address Form */}</div>}

          <div
            className={`section-header ${showSummary ? 'active' : ''}`}
            onClick={() => setShowSummary(!showSummary)}
          >
            <h2>Order summary</h2>
            <ChevronDown className="section-icon" size={16} />
          </div>
          {showSummary && <div className="section-content">{/* Order Summary */}</div>}
        </div>
      </div>
    </div>
  );
}
