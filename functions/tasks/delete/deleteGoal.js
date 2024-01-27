const Tasks = require("../../../models/Tasks");

const deleteGoal = async ({ taskId, goalIndex }, socket) => {
  try {
    const task = await Tasks.findById(taskId);
    if (!task) socket.emit("error", { message: "No task found!" });
    // Remove the goal at the specified index using $pull
    console.log(goalIndex);
    task.goals.splice(goalIndex, 1);

    // Save the updated task
    await task.save();
    socket.emit("success", {
      message: "Goal Deleted!",
      action: "reloadTasks",
      data: task,
    });
  } catch (error) {
    console.log(error);
    socket.emit("error", {
      message: "Internal server error occurred when deleting the goal!",
    });
  }
};
module.exports = deleteGoal;
