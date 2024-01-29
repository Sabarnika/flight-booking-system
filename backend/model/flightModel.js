const mongoose = require("mongoose");
const flightSchema = new mongoose.Schema({
  flightId: {
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
  time:
  {
    type:String,
    required:true,
  }
});
const Flights = mongoose.model("Airport", flightSchema);
module.exports = Flights;