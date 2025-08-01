import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Modules" }],
  },
  { timestamps: true }
);

const Courses = mongoose.model("Courses", courseSchema);

export default Courses;