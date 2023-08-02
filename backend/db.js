const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongoose.connect("mongodb://localhost:27017/inotebook");
    mongoose.connect(
      // "mongodb+srv://shopping:Jay123@cluster0.tvr06ed.mongodb.net/shopping?retryWrites=true&w=majority"
      "mongodb+srv://jaybansod:jaybansod@inotebook.ikyfcev.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Mongo connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;
