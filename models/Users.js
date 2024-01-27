const mongoose = require("mongoose");
const UsersModel = new mongoose.Schema({
  userName: { type: String, required: [true, "Username is required!"] },
  email: { type: String, required: [true, "Email is required!"] },
  password: { type: String, required: [true, "Password is required!"] },
});
const Users = mongoose.models.Users || mongoose.model("Users", UsersModel);
module.exports = Users;
