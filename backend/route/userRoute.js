const User = require("../model/UserModel.js");
const expressAsycHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { generateToken, isAuth } = require("../util.js");
const express = require("express");
const userRouter = express.Router();

userRouter.put(
  "/sign-up",
  expressAsycHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).send({ message: "Email already exists" });
      return;
    }
    // const nameArray = req.body.email.split("@");
    // const firstname = nameArray[0];
    const userSignup = new User({
      firstname: req.body.firstname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      lastname: req.body.lastname,
      city: req.body.city,
      phone: req.body.city,
      gender: req.body.gender,
      address: req.body.address,
      postal: req.body.postal,
      organization: req.body.organization,
      country: req.body.country,
      dob: req.body.dob,
    });
    await userSignup.save();
    res.send({
      users: userSignup,
      token: generateToken(userSignup),
    });
    return;
  })
);
userRouter.post(
  "/sign-in",
  expressAsycHandler(async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
    }).select("+password");
    if (!user) {
      res.status(400).send({
        message: "Account not found!",
      });
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const users = await User.findOne({
        email: req.body.email,
      });
      res.send({
        users: users,
        token: generateToken(user),
      });
      return;
    } else {
      res.status(400).send({ message: "Invalid Password" });
    }
  })
);

module.exports = userRouter;
