const express = require("express");
import User from "../model/UserModel.js";
import expressAsycHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { generateToken, isAuth } from "../util.mjs";
const userRouter = express.Router();
userRouter.put(
  "/sign-up",
  expressAsycHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).send({ message: "Email already exists" });
      return;
    }
    const nameArray = req.body.email.split("@");
    const firstname = nameArray[0];
    const userSignup = new User({
      firstname: firstname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
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
    if (bcrypt.compareSync(user.password, req.body.password)) {
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
export default userRouter;
