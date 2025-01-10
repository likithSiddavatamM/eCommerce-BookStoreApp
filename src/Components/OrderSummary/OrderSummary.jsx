import React, { useState } from "react";
import { useDispatch } from "react-redux";
import OrderSuccess from '../OrderSuccess/OrderSuccess';
import { placeOrder } from "../../App/UserSlice"; 
import { setCartEmpty } from '../../App/CartSlice';
import './OrderSummary.scss'
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ cartItems ,selectedAddress}) => {
    const dispatch = useDispatch();
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleCheckout = async () => {
        if (!selectedAddress) {
            // alert("Please select an address before placing the order.");
            return;
          }
        setLoading(true);
        try {
            await dispatch(placeOrder({ cartItems, selectedAddress })).unwrap();
            setOrderSuccess(true);
            console.log("comming")
            navigate('/ordersuccess')
            dispatch(setCartEmpty([]))

        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="order-summary">
            <h2>Order Summary</h2>
            {cartItems?.length === 0 ? (
                <p className="empty-cart">Your cart is empty!</p>
            ) : (
                <div className="order-card">
                    {cartItems?.map((item) => (
                        <div key={item.bookId} className="order-item">
                            <div className="order-item-left">
                                <img src={item.bookImage} alt={item.bookName} className="order-image" />
                                <div className="order-details">
                                    <h3>{item.bookName}</h3>
                                    <p>by {item.author}</p>
                                    <p className="price">
                                        Rs. {item.discountPrice}{" "}
                                        <span className="original-price">Rs. {item.price}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {cartItems?.length > 0 && (
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
