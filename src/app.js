const express = require("express");
const dotenv = require("dotenv").config({ path: "./.env" });
const cluster = require("cluster");
const os = require("os");
const setupRoutes = require("./routes");
const requestLogger = require("./middleware/loggerMiddleware");
const logger = require("./utils/logger");
const { rateLimitMiddleware } = require("./middleware/rateLimiter");
const connectDB = require("./config/mongodb"); // Import DB connection

const port = process.env.PORT || 9990;
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(
    `Master process ${process.pid} is running. Forking ${numCPUs} workers...`
  );

  // Fork worker processes based on CPU count
  for (let i = 0; i < numCPUs; i++) cluster.fork();

  // Restart a worker if it dies
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });

  // Handle process-level errors
  process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception:", err);
    process.exit(1);
  });

  process.on("unhandledRejection", (err) => {
    logger.error("Unhandled Rejection:", err);
  });

  process.on("SIGTERM", () => {
    logger.warn("SIGTERM received, shutting down gracefully...");
    process.exit(0);
  });
} else {
  const app = express();
  connectDB();
  app.use(express.json());
  app.use(requestLogger);
  app.use(rateLimitMiddleware);
  setupRoutes(app);

  // Express global error handler
  app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  });

  app.listen(port, () => {
    console.log(`Worker process ${process.pid} running on port ${port}`);
  });
}
