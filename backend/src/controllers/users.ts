import { Request, Response } from "express";

import {
  getAllTable,
  getElementById,
  createElement,
  updateElementById,
  deleteElementById,
} from "../utils/json-helpers";

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllTable("users");
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving users" });
  }
};

// Get a single user by ID
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getElementById("users", req.params.id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving user" });
  }
};

// Create a new user
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newUser = await createElement("users", req.body);
    res.send(newUser);
  } catch (error) {
    res.status(500).send({ message: "Error creating user" });
  }
};

// Update a user
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await updateElementById("users", req.params.id, req.body);
    const updatedUser = await getElementById("users", req.params.id);
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: "Error updating user" });
  }
};

// Delete a user
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteElementById("users", req.params.id);
    res.send({ message: "User deleted" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting user" });
  }
};
