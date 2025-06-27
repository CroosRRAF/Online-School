import mongoose from "mongoose";

export const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    date: { type: Date, required: true },
    present: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
