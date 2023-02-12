import express from "express";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import Todo from "../models/todo";
import User from "../models/user";

const router = express.Router();

interface TodoType {
  text: string;
  completed: boolean;
  date: Date;
}

router.get("/todos", (req: Request, res: Response, next: NextFunction) => {
  Todo.find({}).then((todoRes: TodoType[]) => {
    res.send(todoRes);
  });
});

router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
  const newTodo = new Todo();
  newTodo.text = req.body.text;
  newTodo.completed = req.body.completed;
  newTodo.date = req.body.date;
  await newTodo.save();
});

router.delete("/delete/:todoId", (req: Request, res: Response, next: NextFunction) => {
  const targetId = new mongoose.Types.ObjectId(req.params.todoId);
  Todo.deleteOne({ _id: targetId }).then(() => {
    res.status(204).send({ msg: "Successfully deleted!" });
  });
});

router.patch("/update/:todoId", (req: Request, res: Response, next: NextFunction) => {
  const targetId = new mongoose.Types.ObjectId(req.params.todoId);

  Todo.findOneAndUpdate(
    { _id: targetId },
    { text: req.body.text, completed: req.body.completed }
  ).then(() => res.status(201).send({ msg: "Successfully updated!" }));
});

export default router;
