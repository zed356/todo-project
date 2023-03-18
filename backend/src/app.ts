import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import todos from "./routes/todos";
import auth from "./routes/auth";
import dotenv from "dotenv";

const app = express();

mongoose.set("strictQuery", true); // `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change.

app.use(cors());

app.use(bodyParser.json());

app.use(todos);

app.use(auth);

dotenv.config({ path: __dirname + "/../development.env" });

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kap9i.mongodb.net/firstproj-todos`
  )
  .then((result: any) => {
    return console.log("successfully connected to mongo!");
  })
  .then((result: any) => {
    app.listen(8080);
  })
  .catch((err: any) => console.log(err));
