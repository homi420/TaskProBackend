const Notifications = require("../models/Notifications");

const notify = async (data, io, connectedClients) => {
  const to = data.from;
  const from = data.userId;
  const { notification, team } = data;
  try {
    const newNotification = await Notifications.create({
      to,
      from,
      notification: notification,
      notificationType: "info",
      team,
    });
    let clientToBeNotified = connectedClients.find(
      (client) => client.loggedInUserId === to
    );
    if (clientToBeNotified) {
      io.to(clientToBeNotified.socketId).emit(
        "newNotification",
        newNotification
      );
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = notify;
