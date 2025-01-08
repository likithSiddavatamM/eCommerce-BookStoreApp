// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { MapPin, ChevronDown, ShoppingBag } from 'lucide-react';
// import { removeFromCart, updateQuantity } from '../../App/CartSlice';
// import { useNavigate } from 'react-router-dom';
// import QuantitySelector from '../QuantitySelector/QuantitySelector';
// import './Cart.scss';
// import LoginSignup from '../LoginSignup/LoginSignup';
// export default function Cart() {
//   const [showAddress, setShowAddress] = useState(false);
//   const [showSummary, setShowSummary] = useState(false);
//   const [showLoginSignup, setShowLoginSignup] = useState(false); 
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const cartItems = useSelector((state) => state.cart.items);
//   const handleQuantityChange = (id, newQuantity) => {
//     if (newQuantity >= 1) {
//       dispatch(updateQuantity({ id, quantity: newQuantity }));
//     }
//   };

//   const handleRemoveItem = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="cart-empty">
//         <ShoppingBag size={64} className="cart-empty-icon" />
//         <h2>Your cart is empty</h2>
//         <p>Looks like you haven't added any books to your cart yet</p>
//         <button className="browse-books-btn" onClick={() => navigate('/')}>
//           Browse Books
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-page">
//       <div className="cart-header">
//         <h1>My cart ({cartItems.length})</h1>
//         <div className="location-selector">
//           <MapPin className="location-icon" size={16} />
//           <select defaultValue="current">
//             <option value="current">Use current location</option>
//             <option value="other">Other Location</option>
//           </select>
//           <ChevronDown className="dropdown-icon" size={16} />
//         </div>
//       </div>

//       <div className="cart-content">
//         {cartItems.map((item) => (
//           <div key={item._id} className="cart-item">
//             <div className="item-image">
//               <img src={item.bookImage} alt={item.bookName} />
//             </div>
//             <div className="item-details">
//               <h2>{item.bookName}</h2>
//               <p className="author">{item.author}</p>
//               <div className="price-section">
//                 <span className="price">Rs. {item.discountPrice}</span>
//               </div>
//               <div className="item-actions">
//                 <QuantitySelector
//                   quantity={item.quantity}
//                   setQuantity={(newQuantity) => handleQuantityChange(item._id, newQuantity)}
//                   small
//                 />
//                 <button
//                   className="remove-btn"
//                   onClick={() => handleRemoveItem(item._id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}

//         <button className="place-order-btn" onClick={() => setShowLoginSignup(true)}>
//           PLACE ORDER
//         </button>

//         {showLoginSignup && (
//           <LoginSignup onClose={() => setShowLoginSignup(false)} />
//         )}

//         <div className="cart-sections">
//           <div
//             className={`section-header ${showAddress ? 'active' : ''}`}
//             onClick={() => setShowAddress(!showAddress)}
//           >
//             <h2>Address Details</h2>
//             <ChevronDown className="section-icon" size={16} />
//           </div>
//           {showAddress && (
//             <div className="section-content">
//               {/* Address form will be added here */}
//             </div>
//           )}

//           <div
//             className={`section-header ${showSummary ? 'active' : ''}`}
//             onClick={() => setShowSummary(!showSummary)}
//           >
//             <h2>Order summary</h2>
//             <ChevronDown className="section-icon" size={16} />
//           </div>
//           {showSummary && (
//             <div className="section-content">
//               {/* Order summary will be added here */}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { MapPin, ChevronDown, ShoppingBag } from 'lucide-react';
// import { removeFromCart, updateQuantity } from '../../App/CartSlice';
// import { useNavigate } from 'react-router-dom';
// import QuantitySelector from '../QuantitySelector/QuantitySelector';
// import './Cart.scss';
// import LoginSignup from '../LoginSignup/LoginSignup';
// import Address from '../Address/Address';

// export default function Cart() {
//   const [showAddress, setShowAddress] = useState(false);
//   const [showSummary, setShowSummary] = useState(false);
//   const [showLoginSignup, setShowLoginSignup] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const cartItems = useSelector((state) => state.cart.items);

//   const handleQuantityChange = (id, newQuantity) => {
//     if (newQuantity >= 1) {
//       dispatch(updateQuantity({ id, quantity: newQuantity }));
//     }
//   };

//   const handleRemoveItem = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const handleAddressSelect = (address) => {
//     setSelectedAddress(address);
//     setShowAddress(false);
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="cart-empty">
//         <ShoppingBag size={64} className="cart-empty-icon" />
//         <h2>Your cart is empty</h2>
//         <p>Looks like you haven't added any books to your cart yet</p>
//         <button className="browse-books-btn" onClick={() => navigate('/')}>
//           Browse Books
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-page">
//       <div className="cart-header">
//         <h1>My cart ({cartItems.length})</h1>
//         <div className="location-selector" onClick={() => setShowAddress(!showAddress)}>
//           <MapPin className="location-icon" size={16} />
//           <span>
//             {selectedAddress
//               ? `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state}`
//               : 'Select Address'}
//           </span>
//           <ChevronDown className="dropdown-icon" size={16} />
//         </div>
//       </div>

//       <div className="cart-content">
//         {cartItems.map((item) => (
//           <div key={item._id} className="cart-item">
//             <div className="item-image">
//               <img src={item.bookImage} alt={item.bookName} />
//             </div>
//             <div className="item-details">
//               <h2>{item.bookName}</h2>
//               <p className="author">{item.author}</p>
//               <div className="price-section">
//                 <span className="price">Rs. {item.discountPrice}</span>
//               </div>
//               <div className="item-actions">
//                 <QuantitySelector
//                   quantity={item.quantity}
//                   setQuantity={(newQuantity) => handleQuantityChange(item._id, newQuantity)}
//                   small
//                 />
//                 <button
//                   className="remove-btn"
//                   onClick={() => handleRemoveItem(item._id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}

//         <button className="place-order-btn" onClick={() => setShowLoginSignup(true)}>
//           PLACE ORDER
//         </button>

//         {showLoginSignup && (
//           <LoginSignup onClose={() => setShowLoginSignup(false)} />
//         )}

//         <div className="cart-sections">
//           <div
//             className={`section-header ${showAddress ? 'active' : ''}`}
//             onClick={() => setShowAddress(!showAddress)}
//           >
//             <h3>Address Details</h3>
//             <ChevronDown className="section-icon" size={16} />
//           </div>
//           {showAddress && (
//             <div className="section-content">
//               <Address onSelectAddress={handleAddressSelect} />                 
//             </div>
//           )}
//           <div className="section-content">
//             <h3>Selected Address</h3>
//             <div>
//               <span>
//                 {selectedAddress
//                   ? `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state}`
//                   : 'Select Address'}
//               </span>
//             </div>
//             <div>
//               <button className="place-order-btn-cnt">
//                   CONTINUE
//                 </button>
//               </div>
//             </div>
//           <div
//             className={`section-header ${showSummary ? 'active' : ''}`}
//             onClick={() => setShowSummary(!showSummary)}
//           >
//             <h2>Order summary</h2>
//             <ChevronDown className="section-icon" size={16} />
//           </div>
//           {showSummary && (
//             <div className="section-content">
//               {/* Order summary will be added here */}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapPin, ChevronDown, ShoppingBag } from 'lucide-react';
import { removeFromCart, updateQuantity } from '../../App/CartSlice';
import { useNavigate } from 'react-router-dom';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import './Cart.scss';
import LoginSignup from '../LoginSignup/LoginSignup';
import Address from '../Address/Address';

export default function Cart() {
  const [showAddress, setShowAddress] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showLoginSignup, setShowLoginSignup] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setShowAddress(false);
  };

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

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>My cart ({cartItems.length})</h1>
        <div className="location-selector" onClick={() => setShowAddress(!showAddress)}>
          <MapPin className="location-icon" size={16} />
          <span>
            {selectedAddress
              ? `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state}`
              : 'Select Address'}
          </span>
          <ChevronDown className="dropdown-icon" size={16} />
        </div>
      </div>

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
                  quantity={item.quantity}
                  setQuantity={(newQuantity) => handleQuantityChange(item._id, newQuantity)}
                  small
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

        <button className="place-order-btn" onClick={() => setShowLoginSignup(true)}>
          PLACE ORDER
        </button>

        {showLoginSignup && (
          <LoginSignup onClose={() => setShowLoginSignup(false)} />
        )}

        <div className="cart-sections">
          <div
            className={`section-header ${showAddress ? 'active' : ''}`}
            onClick={() => setShowAddress(!showAddress)}
          >
            <h3>Address Details</h3>
            <ChevronDown className="section-icon" size={16} />
          </div>
          {showAddress && (
            <div className="section-content">
              <Address onSelectAddress={handleAddressSelect} selectedAddress={selectedAddress} />
            </div>
          )}
          <div className="section-content">
            <h3>Selected Address</h3>
            <div className="address-item">
              {selectedAddress ? (
                <>
                  <input
                    type="radio"
                    id={`selected-address-${selectedAddress.id}`}
                    checked={true}
                    onChange={() => {}}
                  />
                  <label htmlFor={`selected-address-${selectedAddress.id}`}>
                    {`${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state}`}
                  </label>
                </>
              ) : (
                <span>Select Address</span>
              )}
            </div>
            <div>
              <button className="place-order-btn-cnt">
                CONTINUE
              </button>
            </div>
          </div>
          <div
            className={`section-header ${showSummary ? 'active' : ''}`}
            onClick={() => setShowSummary(!showSummary)}
          >
            <h2>Order summary</h2>
            <ChevronDown className="section-icon" size={16} />
          </div>
          {showSummary && (
            <div className="section-content">
              {/* Order summary will be added here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

