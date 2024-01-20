import { jest } from "@jest/globals";
import request from "supertest";
import app from "../../app.js";

describe("PagesController", () => {
  describe("GET /", () => {
    it("Should respond with the home view.", async () => {
      const response = await request(app).get("/");

      expect(response.statusCode).toBe(200);
    });
  });
});

describe("PagesController", () => {
  describe("GET /", () => {
    it("Should respond with the about view.", async () => {
      const response = await request(app).get("/about");

      expect(response.statusCode).toBe(200);
    });
  });
});