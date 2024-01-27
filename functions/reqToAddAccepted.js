const Notifications = require("../models/Notifications");
const Teams = require("../models/Teams");
const notify = require("./notify");
const reqToAddAccepted = async (data, callback, io, connectedClients) => {
  const { teamId, userId, notification } = data;
  try {
    const memberExists = await Teams.findOne({
      "members.id": userId,
      _id: teamId,
    });
    if (memberExists) {
      callback({
        status: 409,
        message: "You already accepted the request!",
      });
    } else {
      await Teams.updateOne(
        { _id: teamId },
        { $push: { members: { id: userId } } },
        { new: true }
      );
      const team = await Teams.findById(teamId);
      console.log(team);
      await Notifications.findByIdAndDelete(notification);
      callback({
        status: 200,
        message: "Request Accepted!",
      });
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
module.exports = reqToAddAccepted;
