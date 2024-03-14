import {
  body,
  param,
  validationResult,
  ValidationChain,
} from "express-validator";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const createValidator = (validations: ValidationChain[]) => [
  ...validations,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.info(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for creating a new event
export const createEventValidator = createValidator([
  body("date")
    .trim()
    .isISO8601()
    .withMessage("Date must be in ISO8601 format (YYYY-MM-DD)"),
  body("time").trim().notEmpty().withMessage("Time is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
]);

// Validator for updating an event
export const updateEventValidator = createValidator([
  body("date")
    .trim()
    .isISO8601()
    .withMessage("Date must be in ISO8601 format (YYYY-MM-DD)"),
  body("time").trim().notEmpty().withMessage("Time is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
]);

// Validator for registering for an event
export const registerForEventValidator = createValidator([
  param("eventId")
    .trim()
    .notEmpty()
    .isInt()
    .withMessage("Event ID must be a valid integer"),
]);
