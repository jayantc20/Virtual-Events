import { body, validationResult, ValidationChain } from "express-validator";
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

export const registrationValidator = createValidator([
  body("username")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Username can only contain alphanumeric characters, underscores, or hyphens"
    ),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),

  body("email").trim().isEmail().withMessage("Invalid email format"),

  body("isOrganizer")
    .isBoolean()
    .withMessage("isOrganizer must be a boolean value"),
]);

export const loginValidator = createValidator([
  body("username").trim().notEmpty().withMessage("Username is required"),

  body("password").trim().notEmpty().withMessage("Password is required"),
]);
