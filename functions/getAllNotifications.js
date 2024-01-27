const Notifications = require("../models/Notifications");

const getAllNotifications = async (userId, callback) => {
  try {
    const notifications = await Notifications.find({ to: userId });
    callback({
      status: 200,
      notifications,
    });
  } catch (error) {
    console.log(error);
    callback({
      status: 500,
      message: "Internal server error",
    });
    throw error;
  }
};
module.exports = getAllNotifications;
