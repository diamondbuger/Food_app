import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item, maxQuantity = 100, isInvalid = false }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);
  const [message, setMessage] = useState('');

  const handleIncrement = () => {
    if (item.quantity >= maxQuantity) {
      setMessage(`Only ${maxQuantity} items available`);
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    updateQuantity(item._id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item._id, item.quantity - 1);
      setMessage('');
    }
  };

  return (
    <div className={`cart-item ${isInvalid ? 'invalid' : ''}`}>
      {isInvalid && <div className="invalid-badge">⚠️ Stock Issue</div>}
      <img src={item.image} alt={item.name} />
      <div className="item-details">
        <h4>{item.name}</h4>
        <p>₹{item.price.toFixed(2)}</p>
      </div>
      <div className="qty-controls">
        <button 
          onClick={handleDecrement}
          disabled={item.quantity <= 1}
          className="qty-btn"
        >
          −
        </button>
        <span className="qty-display">{item.quantity}</span>
        <button 
          onClick={handleIncrement}
          disabled={item.quantity >= maxQuantity}
          className="qty-btn"
        >
          +
        </button>
      </div>
      <p className="total">₹{(item.price * item.quantity).toFixed(2)}</p>
      <button
        onClick={() => removeFromCart(item._id)}
        className="remove-btn"
      >
        Remove
      </button>
      {message && <p className="cart-message">{message}</p>}
      {isInvalid && (
        <p className="stock-info">
          Available: {maxQuantity} | Cart: {item.quantity}
        </p>
      )}
    </div>
  );
};

export default CartItem;
