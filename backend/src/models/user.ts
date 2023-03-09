import mongoose, { Schema, model } from "mongoose";
import todo, { TodoType } from "./todo";

interface User {
  email: string;
  password: string;
  todos: TodoType[];
}

const userSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  todos: [
    {
      type: mongoose.Types.ObjectId,
      ref: todo,
    },
  ],
});

export default model("User", userSchema);
