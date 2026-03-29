import express from "express";
import "dotenv/config";
import { connectDB } from "./db/connectDB.js";
import authorRouter from "./routes/author.js";
import studentRouter from "./routes/student.js";
import errorCatcher from "./middleware/error-catcher.js";

const app = express();

app.use(express.json())
const mongoUri = process.env.MONGO_URI;

app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/students", studentRouter);

// Error middleware
app.use(errorCatcher);

app.listen(5000, async () => {
    try{
        const connection = await connectDB(mongoUri);
        console.log("Server is starting now");
    } catch (err) {
        console.log(err);
        process.exit(0);
    }
});