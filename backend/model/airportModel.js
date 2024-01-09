const mongoose = require("mongoose");
const airportSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  locationCode: {
    type: String,
    required: true,
  },
});
const Airport = mongoose.model("Airport", airportSchema);
module.exports = Airport;
