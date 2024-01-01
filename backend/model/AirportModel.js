const mongoose = require("mongoose");
const airportSchema = new mongoose.model({
  code: {
    type: String,
    unique: true,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  locationCode: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
});
const Airport = mongoose.model("Airport", airportSchema);
export default Airport;
