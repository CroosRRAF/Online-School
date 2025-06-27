import jwt from "jsonwebtoken";
import Student from "../models/Students.js";

export const authenticateStudent = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const student = await Student.findById(decoded.id).select("-password");

      if (!student) {
        return res.status(401).json({ message: "Student not found" });
      }

      req.user = { id: student._id, name: student.name };
      next();
    } catch (error) {
      console.error("JWT error:", error.message); // Add this line
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "Authorization token missing" });
  }
};
