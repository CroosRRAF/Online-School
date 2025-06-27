import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Import your models
import Students from "./src/models/Students.js";
import Courses from "./src/models/Courses.js";
import Modules from "./src/models/Modules.js";
import Results from "./src/models/Results.js";
import Sports from "./src/models/Sports.js";
import Library from "./src/models/Library.js";
import Attendance from "./src/models/Attendance.js";

const seedFilePath = path.resolve("seedData.json");

const runSeed = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/OnlineSchool");

    const rawData = fs.readFileSync(seedFilePath);
    const data = JSON.parse(rawData);

    // Clear existing data
    await Promise.all([
      Students.deleteMany(),
      Courses.deleteMany(),
      Modules.deleteMany(),
      Results.deleteMany(),
      Sports.deleteMany(),
      Library.deleteMany(),
      Attendance.deleteMany(),
    ]);

    // Insert new data
    await Modules.insertMany(data.modules);
    await Courses.insertMany(data.courses);
    await Students.insertMany(data.students);
    await Results.insertMany(data.results);
    await Sports.insertMany(data.sports);
    await Library.insertMany(data.library);
    await Attendance.insertMany(data.attendance);

    console.log("✅ All data seeded successfully!");
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    mongoose.connection.close();
  }
};

runSeed();
