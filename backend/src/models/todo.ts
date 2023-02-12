import { Schema, model } from "mongoose";

interface Todo {
  text: string;
  completed: boolean;
  date: Date;
}

const todoSchema = new Schema<Todo>({
  text: { type: String, required: true },
  completed: { type: Boolean, required: false },
  date: { type: Date, required: true },
});

export default model("Todo", todoSchema);
