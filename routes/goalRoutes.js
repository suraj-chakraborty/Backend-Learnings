const express = require("express");
const router = express.Router();

// routes
router.get("/", (req, res) => {
  res.status(200).json({ message: "get goals" });
});

router.post("/", (req, res) => {
  res.status(200).json({ message: "set goals" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `update goals ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `delete goals ${req.params.id}` });
});

module.exports = router;
