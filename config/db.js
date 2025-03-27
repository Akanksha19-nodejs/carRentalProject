const mongoose = require("mongoose");

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mongo:mongo@cluster0.uzowhek.mongodb.net/carrental?retryWrites=true&w=majority&appName=Cluster0", clientOptions);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;


