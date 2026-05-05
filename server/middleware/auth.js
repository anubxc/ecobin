const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Try to get token from Authorization header
    let token = req.headers.authorization?.split(' ')[1];
    
    // If not in header, try to get from cookies
    if (!token) {
      token = req.cookies?.token;
    }
    
    if (!token) {
      return res.status(401).json({ 
        message: 'No token provided. Use Authorization header: "Bearer <token>" or cookie: token=<token>' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token format' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

module.exports = { auth, adminOnly };
