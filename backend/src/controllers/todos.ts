import { Request, Response } from "express";
import mongoose from "mongoose";
import Todo, { TodoType } from "../models/todo";

const getTodos = (req: Request, res: Response) => {
  Todo.find({ userId: req.userId }).then((todoRes: TodoType[]) => {
    res.send(todoRes);
  });
};

const addTodo = async (req: Request, res: Response) => {
  const newTodo = new Todo();
  newTodo.text = req.body.text;
  newTodo.completed = req.body.completed;

  newTodo.dateCreated = req.body.dateCreated;
  newTodo.userId = new mongoose.Types.ObjectId(req.userId);
  newTodo.save().then(() => {
    res.status(201).json({ msg: "Successfully created a todo!", newTodo });
  });
};

const deleteTodo = (req: Request, res: Response) => {
  const targetId = new mongoose.Types.ObjectId(req.params.todoId);

  Todo.deleteOne({ _id: targetId }).then(() => {
    res.status(204).json({ msg: "Successfully deleted!" });
  });
};

const updateTodo = (req: Request, res: Response) => {
  const targetId = new mongoose.Types.ObjectId(req.params.todoId);
  Todo.findOneAndUpdate(
    { _id: targetId },
    { text: req.body.text, completed: req.body.completed, dateCompleted: req.body.dateCompleted }
  ).then(() => res.status(201).json({ msg: "Successfully updated!" }));
};

export default { getTodos, addTodo, deleteTodo, updateTodo };
