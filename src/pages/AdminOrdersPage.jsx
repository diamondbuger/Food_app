import React, { useState, useEffect } from 'react';
import { apiCalls } from '../services/api';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiCalls.getAdminOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load orders');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await apiCalls.updateOrderStatus(orderId, newStatus);
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert('Order status updated successfully');
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-orders-page">
      <div className="orders-header">
        <h1>📋 All Orders</h1>
        <span className="order-count">Total: {orders.length}</span>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header-section">
                <div className="order-id">
                  <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                  <span className={`status-badge ${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="order-date">
                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="time">{new Date(order.createdAt).toLocaleTimeString()}</p>
                </div>
              </div>

              <div className="order-details-section">
                <div className="detail">
                  <strong>Customer:</strong>
                  <span>{order.userId?.name || 'Unknown'}</span>
                </div>
                <div className="detail">
                  <strong>Email:</strong>
                  <span>{order.userId?.email || 'N/A'}</span>
                </div>
                <div className="detail">
                  <strong>Phone:</strong>
                  <span>{order.phone}</span>
                </div>
                <div className="detail">
                  <strong>Address:</strong>
                  <span>{order.address}</span>
                </div>
                <div className="detail">
                  <strong>Payment:</strong>
                  <span className="payment-method">{order.paymentMethod?.toUpperCase() || 'COD'}</span>
                </div>
              </div>

              <div className="order-items-section">
                <h4>Items:</h4>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>₹{item.price.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                        <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="order-total">
                <strong>Total: ₹{order.totalPrice.toFixed(2)}</strong>
              </div>

              <div className="order-actions">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  className="status-select"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
