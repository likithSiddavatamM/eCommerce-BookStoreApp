import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapPin, ChevronDown, ShoppingBag } from 'lucide-react';
import { removeFromCart, updateQuantity, setCartData } from '../../App/CartSlice';
import { useNavigate } from 'react-router-dom';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import './Cart.scss';
import LoginSignup from '../LoginSignup/LoginSignup';
import Address from '../Address/Address';
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
  const [selectedAddress, setSelectedAddress] = useState(null);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const syncCart = async () => {
      if (isAuthenticated) {
        try {
          const backendCart = await getCartItemsApi();
          const backendItems = backendCart?.data?.data?.books || [];

          const backendItemIds = backendItems.map((item) => item.bookId);
          const itemsToAdd = cartItems.items.filter((item) => !backendItemIds.includes(item._id));

          // Add items from local cart to backend if they don't exist
          for (const item of itemsToAdd) {
            await addToCartApi(item._id);
            if (item.quantity > 1) {
              await updateCartQuantityApi(item._id, item.quantity - 1);
            }
          }

          // Now fetch updated cart items from backend
          const updatedBackendCart = await getCartItemsApi();
          const updatedBooks = updatedBackendCart.data.data.books || [];
          const quantities = updatedBooks.reduce((acc, book) => {
            acc[book.bookId] = book.quantity;
            return acc;
          }, {});

          // Update Redux store with backend cart data
          dispatch(
            setCartData({
              items: updatedBooks,
              totalBookQuantity: updatedBackendCart.data.data.totalQuantity || 0,
              quantities
            })
          );

        } catch (error) {
          console.error('Error syncing cart:', error);
        }
      }
    };

    syncCart();
  }, [isAuthenticated, cartItems.items, dispatch]);

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
      try {
        await updateCartQuantityApi(id, newQuantity);
      } catch (error) {
        console.error('Error updating cart quantity:', error);
      }
    }
  };

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

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      setShowLoginSignup(true);
    } else {
      // Handle place order for authenticated users
    }
  };

  if (cartItems.items.length === 0) {
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

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>My cart ({cartItems.items?.length})</h1>
          <div className="location-selector">
            <MapPin className="location-icon" size={16} />
            <select defaultValue="current">
              <option value="current">Use current location</option>
              <option value="other">Other Location</option>
            </select>
            <ChevronDown className="dropdown-icon" size={16} />
          </div>
        </div>

        <div className="cart-main">
          <div className="cart-items-container">
            {cartItems.items?.map((item) => (
              <div key={item.bookId} className="cart-item">
                <div className="item-image">
                  <img src={item.bookImage} alt={item.bookName} />
                </div>
                <div className="item-details">
                  <h2>{item.bookName}</h2>
                  <p className="author">{item.author}</p>
                  <div className="price-section">
                    <span className="price">Rs. {item.discountPrice}</span>
                    <span className="original-price">Rs. {item.price}</span>
                  </div>
                  <div className="item-actions">
                    <QuantitySelector
                      id={item.bookId}
                      small
                      handleQuantityChange={handleQuantityChange}
                    />
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.bookId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-actions">
            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
            >
              PLACE ORDER
            </button>
          </div>
        </div>

        <div className="cart-sections">
          <div
            className={`section-header ${showAddress ? 'active' : ''}`}
            onClick={() => setShowAddress(!showAddress)}
          >
            <h3>Address Details</h3>
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

      {showLoginSignup && <LoginSignup onClose={() => setShowLoginSignup(false)} />}
    </div>
  );
  }