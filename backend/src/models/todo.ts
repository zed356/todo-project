import { Schema, model } from "mongoose";

export interface TodoType {
  text: string;
  completed: boolean;
  dateCreated: Date;
  dateCompleted?: Date;
}

const todoSchema = new Schema<TodoType>({
  text: { type: String, required: true },
  completed: { type: Boolean, required: false },
  dateCreated: { type: Date, required: true },
  dateCompleted: { type: Date, required: false },
});

export default model("Todo", todoSchema);
