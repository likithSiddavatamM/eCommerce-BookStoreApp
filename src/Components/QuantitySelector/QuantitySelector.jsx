import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, setQuantity } from '../../App/CartSlice';
import { updateCartQuantityApi } from '../../Api';
import './QuantitySelector.scss';

const QuantitySelector = ({ small = false, id }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const totalBookQuantity = useSelector((state) => state.cart.totalBookQuantity);
  const quantity = useSelector((state) => state.cart.quantities[id] || 0);

  useEffect(() => {
    // Initialize quantity in Redux store if it doesn't exist
    if (quantity === 0) {
      dispatch(setQuantity({ bookId: id, quantity: 0 }));
    }
  }, [dispatch, id, quantity]);

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantityHandler(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < totalBookQuantity[id]) {
      updateQuantityHandler(quantity + 1);
    }
  };

  const updateQuantityHandler = async (newQuantity) => {
    const quantityDifference = newQuantity - quantity; // Calculate the incremental change
    dispatch(setQuantity({ bookId: id, quantity: newQuantity }));
    dispatch(updateQuantity({ id, quantity: newQuantity }));

    if (isAuthenticated && quantityDifference !== 0) {
      try {
        await updateCartQuantityApi(id, quantityDifference); // Sync with server
      } catch (error) {
        console.error('Error updating cart quantity:', error);
      }
    }
  };

  return (
    <div className={`quantity-selector ${small ? 'small' : ''}`}>
      <button
        className={`btn ${quantity === 1 ? 'disabled' : ''}`}
        onClick={handleDecrease}
        disabled={quantity === 1}
      >
        -
      </button>
      <input
        type="text"
        className="quantity-input"
        value={quantity}
        readOnly
      />
      <button 
        className={`btn ${quantity >= totalBookQuantity[id] ? 'disabled' : ''}`}
        onClick={handleIncrease}
        disabled={quantity >= totalBookQuantity[id]}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;

