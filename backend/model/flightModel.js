const mongoose = require("mongoose");
const flightSchema = new mongoose.Schema({
  airLineId: {
    type: String,
    require: true,
  },
  number: {
    type: String,
    unique: true,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
});
const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
