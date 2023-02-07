import express from "express";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import Todo from "../models/todo";
import User from "../models/user";

// const Todo = require("../models/todo");
// const User = require("../models/user");
// const express = require("express");
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
  console.log(req.params.todoId);
  const targetId = new mongoose.Types.ObjectId(req.params.todoId);
  console.log(targetId);
  Todo.deleteOne({ _id: targetId }).then(() => {
    console.log("deletes?");
  });
});

module.exports = router;

export {};
