const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const { processCODPayment } = require('../services/googlePayService');

const router = express.Router();

// Process payment
router.post('/process', authMiddleware, async (req, res) => {
  try {
    const { orderId, amount, paymentMethod } = req.body;

    if (!orderId || !amount || !paymentMethod) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (paymentMethod !== 'cod') {
      return res.status(400).json({ message: 'Invalid payment method' });
    }

    // Process COD
    const paymentResult = await processCODPayment({
      orderId,
      userId: req.user.id,
      amount,
    });

    if (!paymentResult.success) {
      return res.status(400).json({
        success: false,
        message: paymentResult.message,
      });
    }

    // Update order status to pending (awaiting payment on delivery)
    await Order.findByIdAndUpdate(orderId, { status: 'pending' });

    res.json({
      success: true,
      message: paymentResult.message,
      transactionId: paymentResult.transactionId,
      paymentMethod,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get payment status
router.get('/status/:transactionId', authMiddleware, async (req, res) => {
  try {
    const payment = await Payment.findOne({
      transactionId: req.params.transactionId,
    });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify payment
router.get('/verify/:orderId', authMiddleware, async (req, res) => {
  try {
    const payment = await Payment.findOne({
      orderId: req.params.orderId,
    });

    if (!payment) {
      return res.json({ verified: false, message: 'No payment found' });
    }

    res.json({
      verified: payment.status === 'success',
      status: payment.status,
      transactionId: payment.transactionId,
      paymentMethod: payment.paymentMethod,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
