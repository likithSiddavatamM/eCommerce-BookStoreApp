// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateQuantity } from '../../App/CartSlice';
// import { updateCartQuantityApi } from '../../Api'; 
// import './QuantitySelector.scss';

// const QuantitySelector = ({ bookId, quantity, setQuantity, small = false }) => {
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   const handleDecrease = () => {
//     if (quantity > 1) {
//       const newQuantity = quantity - 1;
//       setQuantity(newQuantity);
//       dispatch(updateQuantity({ id: bookId, quantity: newQuantity })); 

//       if (isAuthenticated) {
//         updateCartQuantityApi(bookId, newQuantity); 
//       }
//     }
//   };

//   const handleIncrease = () => {
//     const newQuantity = quantity + 1;
//     setQuantity(newQuantity);
//     dispatch(updateQuantity({ id: bookId, quantity: newQuantity })); 

//     if (isAuthenticated) {
//       updateCartQuantityApi(bookId, newQuantity); 
//     }
//   };

//   return (
//     <div className={`quantity-selector ${small ? 'small' : ''}`}>
//       <button
//         className={`btn ${quantity === 1 ? 'disabled' : ''}`}
//         onClick={handleDecrease}
//         disabled={quantity === 1}
//       >
//         -
//       </button>
//       <input
//         type="text"
//         className="quantity-input"
//         value={quantity}
//         readOnly
//       />
//       <button className="btn" onClick={handleIncrease}>
//         +
//       </button>
//     </div>
//   );
// };

// export default QuantitySelector;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity } from '../../App/CartSlice';
import { updateCartQuantityApi, getBookById } from '../../Api'; 
import './QuantitySelector.scss';

const QuantitySelector = ({ bookId, quantity, setQuantity, small = false }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [maxQuantity, setMaxQuantity] = useState(Infinity);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookDetails = await getBookById(bookId);
        setMaxQuantity(bookDetails.quantity);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      updateQuantityHandler(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      updateQuantityHandler(newQuantity);
    }
  };

  const updateQuantityHandler = async (newQuantity) => {
    setQuantity(newQuantity);
    dispatch(updateQuantity({ id: bookId, quantity: newQuantity }));

    if (isAuthenticated) {
      try {
        await updateCartQuantityApi(bookId, newQuantity);
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
        className={`btn ${quantity >= maxQuantity ? 'disabled' : ''}`}
        onClick={handleIncrease}
        disabled={quantity >= maxQuantity}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;

