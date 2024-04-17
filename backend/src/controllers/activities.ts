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
  try {
    const activities = await getAllTable("activities");
    res.send(activities);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving activities" });
  }
};

// Get a single activity by ID
export const getActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const activity = await getElementById("activities", req.params.id);
    if (!activity) {
      res.status(404).send("Activity not found");
      return;
    }
    res.send(activity);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving activity" });
  }
};

// Create a new activity
export const createActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newActivity = await createElement("activities", req.body);
    res.send(newActivity);
  } catch (error) {
    res.status(500).send({ message: "Error creating activity" });
  }
};

// Update an activity
export const updateActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedActivity = await updateElementById(
      "activities",
      req.params.id,
      req.body
    );
    res.send(updatedActivity);
  } catch (error) {
    res.status(500).send({ message: "Error updating activity" });
  }
};

// Delete an activity
export const deleteActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteElementById("activities", req.params.id);
    res.send({ message: "Activity deleted" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting activity" });
  }
};
