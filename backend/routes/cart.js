const express = require('express');

const router = express.Router();

// Note: Cart is managed on frontend with localStorage
// Backend cart endpoints can be added for persistence if needed

router.get('/', (req, res) => {
  res.json({ message: 'Cart endpoints for future use' });
});

module.exports = router;
