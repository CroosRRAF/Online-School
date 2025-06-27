import Attendance from "../models/Attendance.js";
import Courses from "../models/Courses.js";
import Library from "../models/Library.js";
import Modules from "../models/Modules.js"; 
import Results from "../models/Results.js";
import Sports from "../models/Sports.js";
import Student from "../models/Students.js";

export const getStudentDashboardData = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findById(studentId)
      .select("-password")
      .populate({
        path: "courses", // 👈 this populates course
        populate: {
          path: "modules", // 👈 this populates modules in the course
          model: "Modules",
          select: "moduleName credit instructor",
        },
      })
      .populate({
        path: "sports",
        populate: {
          path: "courses",
          model: "Modules",
        },
      })
      .populate("sports", "sportName coach");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const borrowedBooks = await Library.find({ borrowedBy: studentId }).select(
      "bookTitle borrowDate returnDate status fine"
    );

    const attendanceRecords = await Attendance.find({ studentId });
    const totalDays = attendanceRecords.length;
    const presentDays = attendanceRecords.filter((a) => a.present).length;
    const attendancePercent = totalDays ? (presentDays / totalDays) * 100 : 0;

    const grades = await Results.find({ student: studentId })
      .populate("module", "moduleName credit")
      .select("score grade");

    res.json({
      student,
      borrowedBooks,
      attendanceSummary: {
        totalDays,
        presentDays,
        attendancePercent: attendancePercent.toFixed(2),
      },
      grades,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get basic student profile by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update student profile
export const updateStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update allowed fields only (e.g., address, password)
    const { address, password } = req.body;
    if (address) student.address = address;
    if (password) {
      // You should hash password before saving
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(password, salt);
    }

    await student.save();
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
