import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import connectDB from "./db/connection.js";
import {
  errorHandlingMiddleware,
  notFoundError,
} from "./middlewares/errorHandler.js";
import userAuthentication from "./middlewares/auth.js";
import userRoutes from "./routes/users.js";
import jobRoutes from "./routes/jobs.js";

// extra security packages

import helmet from "helmet";
import cors from "cors";
import rateLimiter from "express-rate-limit";

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/users", userRoutes);
app.use("/jobs", userAuthentication, jobRoutes);

app.use(errorHandlingMiddleware);
app.use(notFoundError);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
