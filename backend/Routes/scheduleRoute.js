const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { isAuth } = require("../util");
const Schedule = require("../model/scheduleModel");
const scheduleRouter=express.Router();
scheduleRouter.post("/add-schedule",expressAsyncHandler(async(req,res)=>
{
    const schedule=new Schedule(
        {
            flightId:req.body.flightId,
            departureAirport:req.body.departureAirport,
            arrivalTime:req.body.arrivalTime,
            departureTime:req.body.departureTime,
            arrivalAirport:req.body.arrivalAirport,
            seats:
            [
                {
                countSeats:req.body.countSeats,
               }
            ],
            date:req.body.date
        }
    )
    await schedule.save();
    const schedules=await Schedule.find({})
    res.send(schedules)
}))
scheduleRouter.get("/",expressAsyncHandler(async(req,res)=>
{
  const schedules = await Schedule.find({});
  res.send(schedules);
}))
module.exports=scheduleRouter;