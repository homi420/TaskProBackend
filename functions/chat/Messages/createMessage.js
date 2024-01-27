const { Message } = require("../../../models/Message");
const Users = require("../../../models/Users");

const createMessage = async (data, socket) => {
  const { senderId, content, to } = data;
  try {
    const newMessage = await Message.create({
      sender: senderId,
      to,
      content,
    });
    const message = Message.findById(newMessage._id).populate({
      path: "sender",
      model: Users,
    });
    return message;
  } catch (error) {
    console.error(error);
    socket.emit("error", {
      message: "Internal server error! while creating message",
    });
  }
};
module.exports = createMessage;
