import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";

// File imports
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    allowedHeaders: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
connectDB()


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running PORT ${PORT}`);
})