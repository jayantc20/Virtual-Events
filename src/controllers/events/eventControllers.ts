import { Request, Response, NextFunction } from "express";
import { eventService } from "../../services/eventService";
import { User } from "../../models/User";

export const createEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, time, description } = req.body;
    const organizer: User | undefined = req.user;
    if (!organizer || !organizer.isOrganizer) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newEvent = await eventService.createEvent({
      date,
      time,
      description,
      organizer: organizer,
      participants: [],
    });

    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

export const getAllEventsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const updateEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventId = parseInt(req.params.eventId, 10);
    const { date, time, description } = req.body;
    const isOrganizer = req.user?.isOrganizer;

    if (!isOrganizer) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedEvent = await eventService.updateEvent(eventId, {
      date,
      time,
      description,
      organizer: {} as User,
      participants: [],
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
};

export const registerForEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventId = parseInt(req.params.eventId, 10);
    const participantId = req.user?.id;
    const isOrganizer = req.user?.isOrganizer;

    if (participantId === undefined || isOrganizer) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const registerResponse = await eventService.registerForEvent(
      eventId,
      participantId
    );

    if (!registerResponse.success) {
      return res.status(400).json({ message: registerResponse.message });
    }

    const eventDetails = await eventService.getEvent(eventId);

    res
      .status(200)
      .json({ message: "Registration successful", event: eventDetails });
  } catch (error) {
    next(error);
  }
};
