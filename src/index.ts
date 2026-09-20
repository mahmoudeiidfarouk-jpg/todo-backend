import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoute from "./routes/todo.route.js";
import { errorHandler } from "./Middleware/errorHandler.js";
import cors from "cors";



dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json());
app.use("/api/todos", todoRoute)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})



