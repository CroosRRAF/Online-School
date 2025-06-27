import Sport from "../models/Sports.js";
import Student from "../models/Students.js";

// Register student to a sport
export const registerForSport = async (req, res) => {
  const studentId = req.user.id;
  const { sportId } = req.params;

  try {
    const sport = await Sport.findById(sportId);
    if (!sport) return res.status(404).json({ message: "Sport not found" });

    // Already registered?
    if (sport.participants.includes(studentId)) {
      return res.status(400).json({ message: "You are already registered for this sport" });
    }

    sport.participants.push(studentId);
    await sport.save();

    // Optional: Also update student's `sports` field
    await Student.findByIdAndUpdate(studentId, { $addToSet: { sports: sportId } });

    res.status(200).json({ message: "Registered successfully", sport });
  } catch (error) {
    console.error("Error registering for sport:", error);
    res.status(500).json({ message: "Server error while registering for sport." });
  }
};

// Remove student from a sport
export const removeFromSport = async (req, res) => {
  const studentId = req.user.id;
  const { sportId } = req.params;

  try {
    const sport = await Sport.findById(sportId);
    if (!sport) return res.status(404).json({ message: "Sport not found" });

    sport.participants = sport.participants.filter(id => id.toString() !== studentId);
    await sport.save();

    await Student.findByIdAndUpdate(studentId, { $pull: { sports: sportId } });

    res.status(200).json({ message: "You have left the sport", sport });
  } catch (error) {
    console.error("Error leaving sport:", error);
    res.status(500).json({ message: "Server error while removing from sport." });
  }
};

// Get all sports the student participates in
export const getMySports = async (req, res) => {
  const studentId = req.user.id;

  try {
    const student = await Student.findById(studentId).populate("sports");

    res.status(200).json({ sports: student.sports });
  } catch (error) {
    console.error("Error fetching student's sports:", error);
    res.status(500).json({ message: "Server error while fetching sports." });
  }
};

// Get all available sports
export const getAllSports = async (req, res) => {
  try {
    const sports = await Sport.find().select("-participants -__v"); // Hide participant list and __v if not needed
    res.status(200).json({ message: "All sports fetched successfully", sports });
  } catch (error) {
    console.error("Error fetching sports:", error.message);
    res.status(500).json({ message: "Server error while fetching sports." });
  }
};
