const { default: mongoose } = require("mongoose");
const Tasks = require("../../models/Tasks");

const getTeamTasks = async (teamId, socket) => {
  try {
    if (teamId && !mongoose.isValidObjectId(teamId))
      socket.emit("error", { message: "teamId not valid!" });
    const tasks = await Tasks.find({ "assignTo.team": teamId });
    if (!tasks) {
      socket.emit("error", { message: "Failed To Fetch Tasks!" });
    } else {
      socket.emit("receiveTeamTasks", tasks);
    }
  } catch (error) {
    console.log(error);
    socket.emit("error", {
      message: "Internal Server Error occurred while getting team tasks!",
    });
  }
};
module.exports = getTeamTasks;
