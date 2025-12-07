import React, { useState, useEffect } from 'react';
import MenuCard from '../components/MenuCard';
import { apiCalls } from '../services/api';

const MenuPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await apiCalls.getMenu();
      setItems(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load menu');
      setLoading(false);
    }
  };

  const filteredItems =
    activeCategory === 'all'
      ? items
      : items.filter((item) => item.category === activeCategory);

  if (loading) return <div className="loading">Loading menu...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="menu-page">
      <h1>Our Menu</h1>
      <div className="category-filters">
        <button
          className={activeCategory === 'all' ? 'active' : ''}
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        <button
          className={activeCategory === 'pizzas' ? 'active' : ''}
          onClick={() => setActiveCategory('pizzas')}
        >
          🍕 Pizzas
        </button>
        <button
          className={activeCategory === 'drinks' ? 'active' : ''}
          onClick={() => setActiveCategory('drinks')}
        >
          🥤 Drinks
        </button>
        <button
          className={activeCategory === 'breads' ? 'active' : ''}
          onClick={() => setActiveCategory('breads')}
        >
          🍞 Breads
        </button>
        <button
          className={activeCategory === 'desserts' ? 'active' : ''}
          onClick={() => setActiveCategory('desserts')}
        >
          🍰 Desserts
        </button>
      </div>
      <div className="menu-grid">
        {filteredItems.map((item) => (
          <MenuCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
