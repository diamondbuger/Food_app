import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { apiCalls } from '../services/api';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, clearCart, getTotalPrice } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  const orderData = location.state?.orderData;
  const totalAmount = getTotalPrice();
  const tax = totalAmount * 0.05;
  const finalTotal = totalAmount + tax;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Store order summary before clearing cart
      const summaryData = {
        items: cart,
        totalAmount,
        tax,
        finalTotal,
        address: orderData.address,
        phone: orderData.phone,
      };

      // Create order with COD payment method
      const orderResponse = await apiCalls.createOrder({
        ...orderData,
        items: cart,
        totalPrice: finalTotal,
        paymentMethod: 'cod',
      });

      const orderId = orderResponse.data.order._id;

      // Process COD payment (no actual charge)
      const paymentResponse = await apiCalls.processPayment({
        orderId,
        amount: finalTotal,
        paymentMethod: 'cod',
      });

      if (!paymentResponse.data.success) {
        setError(paymentResponse.data.message || 'Failed to place order');
        setLoading(false);
        return;
      }

      // Order successful - set summary before clearing cart
      setOrderSummary(summaryData);
      clearCart();
      setShowSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to place order. Please try again.'
      );
    }
    setLoading(false);
  };

  if (showSuccess && orderSummary) {
    return (
      <div className="payment-page">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Order Confirmed!</h2>
          <p>Your order has been placed successfully.</p>
          <p>Pay ₹{orderSummary.finalTotal.toFixed(2)} on delivery.</p>

          <div className="order-confirmation-summary">
            <h3>Order Summary</h3>
            <div className="confirmation-items">
              {orderSummary.items.map((item) => (
                <div key={item._id} className="confirmation-item">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="confirmation-totals">
              <div className="confirmation-row">
                <span>Subtotal:</span>
                <span>₹{orderSummary.totalAmount.toFixed(2)}</span>
              </div>
              <div className="confirmation-row">
                <span>Tax (5%):</span>
                <span>₹{orderSummary.tax.toFixed(2)}</span>
              </div>
              <div className="confirmation-row total">
                <span>Total Amount:</span>
                <span>₹{orderSummary.finalTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="confirmation-details">
              <h4>📍 Delivery Details</h4>
              <p>
                <strong>Address:</strong> {orderSummary.address}
              </p>
              <p>
                <strong>Phone:</strong> {orderSummary.phone}
              </p>
              <p className="delivery-estimate">
                Expected delivery in 30-45 minutes
              </p>
            </div>
          </div>

          <div className="success-actions">
            <button
              onClick={() => navigate('/orders')}
              className="view-orders-btn"
            >
              📋 View All Orders
            </button>
            <button
              onClick={() => navigate('/menu')}
              className="continue-shopping-btn"
            >
              🛒 Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!orderData || !cart.length) {
    return (
      <div className="payment-page">
        <div className="empty-cart-summary">
          <div className="empty-icon">🛒</div>
          <h2>No Items to Order</h2>
          <p>Your cart is empty. Please add items before placing an order.</p>
          <a href="/menu" className="return-link">
            ← Return to Menu
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <h1>Confirm Order</h1>
      <div className="payment-container">
        <div className="payment-form-section">
          <h2>Cash on Delivery</h2>
          {error && <p className="error">{error}</p>}

          <div className="cod-info-box">
            <div className="info-item">
              <span className="info-icon">💵</span>
              <div>
                <h3>Cash on Delivery</h3>
                <p>Pay when your order arrives</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">✓</span>
              <div>
                <h3>No Prepayment</h3>
                <p>No payment needed right now</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📦</span>
              <div>
                <h3>Verify Before Payment</h3>
                <p>Check order before paying</p>
              </div>
            </div>
          </div>

          <form onSubmit={handlePlaceOrder} className="cod-form">
            <div className="payment-details">
              <h3>Payment Details</h3>
              <div className="detail-row">
                <span>Delivery Address:</span>
                <span className="detail-value">{orderData.address}</span>
              </div>
              <div className="detail-row">
                <span>Phone Number:</span>
                <span className="detail-value">{orderData.phone}</span>
              </div>
              <div className="detail-row highlight">
                <span>Amount to Pay on Delivery:</span>
                <span className="detail-value amount">
                  ₹{finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="terms-check">
              <label>
                <input type="checkbox" required />
                <span>
                  I confirm my delivery address and agree to pay ₹
                  {finalTotal.toFixed(2)} on delivery
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="place-order-btn"
            >
              {loading ? 'Processing...' : '✓ Confirm Order'}
            </button>
          </form>
        </div>

        <div className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cart.map((item) => (
              <div key={item._id} className="summary-item">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (5%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount:</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="delivery-info">
            <h4>📍 Delivery Information</h4>
            <p>
              <strong>Address:</strong> {orderData.address}
            </p>
            <p>
              <strong>Phone:</strong> {orderData.phone}
            </p>
            <p className="delivery-note">
              Expected delivery time: 30-45 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
