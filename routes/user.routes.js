const { UserModel } = require("../models/user.model");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/balcklist.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, email, password, city, age, gender } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(200)
        .send({ msg: "User Already registered.Try with another email." });
    }
    bcrypt.hash(password, 6, async (err, hash) => {
      if (err) {
        res.status(400).send({ msg: "Internal Server Error.", Error: err });
      } else {
        const newUser = new UserModel({
          username,
          email,
          password: hash,
          city,
          age,
          gender,
        });
        await newUser.save();
        res.status(200).send({ msg: "User registered Successfully." });
      }
    });
  } catch (err) {
    res.status(500).send({ msg: "Bad Request." });
  }
});

// login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const access_token = jwt.sign(
          { userID: user._id, author: user.username },
          "nishant",
          { expiresIn: "7d" }
        );
        res
          .status(200)
          .send({ msg: "User logged in Successfully.", access_token });
      } else {
        res.status(400).send({ msg: "Wrong Credentials.", Error: err });
      }
    });
  } catch (err) {
    res.status(500).send({ msg: "Bad Request." });
  }
});

// logout
userRouter.get("/logout", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const newblacklistToken = new BlacklistModel({ token });
    await newblacklistToken.save();
    res.status(200).send({ msg: "Token Blacklisted." });
  } catch (err) {
    res.status(500).send({ msg: "Bad Request." });
  }
});

module.exports = { userRouter };
