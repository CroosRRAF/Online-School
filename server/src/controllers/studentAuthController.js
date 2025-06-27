import Student from "../models/Students.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

// =====================
// Login Student
// =====================
export const loginStudent = [
  // Validation rules
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const student = await Student.findOne({ email });
      if (!student) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      res.status(200).json({
        message: "Login successful",
        token,
        student: { ...student.toObject(), password: undefined },
      });
    } catch (error) {
      console.error("Error in loginStudent controller", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// =====================
// Register Student
// =====================
export const registerStudent = [
  // Validation rules
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate unique studentID
      const studentID = `S${uuidv4().slice(0, 8)}`;

      // Set default values for other fields
      const student = new Student({
        studentID,
        name,
        birth: new Date("2000-01-01"),
        gender: "other",
        email,
        password: hashedPassword,
        grade: 1,
        address: "Not provided",
        courses: [],
        status: "active",
      });

      await student.save();

      res.status(201).json({
        message: "Student registered successfully",
        student: { ...student.toObject(), password: undefined },
      });
    } catch (error) {
      console.error("Error in registerStudent controller", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];