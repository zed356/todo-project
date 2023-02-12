import { Schema, model } from "mongoose";

interface Todo {
  text: string;
  completed: boolean;
}

const todoSchema = new Schema<Todo>({
  text: { type: String, required: true },
  completed: { type: Boolean, required: false },
});

// module.exports = model("Todo", todoSchema);

export default model("Todo", todoSchema);
