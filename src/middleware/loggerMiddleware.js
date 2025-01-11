// /middleware/loggerMiddleware.js

const morgan = require("morgan");
const logger = require("../utils/logger");

// Define stream for Morgan to write logs using Winston
const stream = {
  write: (message) => logger.info(message.trim()),
};

// Define request logging middleware
const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);

module.exports = requestLogger;
