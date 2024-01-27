const Tasks = require("../../models/Tasks");

const getUserTasks = async (userId, socket) => {
  try {
    const tasks = await Tasks.find({ creator: userId });
    if (!tasks) {
      socket.emit("error", { message: "Failed To Fetch Tasks!" });
    } else {
      socket.emit("receiveUserTasks", tasks);
    }
  } catch (error) {
    console.log(error);
    socket.emit("error", { message: "Internal Server Error!" });
    throw error;
  }
};
module.exports = getUserTasks;
