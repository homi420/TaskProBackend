const Notifications = require("../models/Notifications");

const getAllClientsNotifications = async (callback) => {
  try {
    const notifications = await Notifications.find();
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
module.exports = getAllClientsNotifications;
