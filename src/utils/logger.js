const winston = require("winston");
const { createLogger, format, transports } = winston;
require("winston-daily-rotate-file");
const path = require("path");

// Define log directory outside `src`
const logDirectory = path.join(__dirname, "../../logs");

// Define log format
const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
  })
);

// Create Winston logger
const logger = createLogger({
  level: "info", // Default log level
  format: logFormat,
  transports: [
    // Console logging (for development)
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),

    // Log file for application logs
    new transports.File({
      filename: path.join(logDirectory, "app.log"),
      level: "info",
    }),

    // Log errors separately
    new transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error",
    }),

    // Daily rotating log files
    new transports.DailyRotateFile({
      filename: path.join(logDirectory, "%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

// If not in production, log to console as well
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    })
  );
}

module.exports = logger;
