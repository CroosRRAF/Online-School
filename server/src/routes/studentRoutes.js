import express from "express";
import {
  getStudentById,
  getStudentDashboardData,
  updateStudentProfile,
} from "../controllers/studentController.js";
import { authenticateStudent } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get student profile (basic)
router.get("/:id", authenticateStudent, getStudentById);

// Get full dashboard data (courses, sports, books, attendance)
router.get("/:id/dashboard", authenticateStudent, getStudentDashboardData);

// Update profile info (address, password, etc)
router.put("/:id", authenticateStudent, updateStudentProfile);

export default router;
