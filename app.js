import express from "express";
import "dotenv/config";
import { connectDB } from "./db/connectDB.js";
import authorRouter from "./routes/author.js";
import studentRouter from "./routes/student.js";
import attendantRouter from "./routes/attendant.js";
import bookRouter from "./routes/book.js";
import errorCatcher from "./middleware/error-catcher.js";

const app = express();

app.use(express.json())
const mongoUri = process.env.MONGO_URI;

app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/library/attendants", attendantRouter);
app.use("/api/v1/books", bookRouter);

// Error middleware
app.use(errorCatcher);

const startServer = async () => {
    try{
        const connection = await connectDB(mongoUri);
        app.listen(5000, async () => {
            console.log("Server is starting now");   
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

startServer();