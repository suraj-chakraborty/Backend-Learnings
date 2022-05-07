const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const Goal = require("../modals/goalModal");

// routes
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    // res.status(200).json({ message: "get goals" });
    const goals = await Goal.find({ user: req.user.id });

    res.status(200).json(goals);
  })
);

router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    if (!req.body.text) {
      res.status(400).json({ message: "text field is empty" });
    }

    const goals = await Goal.create({
      text: req.body.text,
      user: req.user.id,
    });
    res.status(200).json(goals);
  })
);

router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const goals = await Goal.findById(req.params.id);

    if (!goals) {
      res.status(400);
      throw new error("goal not found");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedGoal);
  })
);

router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const goals = await Goal.findById(req.params.id);

    if (!goals) {
      res.status(400);
      throw new error("goal deleted");
    }

    const deleted = await Goal.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json(deleted);

    res.status(200).json(deleted);
  })
);

module.exports = router;
