const Redis = require("ioredis");

// Set up Redis client with environment variables for host and port
const redisClient = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1', // Default to local Redis if no env variable
  port: process.env.REDIS_PORT || 6379, // Default to 6379 if no env variable
  enableOfflineQueue: false, // Disable offline queue, can be enabled if needed
});

redisClient.on("connect", () => {
  console.log("✅ Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

module.exports = redisClient;
