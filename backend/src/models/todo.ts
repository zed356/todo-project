import { Schema, model } from "mongoose";

interface Todo {
  text: string;
}

const todoSchema = new Schema<Todo>({
  text: { type: String, required: true },
});

module.exports = model("Todo", todoSchema);
