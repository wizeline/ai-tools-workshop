import request from "supertest";
import express, { Express } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "./users";
import {
  getAllTable,
  getElementById,
  createElement,
  updateElementById,
  deleteElementById,
} from "../utils/json-helpers";

// Mock your data
const mockData = [
  { id: "1", name: "User 1" },
  { id: "2", name: "User 2" },
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
app.get("/users", getUsers);
app.get("/users/:id", getUser);
app.post("/users", createUser);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

describe("Users Controller", () => {
  it("should get all users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  it("should get a single user by ID", async () => {
    const res = await request(app).get("/users/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData[0]);
  });

  it("should create a new user", async () => {
    const newUser = { name: "New User" };
    const res = await request(app).post("/users").send(newUser);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: "3", ...newUser });
  });

  it("should update a user", async () => {
    const updatedUser = { name: "Updated User" };
    const res = await request(app).put("/users/1").send(updatedUser);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: "1", ...updatedUser });
  });

  it("should delete a user", async () => {
    const res = await request(app).delete("/users/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "User deleted" });
  });

  it("should return an error if retrieving all users fails", async () => {
    (getAllTable as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Test error"))
    );
    const res = await request(app).get("/users");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Error retrieving users" });
  });

  it("should return a 404 error if no matching user is found", async () => {
    (getElementById as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(null)
    );
    const res = await request(app).get("/users/999");
    expect(res.status).toBe(404);
    expect(res.text).toEqual("User not found");
  });

  it("should return an error if retrieving a single user fails", async () => {
    (getElementById as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Test error"))
    );
    const res = await request(app).get("/users/1");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Error retrieving user" });
  });

  it("should return an error if creating a user fails", async () => {
    const newUser = { name: "New User" };
    (createElement as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Test error"))
    );
    const res = await request(app).post("/users").send(newUser);
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Error creating user" });
  });

  it("should return an error if updating a user fails", async () => {
    const updatedUser = { name: "Updated User" };
    (updateElementById as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Test error"))
    );
    const res = await request(app).put("/users/1").send(updatedUser);
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Error updating user" });
  });

  it("should return an error if deleting a user fails", async () => {
    (deleteElementById as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Test error"))
    );
    const res = await request(app).delete("/users/1");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Error deleting user" });
  });
});
