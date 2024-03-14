import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userService } from "../../services/userService";
import { sendEmail } from "../../services/emailService";
import config from "config";

const serverConfig = config.get("server");

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, isOrganizer } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userService.registerUser({
      username,
      email,
      password: hashedPassword,
      isOrganizer,
      id: 0,
      organizedEvents: [],
      registeredEvents: [],
    });

    const token = jwt.sign(
      { id: newUser.id, isOrganizer },
      (serverConfig as any).jwtSecret
    );

    await sendRegistrationEmail(email);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const user = await userService.getUserByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, isOrganizer: user.isOrganizer },
      (serverConfig as any).jwtSecret
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

const sendRegistrationEmail = async (email: string) => {
  try {
    await sendEmail({
      to: email,
      subject: "Welcome to our platform",
      text: "Thank you for registering with us.",
    });

    console.log("Registration email sent to:", email);
  } catch (error) {
    console.error("Error sending registration email:", error);
    throw new Error("Failed to send registration email");
  }
};
