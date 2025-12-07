import React, { useState } from 'react';
import { apiCalls } from '../services/api';

const AdminPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('pizza');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddMenu = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiCalls.addMenu({
        name,
        description,
        price: parseFloat(price),
        category,
        image,
      });
      alert('Item added successfully!');
      setName('');
      setDescription('');
      setPrice('');
      setImage('');
    } catch (err) {
      alert('Failed to add item');
    }
    setLoading(false);
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>
      <form onSubmit={handleAddMenu} className="admin-form">
        <h3>Add Menu Item</h3>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="pizza">Pizza</option>
          <option value="drink">Drink</option>
        </select>
        <input
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Item'}
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
