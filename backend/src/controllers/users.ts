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
    const user = await getUser(req, res); // Llamada a función recursiva
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
    const updatedUser = await updateElementById(
      "users",
      req.params.id,
      req.body
    );
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