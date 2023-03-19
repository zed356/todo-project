import express from "express";
import { body } from "express-validator";
import todoController from "../controllers/todos";
import authJwt from "../middlewares/authJwt";

const router = express.Router();

router.get("/todos", authJwt.verifyToken, todoController.getTodos);

router.post("/add", authJwt.verifyToken, body("text").trim(), todoController.addTodo);

router.delete("/delete/:todoId", authJwt.verifyToken, todoController.deleteTodo);

router.patch("/update/:todoId", authJwt.verifyToken, todoController.updateTodo);

export default router;
