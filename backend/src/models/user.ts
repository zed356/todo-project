import { model, Schema } from "mongoose";

interface User {
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default model("User", userSchema);
