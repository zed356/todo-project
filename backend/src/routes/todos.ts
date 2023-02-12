import express from "express";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import Todo from "../models/todo";
import User from "../models/user";

const router = express.Router();

interface Todo {
  text: string;
  completed: boolean;
}

router.get("/todos", (req: Request, res: Response, next: NextFunction) => {
  Todo.find({}).then((todoRes: Todo[]) => {
    res.send(todoRes);
  });
});

router.post("/add", (req: Request, res: Response, next: NextFunction) => {
  const newTodo = new Todo();
  newTodo.text = req.body.text;
  newTodo.completed = req.body.completed;
  newTodo.save();
});

router.delete("/delete/:todoId", (req: Request, res: Response, next: NextFunction) => {
  const targetId = new mongoose.Types.ObjectId(req.params.todoId);
  Todo.deleteOne({ _id: targetId }).then(() => {});
});

router.patch("/update/:todoId", (req: Request, res: Response, next: NextFunction) => {
  const targetId = new mongoose.Types.ObjectId(req.params.todoId);

  Todo.findOneAndUpdate({ _id: targetId }, { text: req.body.text }).then((res) => console.log(res));
});

router.patch("/complete/:todoId", (req: Request, res: Response, next: NextFunction) => {
  const targetId = new mongoose.Types.ObjectId(req.params.todoId);

  Todo.findOneAndUpdate({ _id: targetId }, { completed: true }).then((res) => {});
});

module.exports = router;

export {};
