import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birth: { type: Date },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    address: { type: String },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
    sports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sports" }],
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
