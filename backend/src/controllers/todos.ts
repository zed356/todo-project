import Todo from "../models/todo";
import { TodoType } from "../models/todo";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const getTodos = (req: Request, res: Response, next: NextFunction) => {
  Todo.find({}).then((todoRes: TodoType[]) => {
    res.send(todoRes);
  });
};

const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  const newTodo = new Todo();
  newTodo.text = req.body.text;
  newTodo.completed = req.body.completed;
  newTodo.date = req.body.date;
  newTodo.save().then(() => {
    res.status(201).json({ msg: "Successfully created a todo!", newTodo });
  });
};

const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
  const targetId = new mongoose.Types.ObjectId(req.params.todoId);
  Todo.deleteOne({ _id: targetId }).then(() => {
    res.status(204).json({ msg: "Successfully deleted!" });
  });
};

const updateTodo = (req: Request, res: Response, next: NextFunction) => {
  const targetId = new mongoose.Types.ObjectId(req.params.todoId);

  Todo.findOneAndUpdate(
    { _id: targetId },
    { text: req.body.text, completed: req.body.completed }
  ).then(() => res.status(201).json({ msg: "Successfully updated!" }));
};

export default { getTodos, addTodo, deleteTodo, updateTodo };
