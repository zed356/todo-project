import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import auth from "./routes/auth";
import todos from "./routes/todos";

const app = express();

mongoose.set("strictQuery", true); // `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change.

app.use(cors());

app.use(bodyParser.json());

app.use(todos);

app.use(auth);

if (fs.existsSync(__dirname + "/../development.env")) {
  dotenv.config({ path: __dirname + "/../development.env" });
} else {
  dotenv.config({ path: __dirname + "/../public.env" });
}

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kap9i.mongodb.net/firstproj-todos`
  )
  .then(() => {
    console.log("successfully connected to mongo!");
    app.listen(8080);
  })
  .catch((err) => console.log(err));
