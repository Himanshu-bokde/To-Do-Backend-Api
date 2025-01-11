const Redis = require("ioredis");

// Secure Redis connection
const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || null, // Secure Redis with password
  enableOfflineQueue: false,
});

redisClient.on("connect", () => console.log("✅ Connected to Redis"));
redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

module.exports = redisClient;
