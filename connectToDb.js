const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;
const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/taskManager");
    console.log("db Connected");
  } catch (error) {
    if (error instanceof mongoose.Error) {
      switch (error.name) {
        case "MongoNetworkError":
          console.error("MongoDB Network Error. Check your connection.");
          break;
        case "MongoTimeoutError":
          console.error(
            "MongoDB Connection Timeout. Ensure the server is running."
          );
          break;
        default:
          console.error("Unexpected MongoDB connection error:", error.message);
          break;
      }
    } else {
      console.error("Unexpected error:", error.message);
    }
    console.log("Error connecting db");
  }
};
module.exports = connectToDb;
