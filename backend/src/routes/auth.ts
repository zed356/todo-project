import express from "express";
import { body } from "express-validator";
import authController from "../controllers/auth";

const router = express.Router();

router.post(
  "/register",
  body("email").trim().isEmail().normalizeEmail(),
  body("password").trim().isLength({ min: 4 }),
  authController.createUser
);

router.post(
  "/login",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 4 }),
  authController.loginUser
);

export default router;
