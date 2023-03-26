import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user";

const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(401).json({ msg: "Email already in use" });
  }

  bcrypt.genSalt(10, async (err, salt) => {
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ msg: "User created successfully!" });
  });
};

const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ msg: "Incorrect credentials" });
  }

  const validatePassword = await bcrypt.compare(req.body.password, user.password);

  if (validatePassword) {
    const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: 600000 });
    return res.status(200).json({ msg: "Login successful", token });
  } else {
    return res.status(401).json({ msg: "Incorrect credentials" });
  }
};

export default { createUser, loginUser };
