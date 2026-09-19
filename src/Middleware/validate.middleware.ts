import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

const validate = (schema: ZodSchema) =>
    (
        req: Request,
        res: Response, 
        next: NextFunction) => {
            try {
                schema.parse(req.body);
                next();
            } catch (error) {
                if(error instanceof ZodError) {
                    return res.status(400)
                    .json({
                        message: "Invalid input data",
                        errors: error.issues.map(err => err.message)
                    })
                }

                console.error("Unexpected validation error:", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
    }

    export default validate;