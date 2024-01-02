const mongoose = require("mongoose");
const airLineSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  flights: {
    type: [String],
  },
  image: {
    type: String,
  },
});
const Airlines = mongoose.model("Airline", airLineSchema);
module.exports = Airlines;
