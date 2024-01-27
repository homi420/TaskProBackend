const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  taskName: {
    type: String,
    required: [true, "Task name is required"],
  },
  details: {
    type: String,
    required: [true, "Details of the task are must!"],
  },
  goals: [
    {
      objective: { type: String },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  assignTo: {
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teams",
    },
  },
});
module.exports = mongoose.model("Tasks", TaskSchema);
