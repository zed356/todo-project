import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/user";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();
  res.status(201).json({ msg: "User created successfully!", userId: user._id });
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ msg: "Incorrect credentials" });
  }

  if (user.password !== req.body.password) {
    return res.status(401).json({ msg: "Incorrect credentials" });
  } else {
    return res.status(200).json({ msg: "Login successful" });
  }
};

export default { createUser, loginUser };
