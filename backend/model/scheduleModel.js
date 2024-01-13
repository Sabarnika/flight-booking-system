const mongoose = require("mongoose");
const scheduleSchema = new mongoose.Schema({
  flightId: { type: String, required: true },
  departureAirport: { type: String },
  departureTime: { type: String },
  arrivalAirport: { type: String },
  arrivalTime: { type: String },
  seats: [
    {
      class: { type: String,
      default:"Economic" },
      countSeats: { type: Number },
      fare: { type: Number },
    },
  ],
  status: { type: String },
  date: { type: Date },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
