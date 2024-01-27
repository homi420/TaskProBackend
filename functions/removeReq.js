const Notifications = require("../models/Notifications");

const removeReq = async (data, callback, connectedClients, io) => {
  const { userId, from } = data;
  try {
    if (!userId) {
      callback({
        status: 409,
        message: "User id is required",
      });
    } else {
      const notificationToDel = await Notifications.find({
        to: userId,
        notificationType: "req",
        from,
      });
      if (!notificationToDel) {
        callback({
          status: 404,
          message: "No request found",
        });
      } else {
        notificationToDel.map(async (item) => {
          await Notifications.findByIdAndDelete(item._id);
          let clientToBeNotified = connectedClients.find(
            (client) => client.loggedInUserId === userId
          );
          if (clientToBeNotified) {
            io.to(clientToBeNotified.socketId).emit(
              "removeNotification",
              item._id
            );
          }
        });

        callback({
          status: 200,
          message: "Request Removed!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    callback({ status: 500, message: "Internal server error!" });
    throw error;
  }
};
module.exports = removeReq;
