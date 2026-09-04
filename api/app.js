import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoutes.js'
import dbConnect from "./config/db.js";
import cookieParser from "cookie-parser";
import adminRoute from './routes/adminRoute.js'
const app = express()
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);

await dbConnect();
app.get("/", (req, res) => {
  res.status(200).send("API Running...");
});

const PORT = process.env.PORT ||8000;

app.listen(PORT, () => {
  console.log(`App running at: ${PORT}`);
});