const Tasks = require("../../models/Tasks");

const addGoal = async ({ taskId, newGoal }, socket) => {
  try {
    if (!taskId) socket.emit("error", { message: "Task Id is missing!" });
    const task = await Tasks.findById(taskId);
    if (!task) socket.emit("error", { message: "No task found!" });
    const update = {
      $push: {
        goals: { objective: newGoal },
      },
    };

    const updatedTask = await Tasks.findByIdAndUpdate(taskId, update, {
      new: true,
    });

    socket.emit("success", {
      message: "Goal Added",
      action: "reloadTasks",
      data: updatedTask,
    });
  } catch (error) {
    console.log(error);
    socket.emit("error", {
      message: "Internal server error occurred while creating a new goal!",
    });
  }
};
module.exports = addGoal;
