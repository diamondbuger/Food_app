import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { apiCalls } from '../services/api';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await apiCalls.getOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load orders');
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="order-history">
        <p className="error">Please login to view your orders</p>
      </div>
    );
  }

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  if (orders.length === 0) {
    return (
      <div className="order-history">
        <h1>Order History</h1>
        <p className="empty-message">No orders yet. Start ordering!</p>
      </div>
    );
  }

  return (
    <div className="order-history">
      <h1>Order History</h1>
      <div className="orders-container">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
              <span className="order-placed">✓ Order Placed</span>
            </div>
            <div className="order-details">
              <p>
                <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {new Date(order.createdAt).toLocaleTimeString()}
              </p>
              <p>
                <strong>Delivery Address:</strong> {order.address}
              </p>
              <p>
                <strong>Phone:</strong> {order.phone}
              </p>
            </div>
            <div className="order-items">
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} x {item.quantity} - ₹{(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-total">
              <strong>Total: ₹{order.totalPrice.toFixed(2)}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
