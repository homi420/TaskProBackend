const mongoose = require("mongoose");
const Message = require("./Message");

const chatSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Teams", required: true },
  messages: [Message.messageSchema],
});
module.exports = mongoose.model("Chat", chatSchema);
