const connectToDb = require("./connectToDb");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const createTask = require("./functions/tasks/createTask");
const reqToAddInTheTeam = require("./functions/reqToAddInTheTeam");
const reqToAddAccepted = require("./functions/reqToAddAccepted");
const getAllNotifications = require("./functions/getAllNotifications");
const getAllClientsNotifications = require("./functions/getAllClientsNotifications");
const removeReq = require("./functions/removeReq");
const rejectReq = require("./functions/rejectReq");
const notify = require("./functions/notify");
const getTeamTasks = require("./functions/tasks/getTeamTasks");
const getUserTasks = require("./functions/tasks/getUserTasks");
const editName = require("./functions/tasks/edit/editName");
const editDetails = require("./functions/tasks/edit/editDetails");
const editGoal = require("./functions/tasks/edit/editGoal");
const deleteGoal = require("./functions/tasks/delete/deleteGoal");
const addGoal = require("./functions/tasks/addGoal");
const markChecked = require("./functions/tasks/edit/markChecked");
const getAllTeamTasks = require("./functions/tasks/getAllTeamTasks");
const getChat = require("./functions/chat/getChat");
const createChat = require("./functions/chat/createChat");
const createMessage = require("./functions/chat/Messages/CreateMessage");
const Chat = require("./models/Chat");
const deleteTask = require("./functions/tasks/delete/deleteTask");
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" },
});
const connectedClients = [];
io.on("connection", (socket) => {
  let loggedInUserId;
  console.log("Client connected");
  socket.on("userConnected", (loggedInUser) => {
    loggedInUserId = loggedInUser._id;
    connectedClients.push({ loggedInUserId, socketId: socket.id });
  });
  socket.on("createTask", (data, callback) => {
    createTask(data, callback);
  });
  socket.on("getAllNotifications", (userId, callback) => {
    getAllNotifications(userId, callback);
  });
  socket.on("getAllClientsNotifications", (callback) => {
    getAllClientsNotifications(callback);
  });
  socket.on("reqToAddInTheTeam", (data, callback) => {
    reqToAddInTheTeam(io, data, connectedClients, callback);
  });
  socket.on("removeReq", (data, callback) => {
    removeReq(data, callback, connectedClients, io);
    if (data.type === "reject") notify(data, io, connectedClients);
  });
  socket.on("reqToAddAccepted", (data, callback) => {
    reqToAddAccepted(data, callback);
  });
  socket.on("newTask", (data) => {
    createTask(data, socket);
  });
  socket.on("getTeamTasks", (teamId) => {
    getTeamTasks(teamId, socket);
  });
  socket.on("getAllTeamTasks", (teamId) => {
    getAllTeamTasks(teamId, socket);
  });
  socket.on("getUserTasks", (userId) => {
    getUserTasks(userId, socket);
  });
  socket.on("editTaskName", (data) => {
    editName(data, socket);
  });
  socket.on("editTaskDetails", (data) => {
    editDetails(data, socket);
  });
  socket.on("editTaskGoal", (data) => {
    editGoal(data, socket);
  });
  socket.on("deleteTaskGoal", (data) => {
    deleteGoal(data, socket);
  });
  socket.on("addGoal", (data) => {
    addGoal(data, socket);
  });
  socket.on("markChecked", (data) => {
    markChecked(data, socket);
  });
  socket.on("deleteTask", (data) => {
    console.log("deleting");
    deleteTask(data, socket);
  });

  // Chat Code Starts Here...
  socket.on("joinRoom", async (roomId) => {
    socket.join(roomId);
    console.log("Joined the room");
    const chat = await getChat({ teamId: roomId, type: "noEmit" }, socket);
    if (chat.length === 0) {
      const newChat = await createChat({ teamId: roomId }, socket);
    }
  });
  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log("left the room");
  });
  socket.on("getChat", (data) => {
    getChat(data, socket);
  });
  socket.on("sendMessage", async (roomId, message, senderId) => {
    const chat = await getChat({ teamId: roomId }, socket);
    const newMessage = await createMessage(
      { senderId, content: message, to: roomId },
      socket
    );
    io.to(roomId).emit("message", newMessage);
    const updateChat = {
      $push: {
        messages: newMessage,
      },
    };
    if (chat.length > 0) {
      const updatedChat = await Chat.findByIdAndUpdate(chat[0]._id, updateChat);
    }
  });
  socket.on("disconnect", () => {
    const index = connectedClients.findIndex((client) => {
      client.socketId === socket.id;
    });
    if (index !== -1) {
      connectedClients.splice(index, 1);
      console.log(
        `Client with socket ID ${socket.id} removed from connectedClients`
      );
    }
    console.log("Client disconnected");
  });
});
connectToDb();
httpServer.listen(5000);
