import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    moduleName: { type: String, required: true },
    instructor: { type: String },
    description: { type: String },
    credit: { type: Number, required: true },
  },
  { timestamps: true }
);

const Modules = mongoose.model("Module", moduleSchema);

export default Modules;
