import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const OrderPage = () => {
  const { cart, getTotalPrice } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleProceedToPayment = (e) => {
    e.preventDefault();

    if (!address.trim() || !phone.trim()) {
      setError('Please fill all fields');
      return;
    }

    if (phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    const orderData = { address, phone };
    navigate('/payment', { state: { orderData } });
  };

  if (!user) {
    return (
      <div className="order-page">
        <p className="error">Please login to place an order</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="order-page">
        <p className="error">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="order-page">
      <h1>Delivery Details</h1>
      <div className="order-container">
        <form onSubmit={handleProceedToPayment} className="order-form">
          <h3>Enter Delivery Information</h3>
          {error && <p className="error">{error}</p>}
          <textarea
            placeholder="Enter your full delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="4"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="[0-9]{10}"
            required
          />
          <button type="submit" className="proceed-btn">
            Proceed to Payment
          </button>
        </form>
        <OrderSummary />
      </div>
    </div>
  );
};

export default OrderPage;
