const Notifications = require("../models/Notifications");

const updateNotifications = async (to, connectedClients, io) => {
  const notifications = await Notifications.find({ to });
  let clientToBeUpdated = connectedClients.find(
    (client) => client.loggedInUserId === to
  );
  if (clientToBeUpdated) {
    io.to(clientToBeUpdated.socketId).emit(
      "updateNotifications",
      notifications
    );
  }
};

module.exports = updateNotifications;
