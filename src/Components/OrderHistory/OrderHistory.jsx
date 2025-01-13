import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {ShoppingBag } from 'lucide-react';
import LoginSignup from "../LoginSignup/LoginSignup";
import "./OrderHistory.scss";

const OrderHistory = () => {
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
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

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (!isAuthenticated) {
    return (
      <div className="order-empty">
      <ShoppingBag size={64} className="order-empty-icon" />
      <h2>Please login</h2>
      <p>Login to view ordered items.</p>
      <button className="login-books-btn" onClick={toggleModal}>
        Login
      </button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <LoginSignup onClose={toggleModal} />
          </div>
        </div>
      )}
    </div>
    );
  }

  if (loading) {
    return <div className="order-empty">
    <ShoppingBag size={64} className="order-empty-icon" />
    <h2>Loading orders...</h2>
    
  </div>;
  }

  if (error) {
    return <div className="order-history">{error}</div>;
  }

  if (!orders || orders.length === 0) {
    return   <div className="order-empty">
    <ShoppingBag size={64} className="order-empty-icon" />
    <h2>No orders</h2>
    <p>You haven't purchased anything. </p>
  </div>
  }

  return (
    <div className="order-history">
      <main>
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
