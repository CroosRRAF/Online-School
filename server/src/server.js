import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import studentAuthRoutes from "./routes/studentAuthRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import sportRoutes from "./routes/studentSportRoutes.js";

dotenv.config();

// Validate environment variables
const requiredEnvVars = ["PORT", "MONGO_URL"];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
if (missingVars.length) {
  console.error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.get("/", (_, res) => {
  res.send("API is running");
});

app.use("/api/authendication", studentAuthRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/sports', sportRoutes);

// Error handling middleware (should be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    throw process.exit(1);
  });
