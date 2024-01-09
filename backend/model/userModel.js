const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  userType: {
    type: String,
    default: "customer",
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
