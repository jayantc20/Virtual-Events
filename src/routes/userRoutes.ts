import express from "express";
import {
  registrationValidator,
  loginValidator,
} from "../middleware/userValidatorMiddleware";
import {
  registerUserController,
  loginUserController,
} from "../controllers/user/userControllers";

const userRouter = express.Router();

userRouter.post("/register", registrationValidator, registerUserController);
userRouter.post("/login", loginValidator, loginUserController);

export default userRouter;
