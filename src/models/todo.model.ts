import mongoose, {Document} from "mongoose";

export interface ITodo extends Document {
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updateAt: Date;
}

const todoSchema = new mongoose.Schema<ITodo> (
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true,
            default: ""
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;
