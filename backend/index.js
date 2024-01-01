const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
import userRouter from "./router/userRouter.js";
const dotenv = require("dotenv");
const app = express();
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server listening at Post ${PORT}`);
});
