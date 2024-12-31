import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders} from "../../App/OrderSlice";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.scss";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error } = useSelector((state) => state.orders);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserOrders());
    }
  }, [isAuthenticated, dispatch]);

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
    return <div className="order-history">Failed to load orders: {error}</div>;
  }

  return (
    <div className="order-history">
      <main>
        <div className="breadcrumb">Home / My Order</div>
        {orders.length === 0 ? (
          <div className="no-orders">
            <img src="/path/to/no-orders-image.svg" alt="No Orders" />
            <p>You have no orders yet.</p>
          </div>
        ) : (
          <div className="orders">
            {orders.map((order, index) => (
              <div key={index} className="order-card">
                <img
                  src={order.image}
                  alt={order.bookName}
                  className="order-image"
                />
                <div className="order-details">
                  <h3>{order.bookName}</h3>
                  <p>by {order.author}</p>
                  <p className="price">
                    Rs. {order.price}{" "}
                    <span className="original-price">
                      Rs. {order.originalPrice}
                    </span>
                  </p>
                </div>
                <div className="order-date">
                  <span className="order-status-icon">
                    <i className="icon-placed"></i> Order Placed on{" "}
                    {order.orderDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderHistory;
