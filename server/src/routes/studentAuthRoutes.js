import { 
    loginStudent, 
    registerStudent 
} from "../controllers/studentAuthController.js";
import express from "express";

const router = express.Router();

router.post("/login", loginStudent);
router.post("/register", registerStudent);

export default router;