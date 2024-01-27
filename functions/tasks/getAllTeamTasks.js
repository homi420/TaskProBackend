const Tasks = require("../../models/Tasks");

const getAllTeamTasks = async (teamId, socket) => {
  try {
    if (teamId === undefined)
      socket.emit("error", { message: "teamId not received!" });
    const tasks = await Tasks.find({ "assignTo.team": teamId });
    if (!tasks) {
      socket.emit("error", { message: "Failed To Fetch Tasks!" });
    } else {
      socket.emit("receiveAllTeamTasks", tasks);
    }
  } catch (error) {
    console.log(error);
    socket.emit("error", {
      message: "Internal Server Error occurred while getting all teams tasks !",
    });
    throw error;
  }
};
module.exports = getAllTeamTasks;
