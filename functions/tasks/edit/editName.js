const Tasks = require("../../../models/Tasks");

const editName = async (data, socket) => {
  const { taskId, taskName } = data;
  try {
    const task = await Tasks.findById(taskId);
    if (!task) {
      socket.emit("error", { message: "Task Is Not Available!" });
    } else {
      const editedTask = await Tasks.findByIdAndUpdate(taskId, {
        $set: { taskName },
      });
      if (editedTask) {
        socket.emit("success", {
          message: "Name Edited",
          action: "reloadTasks",
          data: editedTask,
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
module.exports = editName;
