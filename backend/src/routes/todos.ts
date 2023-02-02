import { NextFunction, Request, Response } from "express";

const Todo = require("../models/todo");
const User = require("../models/user");
const express = require("express");
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

module.exports = router;

export {};
