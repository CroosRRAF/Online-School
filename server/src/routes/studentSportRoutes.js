import express from "express";
import {
  getAllSports,
  registerForSport,
  removeFromSport,
  getMySports
} from "../controllers/studentSportController.js";
import { authenticateStudent } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Fetch all sports (for everyone or just students)
router.get("/", getAllSports);

// ✅ Fetch only logged-in student’s sports
router.get("/my-sports", authenticateStudent, getMySports);

// ✅ Join a sport
router.post("/:sportId/register", authenticateStudent, registerForSport);

// ✅ Leave a sport
router.delete("/:sportId/remove", authenticateStudent, removeFromSport);

export default router;
