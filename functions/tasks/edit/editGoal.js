const Tasks = require("../../../models/Tasks");

const editGoal = async (data, socket) => {
  const { taskId, updatedObjective, goalIndex } = data;
  try {
    const task = await Tasks.findById(taskId);
    if (!task) {
      socket.emit("error", { message: "Task Is Not Available!" });
    } else {
      const editTask = await Tasks.findByIdAndUpdate(taskId, {
        $set: { [`goals.${goalIndex}.objective`]: updatedObjective },
      });
      // task.goals[goalIndex].objective = updatedObjective;
      if (editTask) {
        socket.emit("success", {
          message: "Goal Edited",
          action: "reloadTasks",
          data: editTask,
        });
      }
    }
  } catch (error) {
    console.log(error);
    socket.emit("error", {
      message: "Internal server error occurred while editing name!",
    });
  }
};
module.exports = editGoal;
