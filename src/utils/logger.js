const winston = require("winston");
const { createLogger, format, transports } = winston;
require("winston-daily-rotate-file");
const path = require("path");
const fs = require("fs");

// Define log format
const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
  })
);

// Check if the logs directory exists, create it if not (for local development)
const logDirectory = path.join(__dirname, "../../logs");
if (process.env.NODE_ENV !== "production" && !fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Create Winston logger
const logger = createLogger({
  level: "info", // Default log level
  format: logFormat,
  transports: [
    // Console logging (for development)
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
  ],
});

// Add file transports if in development (local machine)
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.File({
      filename: path.join(logDirectory, "app.log"),
      level: "info",
    })
  );

  // Log errors separately in a different file
  logger.add(
    new transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error",
    })
  );

  // Add daily rotating logs for development environment
  logger.add(
    new transports.DailyRotateFile({
      filename: path.join(logDirectory, "%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    })
  );
}

// If not in production, log to console as well
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    })
  );
}

module.exports = logger;
