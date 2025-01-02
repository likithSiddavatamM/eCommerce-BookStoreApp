import React from 'react';
import './QuantitySelector.scss';

const QuantitySelector = ({ quantity, setQuantity, small = false }) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
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
      <button className="btn" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
