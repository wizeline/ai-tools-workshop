import express from "express";

const router = express.Router();

const {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activities");

// Get all activities
router.get("/", getActivities);

// Get a single activity by ID
router.get("/:id", getActivity);

// Create a new activity
router.post("/", createActivity);

// Update an activity
router.put("/:id", updateActivity);

// Delete an activity
router.delete("/:id", deleteActivity);

module.exports = router;
