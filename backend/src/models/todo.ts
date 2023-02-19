import { Schema, model } from "mongoose";

export interface TodoType {
  text: string;
  completed: boolean;
  date: Date;
  completedDate?: Date;
}

const todoSchema = new Schema<TodoType>({
  text: { type: String, required: true },
  completed: { type: Boolean, required: false },
  date: { type: Date, required: true },
  completedDate: { type: Date, required: false },
});

export default model("Todo", todoSchema);
