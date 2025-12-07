const Payment = require('../models/Payment');

// Process Google Pay payment
const processGooglePayment = async (paymentData) => {
  try {
    const { orderId, userId, amount, token } = paymentData;

    // Validate token
    if (!token) {
      return {
        success: false,
        message: 'Invalid payment token',
      };
    }

    // Generate transaction ID
    const transactionId = `GPAY${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Simulate Google Pay processing (95% success rate)
    const isSuccess = Math.random() < 0.95;

    const payment = new Payment({
      orderId,
      userId,
      amount,
      paymentMethod: 'googlepay',
      transactionId,
      status: isSuccess ? 'success' : 'failed',
      errorMessage: isSuccess ? null : 'Payment declined. Please try again.',
    });

    await payment.save();

    return {
      success: isSuccess,
      transactionId,
      message: isSuccess ? 'Payment successful' : 'Payment failed',
      payment,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

// Process COD payment
const processCODPayment = async (paymentData) => {
  try {
    const { orderId, userId, amount } = paymentData;

    // Generate transaction ID
    const transactionId = `COD${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const payment = new Payment({
      orderId,
      userId,
      amount,
      paymentMethod: 'cod',
      transactionId,
      status: 'pending', // Will be marked success when payment is received
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

module.exports = { processGooglePayment, processCODPayment };
