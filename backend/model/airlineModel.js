const mongoose = require("mongoose");
const airlineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  flights: {
    type: [String],
  },
});
const Airlines = mongoose.model("Airlines", airlineSchema);
module.exports = Airlines;
