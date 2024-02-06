const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userRoute = require("./Routes/userRoute");
const airlineRoute = require("./Routes/airlineRoute");
const scheduleRoute = require("./Routes/scheduleRoute");
const bookingRouter=require('./Routes/bookingRoute')
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/user", userRoute);
app.use("/airline", airlineRoute);
app.use("/admin",scheduleRoute);
app.use("/customer",bookingRouter)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at PORT ${PORT}`);
});
