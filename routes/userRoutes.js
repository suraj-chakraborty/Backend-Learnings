const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.status(200).json({ message: "Register User" });
});

router.post("/login", (req, res) => {
  res.status(200).json({ message: "login user" });
});

router.get("/me", (req, res) => {
  res.status(200).json({ message: "get me" });
});

module.exports = router;
