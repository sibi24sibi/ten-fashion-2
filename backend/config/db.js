const mongoose = require("mongoose");

const connectDB = async (connectionUrl) => {
  try {
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB : " + connectionUrl);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
