import React, { useState, useEffect } from 'react';
import { apiCalls } from '../services/api';

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'pizzas',
    image: '',
    quantity: '',
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await apiCalls.getMenu();
      setItems(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load inventory');
      setLoading(false);
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setEditData({
      price: item.price,
      quantity: item.quantity || 0,
      name: item.name,
      description: item.description,
    });
  };

  const handleSaveEdit = async (itemId) => {
    if (editData.price <= 0) {
      alert('Price must be greater than 0');
      return;
    }
    if (editData.quantity < 0) {
      alert('Quantity cannot be negative');
      return;
    }

    try {
      await apiCalls.updateMenuItem(itemId, editData);
      setItems(
        items.map((item) =>
          item._id === itemId
            ? {
                ...item,
                price: editData.price,
                quantity: editData.quantity,
                name: editData.name,
                description: editData.description,
              }
            : item
        )
      );
      setEditingId(null);
      showSuccess('Item updated successfully');
    } catch (err) {
      alert('Failed to update item: ' + err.message);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!newItem.name || !newItem.description || !newItem.price || !newItem.image) {
      alert('Please fill all required fields');
      return;
    }

    if (newItem.price <= 0) {
      alert('Price must be greater than 0');
      return;
    }

    if (newItem.quantity < 0) {
      alert('Quantity cannot be negative');
      return;
    }

    try {
      const response = await apiCalls.addMenu(newItem);
      setItems([...items, response.data.item]);
      setNewItem({
        name: '',
        description: '',
        price: '',
        category: 'pizzas',
        image: '',
        quantity: '',
      });
      setShowAddForm(false);
      showSuccess('Item added successfully');
    } catch (err) {
      alert('Failed to add item: ' + err.message);
    }
  };

  const handleDeleteItem = async (itemId, itemName) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
      )
    ) {
      try {
        await apiCalls.deleteMenuItem(itemId);
        setItems(items.filter((item) => item._id !== itemId));
        showSuccess('Item deleted successfully');
      } catch (err) {
        alert('Failed to delete item: ' + err.message);
      }
    }
  };

  if (loading) return <div className="loading">Loading inventory...</div>;

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <div>
          <h1>📦 Inventory Management</h1>
          <p className="inventory-subtitle">Manage menu items, prices, and quantities</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="add-item-btn"
        >
          {showAddForm ? '✕ Cancel' : '+ Add New Item'}
        </button>
      </div>

      {successMessage && (
        <div className="success-alert">
          ✓ {successMessage}
        </div>
      )}

      {error && <div className="error-alert">✗ {error}</div>}

      {showAddForm && (
        <div className="add-item-form">
          <h3>Add New Menu Item</h3>
          <form onSubmit={handleAddItem} className="form-grid">
            <div className="form-group">
              <label>Item Name *</label>
              <input
                type="text"
                placeholder="e.g., Margherita Pizza"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea
                placeholder="e.g., Fresh mozzarella, basil, and tomato"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Price (₹) *</label>
              <input
                type="number"
                placeholder="299"
                step="0.01"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: parseFloat(e.target.value) })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Quantity *</label>
              <input
                type="number"
                placeholder="100"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
              >
                <option value="pizzas">🍕 Pizzas</option>
                <option value="drinks">🥤 Drinks</option>
                <option value="breads">🍞 Breads</option>
                <option value="desserts">🍰 Desserts</option>
              </select>
            </div>
            <div className="form-group">
              <label>Image URL *</label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={newItem.image}
                onChange={(e) =>
                  setNewItem({ ...newItem, image: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              ✓ Add Item
            </button>
          </form>
        </div>
      )}

      <div className="inventory-stats">
        <div className="stat">
          <span className="stat-label">Total Items</span>
          <span className="stat-value">{items.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Total Value</span>
          <span className="stat-value">
            ₹{items.reduce((sum, item) => sum + item.price * (item.quantity || 0), 0).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Stock Value (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-message">
                  No items in inventory. Add your first item!
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className={editingId === item._id ? 'editing' : ''}>
                  <td>
                    {editingId === item._id ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="edit-input"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td>{item.category}</td>
                  <td>
                    {editingId === item._id ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editData.price}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            price: parseFloat(e.target.value),
                          })
                        }
                        className="edit-input"
                      />
                    ) : (
                      `₹${item.price.toFixed(2)}`
                    )}
                  </td>
                  <td>
                    {editingId === item._id ? (
                      <input
                        type="number"
                        value={editData.quantity}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            quantity: parseInt(e.target.value),
                          })
                        }
                        className="edit-input quantity-input"
                      />
                    ) : (
                      <span className={item.quantity <= 10 ? 'low-stock' : ''}>
                        {item.quantity || 0}
                      </span>
                    )}
                  </td>
                  <td>
                    ₹{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                  </td>
                  <td className="action-buttons">
                    {editingId === item._id ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(item._id)}
                          className="save-btn"
                          title="Save changes"
                        >
                          ✓ Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="cancel-btn"
                          title="Cancel editing"
                        >
                          ✕ Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(item)}
                          className="edit-btn"
                          title="Edit item"
                        >
                          ✎ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item._id, item.name)}
                          className="delete-btn"
                          title="Delete item"
                        >
                          🗑 Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;
