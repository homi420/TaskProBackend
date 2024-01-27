const { default: mongoose } = require("mongoose");

const NotifSchema = new mongoose.Schema({
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  notification: {
    type: String,
    required: [true, "Notification message is required"],
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teams",
  },
  status: {
    type: String,
    default: "unread",
  },
  notificationType: {
    type: String,
    required: [true, "Notification type is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Notifications", NotifSchema);
