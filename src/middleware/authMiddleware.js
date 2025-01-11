// /middleware/authMiddleware.js

const jwtService = require("../services/jwtService");
const logger = require("../utils/logger");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // "Bearer <token>"
  if (!token) {
    logger.warn(`Access denied, token missing`);
    return res.status(403).json({ message: "Access denied, token missing" });
  }

  try {
    const user = jwtService.verifyToken(token);
    req.user = user; // Attach user info to the request object
    next();
  } catch (error) {
    logger.warn(`Invalid or expired token`);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { authenticateToken };
