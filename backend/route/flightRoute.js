const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const expressAsycHandler = require("express-async-handler");
const { isAuth } = require("../util");
const Flight = require("../model/flightModel");
const Airlines = require("../model/AirlineModel");
const flightRouter = express.Router();
flightRouter.get(
  "/fetch",
  expressAsycHandler(async (req, res) => {
    const flights = await Flight.find({});
    if (!flights) {
      res.status(400).send({ message: "No flights found" });
      return;
    }
    res.send(flights);
    return;
  })
);
module.exports = flightRouter;
