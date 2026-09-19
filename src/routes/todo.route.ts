import express from "express";
import { createTodo, updateTodo, getTodo, getTodoById, deleteTodo } from "../controllers/todo.controller.js";
import validate from "../Middleware/validate.middleware.js";
import { createTodoValidator } from "../validators/createValidator.js";
import { updateTodoValidator } from "../validators/updateValidator.js";

const router = express.Router();

router.get('/', getTodo);
router.post('/', validate(createTodoValidator), createTodo);

router.get('/:id', getTodoById);
router.put('/:id', validate(updateTodoValidator), updateTodo);
router.delete('/:id', deleteTodo);

export default router;

