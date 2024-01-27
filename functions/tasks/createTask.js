const Tasks = require("../../models/Tasks");

const createTask = async (data, socket) => {
  const { creator, taskName, goals, assignTo, details } = data;

  try {
    // Validate required data
    if (!creator || !taskName || !goals || !assignTo) {
      socket.emit("error", { message: "Some of the data is missing!" });
    } else {
      // Create task
      const newTask = await Tasks.create({
        taskName,
        goals: goals.map((goal) => ({
          objective: goal,
        })),
        creator,
        assignTo: { team: assignTo },
        details,
      });
      if (newTask) {
        socket.emit("success", {
          message: "Task Created Successfully!",
          action: "reloadTasks",
        });
      }
      console.log("Task created successfully");
    }
  } catch (error) {
    console.error("Error creating task:", error.message);
    socket.emit("error", { message: "Internal server error!" });
    throw error;
  }
};

module.exports = createTask;
