import React from 'react';
import './OrderSuccess.scss';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const OrderSuccess = () => {
     const navigate = useNavigate();
  return (
    <div className="order-success">
      <div className="order-success__container">
        <div className="order-success__celebration">
          <div className="order-success__stars">
            <FaStar className="order-success__star" />
            <FaStar className="order-success__star" />
            <FaStar className="order-success__star" />
          </div>
          <div className="order-success__confetti">
            <div className="order-success__confetti-piece"></div>
            <div className="order-success__confetti-piece"></div>
            <div className="order-success__confetti-piece"></div>
            <div className="order-success__confetti-piece"></div>
            <div className="order-success__confetti-piece"></div>
          </div>
        </div>
        <h1 className="order-success__title">Order Placed Successfully</h1>
        
        <div className="order-success__message">
          <p className="order-success__confirmation">hurray!!! your order is confirmed</p>
          <p className="order-success__order-id">
            the order id is #123456 save the order id for further communication..
          </p>
        </div>
        <div className="order-success__info">
          <div className="order-success__info-item">
            <h3 className="order-success__info-title">Email us</h3>
            <p className="order-success__info-content">admin@bookstore.com</p>
          </div>

          <div className="order-success__info-item">
            <h3 className="order-success__info-title">Contact us</h3>
            <p className="order-success__info-content">+91 8163475881</p>
          </div>

          <div className="order-success__info-item">
            <h3 className="order-success__info-title">Address</h3>
            <p className="order-success__info-content">
              42, 14th Main, 15th Cross, Sector 4, opp to BDA complex, 
              near Kumarakom restaurant, HSR Layout, Bangalore 560034
            </p>
          </div>
        </div>
        <button className="order-success__button" onClick={() => navigate('/')}>
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;