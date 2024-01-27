const Chat = require("../../models/Chat");
const Users = require("../../models/Users");

const getChat = async (data, socket) => {
  try {
    const { teamId, type } = data;
    if (!teamId) socket.emit("error", { message: "Team id is missing!" });
    const chat = await Chat.find({ team: teamId }).populate({
      path: "messages.sender",
      model: Users,
    });
    if (type !== "noEmit") socket.emit("receiveChat", chat);
    return chat;
  } catch (error) {
    console.error(error);
    socket.emit("error", {
      message: "Internal server error! while getting chat",
    });
  }
};
module.exports = getChat;
