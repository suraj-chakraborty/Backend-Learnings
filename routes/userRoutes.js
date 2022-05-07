const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../modals/userModals");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("info incomplete");
    }
    //check user exist
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400);
      throw new Error("user already exist");
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hP = await bcrypt.hash(password, salt);

    // create user

    const user = await User.create({ name, email, password: hP });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        Token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid User" });
    }
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        message_id: user.id,
        name: user.name,
        email: user.email,
        Token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  })
);

router.get(
  "/me",
  asyncHandler(async (req, res) => {
    res.status(200).json({ message: "get me" });
  })
);

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = router;
