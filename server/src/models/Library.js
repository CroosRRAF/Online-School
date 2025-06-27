import mongoose from "mongoose";

const librarySchema = new mongoose.Schema(
  {
    bookTitle: { type: String, required: true },
    borrowedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date, required: false },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
    fine: { type: Number, default: 0 }, // changed to default
  },
  {
    timestamps: true,
  }
);

const Library = mongoose.model("Library", librarySchema);

export default Library;
