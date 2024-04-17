import express from "express";

const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

// Get all users
router.get("/", getUsers);

// Get a single user by ID
router.get("/:id", getUser);

// Create a new user
router.post("/", createUser);

// Update a user
router.put("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

module.exports = router;
