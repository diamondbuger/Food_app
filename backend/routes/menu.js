const express = require('express');
const Menu = require('../models/Menu');
const { adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const items = await Menu.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add menu item (Admin only)
router.post('/add', adminMiddleware, async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const item = new Menu({ name, description, price, category, image });
    await item.save();

    res.status(201).json({ message: 'Item added', item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update menu item (Admin only)
router.put('/:id', adminMiddleware, async (req, res) => {
  try {
    const { price, quantity } = req.body;
    const item = await Menu.findByIdAndUpdate(
      req.params.id,
      { price, quantity },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item updated', item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete menu item (Admin only)
router.delete('/:id', adminMiddleware, async (req, res) => {
  try {
    const item = await Menu.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
