const mongoose = require("mongoose");
const logger = require("../utils/logger");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    logger.error(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB; // ✅ Ensure we export the function properly
