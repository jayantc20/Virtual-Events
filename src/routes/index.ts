import { Router } from "express";
import userRouter from "./userRoutes";
import eventRouter from "./eventRoutes";

const router = Router();

router.use("/api/v1/users", userRouter);
router.use("/api/v1/events", eventRouter);

export default router;
