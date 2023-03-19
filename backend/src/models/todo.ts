import { model, Schema, Types } from "mongoose";

export interface TodoType {
  userId: Types.ObjectId;
  text: string;
  completed: boolean;
  dateCreated: Date;
  dateCompleted?: Date;
}

const todoSchema = new Schema<TodoType>({
  userId: { type: Schema.Types.ObjectId, required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, required: false },
  dateCreated: { type: Date, required: true },
  dateCompleted: { type: Date, required: false },
});

export default model("Todo", todoSchema);
