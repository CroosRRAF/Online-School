import mongoose from "mongoose";
import { type } from "os";

const restulSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    score: { type: Number, required: true },
    grade: {
      type: String,
      required: true,
      enum: ["A+", "A", "A-", "B+", "B", "C", "D", "F"],
    },
  },
  {
    timestamps: true,
  }
);

const Results = mongoose.model("Results", restulSchema);

export default Results;
