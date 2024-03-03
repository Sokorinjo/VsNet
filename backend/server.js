import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
const PORT = process.env.PORT || 8000;
import { router as userRouter } from "./routes/userRoutes.js";
import { router as postRouter } from "./routes/postRoutes.js";
import { router as commentRouter } from "./routes/commentRotes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

//Connect to DB
connectDB();

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "HOME PAGE" });
});

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`.cyan.underline);
});
