const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { isAuth } = require("../util");
const Airport = require("../model/airportModel");
const airportRouter = express.Router();
airportRouter.get(
  "/fetch",
  expressAsyncHandler(async (req, res) => {
    const airports = await Airport.find({});
    if (!airports) {
      res.status(404).send({ message: "No airports found" });
      return;
    }
    res.send(airports);
    return;
  })
);
//isAuth
airportRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const airports = await Airport.find({});
    if (!airports) {
      res.status(404).send({ message: "No airports found" });
      return;
    }
    res.send(airports);
    return;
  })
);
airportRouter.post(
  "/add",
  expressAsyncHandler(async (req, res) => {
    const airport = new Airport({
      code: req.body.code,
      name: req.body.name,
      location: req.body.location,
      locationCode: req.body.locationCode,
    });
    await airport.save();
    const airports = await Airport.find({});
    res.send(airports);
    return;
  })
);
airportRouter.get(
  "/delete/:id",
  expressAsyncHandler(async (req, res) => {
    await Airport.findOneAndDelete({ _id: req.params.id });
    const airports = await Airport.find({});
    res.send(airports);
    return;
  })
);
airportRouter.put(
  "/update/:id",
  expressAsyncHandler(async (req, res) => {
    const airport = await Airport.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        code: req.body.code,
        name: req.body.name,
        location: req.body.location,
        locationCode: req.body.locationCode,
      },
      {
        new: true,
      }
    );
    const airports = await Airport.find({});
    res.send(airports);
    return;
  })
);
module.exports = airportRouter;
