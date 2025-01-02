import React from "react";
import "./OrderSummary.scss";

const OrderSummary = ({ cartItems }) => {
    return (
        <div className="order-summary-container">
            <h2>Order Summary</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.title} className="book-image" />
                        <div className="book-details">
                            <h3>{item.title}</h3>
                            <p>by {item.author}</p>
                            <p className="price">
                                Rs. {item.price}{" "}
                                <span className="original-price">Rs. {item.originalPrice}</span>
                            </p>
                        </div>
                    </div>
                ))
            )}
            {cartItems.length > 0 && (
                <button className="checkout-button">CHECKOUT</button>
            )}
        </div>
    );
};

export default OrderSummary;
