import mongoose from "mongoose";

const sportSchema = new mongoose.Schema(
  {
    sportName: { type: String, required: true },
    coach: { type: String, required: true },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Sports = mongoose.model("Sports", sportSchema);

export default Sports;
