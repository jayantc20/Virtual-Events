import { Request, Response, NextFunction } from "express";
import config from "config";
import logger from "../utils/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(err.stack);

  const isProduction = config.get("server.NODE_ENV") === "production";

  if (isProduction) {
    res.status(500).json({ error: "Internal Server Error" });
  } else {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
};
