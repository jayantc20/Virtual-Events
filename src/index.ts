import express, { json, urlencoded } from "express";
import helmet from "helmet";
import config from "config";
import { errorHandler } from "./utils/errorHandler";
import rateLimit from "express-rate-limit";
import router from "./routes";
import { dataSource } from "./database";

const app = express();
const port = config.get("server.port");

app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(limiter);
app.use(router);
app.use(errorHandler);

dataSource
  .initialize()
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.error("Error connecting to the database:", error));
