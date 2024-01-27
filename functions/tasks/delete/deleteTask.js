const { default: mongoose } = require("mongoose");
const Tasks = require("../../../models/Tasks");

const deleteTask = async (data, socket) => {
  const { taskId } = data;
  try {
    if (!taskId || !mongoose.isValidObjectId(taskId)) {
      console.log("Task id is not valid");
      socket.emit("error", { message: "Task Id is not valid!" });
    }
    const taskToDelete = await Tasks.findById(taskId);
    if (!taskToDelete) {
      console.log("No task found!");
      socket.emit("error", {
        message: "Task Not Found!",
      });
    }

    const deletedTask = await Tasks.findByIdAndDelete(taskId);
    if (deletedTask)
      socket.emit("success", {
        message: "Task Deleted Successfully!",
        action: "reloadTasks",
      });
  } catch (error) {
    console.log(error);
    socket.emit("error", {
      message: "Internal Server Error! Occurred While Deleting Task",
    });
  }
};
module.exports = deleteTask;
