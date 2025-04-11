import mongoose from "mongoose";

const completionSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  completedAt: { type: Date, default: Date.now },
});

export const CompletionModel = mongoose.model("Completion", completionSchema);

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
