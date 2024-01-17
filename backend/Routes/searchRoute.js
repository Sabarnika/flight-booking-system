const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { isAuth } = require("../util");
const Schedule = require("../model/scheduleModel");
const searchRouter = express.Router();
searchRouter.post(
  "/fetch",
  expressAsyncHandler(async (req, res) => {
    const departureAirport = req.body.departureAirport;
    const arrivalAirport = req.body.arrivalAirport;
    const searchDate = req.body.searchDate;
    if (departureAirport !== "" && arrivalAirport !== "" && searchDate !== "") {
      const schedules = await Schedule.find({
        departureAirport: departureAirport,
        arrivalAirport: arrivalAirport,
        date: new Date(searchDate),
      });
      if (!schedules) {
        res.status(404).send({ message: "No schedules found!" });
        return;
      }
      res.send(schedules);
      return;
    }
    if (departureAirport === "" && arrivalAirport !== "" && searchDate !== "") {
      const schedules = await Schedule.find({
        arrivalAirport: arrivalAirport,
        date: new Date(searchDate),
      });
      if (!schedules) {
        res.status(404).send({ message: "No schedules found!" });
        return;
      }
      res.send(schedules);
      return;
    }
    if (departureAirport !== "" && arrivalAirport === "" && searchDate !== "") {
      const schedules = await Schedule.find({
        departureAirport: departureAirport,
        date: new Date(searchDate),
      });
      if (!schedules) {
        res.status(404).send({ message: "No schedules found!" });
        return;
      }
      res.send(schedules);
      return;
    }
    if (departureAirport !== "" && arrivalAirport !== "" && searchDate === "") {
      const schedules = await Schedule.find({
        departureAirport: departureAirport,
        arrivalAirport: arrivalAirport,
      });
      if (!schedules) {
        res.status(404).send({ message: "No schedules found!" });
        return;
      }
      res.send(schedules);
      return;
    }
    if (departureAirport !== "" && arrivalAirport === "" && searchDate === "") {
      const schedules = await Schedule.find({
        departureAirport: departureAirport,
      });
      if (!schedules) {
        res.status(404).send({ message: "No schedules found!" });
        return;
      }
      res.send(schedules);
      return;
    }
    if (departureAirport === "" && arrivalAirport !== "" && searchDate === "") {
      const schedules = await Schedule.find({
        arrivalAirport: arrivalAirport,
      });
      if (!schedules) {
        res.status(404).send({ message: "No schedules found!" });
        return;
      }
      res.send(schedules);
      return;
    }
    if (departureAirport === "" && arrivalAirport === "" && searchDate !== "") {
      const schedules = await Schedule.find({
        date: new Date(searchDate),
      });
      if (!schedules) {
        res.status(404).send({ message: "No schedules found!" });
        return;
      }
      res.send(schedules);
      return;
    }
    if (departureAirport === "" && arrivalAirport === "" && searchDate === "") {
      const schedules = await Schedule.find({});
      if (!schedules) {
        res.status(404).send({ message: "No schedules found!" });
        return;
      }
      res.send(schedules);
      return;
    }
  })
);

module.exports = searchRouter;
