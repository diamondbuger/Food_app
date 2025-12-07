import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to PizzaHub 🍕</h1>
        <p>Delicious Pizzas & Cold Drinks Delivered Fresh</p>
        <Link to="/menu" className="cta-btn">
          Order Now
        </Link>
      </section>
      <section className="features">
        <div className="feature">
          <h3>🚚 Fast Delivery</h3>
          <p>Get your order in 30 minutes</p>
        </div>
        <div className="feature">
          <h3>🍕 Fresh Ingredients</h3>
          <p>Made with premium quality items</p>
        </div>
        <div className="feature">
          <h3>💰 Great Prices</h3>
          <p>Best deals on your favorite food</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
