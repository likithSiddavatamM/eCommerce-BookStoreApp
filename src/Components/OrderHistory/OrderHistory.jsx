import React, { useEffect, useState } from "react";
import { getOrders } from "../../utils/Api";
import "./OrderHistory.scss";

const OrderHistory = () => {
  const order = [
    {
        bookName: "Don't Make Me Think",
        author: "Steve Krug",
        price: 1500,
        originalPrice: 2000,
        orderDate: "May 21",
        image: "/image/Don'tMakeMeThink.png", 
      },
      {
        bookName: "React Material-UI",
        author: "Cookbook",
        price: 780,
        originalPrice: 1000,
        orderDate: "April 06",
        image: "/image/React-UI.png", 
      },
  ];
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="order-history">Loading orders...</div>;
  }

  if (error) {
    return <div className="order-history">{error}</div>;
  }

  return (
    <div className="order-history">
      <main>
        <div className="breadcrumb">Home / My Order</div>
        <div className="orders">
          {order.map((order, index) => (
            <div key={index} className="order-card">
              <img src={order.image} alt={order.bookName} className="order-image" />
              <div className="order-details">
                <h3>{order.bookName}</h3>
                <p>by {order.author}</p>
                <p className="price">
                  Rs. {order.price} <span className="original-price">Rs. {order.originalPrice}</span>
                </p>
              </div>
              <div className="order-date">
              <span class="order-status-icon">
                <i class="icon-placed"></i> Order Placed on {order.orderDate}
              </span>
              </div>
            </div>
          ))}
        </div>
      </main>    
    </div>
  );
};

export default OrderHistory;
