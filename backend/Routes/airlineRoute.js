const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { isAuth } = require("../util");
const Flight = require("../model/flightModel");
const airlineRouter = express.Router();
airlineRouter.get(
  "/fetch",
  expressAsyncHandler(async (req, res) => {
    const airlines = await Flight.find({});
    if (!airlines) {
      res.status(404).send({ message: "No airlines found" });
      return;
    }
    res.send(airlines);
    return;
  })
);
airlineRouter.put(
  "/add",
  expressAsyncHandler(async (req, res) => {
    const airline = new Flight({
      location:req.body.location,
      locationCode:req.body.locationCode,
      name: req.body.name,
      flightId: req.body.flightId,
      time:req.body.time,
    });
    await airline.save();
    const airlines = await Flight.find({});
    if (!airlines) {
      res.status(404).send({ message: "No airlines found" });
      return;
    }
    res.send(airlines);
    return;
  })
);
// airlineRouter.get(
//   "/delete/:id",
//   expressAsyncHandler(async (req, res) => {
//     await Airlines.findByIdAndDelete(req.params.id);
//     const airlines = await Airlines.find({});
//     if (!airlines) {
//       res.status(404).send({ message: "No airlines found" });
//       return;
//     }
//     res.send(airlines);
//     return;
//   })
// );
// airlineRouter.put(
//   "/admin/delete/:id",
//   expressAsyncHandler(async (req, res) => {
//     await Airlines.updateOne(
//       {
//         id: req.params.id,
//       },
//       {
//         $pull: { flights: req.body.flightCode },
//       }
//     );
//     const airlines = await Airlines.find({});
//     if (!airlines) {
//       res.status(404).send({ message: "No airlines found" });
//       return;
//     }
//     res.send(airlines);
//     return;
//   })
// );
// airlineRouter.get(
//   "/admin/delete/:id",
//   expressAsyncHandler(async (req, res) => {
//     await Airlines.findOneAndDelete(req.params.id);
//     const airlines = await Airlines.find({});
//     if (!airlines) {
//       res.status(404).send({ message: "No airlines found" });
//       return;
//     }
//     res.send(airlines);
//     return;
//   })
// );
module.exports = airlineRouter;
