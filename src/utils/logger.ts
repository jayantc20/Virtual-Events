import winston from "winston";
import config from "config";

const nodeEnv: string = config.get("server.NODE_ENV");

const logger = winston.createLogger({
  level: nodeEnv === "production" ? "info" : "debug",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// If the environment development log to the console with colorized output
if (nodeEnv !== "production") {
  logger.add(
    new winston.transports.Console({ format: winston.format.simple() })
  );
}

export default logger;
