import { Request, Response, NextFunction } from "express"
import Todo from "../models/todo.model.js";
import { AppError } from "../utils/appError.js";

export const createTodo = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const {title, description, completed} = req.body;

        const newTodo = await Todo.create({
           title,
           description,
           completed
        });

        res.status(201)
        .json({ 
            message: "New Todo is created successfully",
            data: newTodo
         });
    } catch (error) {
        next(error);
    }
}

export const getTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { search } = req.query;

        let filter: any = {};
        
        if (search && typeof search === "string") {
            filter = {
                $or: [
                    {title: {$regex: search, $options: "i"}},
                    {description: {$regex:  search, $options: "i"}}
                ]
            }
        };
        
        const todos = await Todo.find(filter).sort({ createdAt: -1});

        res.status(200)
        .json({
            message: "Todos retrieved successfully",
            count: todos.length,
            data: todos
        });
    } catch (error) {
        next(error)
    }
}

export const getTodoById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findById(id);

        if (!todo) {
            return next(new AppError("Todo not found", 404))
        };

        res.status(200)
        .json({
            message: "Todo retrieved successfully",
            data: todo
        })
    } catch (error) {
        next(error);
    }
}

export const updateTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const todoUpdate = await Todo.findByIdAndUpdate(
            id,
            req.body,
            {new: true, runValidators: true}
        );

        if (!todoUpdate) {
            return next(new AppError("Todo not found", 404));
        }

        res.status(200)
        .json({
            message: "Todo updated successfully",
            data: todoUpdate
        })
    } catch (error) {
        next(error);
    }

}

export const deleteTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return next(new AppError("Todo not found", 404));
        }

        res.status(200)
        .json({
            message: "Todo deleted successfully",
        })
    } catch (error) {
        next(error)
    }
}