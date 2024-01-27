const Notifications = require("../models/Notifications");

const reqToAddInTheTeam = async (
  io,

  data,
  connectedClients,
  callback
) => {
  const { to, notification, team, from } = data;
  try {
    const newNot = await Notifications.create({
      to,
      notification,
      team,
      notificationType: "req",
      from,
    });
    callback({
      status: 200,
      message: "Request Sent!",
    });
    let clientToBeNotified = connectedClients.find(
      (client) => client.loggedInUserId === to
    );
    if (clientToBeNotified) {
      io.to(clientToBeNotified.socketId).emit("newNotification", newNot);
    }
  } catch (error) {
    console.log(error);
    callback({
      status: 500,
      message: "Internal server error!",
    });
    throw error;
  }
};
module.exports = reqToAddInTheTeam;
