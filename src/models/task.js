const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // ✅ Explicit Task ID
    taskName: { type: String, required: true },
    discription: { type: String, required: true, unique: true },
    priority: { type: String, required: true },
    date: { type: Date, required: true },

    // ✅ Foreign key reference to User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
