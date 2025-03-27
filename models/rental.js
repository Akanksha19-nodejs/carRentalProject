const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  name: String,
  email: String,
  carModel: String,
  startDate: Date,
  endDate: Date,
  status: String
});

module.exports = mongoose.model("Rental", rentalSchema);