const Tasks = require("../../../models/Tasks");

const markChecked = async ({ taskId, goalIndex }, socket) => {
  try {
    if (!taskId) socket.emit("error", { message: "task id not received!" });
    if (!goalIndex)
      socket.emit("error", { message: "Goal index not received!" });
    const task = await Tasks.findById(taskId);
    if (!task) socket.emit("error", { message: "No task found!" });
    if (!task.goals[goalIndex].completed) {
      const update = {
        $set: {
          [`goals.${goalIndex}.completed`]: true,
        },
      };

      const updatedTask = await Tasks.findByIdAndUpdate(taskId, update, {
        new: true,
      });

      socket.emit("success", {
        message: "Goal Marked As Completed",
        action: "reloadTasks",
        data: updatedTask,
      });
    } else {
      socket.emit("success", { message: "Already Marked!" });
    }
  } catch (error) {
    console.error(error);
    socket.emit("error", { message: "Internal server error!" });
  }
};
module.exports = markChecked;
