const jwt = require('jwt-simple');

const authMiddleware = (req, res, next) => {
  // Check cookie FIRST (most important)
  const cookieToken = req.cookies.token;
  const headerToken = req.headers.authorization?.split(' ')[1];

  // If no token in cookie AND no token in header, reject
  if (!cookieToken && !headerToken) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Prefer cookie token (more secure)
  const token = cookieToken || headerToken;

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const adminMiddleware = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  });
};

module.exports = { authMiddleware, adminMiddleware };
