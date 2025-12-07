import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const OrderSummary = () => {
  const { cart, getTotalPrice } = useContext(CartContext);
  const tax = getTotalPrice() * 0.05;
  const total = getTotalPrice() + tax;

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="summary-item">
        <span>Subtotal:</span>
        <span>₹{getTotalPrice().toFixed(2)}</span>
      </div>
      <div className="summary-item">
        <span>Tax (5%):</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>
      <div className="summary-item total">
        <span>Total:</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
