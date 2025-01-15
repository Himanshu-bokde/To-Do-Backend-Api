const Task = require("../../models/task");
const User = require("../../models/userModel");
const Users = require("../../models/userModel");
const logger = require("../../utils/logger");

const createTodo = async (req, res) => {
  try {
    const { task_name, discription, priority, date, userId } = req.body; // ✅ Corrected field names

    // Validate required fields
    if (!task_name || !discription || !priority || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new task instance (using correct field mapping)
    const newTask = new Task({
      taskName: task_name,
      discription,
      priority,
      date,
      userId,
    });

    // Save the task to the database
    const savedTask = await newTask.save();

    // Send a success response
    res.status(201).json({
      message: "Task created successfully",
    });
    logger.warn({
      message: "Task created successfully",
      task: savedTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
    logger.warn({ message: "Internal server error" });
  }
};

const listTodo = async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query params
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const tasks = await Task.find({ userId }); // Fetch tasks for the user
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createTodo, listTodo };
