import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { placeOrder } from "../store/userSlice"; 
import "./OrderSummary.scss";

const OrderSummary = ({ cartItems }) => {
    const dispatch = useDispatch();
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            await dispatch(placeOrder()).unwrap(); 
            setOrderSuccess(true);
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="order-successful">
                <h2>Order Successful!</h2>
                <p>Thank you for your order. Your items will be delivered soon.</p>
            </div>
        );
    }

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
                <button
                    className="checkout-button"
                    onClick={handleCheckout}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "CHECKOUT"}
                </button>
            )}
        </div>
    );
};

export default OrderSummary;
