const Payment = require('../models/Payment');

// Simulate UPI payment processing
const processUPIPayment = async (paymentData) => {
  try {
    const { orderId, userId, amount, upiId } = paymentData;

    // Validate UPI ID format
    if (!upiId.includes('@')) {
      return {
        success: false,
        message: 'Invalid UPI ID format',
      };
    }

    // Generate transaction ID
    const transactionId = `UPI${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Simulate UPI processing (90% success rate)
    const isSuccess = Math.random() < 0.9;

    const payment = new Payment({
      orderId,
      userId,
      amount,
      paymentMethod: 'upi',
      upiId,
      transactionId,
      status: isSuccess ? 'success' : 'failed',
      errorMessage: isSuccess ? null : 'UPI transaction declined. Please try again.',
    });

    await payment.save();

    return {
      success: isSuccess,
      transactionId,
      message: isSuccess
        ? 'Payment successful'
        : 'Payment failed. Please try again.',
      payment,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

// Process COD (no actual payment needed)
const processCODPayment = async (paymentData) => {
  try {
    const { orderId, userId, amount } = paymentData;

    const transactionId = `COD${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const payment = new Payment({
      orderId,
      userId,
      amount,
      paymentMethod: 'cod',
      transactionId,
      status: 'pending', // Will be marked success on delivery
    });

    await payment.save();

    return {
      success: true,
      transactionId,
      message: 'Order confirmed. Pay on delivery.',
      payment,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

module.exports = { processUPIPayment, processCODPayment };
