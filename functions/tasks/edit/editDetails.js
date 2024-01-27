const Tasks = require("../../../models/Tasks");

const editDetails = async (data, socket) => {
  const { taskId, details } = data;
  try {
    const task = await Tasks.findById(taskId);
    if (!task) {
      socket.emit("error", { message: "Task Is Not Available!" });
    } else {
      const editTask = await Tasks.findByIdAndUpdate(taskId, {
        $set: { details },
      });
      if (editTask) {
        socket.emit("success", {
          message: "Details Edited",
          action: "reloadTasks",
          data: editTask,
        });
      }
    }
  } catch (error) {
    console.log(error);
    socket.emit("error", {
      message: "Internal server error occurred while editing details!",
    });
  }
};
module.exports = editDetails;
