import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrdersApiCall } from "../../Api"; // Make sure getOrders is properly imported
import "./OrderHistory.scss";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrders = async () => {
        try {
          const response = await getOrdersApiCall();
          console.log("Orders Response:", response);
          setOrders(response.data || []);
        } catch (err) {
          console.error('Failed to fetch orders:', err);
          setError("Failed to load orders. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    } else {
      setLoading(false); // Stop loading if not authenticated
    }
  }, [isAuthenticated]);

  // Log orders when it updates
  useEffect(() => {
    console.log("Orders state after update:", orders);
  }, [orders]); // This will run every time `orders` changes

  if (!isAuthenticated) {
    return (
      <div className="order-history">
        <p>Please log in to view your orders.</p>
        <button onClick={() => navigate("/login")} className="login-button">
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="order-history">Loading orders...</div>;
  }

  if (error) {
    return <div className="order-history">{error}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div className="order-history">No orders found.</div>;
  }

  return (
    <div className="order-history">
      <main>
        <div className="breadcrumb">Home / My Orders</div>
        <div className="orders">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              {order.cart.books && order.cart.books.length > 0 ? (
                order.cart.books.map((item, index) => (
                  <div key={index} className="order-item">
                    <img
                      src={item.bookId.bookImage}
                      alt={item.bookId.bookName}
                      className="order-image"
                    />
                    <div className="order-details">
                      <h3>{item.bookId.bookName}</h3>
                      <p>by {item.bookId.author}</p>
                      <p className="price">
                        Rs. {item.bookId.price}{" "}
                        <span className="original-price">
                          Rs. {item.bookId.discountPrice}
                        </span>
                      </p>
                    </div>
                    <div className="order-date">
                      <span className="order-status-icon">
                        <i className="icon-placed"></i> Order Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No books in this order.</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default OrderHistory;
