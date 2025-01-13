const Task = require("../../models/task");
const logger = require("../../utils/logger");
const createTodo = async (req, res) => {
  try {
    const { task_name, discription, priority, date } = req.body; // ✅ Corrected field names

    // Validate required fields
    if (!task_name || !discription || !priority || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new task instance (using correct field mapping)
    const newTask = new Task({
      taskName: task_name,
      discription,
      priority,
      date,
    });

    // Save the task to the database
    const savedTask = await newTask.save();

    // Send a success response
    res.status(201).json({
      message: "Task created successfully",
      task: savedTask,
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

module.exports = { createTodo };
