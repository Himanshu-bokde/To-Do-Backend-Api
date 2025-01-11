const { RateLimiterRedis } = require("rate-limiter-flexible");
const redisClient = require("../config/redisConfig");

// General rate limiting (100 requests per 15 minutes)
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rate-limit",
  points: 100,
  duration: 900, // 15 minutes
  blockDuration: 60, // Block for 1 minute if exceeded
});

// Middleware function
const rateLimitMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => next())
    .catch(() => {
      res.status(429).json({ message: "Too many requests, try again later." });
    });
};

// Stricter limit for login attempts (5 attempts in 5 mins)
const loginRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "login-attempts",
  points: 5,
  duration: 300, // 5 minutes
  blockDuration: 900, // Block for 15 minutes if exceeded
});

const loginRateLimitMiddleware = (req, res, next) => {
  loginRateLimiter
    .consume(req.ip)
    .then(() => next())
    .catch(() => {
      res
        .status(429)
        .json({ message: "Too many login attempts, try again later." });
    });
};

module.exports = { rateLimitMiddleware, loginRateLimitMiddleware };
