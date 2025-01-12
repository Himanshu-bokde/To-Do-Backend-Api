const mongoose = require("mongoose");

const Task = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
    discription: { type: String, required: true, unique: true },
    priority: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Tasks", Task);
module.exports = Tasks;
