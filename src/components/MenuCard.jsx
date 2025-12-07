import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const MenuCard = ({ item }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const maxQuantity = item.quantity || 0;
  const isOutOfStock = maxQuantity === 0;

  const handleAddToCart = () => {
    if (quantity > maxQuantity) {
      setMessage(`Only ${maxQuantity} items available`);
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (quantity <= 0) {
      setMessage('Please select a valid quantity');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    addToCart(item, quantity);
    setMessage('✓ Added to cart!');
    setQuantity(1);
    setTimeout(() => setMessage(''), 2000);
  };

  const increaseQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={`menu-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="card-image-container">
        <img src={item.image} alt={item.name} className="item-image" />
        {isOutOfStock && <div className="out-of-stock-badge">Out of Stock</div>}
        {item.quantity > 0 && item.quantity <= 10 && (
          <div className="low-stock-badge">Only {item.quantity} left!</div>
        )}
      </div>
      <h3>{item.name}</h3>
      <p className="description">{item.description}</p>
      <div className="card-footer">
        <span className="price">₹{item.price.toFixed(2)}</span>
        <div className="qty-controls">
          <button
            onClick={decreaseQuantity}
            disabled={isOutOfStock || quantity <= 1}
            className="qty-btn"
          >
            −
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            className="qty-input"
          />
          <button
            onClick={increaseQuantity}
            disabled={isOutOfStock || quantity >= maxQuantity}
            className="qty-btn"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className={`add-btn ${isOutOfStock ? 'disabled' : ''}`}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add'}
        </button>
      </div>
      {message && <p className={`card-message ${message.includes('✓') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
};

export default MenuCard;
