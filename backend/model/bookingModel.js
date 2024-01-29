const mongoose=require("mongoose");
const bookingSchema = new mongoose.Schema(
    {
      userId: { type: String, required: true },
      flightId: { type: String, required: true },
      arrAirport:{type:String,required:true},
      depAirport:{type:String,required:true},
      date:{type:Date,required:true},
      seatClass: { type: String, required: true },
      countSeats: { type: Number, required: true },
      fare:{type:Number}
    },
    {
      timestamps: true,
    }
  );
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;