import { Request, Response } from "express";

import {
  getAllTable,
  getElementById,
  createElement,
  updateElementById,
  deleteElementById,
} from "../utils/json-helpers";

// Get all activities
export const getActivities = async (
  req: Request,
  res: Response
): Promise<void> => {
  const activities = await getAllTable("activities");
  res.send(activities);
};

// Get a single activity by ID
export const getActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  const activity = await getElementById("activities", req.params.id);
  if (!activity) {
    res.status(404).send("Activity not found");
    return;
  }
  res.send(activity);
};

// Create a new activity
export const createActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newActivity = await createElement("activities", req.body);
  res.send(newActivity);
};

// Update an activity
export const updateActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  await updateElementById("activities", req.params.id, req.body);
  const updatedActivity = await getElementById("activities", req.params.id);
  res.send(updatedActivity);
};

// Delete an activity
export const deleteActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  await deleteElementById("activities", req.params.id);
  res.send({ message: "Activity deleted" });
};
