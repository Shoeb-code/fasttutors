import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tutorAuth from "./routes/tutorAuth.js";
import parentAuth from "./routes/parentAuth.js";
import authRoutes from "./routes/authRoutes.js"; // refresh-token
import otpRouter from "./routes/otpRoute.js";

import coinRoutes from "./routes/coinRoutes.js";

import tutorDashboard from "./routes/tutorDashboard.js";
import tutorPublicRoutes from "./routes/tutorPublic.js";
import applyRouter from "./routes/applyTuitions.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import requestAuth from "./routes/requestAuth.js";


import studyMaterialRoutes from "./module/studyMaterial/studyMaterial.routes.js";

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

/* ================= AUTH ROUTES ================= */

// global auth (refresh, logout)
app.use("/api/auth", authRoutes);

// tutor auth
app.use("/api/tutor/auth", tutorAuth);

// parent / student auth
app.use("/api/parent/auth", parentAuth);

// otp
app.use("/api/auth", otpRouter);


app.use("/api/coins", coinRoutes);

/* ================= APP ROUTES ================= */

app.use("/api/tutor", tutorDashboard);

app.use("/api/tutor", applyRouter);


app.use("/api/tutor", tutorPublicRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api", requestAuth);



app.use("/api/study-materials", studyMaterialRoutes);

/* ================= DB ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) =>
    console.log("MongoDB connection error:", err)
  );

/* ================= SERVER ================= */

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
