import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");

const app = express();

const todos = require("./routes/todos");

const User = require("./models/user");

mongoose.set("strictQuery", true); // `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change.

app.use(cors());

app.use(bodyParser.json());

app.use(todos);

mongoose
  .connect("mongodb+srv://we:we@cluster0.kap9i.mongodb.net/firstproj-todos")
  .then((result: any) => {
    return console.log("successfully connected to mongo!");
  })
  .then((result: any) => {
    app.listen(8080);
  })
  .catch((err: any) => console.log(err));
