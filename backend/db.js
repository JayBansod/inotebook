const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/inotebook");
    console.log("Mongo connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;
