import express from "express";
import {
  createEventController,
  getAllEventsController,
  updateEventController,
  registerForEventController,
} from "../controllers/events/eventControllers";
import {
  createEventValidator,
  updateEventValidator,
  registerForEventValidator,
} from "../middleware/eventValidatorMiddleware";

import { authenticateUser } from "../middleware/authMiddleware";

const eventRouter = express.Router();

eventRouter.use(authenticateUser);

// Create a new event
eventRouter.post("/", createEventValidator, createEventController);

// Get all events
eventRouter.get("/", getAllEventsController);

// Update an event
eventRouter.put("/:eventId", updateEventValidator, updateEventController);

// Register for an event
eventRouter.post(
  "/:eventId/register",
  registerForEventValidator,
  registerForEventController
);

export default eventRouter;
