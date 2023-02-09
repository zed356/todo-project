import express from "express";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import Todo from "../models/todo";
import User from "../models/user";

const router = express.Router();

interface Todo {
  text: string;
}

router.get("/todos", (req: Request, res: Response, next: NextFunction) => {
  Todo.find({}).then((todoRes: Todo[]) => {
    res.send(todoRes);
  });
});

router.post("/add", (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const newTodo = new Todo();
  newTodo.text = req.body.text;
  newTodo.save();
});

router.delete("/delete/:todoId", (req: Request, res: Response, next: NextFunction) => {
  const targetId = new mongoose.Types.ObjectId(req.params.todoId);
  Todo.deleteOne({ _id: targetId }).then(() => {
    console.log("deletes?");
  });
});

router.patch("/update/:todoId", (req: Request, res: Response, next: NextFunction) => {
  const targetId = new mongoose.Types.ObjectId(req.params.todoId);

  Todo.findOneAndUpdate({ _id: targetId }, { text: req.body.text }).then((res) => console.log(res));
});

module.exports = router;

export {};
