import request from "supertest";
import express, { Express } from "express";
import {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} from "./activities";
import {
  getAllTable,
  getElementById,
  createElement,
  updateElementById,
  deleteElementById,
} from "../utils/json-helpers";

// Mock your data
const mockData = [
  { id: "1", name: "Activity 1" },
  { id: "2", name: "Activity 2" },
];

// Mock the helper functions
jest.mock("../utils/json-helpers", () => ({
  getAllTable: jest.fn(() => Promise.resolve(mockData)),
  getElementById: jest.fn((table, id) =>
    Promise.resolve(mockData.find((item) => item.id === id))
  ),
  createElement: jest.fn((table, data) =>
    Promise.resolve({ id: "3", ...data })
  ),
  updateElementById: jest.fn((table, id, data) =>
    Promise.resolve({ id, ...data })
  ),
  deleteElementById: jest.fn((table, id) => Promise.resolve()),
}));

// Create a mock Express app for testing
const app: Express = express();
app.use(express.json());
app.get("/activities", getActivities);
app.get("/activities/:id", getActivity);
app.post("/activities", createActivity);
app.put("/activities/:id", updateActivity);
app.delete("/activities/:id", deleteActivity);

describe("Activities Controller", () => {
  it("should get all activities", async () => {
    const res = await request(app).get("/activities");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  it("should get a single activity by ID", async () => {
    const res = await request(app).get("/activities/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData[0]);
  });

  it("should create a new activity", async () => {
    const newActivity = { name: "New Activity" };
    const res = await request(app).post("/activities").send(newActivity);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: "3", ...newActivity });
  });

  it("should update an activity", async () => {
    const updatedActivity = { name: "Updated Activity" };
    const res = await request(app).put("/activities/1").send(updatedActivity);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: "1", ...updatedActivity });
  });

  it("should delete an activity", async () => {
    const res = await request(app).delete("/activities/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Activity deleted" });
  });

  it("should return an error if retrieving all activities fails", async () => {
    (getAllTable as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Test error"))
    );
    const res = await request(app).get("/activities");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Error retrieving activities" });
  });

  it("should return an error if retrieving a single activity fails", async () => {
    (getElementById as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Test error"))
    );
    const res = await request(app).get("/activities/1");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Error retrieving activity" });
  });

  it("should return a 404 error if no matching activity is found", async () => {
    (getElementById as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(null)
    );
    const res = await request(app).get("/activities/999");
    expect(res.status).toBe(404);
    expect(res.text).toEqual("Activity not found");
  });

  it("should return an error if creating an activity fails", async () => {
    const newActivity = { name: "New Activity" };
    (createElement as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Test error"))
    );
    const res = await request(app).post("/activities").send(newActivity);
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Error creating activity" });
  });

  it("should return an error if updating an activity fails", async () => {
    const updatedActivity = { name: "Updated Activity" };
    (updateElementById as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Test error"))
    );
    const res = await request(app).put("/activities/1").send(updatedActivity);
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Error updating activity" });
  });

  it("should return an error if deleting an activity fails", async () => {
    (deleteElementById as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Test error"))
    );
    const res = await request(app).delete("/activities/1");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Error deleting activity" });
  });
});
