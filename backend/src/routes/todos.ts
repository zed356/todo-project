import express from "express";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import User from "../models/user";
import todoController from "../controllers/todos";

const router = express.Router();

router.get("/todos", todoController.getTodos);

router.post("/add", todoController.addTodo);

router.delete("/delete/:todoId", todoController.deleteTodo);

router.patch("/update/:todoId", todoController.updateTodo);

export default router;
