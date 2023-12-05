const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URL);
  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("MongoDB Connected");
  });

  connection.on("error", (error) => {
    console.log("MongoDB Error", error);
  });
};

module.exports = connectDB;
