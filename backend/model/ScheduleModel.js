const mongoose = require("mongoose");
const scheduleSchema = new mongoose.Schema({
  flightId: {
    type: String,
    require: true,
  },
  arrTime: {
    type: String,
  },
  depTime: {
    type: String,
  },
  arrAirport: {
    type: String,
  },
  depAirport: {
    type: String,
  },
  seats: [
    {
      class: {
        type: String,
      },
      count: {
        type: Number,
      },
      fare: {
        type: Number,
      },
    },
  ],
  date: {
    type: Date,
  },
  status: {
    type: String,
  },
});
const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
