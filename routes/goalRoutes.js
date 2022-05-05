const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

// routes
router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.status(200).json({ message: "get goals" });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    if (!req.body.text) {
      res.status(400).json({ message: "text field is empty" });
    } else {
      res.status(200).json({ message: "set goals" });
    }
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    res.status(200).json({ message: `update goals ${req.params.id}` });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    res.status(200).json({ message: `delete goals ${req.params.id}` });
  })
);

module.exports = router;
