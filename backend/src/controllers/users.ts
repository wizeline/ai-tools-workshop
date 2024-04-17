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
  const users = await getAllTable("users");
  res.send(users);
};

// Get a single user by ID
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const user = await getElementById("users", req.params.id);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.send(user);
};

// Create a new user
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newUser = await createElement("users", req.body);
  res.send(newUser);
};

// Update a user
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  await updateElementById("users", req.params.id, req.body);
  const updatedUser = await getElementById("users", req.params.id);
  res.send(updatedUser);
};

// Delete a user
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  await deleteElementById("users", req.params.id);
  res.send({ message: "User deleted" });
};
