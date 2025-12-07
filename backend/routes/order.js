const express = require('express');
const Order = require('../models/Order');
const Menu = require('../models/Menu');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Create order
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { items, totalPrice, address, phone, paymentMethod } = req.body;

    // Validate inventory before creating order
    for (let item of items) {
      const menuItem = await Menu.findById(item._id);
      
      if (!menuItem) {
        return res.status(400).json({
          message: `Item "${item.name}" not found in inventory`,
        });
      }

      if (menuItem.quantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for "${item.name}". Available: ${menuItem.quantity}, Requested: ${item.quantity}`,
        });
      }
    }

    // Deduct quantities from inventory
    for (let item of items) {
      await Menu.findByIdAndUpdate(
        item._id,
        { $inc: { quantity: -item.quantity } },
        { new: true }
      );
    }

    // Create order with confirmed status directly
    const order = new Order({
      userId: req.user.id,
      items,
      totalPrice,
      address,
      phone,
      paymentMethod,
      status: 'confirmed',
    });

    await order.save();

    res.status(201).json({
      message: 'Order created',
      order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's orders
router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders (Admin)
router.get('/all', adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update order status (Admin)
router.put('/:id', adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: 'Order updated', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
