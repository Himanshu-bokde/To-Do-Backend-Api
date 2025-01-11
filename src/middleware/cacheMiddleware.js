const redisClient = require("../../config/redisConfig");

const cacheMiddleware = (req, res, next) => {
  const key = `cache:${req.originalUrl}`;

  redisClient.get(key, (err, cachedData) => {
    if (err) return next();

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData)); // Serve cached data
    }

    res.sendResponse = res.json;
    res.json = (body) => {
      redisClient.setex(key, 300, JSON.stringify(body)); // Cache for 5 mins
      res.sendResponse(body);
    };
    next();
  });
};

module.exports = cacheMiddleware;
