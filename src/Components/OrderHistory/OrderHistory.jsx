import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.scss";

const OrderHistory = () => {
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  
  const { orders, status, error } = useSelector((state) => state.user);
 
  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      setFetchError(null);
    } else if (status === "failed") {
      setLoading(false);
      setFetchError(error);
    } else if (status === "succeeded") {
      setLoading(false);
      setFetchError(null);
    }
  }, [status, error]);

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
                    {item.bookId && (
                      <>
                        <img
                          src={item.bookId.bookImage}
                          alt={item.bookId.bookName}
                          className="order-image"
                        />
                        <div className="order-details">
                          <h3>{item.bookId.bookName}</h3>
                          <p>by {item.bookId.author}</p>
                          <p className="price">
                            Rs. {item.bookId.discountPrice}{" "}
                            <span className="original-price">
                              Rs. {item.bookId.price}
                            </span>
                          </p>
                        </div>
                      </>
                    )}
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
