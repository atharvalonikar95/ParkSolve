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
const allowedOrigins = [
    'http://localhost:3000',
    'https://client-mnze.vercel.app'
];
app.use(cors({
    origin: allowedOrigins, // Automatically reflects the frontend domain (https://client-mnze.vercel.app)
    credentials: true,
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// 🟢 2. Handle preflight (OPTIONS) requests explicitly
// app.options('*', cors());
app.use(express.json());
app.use(cookieParser());
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);


app.get("/", (req, res) => {
  res.status(200).send("API Running...");
});

// const PORT = process.env.PORT ||8000;

// app.listen(PORT, () => {
//   console.log(`App running at: ${PORT}`);
// });
export default app;