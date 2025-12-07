import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import { CartContext } from '../context/CartContext';
import { apiCalls } from '../services/api';

const CartPage = () => {
  const { cart } = useContext(CartContext);
  const [inventoryItems, setInventoryItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await apiCalls.getMenu();
      const inventory = {};
      response.data.forEach((item) => {
        inventory[item._id] = item.quantity || 0;
      });
      setInventoryItems(inventory);
      setLoading(false);
    } catch (err) {
      setError('Failed to load inventory');
      setLoading(false);
    }
  };

  const getInvalidItems = () => {
    return cart.filter((item) => {
      const availableQty = inventoryItems[item._id] || 0;
      return item.quantity > availableQty;
    });
  };

  const invalidItems = getInvalidItems();
  const hasInvalidItems = invalidItems.length > 0;

  if (loading) return <div className="loading">Loading cart...</div>;

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Start adding delicious items to your cart!</p>
        <Link to="/menu" className="cta-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {hasInvalidItems && (
        <div className="inventory-warning">
          <h3>⚠️ Inventory Issue</h3>
          <p>The following items have quantity more than available inventory:</p>
          <ul>
            {invalidItems.map((item) => (
              <li key={item._id}>
                <strong>{item.name}</strong>: You have {item.quantity} in cart, but only{' '}
                <strong>{inventoryItems[item._id] || 0}</strong> available in stock
              </li>
            ))}
          </ul>
          <p>Please adjust quantities below before checking out.</p>
        </div>
      )}

      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => {
            const availableQty = inventoryItems[item._id] || 0;
            const isInvalid = item.quantity > availableQty;
            return (
              <CartItem
                key={item._id}
                item={item}
                maxQuantity={availableQty}
                isInvalid={isInvalid}
              />
            );
          })}
        </div>
        <div className="cart-sidebar">
          <OrderSummary />
          <Link
            to="/order"
            className={`checkout-btn ${hasInvalidItems ? 'disabled' : ''}`}
            onClick={(e) => {
              if (hasInvalidItems) {
                e.preventDefault();
                alert('Please adjust item quantities to match available inventory');
              }
            }}
          >
            Proceed to Checkout
          </Link>
          <Link to="/menu" className="continue-shopping-link">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
