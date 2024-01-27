const Chat = require("../../models/Chat");

const createChat = async (data, socket) => {
  try {
    const { teamId } = data;
    if (!teamId) socket.emit("error", { message: "Team id is missing!" });
    const newChat = await Chat.create({
      team: teamId,
    });
    return newChat;
  } catch (error) {
    console.error(error);
    socket.emit("error", {
      message: "Internal server error! while creating chat",
    });
  }
};
module.exports = createChat;
