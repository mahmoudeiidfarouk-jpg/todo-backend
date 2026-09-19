import {z} from "zod";

export const updateTodoValidator = z.object({
    title: z.string().min(3, "العنوان يجب أن يكون 3 أحرف على الأقل").trim().optional(),
    description: z.string().trim().optional(),
    completed: z.boolean().optional()
})